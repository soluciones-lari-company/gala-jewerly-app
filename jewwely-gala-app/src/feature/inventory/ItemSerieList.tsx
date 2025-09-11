import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import {
  GetAllItemSeriesQuery,
  ItemSerieClient,
  ItemSerieDTO,
  ItemSerieFeatures,
} from "../../api/client/GalaJewerlyClient";
import ItemSerieListLine from "./ItemSerieListLine";
import { Table } from "react-bootstrap";
import ItemSerieListTags from "./ItemSerieListTags";
import { Link } from "react-router-dom";

const ItemSerieList = () => {
  const contextAuth = useContext(AuthContext);
  const [series, setSeries] = useState<ItemSerieDTO[]>([]);
  const [features, setFeatures] = useState<ItemSerieFeatures[]>([]);

  const loadItems = async () => {
    console.log("getting items");
    const client = new ItemSerieClient(undefined, contextAuth?.instance);
    const query = {
      featuresAndValues: features,
    } as GetAllItemSeriesQuery;

    await client
      .getAll(query)
      .then(async (result) => {
        setSeries(result);
      })
      .catch((error) => {
        console.log(error);
        // if (error.status != undefined && error.status == 401)
        //   alert("usuario o contraseña incorrectas");
        // else alert("error vuelve a intentar");
      });
  };

  useEffect(() => {
    // setFeatures([
    //   {
    //     featureName: "Tipo broquel",
    //     value: "Dormilonas",
    //   } as ItemSerieFeatures,
    //   {
    //     featureName: "Medida",
    //     value: "2mm",
    //   } as ItemSerieFeatures,
    // ]);
    loadItems();
  }, []);

  return (
    <>
      <div className="row gutter-4">
        <aside className="col-lg-3 sidebar bg-white">
          <div className="widget">
            <span className="widget-title">
              Caracteristicas <a className="small text-red">clear</a>
            </span>
            <ItemSerieListTags tags={features}></ItemSerieListTags>
          </div>
        </aside>

        <div className="col-lg-9 bg-white">
          <div className="row gutter-1 align-items-end">
            <div className="col-md-6">
              <h1>Series</h1>
            </div>
            <div className="col-md-6 text-md-right">
              <Link
                to="/inventario/serie/create-new"
                className="underline text-red"
              >
                Agregar nuevo
              </Link>
            </div>
          </div>
          <div className="row gutter-1">
            <div className="row">
              <div className="col-12">
                <div className="bordered cart-item-list p-3">
                  {series.map((serie) => {
                    return (
                      <ItemSerieListLine
                        key={serie.id}
                        serie={serie}
                      ></ItemSerieListLine>
                    );
                  })}
                  
                </div>
              </div>
            </div>
            {/* <div className="row">
              <Table striped hover size="sm">
                <thead>
                  <tr>
                    <th>Codigo</th>
                    <th>Descripcion</th>
                    <th>Material</th>
                    <th>Proveedor</th>
                    <th>Cant.Comprada</th>
                    <th>cant.Disponible</th>
                    <th>Compra</th>
                    <th>Utilidad</th>
                    <th>Venta</th>
                  </tr>
                </thead>
                <tbody>
                  {series.map((serie) => {
                    return (
                      <ItemSerieListLine
                        key={serie.id}
                        serie={serie}
                      ></ItemSerieListLine>
                    );
                  })}
                </tbody>
              </Table>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemSerieList;
