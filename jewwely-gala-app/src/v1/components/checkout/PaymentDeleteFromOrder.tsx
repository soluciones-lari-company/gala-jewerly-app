import { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { CiTrash } from "react-icons/ci";
import { useGalaAuth } from "../../contexts/authentication/AuthGalaProvider";
import {
  DeletePaymentToSOCommand,
  SalesOrderClient,
} from "../../../api/client/GalaJewerlyClient";

type IPaymentDeleteFromOrder = {
  idOrder: string;
  idPayment: string;
  onDeleted: () => void;
};

const PaymentDeleteFromOrder = ({
  idOrder,
  idPayment,
  onDeleted,
}: IPaymentDeleteFromOrder) => {
  const user = useGalaAuth();
  const [isLoadding, setIsLoadding] = useState<boolean>(false);
  const detele = () => {
    setIsLoadding(true);
    const client = new SalesOrderClient(undefined, user?.instance);
    const command = {
      salesOrderId: idOrder,
      paymentId: idPayment,
    } as DeletePaymentToSOCommand;
    client
      .deletePaymentToSO(idOrder, command)
      .then((result) => {
        onDeleted();
      })
      .finally(() => setIsLoadding(false));
  };
  useEffect(() => {}, [idOrder, idPayment]);

  return (
    <Button
      variant="outline-danger"
      className="btn-icon fs-lg"
      aria-label="Notifications"
      onClick={()=>detele()}
    >
      {isLoadding === true ? (
        <Spinner
          animation="border"
          size="sm"
          role="status"
          className=""
        ></Spinner>
      ) : (
        <CiTrash></CiTrash>
      )}
    </Button>
  );
};

export default PaymentDeleteFromOrder;
