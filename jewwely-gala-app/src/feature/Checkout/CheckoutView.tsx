import { Outlet } from "react-router-dom";
import { CheckoutProvider } from "./CheckoutContext";

const CheckoutView = () =>{
    return(
        <CheckoutProvider>
            <Outlet/>
        </CheckoutProvider>
    )
}

export default CheckoutView;