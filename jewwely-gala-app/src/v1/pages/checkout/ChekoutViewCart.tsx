import { Link, useNavigate } from "react-router-dom";
import OrderAddLine from "../../components/order/OrderAddLine";
import OrderLines from "../../components/order/OrderLines";
import { useGalaCart } from "../../contexts/cart/CartProvider";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useEffect } from "react";
import Breadcums from "../../components/shared/Breadcums";
import OrderSummary from "../../components/order/OrderSummary";
import OrderSetDiscount from "../../components/order/OrderSetDiscount";
import OrderLineItemSelector from "../../components/order/OrderLineItemSelector";
import OrderCustomerInfo from "../../components/order/OrderCustomerInfo";

const CheckoutViewCart = () => {
  const cart = useGalaCart();
  const navigate = useNavigate();

  useEffect(() => {
    cart?.handleEnableDiscountControl(true);
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
        <h1 className="h3 mb-4">Carrito de venta</h1>
        <div className="row">
          <div className="col-lg-8">
            <OrderCustomerInfo
              customer={cart?.cart?.customer}
            ></OrderCustomerInfo>
            <OrderLineItemSelector
              idOrder={cart?.cartIdSelected ?? ""}
              onChanges={() => cart?.getOrderDetails()}
              order={cart?.cart}
            ></OrderLineItemSelector>
            <OrderLines
              idOrder={cart?.cartIdSelected ?? ""}
              lines={cart?.cart?.lines ?? []}
              onChangesInLines={() => cart?.getOrderDetails()}
              key={cart?.cart?.id}
              showControls={true}
            ></OrderLines>
            <div className="row mt-3 mb-3">
              <div className="col-12 d-flex flex-row-reverse ">
                {cart?.cart != undefined &&
                (cart.cart?.lines?.length ?? 0) > 0 ? (
                  <Link
                    to={`/cart/${cart?.cartIdSelected}/payment-terms`}
                    className="btn btn-primary"
                  >
                    Continuar a pago <AiOutlineArrowRight />{" "}
                  </Link>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="sticky-top">
              <div className="bg-body-tertiary rounded-5 p-4 mb-3">
                <OrderSummary
                  order={cart?.cart}
                  enableDiscountControl={cart?.enableDiscountControl ?? false}
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

export default CheckoutViewCart;
