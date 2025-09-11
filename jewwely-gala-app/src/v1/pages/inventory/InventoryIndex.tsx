import { Link } from "react-router-dom";
import Breadcums from "../../components/shared/Breadcums";
import { Table } from "react-bootstrap";
import { useGalaAuth } from "../../contexts/authentication/AuthGalaProvider";
import {
  GetAllItemSeriesQuery,
  ItemSerieClient,
  ItemSerieDTO,
} from "../../../api/client/GalaJewerlyClient";
import { useEffect, useState } from "react";

const InventoryIndex = () => {
  const user = useGalaAuth();
  const [series, setSeries] = useState<ItemSerieDTO[]>([]);
  const loadSeries = () => {
    const command = {} as GetAllItemSeriesQuery;
    const client = new ItemSerieClient(undefined, user?.instance);
    client.getAll(command).then((result) => setSeries(result));
  };

  useEffect(() => {
    loadSeries();
  }, []);
  return (
    <>
      <Breadcums>
        <ul>
          <li>
            <Link to={"./"}>Inicio</Link>
          </li>
          <li className="active">Invetario</li>
        </ul>
      </Breadcums>
      <section className="pb-5 mb-2 mb-md-3 mb-lg-4 mb-xl-5 container">
        <div className="d-flex align-items-center justify-content-between pb-3 mb-1 mb-sm-2 mb-md-3">
          <h1 className="h2 me-3 mb-0">Series</h1>
          <div className="nav">
            <Link
              role="button"
              className="animate-underline px-0 py-1 py-ms-2 nav-link"
              tabIndex={0}
              to={"/inventory/create-serie"}
            >
              <i className="ci-plus fs-base me-1"></i>
              <span className="animate-target">+ Agregar nueva serie</span>
            </Link>
          </div>
        </div>
        <div className="row">
          <Table responsive size="sm">
            <thead>
              <tr>
                <th>Serie</th>
                <th>Descripcion</th>
                <th>Proveedor</th>
                <th>Fecha</th>
                <th>Precio</th>
                <th>Inventario</th>
              </tr>
            </thead>
            <tbody>
              {series.map((serie) => {
                return (
                  <tr key={serie.id}>
                    <td>
                        <Link to={`/inventory/serie/${serie.id}`}>{serie.serieCode}</Link>
                    </td>
                    <td>{serie.description}</td>
                    <td>{serie.supplier?.supplierName}</td>
                    <td>{serie.purchaseDate?.format("YYYY-MM-DD")}</td>
                    <td>${serie.saleUnitPrice}</td>
                    <td>
                      <span className="text-secondary">{serie.quantity}</span>
                      {" "}/{" "}
                      <span className="text-warning">{serie.quantityCommited}</span>
                      {" "}/{" "}
                      <span className="text-primary">{serie.quantitySold}</span>
                      {" "}/{" "}
                      <span className="text-success">{serie.quantityFree}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </section>
    </>
  );
};

export default InventoryIndex;
