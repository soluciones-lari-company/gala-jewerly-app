import { ItemSerieDTO } from "../../api/client/GalaJewerlyClient";
import { Link } from "react-router-dom";

type ItemSerieListLineProps = {
  serie: ItemSerieDTO;
};

const ItemSerieListLine = ({ serie }: ItemSerieListLineProps) => {
  return (
    <div className="cart-item">
      <Link to={`serie/${serie.id}/details`} className="cart-item-image">
        <img src="https://img.gala-joyeria.com/sample.jpg" alt="Image" />
      </Link>
      <div className="cart-item-body">
        <div className="row">
          <div className="col">
            <h5 className="cart-item-title">
              <Link to={`serie/${serie.id}/details`}>
                {serie.serieCode} - {serie.description}
              </Link>
            </h5>
            <small className="cart-item-subtitle">
              {serie.material?.materialName}
            </small>
            <div>
              <ul className="list list--horizontal list--separated fs-14 text-muted mt-1">
                <li>
                  Disponible{" "}
                  <span className="text-dark">{serie.quantityFree}</span>
                </li>
                <li>
                  Proveedor{" "}
                  <span className="text-dark">
                    {serie.supplier?.supplierName}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="col text-right">
            <ul className="cart-item-meta">
              <li>${serie.saleUnitPrice}</li>
              <li className="text-red"></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    // <tr>
    //     <td>
    //
    //     </td>
    //     <td>
    //     {serie.description}
    //     </td>
    //     <td>{serie.material?.materialName}</td>
    //     <td>{serie.supplier?.supplierName}</td>
    //     <td>{serie.quantity}</td>
    //     <td>{serie.quantityFree}</td>
    //     <td>{serie.saleUnitPrice}</td>
    //     <td>{serie.purchaseUnitPrice}</td>
    //     <td>{serie.saleUnitPrice}</td>
    // </tr>
  );
};

export default ItemSerieListLine;
