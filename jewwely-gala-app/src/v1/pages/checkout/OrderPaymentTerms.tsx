import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useGalaCart } from "../../contexts/cart/CartProvider";
import OrderPaymentTerms from "../../components/order/OrderPaymentTerms";
import { useEffect, useState } from "react";
import OrderPaymentTermsEdit from "../../components/order/IOrderPaymentTermsEdit";
import OrderSummary from "../../components/order/OrderSummary";
import Breadcums from "../../components/shared/Breadcums";
import OrderSetDiscount from "../../components/order/OrderSetDiscount";

const CheckoutPaymentTerms = () => {
  const [enableEditMode, setEnableEditMode] = useState<boolean>(false);
  const navigate = useNavigate();
  const cart = useGalaCart();

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
          <div className="col-lg-8">
            <OrderPaymentTermsEdit
              idOrder={cart?.cartIdSelected ?? ""}
              payments={cart?.cart?.payments ?? []}
              paymentTerms={cart?.cart?.paymentTerms ?? ""}
              paymentConditions={cart?.cart?.paymentConditions ?? ""}
              onChanges={() => {
                cart?.getOrderDetails();
                setEnableEditMode(false);
                navigate(`/cart/${cart?.cartIdSelected}/payment-list`, { replace: false });
              }}
            ></OrderPaymentTermsEdit>
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
          </div>
        </div>
      </section>
    </>
  );
};

export default CheckoutPaymentTerms;
