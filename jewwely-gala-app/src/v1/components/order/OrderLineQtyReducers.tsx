import { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import { useGalaAuth } from "../../contexts/authentication/AuthGalaProvider";
import {
    AddLineToSalesOrderCommand,
  DeleteLineFromOrderCommand,
  SalesOrderClient,
} from "../../../api/client/GalaJewerlyClient";
import { Form } from "react-bootstrap";

type IOrderLineQtyReducers = {
  idOrder: string;
  idLine: string;
  lineQuantity: number;
  itemNumber: string;
  onChangeQty: () => void;
};

const OrderLineQtyReducers = ({
  idOrder,
  idLine,
  lineQuantity,
  itemNumber,
  onChangeQty,
}: IOrderLineQtyReducers) => {
  const user = useGalaAuth();
  const [isLoadding, setIsLoadding] = useState<boolean>(false);

  const removeQyt = () => {
    if (lineQuantity >= 1) {
    setIsLoadding(true)
      const client = new SalesOrderClient(undefined, user?.instance);
      const command = {
        salesOrderId: idOrder,
        itemSerieId: idLine,
        quantity: 1,
      } as DeleteLineFromOrderCommand;
      client
        .deleteLineFromOrder(idOrder, idLine, command)
        .then((result) => {onChangeQty()})
        .catch((error) => {
          if (error.status) {
            alert(
              `Codigo: ${error.status} -${error.detail} `
            );
          }
        })
        .finally(() => {setIsLoadding(false)});
    }
  };

  const addQty = async () => {
      setIsLoadding(true);
      const client = new SalesOrderClient(undefined, user?.instance);
  
      const command = {
        salesOrderId: idOrder,
        numLine: 0,
        itemSerieId: undefined,
        quantity: 1,
        serieCode: itemNumber,
      } as AddLineToSalesOrderCommand;
      client
        .addLineToSalesOrder(idOrder, command)
        .then((result) => {
            onChangeQty();
        })
        .catch((error) => {
          if(error.status && error.status === 404){
              alert(`El articulo [${itemNumber}] no fue encontrado en la lista de inventario`)
          }
  
        })
        .finally(() => setIsLoadding(false));
    };

  return (
    <div className="count-input" aria-label="Product quantity">
      <button
        type="button"
        className="btn btn-icon"
        aria-label="Decrement quantity"
        disabled={isLoadding ||  lineQuantity < 1}
        data-decrement="true"
        onClick={()=> removeQyt()}
      >
        <FiMinus></FiMinus>
      </button>
      <Form.Control
        type="number"
        placeholder="cantidad"
        readOnly
        value={lineQuantity}
        />
      <button
        type="button"
        disabled={isLoadding}
        className="btn btn-icon "
        aria-label="Increment quantity"
        data-increment="true"
        onClick={() => addQty()}
      >
        <FiPlus></FiPlus>
      </button>
    </div>
  );
};

export default OrderLineQtyReducers;
