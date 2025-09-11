import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { UserContext } from "../../../contexts/UserContext";
import {
  AddLineToSalesOrderCommand,
  SalesOrderClient,
} from "../../../api/client/GalaJewerlyClient";
import { Link } from "react-router-dom";

type ICheckoutCartAddSingleLineProps = {
  idOrder: string;
  onNewLineAdded: () => void;
};

const CheckoutCartAddSingleLine = ({
  idOrder,
  onNewLineAdded,
}: ICheckoutCartAddSingleLineProps) => {
  // contex
  const userContext = useContext(UserContext);
  // component variables
  const [isLoadding, setIsLoadding] = useState<boolean>(false);
  const [showTool, setShowTool] = useState<boolean>(false);
  const [serieCode, setSerieCode] = useState<string>("");
  const [response, setResponse] = useState<string>("");

  // functions component
  const _addNewline = async () => {
    setIsLoadding(true);
    const client = new SalesOrderClient(undefined, userContext?.instance);

    const command = {
      salesOrderId: idOrder,
      numLine: 0,
      itemSerieId: undefined,
      quantity: 1,
      serieCode: serieCode,
    } as AddLineToSalesOrderCommand;
    client
      .addLineToSalesOrder(idOrder, command)
      .then((result) => {
        onNewLineAdded();
      })
      .catch((error) => {
        if(error.status && error.status === 404){
            setResponse(`El articulo [${serieCode}] no fue encontrado en la lista de inventario`)
        }

      })
      .finally(() => setIsLoadding(false));
  };

  if (!showTool) {
    return (
        <a href="#" className=" underlined mt-2" onClick={() => setShowTool(true) }>Linea rapida</a>
    );
  }

  return (
    <div className="bg-white cart-item-list p-2 p-lg-3 mb-1">
      <div className="row">
        <div className="col-12">
        <a href="#" className=" underlined mt-2" onClick={() => setShowTool(false) }>Cerrar Linea rapida</a>
          <div className="input-combined mt-1">
            <Form.Control
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              type="text"
              className="form-control"
              placeholder="Codigo del producto"
              value={serieCode}
              onChange={(e) => setSerieCode(e.target.value)}
            />
            <button
              className="btn btn-white"
              type="button"
              id="button-addon2"
              onClick={() => _addNewline()}
              disabled={isLoadding}
            >
              {isLoadding ? "Agregando..." : "Agregar"}
            </button>
            <span className="input-combined_indicator"></span>
          </div>
          <small className="text-danger">{response}</small>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCartAddSingleLine;
