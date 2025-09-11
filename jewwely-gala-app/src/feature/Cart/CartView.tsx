import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const CartView = () =>{
    const context = useContext(AuthContext)


    useEffect(() =>{
        context?.handleHideCart();
    },[])

  return (
    <React.StrictMode><Outlet></Outlet></React.StrictMode>
  );
}

export default CartView;