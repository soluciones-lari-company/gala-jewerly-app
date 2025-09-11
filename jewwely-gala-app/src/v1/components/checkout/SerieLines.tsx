import { Table } from "react-bootstrap";
import { SaleOrderLineDTO } from "../../../api/client/GalaJewerlyClient";
import OrderLineQtyReducers from "../order/OrderLineQtyReducers";
import SerieCounter from "./SerieCounter";

type ISerieLines = {
  idOrder: string;
  showBtn: boolean;
  lines: SaleOrderLineDTO[];
  onChanges: () => void;
};

const SerieLines = ({ idOrder, showBtn, lines, onChanges }: ISerieLines) => {
  return (
    <Table>
      <thead>
        <tr>
          <th scope="col" className="fs-sm fw-normal py-3 ps-0">
            <span className="text-body">Producto</span>
          </th>
          <th
            scope="col"
            className="text-body fs-sm fw-normal py-3 d-none d-xl-table-cell"
          >
            <span className="text-body">Precio</span>
          </th>
          <th
            scope="col"
            className="text-body fs-sm fw-normal py-3 d-none d-md-table-cell"
          >
            <span className="text-body">Cantidad</span>
          </th>
          <th
            scope="col"
            className="text-body fs-sm fw-normal py-3 d-none d-md-table-cell"
          >
            <span className="text-body">Total</span>
          </th>
          <th scope="col" className="py-0 px-0"></th>
        </tr>
      </thead>
      <tbody className="align-middle">
        {lines.map((line) => {
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
                      {!showBtn ? (
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
                      {showBtn ? (
                        <OrderLineQtyReducers
                          idOrder={idOrder}
                          idLine={line.itemSerieId ?? ""}
                          itemNumber={line.serieCode ?? ""}
                          lineQuantity={line.quantity ?? 0}
                          onChangeQty={() => onChanges()}
                        ></OrderLineQtyReducers>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </td>
              <td className="h6 py-3 d-none d-xl-table-cell">
                ${line.unitPrice}{" "}
              </td>
              <td className="py-3 d-none d-md-table-cell">
                {showBtn ? (
                  <SerieCounter
                  idOrder={idOrder ?? ""} 
                  serieId={line.itemSerieId ?? ""}
                  quantity={line.quantity ?? 0}
                  onChangeQty={() => onChanges()}

                  ></SerieCounter>
                ) : (
                  line.quantity
                )}
              </td>
              <td className="h6 py-3 d-none d-md-table-cell">${line.total}</td>
              <td className="text-end py-3 px-0">
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default SerieLines;
