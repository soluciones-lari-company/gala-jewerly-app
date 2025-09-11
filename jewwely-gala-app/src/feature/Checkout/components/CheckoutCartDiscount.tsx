import { useContext, useState } from "react";
import {
  SalesOrderClient,
  SetDiscountToSaleOrderCommand,
} from "../../../api/client/GalaJewerlyClient";
import { UserContext } from "../../../contexts/UserContext";
import { Form } from "react-bootstrap";

type ICheckoutCartDiscountProps = {
  idOrder: string;
  onAddDiscount: () => void;
};

const CheckoutCartDiscount = ({
  idOrder,
  onAddDiscount,
}: ICheckoutCartDiscountProps) => {
  // contex
  const authContext = useContext(UserContext);
  // component variables
  const [_discount, _setDiscount] = useState<number>(0);
  const [ isLoadding, setIsLoadding] = useState<boolean>(false)
  // functions component
  const _applyDiscount = () => {
    setIsLoadding(true)
    const client = new SalesOrderClient(undefined, authContext?.instance);
    const command = {
      salesOrderId: idOrder,
      discountPercentaje: _discount,
    } as SetDiscountToSaleOrderCommand;
    client.setDiscountToSaleOrder(idOrder, command).then((result) => {
      onAddDiscount();
    }).finally(() =>{
      setIsLoadding(false)
    });
  };

  return (
    <div className="input-combined mb-2">
      <Form.Control
        aria-label="Default"
        aria-describedby="inputGroup-sizing-default"
        type="number"
        className="form-control"
        placeholder="Decuento %"
        value={_discount}
        onChange={(e) => _setDiscount(parseInt(e.target.value))}
      />
      <button
        className="btn btn-white"
        type="button"
        id="button-addon2"
        onClick={() => _applyDiscount()}
        disabled={isLoadding}
      >
        {isLoadding ? "Aplicando..." : "Aplicar"}
      </button>
      <span className="input-combined_indicator"></span>
    </div>
  );
};

export default CheckoutCartDiscount;
