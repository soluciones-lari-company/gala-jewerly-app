import { ItemSerieDTO } from "../../api/client/GalaJewerlyClient";
import { Link } from "react-router-dom";

type ItemSerieListLineProps = {
  serie: ItemSerieDTO;
};

const ItemSerieListLine = ({ serie }: ItemSerieListLineProps) => {
    return (
        <tr>
            <td>
              <Link to={`serie/${serie.id}/details`}>{serie.serieCode}</Link>
            </td>
            <td>
            {serie.description} 
            </td>
            <td>{serie.material?.materialName}</td>
            <td>{serie.supplier?.supplierName}</td>
            <td>{serie.quantity}</td>
            <td>{serie.quantityFree}</td>
            <td>{serie.saleUnitPrice}</td>
            <td>{serie.purchaseUnitPrice}</td>
            <td>{serie.saleUnitPrice}</td>
        </tr>
      );
}


export default ItemSerieListLine;