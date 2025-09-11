import CheckoutSummary from "../../components/checkout/CheckoutSummary";
import { useNavigate } from "react-router-dom";
import { useGalaCart } from "../../contexts/cart/CartProvider";
import { useEffect } from "react";

import { useGalaAuth } from "../../contexts/authentication/AuthGalaProvider";
import CustomerInformation from "../../components/checkout/CustomerInformation";
import { CustomerDTO } from "../../../api/client/GalaJewerlyClient";

const Step5OrderSubmitted = () => {
  const cart = useGalaCart();
  const user = useGalaAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (cart?.cartIdSelected != "") {
      if (cart?.cart != undefined) {
      }
    }
  }, [cart?.cart]);
  return (
    <>
      <div
        className="position-relative overflow-hidden rounded-5 p-4 p-sm-5"
        style={{
          backgroundColor: "var(--cz-success-border-subtle);",
        }}
      >
        <div
          className="position-relative z-2 text-center py-4 py-md-5 my-md-2 my-lg-5 mx-auto"
          style={{
            maxWidth: "536px",
          }}
        >
          <h1 className="pt-xl-4 mb-4">Gracias por tu orden!</h1>
          <p className="text-dark-emphasis pb-3 pb-sm-4">
            Joyeria Gala agradece tu nueva venta
             {/* <span className="fw-semibold">#234000</span> */}
             <br />
            orden de venta cofirmada{" "}
            <span className="fw-semibold">
              {cart?.cart?.confirmedAt?.format('MMMM Do YYYY, h:mm:ss a')}
            </span>
          </p>
           <CustomerInformation
              customer={cart?.cart?.customer ?? new CustomerDTO()}
            />
          <CheckoutSummary cart={cart?.cart}></CheckoutSummary>
          <a
            className="btn btn-lg btn-dark rounded-pill mb-xl-4 mt-5"
            href="/shop/grocery"
          >
            Continuar vendiendo
          </a>
        </div>
      </div>
    </>
  );
};

export default Step5OrderSubmitted;
