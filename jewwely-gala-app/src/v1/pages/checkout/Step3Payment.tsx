import { Link, useNavigate } from "react-router-dom";
import Breadcums from "../../components/shared/Breadcums";
import { useGalaCart } from "../../contexts/cart/CartProvider";
import { useEffect, useState } from "react";

import PaymentTermsSelector from "../../components/checkout/PaymentTermsSelector";
import { AddPaymentInfoToSOCommand, CustomerDTO, SalesOrderClient } from "../../../api/client/GalaJewerlyClient";
import { useGalaAuth } from "../../contexts/authentication/AuthGalaProvider";
import CustomerInformation from "../../components/checkout/CustomerInformation";
import CheckoutSummary from "../../components/checkout/CheckoutSummary";

const Step3Payment = () => {
  const cart = useGalaCart();
   const user = useGalaAuth();

  const navigate = useNavigate();

  const [terms, setTerms] = useState<string>("");
  const [conditions, setConditions] = useState<string>("");

  const [isLoadding, setIsLoadding] = useState<boolean>(false);

  const _saveAndContinue = () =>{
        setIsLoadding(true);
        const client = new SalesOrderClient(undefined, user?.instance);
        const command = {
          salesOrderId: cart?.cart?.id,
          paymentTerms: terms,
          paymentConditions: conditions,
        } as AddPaymentInfoToSOCommand;
    
        client
          .addPaymentInfo(cart?.cart?.id ?? "", command)
          .then((result) => {
            navigate(`/cart/${cart?.cart?.id}/Step3AddPayments`, { replace: false });
          })
          .catch((error) => console.log(error))
          .finally(() => setIsLoadding(false));
  }

  useEffect(() => {
    window.scrollTo(0,0)
    if (cart?.cartIdSelected != "") {
      if (cart?.cart != undefined) {
        setTerms(cart?.cart?.paymentTerms ?? "");
        setConditions(cart?.cart?.paymentConditions ?? "");
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
        <h1 className="h3 mb-4">
          Terminos de pago {terms} - {conditions}
        </h1>
        <div className="row">
          <div className="col-lg-8">
            <PaymentTermsSelector
              paymentTerms={cart?.cart?.paymentTerms ?? ""}
              paymentConditions={cart?.cart?.paymentConditions ?? ""}
              onChangeTerms={(_temrs: string) => {setTerms(_temrs)}}
              onChangeConditions={(_conditions: string) => {setConditions(_conditions)}}
            />
          </div>
          <div className="col-lg-4">
            <CustomerInformation customer={cart?.cart?.customer ?? new CustomerDTO()} />
            <CheckoutSummary cart={cart?.cart}></CheckoutSummary>
            <button
                  className="btn btn-primary w-100 mt-2"
                  disabled={
                    (terms != "PPD" && terms != "PUE") ||
                    (terms === "PPD" && conditions === "")
                  }
                  onClick={() => _saveAndContinue()}
                >
                  Continuar a referencias de pago
                </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Step3Payment;
