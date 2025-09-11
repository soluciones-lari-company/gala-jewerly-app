import { Link } from "react-router-dom";
import Breadcums from "../../components/shared/Breadcums";
import { Button, Table } from "react-bootstrap";
import { useGalaAuth } from "../../contexts/authentication/AuthGalaProvider";
import {
  SalesOrderClient,
  SalesOrderDTO,
} from "../../../api/client/GalaJewerlyClient";
import { useEffect, useState } from "react";
import { CgInfo } from "react-icons/cg";

const ChekoutViewCartList = () => {
  const user = useGalaAuth();

  const [carts, setCarts] = useState<SalesOrderDTO[]>([]);

  const _getCarts = () => {
    const client = new SalesOrderClient(undefined, user?.instance);

    client
      .getSalesOrdersOpen()
      .then((result) => setCarts(result))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    _getCarts();
  }, []);

  return (
    <>
      <Breadcums>
        <ul>
          <li>
            <Link to={"./"}>Inicio</Link>
          </li>
          <li className="active">Lista de carritos</li>
        </ul>
      </Breadcums>

      <div className="cart-main-area pt-20 pb-100">
        <div className="container">
          <div className="d-flex align-items-center mb-3">
            <h2
              className="accordion-header h5 mb-0 me-3"
              id="deliveryInfoHeading"
            >
              Lista de carritos
            </h2>
            <div className="ms-auto nav">
              <Link
                data-rr-ui-event-key="./delivery-2"
                className="text-decoration-underline p-0 nav-link"
                to={"/cart/new-cart"}
              >
                Crear nuevo
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="">
                <Table hover responsive bordered className="gala-table-content">
                  <thead>
                    <tr>
                      <th style={{ textAlign: "left" }}>Cliente</th>
                      <th style={{ textAlign: "left" }}>Total</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {carts.map((cart) => (
                      <tr key={cart.id}>
                        <td style={{ textAlign: "left" }}>
                          {cart.customer?.name}
                        </td>
                        <td style={{ textAlign: "left" }}>${cart.total}</td>
                        <td>
                          <Link
                            to={`/cart/${cart?.id}/`}
                            className="btn gala-btn btn-sm"
                          >
                            ver
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChekoutViewCartList;
