import { ListGroup } from "react-bootstrap";
import { SalesOrderDTO } from "../../api/client/GalaJewerlyClient";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { CartsContext } from "../../contexts/CartContext";

type CartChooseCartProps = {
  carts: SalesOrderDTO[];
};

const CartChooseCart = ({ carts }: CartChooseCartProps) => {
    const cartContext = useContext(CartsContext)


  useEffect(() =>{

  },[cartContext?.cartSelected])

  if (carts.length <= 0) {
    return <h1>Carrito vacio</h1>;
  }

  return (
    <>
      <div className="col-12">
        <h3 className="eyebrow text-dark fs-16 mb-0">Carritos en proceso</h3>
      </div>
      <div className="col-12">
        <ListGroup defaultActiveKey="#link1" className="mt-3">
          {carts.map((cart) => {
            return (
              <ListGroup.Item
                action
                href={`#${cart.id}`}
                onClick={() => { cartContext?.HandleCartSelected(cart.id ?? "") }}
                key={cart.id}
              >
                <div className="cart-item">
                  <div className="cart-item-body">
                    <div className="row">
                      <div className="col-9">
                        <h5 className="cart-item-title">
                          {cart.customer?.name}
                        </h5>
                        <small></small>
                        <ul className="list list--horizontal fs-14">
                          <li>
                            Sub total: {cart.subTotal }
                          </li>
                          <li className="text-red"></li>
                        </ul>
                      </div>
                      <div className="col-3 text-right">
                        <ul className="cart-item-options">
                          <li>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </div>
      <div className="col-12 mt-2">
      <Link to="/cart" className="btn btn-primary col-12">
          Crear nuevo
        </Link>
      </div>
    </>
  );
};

export default CartChooseCart;
