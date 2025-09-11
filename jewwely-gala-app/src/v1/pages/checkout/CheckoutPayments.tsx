import { useEffect, useState } from "react";
import { useGalaCart } from "../../contexts/cart/CartProvider";
import OrderPayments from "../../components/order/OrderPayments";
import OrderPaymentCreate from "../../components/order/OrderPaymentCreate";
import OrderPaymentTerms from "../../components/order/OrderPaymentTerms";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { Alert } from "react-bootstrap";
import { CiWarning } from "react-icons/ci";
import Breadcums from "../../components/shared/Breadcums";
import OrderSummary from "../../components/order/OrderSummary";
import OrderSetDiscount from "../../components/order/OrderSetDiscount";

const CheckoutPayments = () => {
  const cart = useGalaCart();
  const navigate = useNavigate();
  const [showNewPaymentModal, setShowNewPaymentModal] = useState(false);
  const sumPayments = cart?.cart?.payments?.reduce(
    (accum, item) => accum + (item.total ?? 0),
    0
  );

  useEffect(() => {
    cart?.handleEnableDiscountControl(false);
    if (cart?.cartIdSelected != "") {
      if (cart?.cart != undefined) {
        if (
          cart?.cart.confirmedAt != undefined &&
          cart?.cart.canceledAt === undefined
        ) {
          navigate(`/cart/${cart?.cartIdSelected}/submited`, { replace: true });
        }
      }
    }
  }, []);
  return (
    <>
      <Breadcums>
        <ul>
          <li>
            <Link to={"./"}>Inicio</Link>
          </li>
          <li className="active">Lista de carritos</li>
        </ul>
      </Breadcums>
      <section className="pb-5 mb-2 mb-md-3 mb-lg-4 mb-xl-5 container">
        <h1 className="h3 mb-4">Carrito de venta</h1>
        <div className="row">
          <div className="col-lg-8 mb-3">
            <OrderPaymentTerms
              paymentTerms={cart?.cart?.paymentTerms ?? ""}
              paymentConditions={cart?.cart?.paymentConditions ?? ""}
            ></OrderPaymentTerms>
            {(cart?.cart?.total ?? 0) - (sumPayments ?? 0) > 0 &&
            cart?.cart?.paymentTerms === "PUE" ? (
              <Alert key="danger" variant="danger" className="d-flex">
                <CiWarning className="fs-lg pe-1 mt-1 me-2"></CiWarning>
                <div>
                  Para poder continuar es necesario cubrir{" "}
                  <b>${(cart?.cart?.total ?? 0) - (sumPayments ?? 0)}</b>{" "}
                  restantes en pagos
                </div>
              </Alert>
            ) : (
              ""
            )}
            <div className="d-flex align-items-center mb-3">
              <h2
                className="accordion-header h5 mb-0 me-3"
                id="deliveryInfoHeading"
              >
                Pagos
              </h2>
              <div className="ms-auto nav">
                <a
                  data-rr-ui-event-key="./delivery-2"
                  className="text-decoration-underline p-0 nav-link"
                  onClick={() => setShowNewPaymentModal(true)}
                  href="#"
                >
                  Agregar
                </a>
              </div>
            </div>

            <OrderPayments
              idOrder={cart?.cart?.id ?? ""}
              payments={cart?.cart?.payments ?? []}
              onPaymentChanges={() => cart?.getOrderDetails()}
              showControls={true}
            ></OrderPayments>
            <OrderPaymentCreate
              idOrder={cart?.cart?.id ?? ""}
              pendingToPay={(cart?.cart?.total ?? 0) - (sumPayments ?? 0)}
              show={showNewPaymentModal}
              onPaymentAdded={() => cart?.getOrderDetails()}
              onClose={() => setShowNewPaymentModal(false)}
            ></OrderPaymentCreate>
            
          </div>
          <div className="col-lg-4">
            <div className="sticky-top">
              <div className="bg-body-tertiary rounded-5 p-4 mb-3">
                <OrderSummary
                  order={cart?.cart}
                  enableDiscountControl={false}
                  SetDiscount={
                    <OrderSetDiscount
                      idOrder={cart?.cartIdSelected ?? ""}
                      onUpdatedDiscount={() => cart?.getOrderDetails()}
                    />
                  }
                ></OrderSummary>
              </div>
            </div>
            <div className="row mt-3 mb-3">
              <div className="col-12 d-flex justify-content-between">
                <Link
                  to={`/cart/${cart?.cartIdSelected}/payment-terms`}
                  className="btn btn-dark"
                >
                  <AiOutlineArrowLeft />
                  Atras
                </Link>
                <Link
                  to={`/cart/${cart?.cartIdSelected}/confirm`}
                  className={`btn btn-primary ${
                    (cart?.cart?.total ?? 0) - (sumPayments ?? 0) > 0 &&
                    cart?.cart?.paymentTerms === "PUE"
                      ? "disabled"
                      : ""
                  }`}
                >
                  Siguiente <AiOutlineArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CheckoutPayments;
