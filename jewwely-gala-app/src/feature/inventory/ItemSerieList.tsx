import { useEffect, useState } from "react";
// import { AuthContext } from "../../contexts/AuthContext";
import {
  GetAllItemSeriesQuery,
  ItemSerieClient,
  ItemSerieDTO,
  ItemSerieFeatures,
} from "../../api/client/GalaJewerlyClient";
import ItemSerieListLine from "./ItemSerieListLine";
import { Table } from "react-bootstrap";
import ItemSerieListTags from "./ItemSerieListTags";

const ItemSerieList = () => {
  //   const cookies = useContext(AuthContext);
  const [series, setSeries] = useState<ItemSerieDTO[]>([]);
  const [features, setFeatures] = useState<ItemSerieFeatures[]>([]);

  const loadItems = async () => {
    const client = new ItemSerieClient()
    const query = {
      featuresAndValues: features,
    } as GetAllItemSeriesQuery;

    client
      .getAll(query)
      .then((result) => {
        setSeries(result);
      })
      .catch((error) => {
        console.log(error);
        if (error.status != undefined && error.status == 401)
          alert("usuario o contraseña incorrectas");
        else alert("error vuelve a intentar");
      });
  };

  useEffect(() => {
    setFeatures([
      {
        featureName: "Tipo broquel",
        value: "Dormilonas",
      } as ItemSerieFeatures,
      {
        featureName: "Medida",
        value: "2mm",
      } as ItemSerieFeatures,
    ]);
    loadItems();
  }, []);

  return (
    <>
      <div className="row">
        <ItemSerieListTags tags={features}></ItemSerieListTags>
      </div>
      <div className="row">
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
      </div>
    </>
  );
};

export default ItemSerieList;
