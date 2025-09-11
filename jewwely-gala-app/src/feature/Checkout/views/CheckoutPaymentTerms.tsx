import { useContext } from "react";
import { CheckoutContext } from "../CheckoutContext";
import { Link } from "react-router-dom";
import CheckoutCartPaymentTerms from "../components/CheckoutCartPaymentTerms";
import CheckoutCartPaymentList from "../components/CheckoutCartPaymentList";

const CheckoutPaymentTerms = () => {
  // contexts
  const checkoutContext = useContext(CheckoutContext);
  // query params from url
  //context variables
  // functions
  return (
    <>
      <div className="row gutter-1 align-items-end">
        <div className="col-md-6">
          <h1>Detalle de pago</h1>
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
          <div className="bg-white cart-item-list p-2 p-lg-3 mb-1">
            <CheckoutCartPaymentTerms
              idOrder={checkoutContext?.orderDetails?.id ?? ""}
              showEditButtons={true}
              defaultPaymentTerms={
                checkoutContext?.orderDetails?.paymentTerms ?? ""
              }
              defaultPaymentConditions={
                checkoutContext?.orderDetails?.paymentConditions ?? ""
              }
              onChangeTems={() => {
                checkoutContext?.getOrderDetails();
              }}
            ></CheckoutCartPaymentTerms>
          </div>
          <div className="bg-white cart-item-list p-2 p-lg-3 mb-1">
            <CheckoutCartPaymentList
                showEditButtons={true}
                idOrder={checkoutContext?.orderDetails?.id ?? ""}
                totalOrder={checkoutContext?.orderDetails?.total??0}
                payments={checkoutContext?.orderDetails?.payments ?? []}
                onListChanges={() => {
                  checkoutContext?.getOrderDetails();
                }}
              ></CheckoutCartPaymentList>
          </div>
          <Link
            to={`/checkout/${checkoutContext?.orderDetails?.id}/details`}
            className="underlined"
          >
            regresar a detalle
          </Link>
        </div>
        <aside className="col-lg-4">
          <div className="bg-white p-2 p-lg-3">
            <h2 className="mb-3 text-uppercase fs-20">Resumen</h2>
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
              to={`/checkout/${checkoutContext?.orderDetails?.id}/confirm-order`}
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

export default CheckoutPaymentTerms;
