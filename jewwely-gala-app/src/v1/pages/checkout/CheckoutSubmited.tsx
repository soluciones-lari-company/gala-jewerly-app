import { Table } from "react-bootstrap";
import { useGalaCart } from "../../contexts/cart/CartProvider";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const CheckoutSubmited = () => {
  const cart = useGalaCart();
  const navigate = useNavigate();
  useEffect(() => {
    cart?.handleEnableDiscountControl(false);
    if (cart?.cartIdSelected != "") {
      if (cart?.cart != undefined) {
        if (cart?.cart.confirmedAt === undefined && cart?.cart.canceledAt === undefined) {
          navigate(`/cart/${cart?.cartIdSelected}/`, { replace: true });
        }
      }
    }
  }, []);

  return (
    <>
      <div
        className="position-relative overflow-hidden rounded-5 p-4 p-sm-5 mt-2"
        style={{ backgroundColor: "rgb(214.2,239.8,225.4)" }}
      >
        <div
          className="position-relative z-2 text-center py-4 py-md-5 my-md-2 my-lg-5 mx-auto"
          style={{ maxWidth: "536px" }}
        >
          <h1 className="pt-xl-4 mb-4">Gracias por tu order</h1>
          <p className="text-dark-emphasis pb-3 pb-sm-4">
            Tu compra ha sido confirmada
          </p>
          <hr />
          <Table borderless>
            <tbody>
              <tr>
                <th colSpan={2}>DETALLE</th>
              </tr>
              <tr>
                <th className="text-end pe-2">Cliente</th>
                <td className="text-start">{cart?.cart?.customer?.name}</td>
              </tr>

              <tr>
                <th className="text-end pe-2">Fecha</th>
                <td className="text-start">
                  {cart?.cart?.date?.format("YYYY-MM-DD")}
                </td>
              </tr>
              <tr>
                <th className="text-end pe-2">Forma de pago</th>
                <td className="text-start">{cart?.cart?.paymentTerms}</td>
              </tr>
              {cart?.cart?.paymentTerms === "PPD" ? (
                <tr>
                  <th className="text-end pe-2">Condiciones de pago</th>
                  <td className="text-start">
                    {cart?.cart?.paymentConditions}
                  </td>
                </tr>
              ) : (
                ""
              )}

              <tr>
                <th className="text-end pe-2">Total</th>
                <td className="text-start">${cart?.cart?.total}</td>
              </tr>
            </tbody>
          </Table>

          <Link
            to={`/cart/`}
            className="btn btn-lg btn-dark rounded-pill mb-xl-4"
          >
            Continuar comprando
          </Link>
        </div>
      </div>
    </>
  );
};

export default CheckoutSubmited;
