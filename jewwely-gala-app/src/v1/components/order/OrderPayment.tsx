import { Button, ListGroupItem, Spinner } from "react-bootstrap";
import {
  DeletePaymentToSOCommand,
  SalePaymentDTO,
  SalesOrderClient,
} from "../../../api/client/GalaJewerlyClient";
import { useGalaAuth } from "../../contexts/authentication/AuthGalaProvider";
import { CiTrash } from "react-icons/ci";
import { useState } from "react";

type IOrderPayment = {
  idOrder: string;
  payment: SalePaymentDTO;
  onChanges: () => void;
  showControls: boolean;
};

const OrderPayment = ({
  idOrder,
  payment,
  onChanges,
  showControls,
}: IOrderPayment) => {
  const user = useGalaAuth();
  const [isLoadding, setIsLoadding] = useState<boolean>(false);
  const detele = () => {
    setIsLoadding(true);
    const client = new SalesOrderClient(undefined, user?.instance);
    const command = {
      salesOrderId: idOrder,
      paymentId: payment.id,
    } as DeletePaymentToSOCommand;
    client
      .deletePaymentToSO(idOrder, command)
      .then((result) => {
        onChanges();
      })
      .finally(() => setIsLoadding(false));
  };

  return (
    <ListGroupItem className="p-3 fw-normal">
      <div className="d-flex w-100 justify-content-between">
        <h6 className="mb-1">
          {payment.paymentMethod === "01"
            ? " Efectivo"
            : payment.paymentMethod === "03"
            ? " Transferencia"
            : " --------"}
        </h6>
        <small className="">${payment.total}</small>
      </div>
      <p className="mb-1">Cuenta: {payment.account?.name}</p>
      <small className="text-body-tertiary">
        {showControls ? (
          <a
            className=" text-truncate"
            onClick={() => {
              detele();
            }}
          >
            {isLoadding ? "Eliminando" : "Eliminar"}
          </a>
        ) : (
          ""
        )}
      </small>
    </ListGroupItem>
  );
};

export default OrderPayment;
