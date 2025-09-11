import { Form } from "react-bootstrap";
import { FiMinus, FiPlus } from "react-icons/fi";
import { useGalaAuth } from "../../contexts/authentication/AuthGalaProvider";
import { useEffect, useState } from "react";
import {
  AddLineToSalesOrderCommand,
  DeleteLineFromOrderCommand,
  SalesOrderClient,
} from "../../../api/client/GalaJewerlyClient";

type ISerieCounter = {
  idOrder: string;
  serieId: string;
  quantity: number
  onChangeQty: () => void;
};

const SerieCounter = ({ idOrder, serieId,quantity, onChangeQty }: ISerieCounter) => {
  const user = useGalaAuth();
  const [isLoadding, setIsLoadding] = useState<boolean>(false);

  const removeQyt = () => {
    setIsLoadding(true);
    const client = new SalesOrderClient(undefined, user?.instance);

    const command = {
      salesOrderId: idOrder,
      itemSerieId: serieId,
      quantity: 1,
    } as DeleteLineFromOrderCommand;
    client
      .deleteLineFromOrder(idOrder, serieId, command)
      .then((result) => {
        onChangeQty();
      })
      .catch((error) => {
        if (error.status && error.status === 409) {
          alert(error.detail)
        }
      })
      .finally(() => setIsLoadding(false));

  };
  const addQty = async () => {
    setIsLoadding(true);
    const client = new SalesOrderClient(undefined, user?.instance);

    const command = {
      salesOrderId: idOrder,
      serieId: serieId,
      quantity: 1,
    } as AddLineToSalesOrderCommand;
    client
      .addLineToSalesOrder(idOrder, command)
      .then((result) => {
        onChangeQty();
      })
      .catch((error) => {
        if (error.status && error.status === 409) {
          alert(error.detail)
        }
      })
      .finally(() => setIsLoadding(false));
  };

  useEffect(()=>{},[quantity])

  return (
    <div className="count-input" aria-label="Product quantity">
      <button
        type="button"
        className="btn btn-icon"
        aria-label="Decrement quantity"
        disabled={isLoadding || quantity < 1}
        data-decrement="true"
        onClick={() => removeQyt()}
      >
        <FiMinus></FiMinus>
      </button>
      <Form.Control
        type="number"
        placeholder="cantidad"
        readOnly
        value={quantity}
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

export default SerieCounter;
