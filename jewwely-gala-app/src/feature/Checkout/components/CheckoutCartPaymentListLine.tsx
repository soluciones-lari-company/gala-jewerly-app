import { BsXLg } from "react-icons/bs";
import {
  DeletePaymentToSOCommand,
  SalePaymentDTO,
  SalesOrderClient,
} from "../../../api/client/GalaJewerlyClient";
import { useContext, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";

type ICheckoutCartPaymentListLineProps = {
  idOrder: string;
  payment: SalePaymentDTO;
  onDelete: () => void;
  showEditButtons: boolean;
};

const CheckoutCartPaymentListLine = ({
  idOrder,
  payment,
  onDelete,
  showEditButtons,
}: ICheckoutCartPaymentListLineProps) => {
  // context
  const userContext = useContext(UserContext);

  // variables
  const [isLoadding, setIsLoadding] = useState<boolean>(false);

  // fucntions
  const deletePayment = () => {
    const client = new SalesOrderClient(undefined, userContext?.instance);
    const command = {
      paymentId: payment.id,
      salesOrderId: idOrder,
    } as DeletePaymentToSOCommand;
    client
      .deletePaymentToSO(idOrder, command)
      .then((result) => {
        onDelete();
      })
      .catch((error) => {});
  };

  return (
    <tr>
      <th>
        <h5 className="cart-item-title">{payment.account?.name}</h5>
        <small className="cart-item-subtitle">
          {payment.paymentMethod === "01"
            ? " Efectivo"
            : payment.paymentMethod === "03"
            ? " Transferencia"
            : " --------"}
        </small>
      </th>
      <th style={{ width: "100px" }}>${payment.total}</th>
      <th style={{ width: "30px" }}>
        {showEditButtons ? (
          <button className="btn btn-link" onClick={deletePayment}>
            <BsXLg />
          </button>
        ) : (
          ""
        )}
      </th>
    </tr>
  );
};

export default CheckoutCartPaymentListLine;
