import { Button, Modal } from "react-bootstrap";
import {
  AddPaymentToSOCommand,
  SalePaymentDTO,
  SalesOrderClient,
} from "../../../api/client/GalaJewerlyClient";
import { useContext, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import CheckoutCartPaymentCreate from "./CheckoutCartPaymentCreate";
import CheckoutCartPaymentListLine from "./CheckoutCartPaymentListLine";

type ICheckoutCartPaymentListProps = {
  idOrder: string;
  totalOrder: number;
  payments: SalePaymentDTO[];
  onListChanges: () => void;
  showEditButtons: boolean;
};

const CheckoutCartPaymentList = ({
  idOrder,
  totalOrder,
  payments,
  onListChanges,
  showEditButtons,
}: ICheckoutCartPaymentListProps) => {
  // contexts
  const userContext = useContext(UserContext);
  // query params from url
  // variables
  const [showNewPaymentModal, setShowNewPaymentModal] = useState(false);
  const [isLoadding, setIsLoadding] = useState<boolean>(false);
  // functions
  const sumPayments = payments.reduce(
    (accum, item) => accum + (item.total ?? 0),
    0
  );
  return (
    <>
      <div className="row align-items-center">
        <div className="col-md-6">
          <h2 className="mb-1 text-uppercase fs-20">Pagos(uso interno)</h2>
        </div>
        <div className="col-md-6 text-md-right">
          {showEditButtons ? (
            <a
              href="#"
              className="underline"
              onClick={() => setShowNewPaymentModal(true)}
            >
              Nuevo
            </a>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="col-12">
        <table className="table table-sm">
          <tbody>
            {payments.map((payment) => (
              <CheckoutCartPaymentListLine
                idOrder={idOrder}
                payment={payment}
                showEditButtons={showEditButtons}
                key={payment.id}
                onDelete={onListChanges}
              ></CheckoutCartPaymentListLine>
            ))}
          </tbody>

          <tfoot className="table-light">
            <tr>
              <td>Total</td>
              <td style={{ width: "100px" }}>$ {sumPayments}</td>
              <td style={{ width: "30px" }}></td>
            </tr>
          </tfoot>
        </table>
      </div>
      <CheckoutCartPaymentCreate
        idOrder={idOrder}
        pendingToPay={totalOrder - sumPayments}
        show={showNewPaymentModal}
        onPaymentAdded={onListChanges}
        onClose={() => setShowNewPaymentModal(false)}
      ></CheckoutCartPaymentCreate>
    </>
  );
};

export default CheckoutCartPaymentList;
