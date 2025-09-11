import { Outlet, useLocation } from "react-router-dom";
import { useGalaCart } from "../../contexts/cart/CartProvider";
import { useEffect } from "react";
import { Placeholder } from "react-bootstrap";

const CheckoutIndex = () => {
  const cart = useGalaCart();
  const location = useLocation();
  useEffect(() => {
    console.log(location.pathname)
  }, [cart?.cart, cart?.enableDiscountControl]);

  if (cart?.cartIdSelected != "") {
    if (cart?.cart === undefined) {
      return (
        <>
          <Placeholder xs={6} />
          <Placeholder className="w-75" />
          <Placeholder style={{ width: '33%' }} />
        </>
      )
    }
  }

  if (cart?.cartIdSelected != "") {
    if (cart?.cart != undefined) {
      if (cart?.cart.confirmedAt != undefined && cart?.cart.canceledAt === undefined) {
          return(<Outlet></Outlet>)
      }
    }
  }


  return (
    <>
      <Outlet></Outlet>
    </>
  );
};

export default CheckoutIndex;
