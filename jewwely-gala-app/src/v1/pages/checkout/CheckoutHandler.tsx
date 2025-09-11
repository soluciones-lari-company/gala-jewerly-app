import { Outlet } from "react-router-dom";
import CartProvider from "../../contexts/cart/CartProvider";

const CheckoutHandler = () =>{
    return (
        <CartProvider>
            <Outlet />
        </CartProvider>
    )
}

export default CheckoutHandler;
