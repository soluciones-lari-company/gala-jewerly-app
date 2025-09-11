import { useContext, useEffect, useState } from "react";
import {
  SalesOrderClient,
  SalesOrderDTO,
  SetDiscountToSaleOrderCommand,
} from "../../api/client/GalaJewerlyClient";
import { UserContext } from "../../contexts/UserContext";
import { CartsContext } from "../../contexts/CartContext";
import { Link } from "react-router-dom";
import CartDetailsLine from "./CartDetailsLine";

const CartDetails = () => {
  const authContext = useContext(UserContext);
  const cartsContext = useContext(CartsContext);
  const [orderDetails, setOrderDetails] = useState<SalesOrderDTO | null>(null);
  const [_discount, _setDiscount] = useState<number>(0);

  const _getOrderDetails = () => {
    const client = new SalesOrderClient(undefined, authContext?.instance);
    client
      .getSalesOrderById(cartsContext?.cartSelected ?? "")
      .then((result) => {
        setOrderDetails(result);
      });
  };

  const _applyDiscount = () => {
    const client = new SalesOrderClient(undefined, authContext?.instance);
    const command = {
      salesOrderId: cartsContext?.cartSelected ?? "",
      discountPercentaje: _discount,
    } as SetDiscountToSaleOrderCommand;
    client
      .setDiscountToSaleOrder(cartsContext?.cartSelected ?? "", command)
      .then((result) => {
        _getOrderDetails();
      });
  };

  //   const _deleteLine

  useEffect(() => {
    _getOrderDetails();
    cartsContext?.handeShowCart(false);
  }, [cartsContext?.cartSelected]);

  if (orderDetails == null) {
    return "";
  }

  return (
    <>
      <div className="row gutter-1 align-items-end">
        <div className="col-md-6">
          <h1>Detalle de carrito</h1>
        </div>
      </div>
      <div className="row gutter-1">
        <div className="col">
          <div className="bg-white cart-item-list p-2 p-lg-3 mb-1">
            <div className="row">
              <div className="col-12">
                <h5 className="eyebrow text-muted">Cliente</h5>
                <p className="card-text">{orderDetails.customer?.name}</p>
              </div>
            </div>
          </div>
          <div className="bg-white cart-item-list p-2 p-lg-3 mb-1">
            <div className="row">
              <div className="col-12">
                <h2 className="mb-1 text-uppercase fs-20">Articulos</h2>
              </div>
              <div className="col-12">
                <div className="cart-item-list">
                  {orderDetails.lines?.map((order) => {
                    return (
                      <CartDetailsLine
                        key={order.id}
                        idOrder={orderDetails.id ?? ""}
                        line={order}
                        onDeleteLine={() => {
                            _getOrderDetails();
                        }}
                      ></CartDetailsLine>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <Link to={""} className="underlined">
            Continuar comprando
          </Link>
        </div>
        <aside className="col-lg-4">
          <div className="bg-white p-2 p-lg-3">
            <h2 className="mb-3 text-uppercase fs-20">Resumen</h2>
            <div className="input-combined mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Decuento %"
                aria-label="Decuento %"
                aria-describedby="button-addon2"
                value={_discount}
                onChange={(e) => _setDiscount(parseInt(e.target.value))}
              />
              <button
                className="btn btn-white"
                type="button"
                id="button-addon2"
                onClick={() => _applyDiscount()}
              >
                Aplicar
              </button>
              <span className="input-combined_indicator"></span>
            </div>
            <ul className="list-group list-group-minimal mb-3">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Sub total
                <span>${orderDetails.subTotal}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center text-red">
                Descuento
                <span className="text-red">
                  -${orderDetails.discountTotal} (
                  {orderDetails.discountPercentaje}%)
                </span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center text-uppercase font-weight-bold">
                Total a pagar
                <span>${orderDetails.total}</span>
              </li>
            </ul>
            <Link to={""} className="btn btn-primary btn-block">
              Checkout
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
};

export default CartDetails;
