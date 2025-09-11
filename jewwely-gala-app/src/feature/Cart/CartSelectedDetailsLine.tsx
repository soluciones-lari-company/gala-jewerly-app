import { useEffect } from "react";
import { SaleOrderLineDTO } from "../../api/client/GalaJewerlyClient";

type CartSelectedDetailsLineProps = {
  line: SaleOrderLineDTO;
};

const CartSelectedDetailsLine = ({ line }: CartSelectedDetailsLineProps) => {
  useEffect(() => {}, [line]);
  return (
    <div className="col-12 border-bottom mt-2">
      <div className="cart-item">
        <a href="#!" className="cart-item-image">
          <img
            src="https://www.joyeriasbizzarro.com/media/catalog/product/p/a/pat110-a_1.jpg?quality=80&bg-color=0,0,0&fit=bounds&height=&width=&canvas=:"
            alt="Image"
          />
        </a>
        <div className="cart-item-body">
          <div className="row">
            <div className="col-9">
              <h6 className="cart-item-title">{line.serieCode}-{line.descripcion}</h6>
              {/* <small></small> */}
              <ul className="list list--horizontal fs-14">
                <li>
                  Cant: {line.quantity} / ${line.unitPrice}
                </li>
                <li className="text-red">Total: ${line.total}</li>
              </ul>
            </div>
            <div className="col-3 text-right">
              <ul className="cart-item-options">
                <li>
                  {/* <BsXLg /> */}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSelectedDetailsLine;
