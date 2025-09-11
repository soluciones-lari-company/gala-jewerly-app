import { SalesOrderDTO } from "../../../api/client/GalaJewerlyClient";

type ICheckoutSummary = {
  cart?: SalesOrderDTO;
};

const CheckoutSummary = ({ cart }: ICheckoutSummary) => {
  return (
    <div className=" w-100">
      <div className="p-3 bg-light bg-opacity-10">
        <h6 className="card-title mb-3">Resumen de compra</h6>
        <div className="d-flex justify-content-between mb-1 small">
          <span>Subtotal</span> <span>${cart?.subTotal}</span>
        </div>
        {/* <div className="d-flex justify-content-between mb-1 small">
                  <span>Shipping</span> <span>$20.00</span>
                </div> */}
        <div className="d-flex justify-content-between mb-1 small">
          <span>Coupon (Code: {cart?.discountPercentaje})</span>{" "}
          <span className="text-danger">-${cart?.discountTotal}</span>
        </div>
        <hr />
        <div className="d-flex justify-content-between mb-1 small">
          <span>TOTAL</span>{" "}
          <strong className="text-dark">${cart?.total}</strong>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummary;
