import { useContext } from "react";
import { CheckoutContext } from "../CheckoutContext";
import { Link } from "react-router-dom";
import CheckoutCartLines from "../components/CheckoutCartLines";
import CheckoutCartPaymentList from "../components/CheckoutCartPaymentList";
import CheckoutCartPaymentTerms from "../components/CheckoutCartPaymentTerms";
const CheckoutConfirm = () => {
  const checkoutContext = useContext(CheckoutContext);

  const sumPayments = checkoutContext?.orderDetails?.payments?.reduce(
    (accum, item) => accum + (item.total ?? 0),
    0
  );

  return (
    <>
      <div className="row gutter-1 align-items-end">
        <div className="col-md-6">
          <h1>Confirmar orden</h1>
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
            <div className="row">
              <div className="col-12">
                <h2 className="mb-1 text-uppercase fs-20">Articulos</h2>
              </div>
              <div className="col-12">
                <CheckoutCartLines
                  idOrder={checkoutContext?.orderDetails?.id ?? ""}
                  lines={checkoutContext?.orderDetails?.lines ?? []}
                  showEditButtons={false}
                  onLineChanges={() => {
                    checkoutContext?.getOrderDetails();
                  }}
                ></CheckoutCartLines>
              </div>
            </div>
          </div>
          <div className="bg-white cart-item-list p-2 p-lg-3 mb-1">
            <CheckoutCartPaymentTerms
              idOrder={checkoutContext?.orderDetails?.id ?? ""}
              showEditButtons={false}
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
              showEditButtons={false}
              idOrder={checkoutContext?.orderDetails?.id ?? ""}
              totalOrder={checkoutContext?.orderDetails?.total ?? 0}
              payments={checkoutContext?.orderDetails?.payments ?? []}
              onListChanges={() => {
                checkoutContext?.getOrderDetails();
              }}
            ></CheckoutCartPaymentList>
          </div>
          <Link to={`/`} className="underlined">
            Continuar comprando
          </Link>
        </div>
        <aside className="col-lg-4">
          {(checkoutContext?.orderDetails?.paymentTerms ?? "") === "PUE" &&
          (sumPayments ?? 0) < (checkoutContext?.orderDetails?.total ?? 0) ? (
            <div className="alert alert-warning" role="alert">
              <h4 className="alert-heading">Conflicto de pago!</h4>
              <p>
                Estimado usuario esta orden no puede ser completada, la suma
                total de los pagos introducidos no cubre el total de la order a
                confirmar
              </p>
              <hr />
              <p className="mb-0">
                Por favor verifica que los pagos cargados previamente sean
                correctos.{" "}
                <Link
                  to={`/checkout/${checkoutContext?.orderDetails?.id}/payment-terms`}
                  className="underlined"
                >
                  Ver pagos
                </Link>
              </p>
            </div>
          ) : (
            ""
          )}
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
            {(checkoutContext?.orderDetails?.paymentTerms ?? "") === "PUE" &&
            (sumPayments ?? 0) < (checkoutContext?.orderDetails?.total ?? 0) ? (
              ""
            ) : (
              <Link
                to={`/checkout/${checkoutContext?.orderDetails?.id}/payment-terms`}
                className="btn btn-primary btn-block"
              >
                Continuar a detalle de pago
              </Link>
            )}
          </div>
        </aside>
      </div>
    </>
  );
};

export default CheckoutConfirm;
