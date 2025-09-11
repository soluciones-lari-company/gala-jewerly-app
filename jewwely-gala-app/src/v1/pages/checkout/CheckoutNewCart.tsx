import { Link, useNavigate } from "react-router-dom";
import Breadcums from "../../components/shared/Breadcums";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Button,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import CustomerSelector from "../customer/CustomerSelector";
import { useState } from "react";
import {
  CreateSalesOrderCommand,
  CustomerDTO,
  SalesOrderClient,
} from "../../../api/client/GalaJewerlyClient";
import moment from "moment";
import { useGalaAuth } from "../../contexts/authentication/AuthGalaProvider";
import { AiOutlineArrowRight } from "react-icons/ai";

const CheckoutNewCart = () => {
  const user = useGalaAuth();
  const navigate = useNavigate();
  const [customer, serCustomer] = useState<CustomerDTO | undefined>(undefined);
  const [showCustomerSelector, setShowCustomerSelector] = useState(false);
  const Create = () => {
    const client = new SalesOrderClient(undefined, user?.instance);
    const command = {
      idCustomer: customer?.id,
      date: moment(),
      zone: "",
    } as CreateSalesOrderCommand;

    client
      .create(command)
      .then((result) => {
        navigate(`/cart/${result}`);
      })
      .catch(() => {});
  };
  return (
    <>
      <Breadcums>
        <ul>
          <li>
            <Link to={"./"}>Inicio</Link>
          </li>
          <li className="active">Lista de carritos</li>
        </ul>
      </Breadcums>
      <section className="pb-5 mb-2 mb-md-3 mb-lg-4 mb-xl-5 container">
        <h1 className="h3 mb-4">Registrar nuevo carrito</h1>
        <div className="row">
          <div className="col-lg-8">
            <label htmlFor="">Cliente</label>
            <InputGroup className="col-lg-4 col-sm-12">
              <FormControl
                className="rounded-0"
                placeholder="Cliente"
                aria-label="Square input group with button addon"
                aria-describedby="addon-button-square"
                disabled={true}
                value={customer === undefined ? "" : customer.name}
              />
              <Button
                variant="outline-dark rounded-0"
                id="addon-button-square"
                onClick={() => setShowCustomerSelector(true)}
              >
                Ver
              </Button>
            </InputGroup>
            <CustomerSelector
              onSelect={(e) => serCustomer(e)}
              show={showCustomerSelector}
              onClose={() => setShowCustomerSelector(false)}
            ></CustomerSelector>

          </div>
          <div className="row mt-3 mb-3">
            <div className="col-12 d-flex flex-row-reverse ">
              <Button
                className="btn btn-primary"
                onClick={() => Create()}
                disabled={customer === undefined}
              >
                Comenzar a vender <AiOutlineArrowRight />{" "}
              </Button>
            </div>
          </div>
          <div className="col-lg-4"></div>
        </div>
      </section>
    </>
  );
};

export default CheckoutNewCart;
