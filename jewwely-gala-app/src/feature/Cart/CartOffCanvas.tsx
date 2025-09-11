import { useContext, useEffect } from "react";
import { Offcanvas } from "react-bootstrap";
import CartCeroCarts from "./CartCeroCarts";
import CartChooseCart from "./CartChooseCart";
import CartSelectedDetails from "./CartSelectedDetails";
import { CartsContext } from "../../contexts/CartContext";

const CartOffCanvas = ({ ...props }) => {
  const cartsContext = useContext(CartsContext);

  useEffect(() => {}, [cartsContext?.carts]);

  return (
    <Offcanvas {...props} placement="end">
      <Offcanvas.Header closeButton>
        {/* <Offcanvas.Title>Mis Carritos de venta </Offcanvas.Title> */}
      </Offcanvas.Header>
      <Offcanvas.Body>
        {(cartsContext?.carts.length ?? 0) === 0 ? (
          <CartCeroCarts />
        ) : cartsContext?.cartSelected === "" ? (
          <CartChooseCart carts={cartsContext?.carts ?? []}></CartChooseCart>
        ) : (
          <CartSelectedDetails></CartSelectedDetails>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default CartOffCanvas;
