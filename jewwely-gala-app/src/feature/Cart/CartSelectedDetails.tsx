import { useContext, useEffect, useState } from "react";
import {
  SalesOrderClient,
  SalesOrderDTO,
} from "../../api/client/GalaJewerlyClient";
import CartSelectedDetailsLine from "./CartSelectedDetailsLine";
import { UserContext } from "../../contexts/UserContext";
import { CartsContext } from "../../contexts/CartContext";
import { Link } from "react-router-dom";

const CartSelectedDetails = () => {
  const authContext = useContext(UserContext);
  const cartsContext = useContext(CartsContext);
  const [orderDetails, setOrderDetails] = useState<SalesOrderDTO | null>(null);

  const _getOrderDetails = () => {
    const client = new SalesOrderClient(undefined, authContext?.instance);
    client.getSalesOrderById(cartsContext?.cartSelected ?? "").then((result) => {
      setOrderDetails(result);
    });
  };

  useEffect(() => {
    _getOrderDetails();
  }, [cartsContext?.cartSelected]);

  if (orderDetails == null) {
    return "";
  }

  return (
    <>
      <div className="col-12 mb-2">
        <h3 className="eyebrow text-dark fs-16 mb-0">
          Carrito: {orderDetails.customer?.name}
        </h3>
      </div>
      <div className="col-12 mb-2">
        <a
          href="#"
          className="underlined"
          onClick={() => cartsContext?.HandleCartSelected("")}
        >
          Cambiar carrito
        </a>
      </div>
      {orderDetails.lines?.map((order) => {
        return (
          <CartSelectedDetailsLine
            key={order.id}
            line={order}
          ></CartSelectedDetailsLine>
        );
      })}

      <div className="col-12 mt-3 mb-3">
        <ul className="list-group list-group-minimal">
          <li className="list-group-item d-flex justify-content-between align-items-center text-uppercase font-weight-bold">
            Subtotal
            <span>$ {orderDetails.subTotal}</span>
          </li>
        </ul>
      </div>
      <div className="col-12">
        <Link to={`/checkout/${cartsContext?.cartSelected}/details`} className="btn btn-primary btn-block">Comprar</Link>
      </div>
    </>
  );
};

export default CartSelectedDetails;
