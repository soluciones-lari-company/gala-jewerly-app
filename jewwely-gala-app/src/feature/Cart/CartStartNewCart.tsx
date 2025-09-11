import { useState } from "react";
import { ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CartStartNewCart = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<string>("new-customer");

  const handleMode = (value: string) => {
    setMode(value);
  };

  const NextStepCart = () => {
    if (mode != "") {
      if (mode === "new-customer") {
        navigate("/cart/create-with-new-customer");
      } else if (mode === "existing-customer") {
        navigate("/cart/create-with-exists-customer");
      }
    }
  };

  return (
    <>
      <div className="row gutter-1 align-items-end">
        <div className="col-md-6">
          <h3>Crear nuevo carrito</h3>
        </div>
      </div>
      <div className="row gutter-1">
        <div className="col-lg-7 col-md-12">
          <div className="bg-white p-2 p-lg-3 mb-1">
            <h2 className="mb-3 text-uppercase fs-20">Cliente</h2>
            <ListGroup defaultActiveKey="#link1">
              <ListGroup.Item
                action
                href="#link1"
                onClick={() => {
                  handleMode("new-customer");
                }}
              >
                <h2 className="card-title fs-20">Cliente nuevo</h2>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </ListGroup.Item>
              <ListGroup.Item
                action
                href="#link2"
                className=""
                onClick={() => {
                  handleMode("existing-customer");
                }}
              >
                <h2 className="card-title fs-20">Cliente existente</h2>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </ListGroup.Item>
            </ListGroup>
          </div>

          <div className="bg-white p-2 p-md-3">
            <button
              className="btn btn-lg btn-primary btn-block mb-2"
              onClick={NextStepCart}
            >
              Continuar
            </button>
            <small className="text-muted"></small>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartStartNewCart;
