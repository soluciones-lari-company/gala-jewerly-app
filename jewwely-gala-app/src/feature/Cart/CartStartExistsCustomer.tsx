import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import {
  CreateSalesOrderCommand,
  CustomerClient,
  CustomerDTO,
} from "../../api/client/GalaJewerlyClient";
import { Button, Form, InputGroup, ListGroup } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import moment from "moment";

const CartStartExistsCustomer = () => {
  const authContext = useContext(AuthContext);
  const [customers, setCustomers] = useState<CustomerDTO[]>([]);
  const [isLoadding, setIsLoadding] = useState<boolean>(true);
  const [searchPattern, setSearchPattern] = useState<string>("");
  const [customerSelected, setCustomerSelected] = useState<string>("");

  const ListSuppliers = async () => {
    const client = new CustomerClient(undefined, authContext?.instance);
    setIsLoadding(true);
    await client
      .getAll()
      .then((result) => {
        setCustomers(result);
      })
      .catch()
      .finally(() => {
        setIsLoadding(false);
      });
  };

  const NextStepCart = () => {
    const command  = {
      idCustomer: customerSelected,
      date: moment(),
      zone: "",
    } as CreateSalesOrderCommand

    authContext?.addNewCart(command)
  };

  useEffect(() => {
    ListSuppliers();
  }, []);

  if(isLoadding){
    return <h6>Cargando datos</h6>
  }

  return (
    <>
      <div className="row gutter-1 align-items-end">
        <div className="col-md-6">
          <h4>Nuevo carrito: Selecciona cliente</h4>
        </div>
      </div>
      <div className="row gutter-1">
        <div className="col-lg-7 col-md-12">
          <div className="bg-white p-2 p-lg-3 mb-1">
            <div className="row gutter-1 align-items-center">
              <div className="col-md-6">
                <h2 className="text-uppercase fs-20">Cliente registrados</h2>
              </div>
              <div className="col-md-6 text-md-right"></div>
            </div>

            <div className="row gutter-1">
              <div className="col-12">
                <InputGroup className="mb-1">
                  <Form.Control
                    placeholder="Escribe aqui..."
                    aria-label="Escribe aqui..."
                    aria-describedby="basic-addon2"
                    value={searchPattern}
                    onChange={(e) => {
                      setSearchPattern(e.target.value);
                    }}
                  />
                  <Button variant="outline-secondary" id="button-addon2">
                    <BsSearch></BsSearch>
                  </Button>
                </InputGroup>
              </div>
            </div>

            <div className="row gutter-1">
              <div className="col-12">
                <ListGroup defaultActiveKey="#link1">
                  {customers
                    .filter((customer) =>
                      customer.name
                        ?.toLocaleLowerCase()
                        .includes(searchPattern.toLocaleLowerCase())
                    )
                    .map((customer) => {
                      return (
                        <ListGroup.Item action href={`#${customer.id}`} onClick={() =>{ setCustomerSelected(customer.id ?? "") } } key={customer.id}>
                          {customer.name}
                        </ListGroup.Item>
                      );
                    })}
                </ListGroup>
              </div>
            </div>
          </div>
          <div className="bg-white p-2 p-md-3">
            <button
              className="btn btn-lg btn-primary btn-block mb-2"
              onClick={NextStepCart}
            >
              Continuar
            </button>
            <small className="text-muted"></small>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartStartExistsCustomer;
