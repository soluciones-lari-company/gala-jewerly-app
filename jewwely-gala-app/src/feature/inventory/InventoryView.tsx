import { useEffect } from "react";
import { Outlet } from "react-router-dom";


const InventoryView = () => {

  useEffect(() => {

  }, []);

  return (
    <>
      <h3>Inventario</h3>
      <hr />
      <Outlet></Outlet>
    </>
  );
};

export default InventoryView;
