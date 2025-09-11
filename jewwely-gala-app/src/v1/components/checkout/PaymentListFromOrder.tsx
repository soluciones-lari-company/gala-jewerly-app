import { Table } from "react-bootstrap";
import { SalePaymentDTO } from "../../../api/client/GalaJewerlyClient";
import PaymentDeleteFromOrder from "./PaymentDeleteFromOrder";

type IPaymentListFromOrder = {
  payments: SalePaymentDTO[];
  idOrder: string;
  onPaymentsChanges: () => void;
  showBtn: boolean;
};

const PaymentListFromOrder = ({
  payments,
  idOrder,
  onPaymentsChanges,
  showBtn,
}: IPaymentListFromOrder) => {
  return (
    <>
      <div className="card position-sticky top-0 mb-1">
        <div className="p-3 bg-light bg-opacity-10">
          <h6 className="card-title mb-3">Referencias de pago</h6>
          <Table>
            <thead>
              <tr className="bg-secondary-subtle">
                <th scope="col" className="fs-sm fw-normal py-3 ps-0">
                  <span className="text-body">Metodo de pago</span>
                </th>
                <th
                  scope="col"
                  className="text-body fs-sm fw-normal py-3 d-none d-xl-table-cell"
                >
                  <span className="text-body">Cuenta</span>
                </th>
                <th scope="col" className="fs-sm fw-normal py-3 ps-0">
                  <span className="text-body">Importe</span>
                </th>
                <th scope="col" className="py-0 px-0"></th>
              </tr>
            </thead>
            <tbody className="align-middle">
              {payments.map((payment) => {
                return (
                  <tr>
                    <td scope="col" className="fs-sm fw-normal py-3 ps-0">
                      <span className="text-body">
                        {payment.paymentMethod === "01"
                          ? " Efectivo"
                          : payment.paymentMethod === "03"
                          ? " Transferencia"
                          : " --------"}
                      </span>
                      <ul className="list-unstyled gap-1 fs-xs mb-0">
                        <li className="d-xl-none">
                          <span className="text-body-secondary">Cuenta:</span>
                          <span className="text-dark-emphasis fw-medium">
                            <b>{payment.account?.name}</b>
                          </span>
                        </li>
                      </ul>
                    </td>
                    <td
                      scope="col"
                      className="text-body fs-sm fw-normal py-3 d-none d-xl-table-cell"
                    >
                      <span className="text-body">{payment.account?.name}</span>
                    </td>
                    <td scope="col" className="fs-sm fw-normal py-3 ps-0">
                      <span className="text-body">${payment.total}</span>
                    </td>
                    <td scope="col" className="py-0 px-0">
                      {showBtn === true ? (
                        <PaymentDeleteFromOrder
                          idOrder={idOrder ?? ""}
                          idPayment={payment.id ?? ""}
                          onDeleted={() => onPaymentsChanges()}
                        ></PaymentDeleteFromOrder>
                      ): ""}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default PaymentListFromOrder;
