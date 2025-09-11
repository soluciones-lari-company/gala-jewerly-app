import { ListGroup, ListGroupItem, Table } from "react-bootstrap";
import { SalePaymentDTO } from "../../../api/client/GalaJewerlyClient";
import OrderPayment from "./OrderPayment";

type IOrderPayments = {
  idOrder: string;
  payments: SalePaymentDTO[];
  onPaymentChanges: () => void;
  showControls: boolean;
};

const OrderPayments = ({
  idOrder,
  payments,
  onPaymentChanges,
  showControls,
}: IOrderPayments) => {
  const sumPayments = payments.reduce(
    (accum, item) => accum + (item.total ?? 0),
    0
  );
  return (
    <>
      <ListGroup>
      {payments.map((payment) => {
            return (
              <OrderPayment
                idOrder={idOrder}
                payment={payment}
                onChanges={() => onPaymentChanges()}
                showControls={showControls}
                key={payment.id}
              ></OrderPayment>
            );
          })}
      
      </ListGroup>
    </>
  );
};

export default OrderPayments;
