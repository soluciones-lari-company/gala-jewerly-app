import { Button, Form, InputGroup, ListGroup, Modal } from "react-bootstrap";
import { useGalaAuth } from "../../contexts/authentication/AuthGalaProvider";
import { useEffect, useState } from "react";
import {
  CustomerClient,
  CustomerDTO,
} from "../../../api/client/GalaJewerlyClient";
import { BsSearch } from "react-icons/bs";

type ICustomerSelector = {
  onSelect: (customer: CustomerDTO) => void;
  onClose: () => void;
  show: boolean;
};

const CustomerSelector = ({ onSelect, onClose, show }: ICustomerSelector) => {
  const user = useGalaAuth();

  const [customers, setCustomers] = useState<CustomerDTO[]>([]);
  const [isLoadding, setIsLoadding] = useState<boolean>(true);
  const [searchPattern, setSearchPattern] = useState<string>("");
  const [customerSelected, setCustomerSelected] = useState<string>("");
  const ListSuppliers = async () => {
    const client = new CustomerClient(undefined, user?.instance);
    await client
      .getAll()
      .then((result) => {
        setCustomers(result);
      })
      .catch()
      .finally(() => {});
  };

  useEffect(() => {
    ListSuppliers();
  }, []);

  return (
    <Modal
      show={show}
      onHide={() => onClose()}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Clientes registrados</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
        <ListGroup defaultActiveKey="#link1">
          {customers
            .filter((customer) =>
              customer.name
                ?.toLocaleLowerCase()
                .includes(searchPattern.toLocaleLowerCase())
            )
            .map((customer) => {
              return (
                <ListGroup.Item
                  action
                  href={`#${customer.id}`}
                  onClick={() => {
                    setCustomerSelected(customer.id ?? "");
                    onSelect(customer)
                    onClose()
                  }}
                  key={customer.id}
                >
                  {customer.name}
                </ListGroup.Item>
              );
            })}
        </ListGroup>
      </Modal.Body>
    </Modal>
  );
};

export default CustomerSelector;
