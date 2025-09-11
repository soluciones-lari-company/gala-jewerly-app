import { SaleOrderLineDTO } from "../../../api/client/GalaJewerlyClient";
import OrderLineQtyReducers from "./OrderLineQtyReducers";
import { useEffect } from "react";

type IOrderLine = {
  idOrder: string;
  line: SaleOrderLineDTO;
  onChangeLine: () => void;
  showControls: boolean;
};

const OrderLine = ({
  idOrder,
  line,
  onChangeLine,
  showControls,
}: IOrderLine) => {
  useEffect(() => {}, [line]);

  return (
    <tr>
      <td className="py-1 ps-0">
        <div className="d-flex align-items-center">
          <a
            className="position-relative flex-shrink-0"
            style={{ width: "80px" }}
            href="/shop/electronics/product"
          >
            <img
              alt="Smart Watch Series 7"
              loading="lazy"
              width="220"
              height="220"
              decoding="async"
              data-nimg="1"
              style={{ color: "transparent" }}
              src="https://cartzilla-react.createx.studio/_next/image?url=%2Fimg%2Fshop%2Felectronics%2Fthumbs%2F01.png&w=256&q=75"
            />
          </a>
          <div className="w-100 min-w-0 ps-2 ps-xl-3">
            <h5 className="d-flex animate-underline mb-2">
              <a
                className="d-block fs-sm fw-medium text-truncate animate-target"
                href="#"
                style={{ textWrap: "wrap" }}
              >
                {line.descripcion}
              </a>
            </h5>
            <ul className="list-unstyled gap-1 fs-xs mb-0">
              {/* <li>
                <span className="text-body-secondary">Color:</span>
                <span className="text-dark-emphasis fw-medium">White</span>
              </li> */}
              <li>
                <span className="text-body-secondary">Serie:</span>
                <span className="text-dark-emphasis fw-medium">
                  <b>{line.serieCode}</b>
                </span>
              </li>
              <li className="d-xl-none">
                <span className="text-body-secondary">Precio:</span>
                <span className="text-dark-emphasis fw-medium">
                  <b>${line.unitPrice}</b>
                </span>
              </li>
              {!showControls ? (
                <li className="d-xl-none">
                  <span className="text-body-secondary">Cantidad:</span>
                  <span className="text-dark-emphasis fw-medium">
                    {line.quantity}
                  </span>
                </li>
              ) : (
                ""
              )}
            </ul>
            <div className="d-md-none mt-3">
              {showControls ? (
                <OrderLineQtyReducers
                  idOrder={idOrder}
                  idLine={line.itemSerieId ?? ""}
                  itemNumber={line.serieCode ?? ""}
                  lineQuantity={line.quantity ?? 0}
                  onChangeQty={() => onChangeLine()}
                ></OrderLineQtyReducers>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </td>
      <td className="h6 py-3 d-none d-xl-table-cell">${line.unitPrice} </td>
      <td className="py-3 d-none d-md-table-cell">
        {showControls ? (
          <OrderLineQtyReducers
            idOrder={idOrder}
            idLine={line.itemSerieId ?? ""}
            itemNumber={line.serieCode ?? ""}
            lineQuantity={line.quantity ?? 0}
            onChangeQty={() => onChangeLine()}
          ></OrderLineQtyReducers>
        ) : (
          line.quantity
        )}
      </td>
      <td className="h6 py-3 d-none d-md-table-cell">${line.total}</td>
      <td className="text-end py-3 px-0">
        {/* <button
          type="button"
          className="btn-close fs-sm"
          aria-label="Close"
        ></button> */}
      </td>
    </tr>
  );
};

export default OrderLine;
