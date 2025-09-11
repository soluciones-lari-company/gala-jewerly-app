import { SaleOrderLineDTO } from "../../../api/client/GalaJewerlyClient";
import CheckoutCartLine from "./CheckoutCartLine";

type ICheckoutCartLinesProps = {
  idOrder: string;
  lines: SaleOrderLineDTO[];
  onLineChanges: () => void;
  showEditButtons: boolean
};

const CheckoutCartLines = ({
  idOrder,
  lines,
  onLineChanges,
  showEditButtons
}: ICheckoutCartLinesProps) => {
  if (lines.length === 0) {
    return (
      <div className="alert alert-warning text-center" role="alert">
        Orden sin articulos
      </div>
    );
  }
  return (
    <div className="cart-item-list">
      {lines.map((order) => {
        return (
          <CheckoutCartLine
            key={order.id}
            idOrder={idOrder}
            line={order}
            onDeleteLine={() => {
              onLineChanges();
            }}
            showEditButtons={showEditButtons}
          ></CheckoutCartLine>
        );
      })}
    </div>
  );
};

export default CheckoutCartLines;
