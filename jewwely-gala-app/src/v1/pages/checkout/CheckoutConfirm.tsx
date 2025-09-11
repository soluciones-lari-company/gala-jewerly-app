import { Link, useNavigate } from "react-router-dom";
import OrderCustomerInfo from "../../components/order/OrderCustomerInfo";
import OrderLines from "../../components/order/OrderLines";
import OrderPayments from "../../components/order/OrderPayments";
import OrderPaymentTerms from "../../components/order/OrderPaymentTerms";
import { useGalaCart } from "../../contexts/cart/CartProvider";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { Button, Spinner } from "react-bootstrap";
import {
  ConfirmSaleOrderCommand,
  SalesOrderClient,
} from "../../../api/client/GalaJewerlyClient";
import { useGalaAuth } from "../../contexts/authentication/AuthGalaProvider";
import { useEffect, useState } from "react";
import Breadcums from "../../components/shared/Breadcums";
import OrderSummary from "../../components/order/OrderSummary";
import OrderSetDiscount from "../../components/order/OrderSetDiscount";

const CheckoutConfirm = () => {
  const cart = useGalaCart();
  const user = useGalaAuth();
  const navigate = useNavigate();

  const [isLoadding, setIsLoadding] = useState<boolean>(false);
  const confirm = () => {
    setIsLoadding(true);
    const client = new SalesOrderClient(undefined, user?.instance);
    const command = {
      salesOrderId: cart?.cart?.id,
    } as ConfirmSaleOrderCommand;
    client
      .confirmSaleOrder(cart?.cart?.id ?? "", command)
      .then((result) => {
        cart?.getOrderDetails()
        navigate(`/cart/${cart?.cartIdSelected}/submited`, { replace: true });
      })
      .finally(() => setIsLoadding(false));
  };

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
            <OrderCustomerInfo
              customer={cart?.cart?.customer}
            ></OrderCustomerInfo>
            <OrderLines
              idOrder={cart?.cartIdSelected ?? ""}
              lines={cart?.cart?.lines ?? []}
              onChangesInLines={() => cart?.getOrderDetails()}
              key={cart?.cart?.id}
              showControls={false}
            ></OrderLines>
            <OrderPaymentTerms
              paymentTerms={cart?.cart?.paymentTerms ?? ""}
              paymentConditions={cart?.cart?.paymentConditions ?? ""}
            ></OrderPaymentTerms>
            <OrderPayments
              idOrder={cart?.cart?.id ?? ""}
              payments={cart?.cart?.payments ?? []}
              onPaymentChanges={() => cart?.getOrderDetails()}
              showControls={false}
            ></OrderPayments>
            
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
                <Button className={`btn btn-primary`} onClick={() => confirm()}>
                  {isLoadding ? (
                    <Spinner
                      animation="border"
                      size="sm"
                      role="status"
                      className=""
                    ></Spinner>
                  ) : (
                    "Confirmar orden"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CheckoutConfirm;
