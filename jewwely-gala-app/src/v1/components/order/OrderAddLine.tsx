import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useGalaAuth } from "../../contexts/authentication/AuthGalaProvider";
import {
  AddLineToSalesOrderCommand,
  SalesOrderClient,
} from "../../../api/client/GalaJewerlyClient";

type IOrderAddLine = {
  idOrder: string;
  onNewLineAdded: () => void;
};

const OrderAddLine = ({ idOrder, onNewLineAdded }: IOrderAddLine) => {
  // contex
  const user = useGalaAuth();
  // component variables
  const [isLoadding, setIsLoadding] = useState<boolean>(false);
  const [serieCode, setSerieCode] = useState<string>("");
  const [response, setResponse] = useState<string>("");

  // functions component
  const _addNewline = async () => {
    setIsLoadding(true);
    setResponse("")
    const client = new SalesOrderClient(undefined, user?.instance);

    const command = {
      salesOrderId: idOrder,
      serieId: "",
      quantity: 1,
    } as AddLineToSalesOrderCommand;
    client
      .addLineToSalesOrder(idOrder, command)
      .then((result) => {
        onNewLineAdded();
      })
      .catch((error) => {
        if (error.status) {
          setResponse(
            `Codigo: ${error.status} -${error.detail} `
          );
        }
      })
      .finally(() => setIsLoadding(false));
  };
  return (
    <div className="discount-code col-lg-4 col-sm-12">
      <p>Nuevo articulo.</p>
      <InputGroup className="pb-3">
        <Form.Control
          type="text"
          placeholder="Serie de producto"
          value={serieCode}
          onChange={(e) => setSerieCode(e.target.value)}
        />
        <Button onClick={() => _addNewline()} disabled={isLoadding} variant="outline-dark">
          {isLoadding ? "Agregando..." : "Agregar"}
        </Button>
      </InputGroup>
      <small className="text-danger">{response}</small>
    </div>
  );
};

export default OrderAddLine;
