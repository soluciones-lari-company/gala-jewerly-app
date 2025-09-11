import { useContext } from "react";
import { CheckoutContext } from "../CheckoutContext";
import { Link } from "react-router-dom";
import CheckoutCartDiscount from "../components/CheckoutCartDiscount";
import CheckoutCartLines from "../components/CheckoutCartLines";
import CheckoutCartAddSingleLine from "../components/CheckoutCartAddSingleLine";

const CheckoutViewCart = () => {
  const checkoutContext = useContext(CheckoutContext);

  return (
    <>
      <div className="row gutter-1 align-items-end">
        <div className="col-md-6">
          <h1>Detalle de carrito</h1>
        </div>
      </div>
      <div className="row gutter-1">
        <div className="col">
          <div className="bg-white cart-item-list p-2 p-lg-3 mb-1">
            <div className="row">
              <div className="col-12">
                <h2 className="mb-1 text-uppercase fs-20">
                  Cliente: {checkoutContext?.orderDetails?.customer?.name}
                </h2>
              </div>
            </div>
          </div>
          <CheckoutCartAddSingleLine
            idOrder={checkoutContext?.orderDetails?.id ?? ""}
            onNewLineAdded={() => {
              checkoutContext?.getOrderDetails();
            }}
          ></CheckoutCartAddSingleLine>
          <div className="bg-white cart-item-list p-2 p-lg-3 mb-1">
            <div className="row">
              <div className="col-12">
                <h2 className="mb-1 text-uppercase fs-20">Articulos</h2>
              </div>
              <div className="col-12">
                <CheckoutCartLines
                  idOrder={checkoutContext?.orderDetails?.id ?? ""}
                  lines={checkoutContext?.orderDetails?.lines ?? []}
                  showEditButtons={true}
                  onLineChanges={() => {
                    checkoutContext?.getOrderDetails();
                  }}
                ></CheckoutCartLines>
              </div>
            </div>
          </div>
          <Link to={`/`} className="underlined">
            Continuar comprando
          </Link>
        </div>
        <aside className="col-lg-4">
          <div className="bg-white p-2 p-lg-3">
            <h2 className="mb-3 text-uppercase fs-20">Resumen</h2>
            <CheckoutCartDiscount
              idOrder={checkoutContext?.orderDetails?.id ?? ""}
              onAddDiscount={() => {
                checkoutContext?.getOrderDetails();
              }}
            ></CheckoutCartDiscount>
            <ul className="list-group list-group-minimal mb-3">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Sub total
                <span>${checkoutContext?.orderDetails?.subTotal}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center text-red">
                Descuento
                <span className="text-red">
                  -${checkoutContext?.orderDetails?.discountTotal} (
                  {checkoutContext?.orderDetails?.discountPercentaje}%)
                </span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center text-uppercase font-weight-bold">
                Total a pagar
                <span>${checkoutContext?.orderDetails?.total}</span>
              </li>
            </ul>
            <Link
              to={`/checkout/${checkoutContext?.orderDetails?.id}/payment-terms`}
              className="btn btn-primary btn-block"
            >
              Continuar a detalle de pago
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
};

export default CheckoutViewCart;
