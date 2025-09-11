import { Link, useNavigate } from "react-router-dom";
import Breadcums from "../../components/shared/Breadcums";
import { useGalaCart } from "../../contexts/cart/CartProvider";
import { useEffect } from "react";

import { CustomerDTO } from "../../../api/client/GalaJewerlyClient";
import { useGalaAuth } from "../../contexts/authentication/AuthGalaProvider";
import CustomerInformation from "../../components/checkout/CustomerInformation";
import CheckoutSummary from "../../components/checkout/CheckoutSummary";
import SerieLines from "../../components/checkout/SerieLines";
import OrderSetDiscount from "../../components/order/OrderSetDiscount";
import OrderLineItemSelector from "../../components/order/OrderLineItemSelector";
import OrderLineAddNew from "../../components/order/OrderLineAddNew";
const ViewCart = () => {
  const cart = useGalaCart();
  const user = useGalaAuth();

  const navigate = useNavigate();

  const next = () => {
    navigate(`/cart/${cart?.cart?.id}/Step3Payment`, { replace: false });
  };

  useEffect(() => {
    if (cart?.cartIdSelected != "") {
      if (cart?.cart != undefined) {
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
            <OrderLineAddNew
            idOrder={cart?.cartIdSelected ?? ""}
              onChanges={() => cart?.getOrderDetails()}
              order={cart?.cart}
            ></OrderLineAddNew>
            <div className="card top-0 mb-1">
              <div className="p-3 bg-light bg-opacity-10">
                <h6 className="card-title mb-3">Articulos</h6>
                <SerieLines
                  idOrder={cart?.cart?.id ?? ""}
                  lines={cart?.cart?.lines ?? []}
                  showBtn={true}
                  onChanges={() => cart?.getOrderDetails()}
                ></SerieLines>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <CustomerInformation
              customer={cart?.cart?.customer ?? new CustomerDTO()}
            />
            <div className=" top-0 mb-1">
              <div className="p-3 bg-light bg-opacity-10">
                <h6 className="card-title mb-3">Descuento</h6>
                <OrderSetDiscount
                  idOrder={cart?.cart?.id ?? ""}
                  onUpdatedDiscount={() => cart?.getOrderDetails()}
                ></OrderSetDiscount>
              </div>
            </div>

            <CheckoutSummary cart={cart?.cart}></CheckoutSummary>

            <button
              className="btn btn-primary w-100 mt-2 "
              disabled={false}
              onClick={() => next()}
            >
              Continuar a pago
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ViewCart;
