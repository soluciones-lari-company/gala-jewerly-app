import { Button, Form, InputGroup } from "react-bootstrap";
import { useState } from "react";
import { useGalaAuth } from "../../contexts/authentication/AuthGalaProvider";
import {
  SalesOrderClient,
  SetDiscountToSaleOrderCommand,
} from "../../../api/client/GalaJewerlyClient";

type IOrderSetDiscount = {
  idOrder: string;
  onUpdatedDiscount: () => void;
};

const OrderSetDiscount = ({
  idOrder,
  onUpdatedDiscount,
}: IOrderSetDiscount) => {
  // contex
  const user = useGalaAuth();
  // component variables
  const [_discount, _setDiscount] = useState<number>(0);
  const [isLoadding, setIsLoadding] = useState<boolean>(false);
  // functions component
  const _applyDiscount = () => {
    setIsLoadding(true);
    const client = new SalesOrderClient(undefined, user?.instance);
    const command = {
      salesOrderId: idOrder,
      discountPercentaje: _discount,
    } as SetDiscountToSaleOrderCommand;
    client
      .setDiscountToSaleOrder(idOrder, command)
      .then((result) => {
        onUpdatedDiscount();
      })
      .finally(() => {
        setIsLoadding(false);
      });
  };
  return (
    <div className="discount-code">
      <InputGroup className="pb-3">
        <Form.Control
          type="number"
          placeholder="Decuento %"
          value={_discount}
          onChange={(e) => _setDiscount(parseInt(e.target.value))}
        />
        <Button onClick={() => _applyDiscount()} disabled={isLoadding} variant="primary">
          {isLoadding ? "Aplicando..." : "Aplicar"}
        </Button>
      </InputGroup>
    </div>
  );
};

export default OrderSetDiscount;
