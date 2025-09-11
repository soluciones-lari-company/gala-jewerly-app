import { Table } from "react-bootstrap";
import { SaleOrderLineDTO } from "../../../api/client/GalaJewerlyClient";
import OrderLine from "./OrderLine";

type IOrderLines = {
  idOrder: string;
  lines: SaleOrderLineDTO[];
  onChangesInLines: () => void;
  showControls: boolean
};

const OrderLines = ({ idOrder, lines, onChangesInLines,  showControls}: IOrderLines) => {
  return (
    <Table >
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
            <OrderLine
              idOrder={idOrder}
              line={line}
              showControls={showControls}
              onChangeLine={() => onChangesInLines()}
              key={line.id}
            ></OrderLine>
          );
        })}
      </tbody>
    </Table>
  );
};

export default OrderLines;
