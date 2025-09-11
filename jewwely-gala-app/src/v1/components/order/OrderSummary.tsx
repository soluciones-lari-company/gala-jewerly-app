import React, { useEffect } from "react";
import { SalesOrderDTO } from "../../../api/client/GalaJewerlyClient";

type IOrderSummary = {
  SetDiscount?: React.ReactNode;
  order?: SalesOrderDTO;
  enableDiscountControl: boolean
};

const OrderSummary = ({ SetDiscount, order, enableDiscountControl }: IOrderSummary) => {

  useEffect(()=>{},[order, enableDiscountControl])
  
  if (order === undefined || order === null) {
    return "Cargando resumen de orden"
  }


  return (
    <div className="p-sm-2 p-lg-0 p-xl-2">
      {
        enableDiscountControl && SetDiscount ? <div className="your-order-product-info">{SetDiscount}</div> : ("")
      }
      <h5 className="border-bottom pb-4 mb-4">Resumen de orden</h5>
      <ul className="list-unstyled fs-sm gap-3 mb-0">
        <li className="d-flex justify-content-between">
          Subtotal:<span className="text-dark-emphasis fw-medium ms-1">${order.subTotal}</span>
        </li>
        <li className="d-flex justify-content-between">
          Taller:<span className="text-dark-emphasis fw-medium ms-1">${order.workshopCost}</span>
        </li>
        <li className="d-flex justify-content-between">
          Descuento ({order.discountPercentaje}%):<span className="text-danger fw-medium ms-1">-${order.discountTotal}</span>
        </li>
      </ul>
      <div className="border-top pt-4 mt-4">
        <div className="d-flex justify-content-between mb-3">
          <span className="fs-sm">Estimated total:</span><span className="h5 mb-0">${order.total}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
