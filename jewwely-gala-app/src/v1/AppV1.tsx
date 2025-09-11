import "bootstrap/dist/css/bootstrap.css";
import "./styles/theme2.css";
import "./styles/custom.css";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import RoutesGala from "./routes/RoutesGala";

const AppV1: React.FC = () => {
  return (
    <BrowserRouter>
      <RoutesGala></RoutesGala>
    </BrowserRouter>
  );
};

export default AppV1;
