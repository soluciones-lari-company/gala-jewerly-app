import { Link, useNavigate } from "react-router-dom";
import Breadcums from "../../components/shared/Breadcums";
import { useGalaCart } from "../../contexts/cart/CartProvider";
import { useEffect } from "react";

import { CustomerDTO } from "../../../api/client/GalaJewerlyClient";
import { useGalaAuth } from "../../contexts/authentication/AuthGalaProvider";
import CustomerInformation from "../../components/checkout/CustomerInformation";
import CheckoutSummary from "../../components/checkout/CheckoutSummary";
import PaymentCreateForOrder from "../../components/checkout/PaymentCreateForOrder";
import PaymentListFromOrder from "../../components/checkout/PaymentListFromOrder";

const Step3AddPayments = () => {
  const cart = useGalaCart();
  const user = useGalaAuth();

  const navigate = useNavigate();

  const next = () => {
    navigate(`/cart/${cart?.cart?.id}/Step4Confirm`, { replace: false });
  };

  useEffect(() => {
    if (cart?.cartIdSelected != "") {
      if (cart?.cart != undefined) {
        if (
          cart?.cart.confirmedAt != undefined &&
          cart?.cart.canceledAt === undefined
        ) {
          navigate(`/cart/${cart?.cartIdSelected}/Step5OrderSubmitted`, { replace: true });
        }
      }
    }
  }, [cart?.cart]);
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
        <h1 className="h3 mb-4">Pagos</h1>
        <div className="row">
          <div className="col-lg-8">
            <div className="card position-sticky top-0 mb-1">
              <div className="p-3 bg-light bg-opacity-10">
                <h6 className="card-title mb-3">Termino de pago:</h6>
                <span className="mb-1 small">
                  {cart?.cart?.paymentTerms === "PUE"
                    ? "Pago unico(PUE)"
                    : `Pago en parcialidades(PPD) con condiciones de pago: ${cart?.cart?.paymentConditions}`}
                </span>
              </div>
            </div>
            <PaymentListFromOrder
              payments={cart?.cart?.payments ?? []}
              idOrder={cart?.cart?.id ?? ""}
              onPaymentsChanges={() => cart?.getOrderDetails()}
              showBtn={true}
            ></PaymentListFromOrder>
          </div>
          <div className="col-lg-4">
            <PaymentCreateForOrder
              idOrder={cart?.cart?.id ?? ""}
              onChanges={() => cart?.getOrderDetails()}
            ></PaymentCreateForOrder>
            <CustomerInformation
              customer={cart?.cart?.customer ?? new CustomerDTO()}
            />
            <CheckoutSummary cart={cart?.cart}></CheckoutSummary>
            <button
              className="btn btn-primary w-100 mt-2"
              disabled={false}
              onClick={() => next()}
            >
              Continuar a revision
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Step3AddPayments;
