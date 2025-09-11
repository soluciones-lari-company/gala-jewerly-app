import React from "react";
import { Outlet } from "react-router-dom";


const InventoryView = () => {
  return (
    <React.StrictMode><Outlet></Outlet></React.StrictMode>
  );
};

export default InventoryView;
