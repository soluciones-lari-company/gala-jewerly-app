import { useContext, useState } from "react";
import {
  AddFeatureToSerieCommand,
  ItemSerieClient,
  QItemSerieFeatureValues,
  RemoveFeatureToSerieCommand,
} from "../../api/client/GalaJewerlyClient";
import { Badge } from "react-bootstrap";
import { AuthContext } from "../../contexts/AuthContext";

type ItemSerieTagListProps = {
  serieId: string;
  tags: QItemSerieFeatureValues[];
  onChanges: () => void;
};

const ItemSerieTagList = ({ serieId, tags,onChanges }: ItemSerieTagListProps) => {
  const [feature, setfeature] = useState<string>("");
  const cookies = useContext(AuthContext);

  const addNewTag = async () => {
    const client = new ItemSerieClient(import.meta.env.VITE_HOST_API_JEWERLY);
    client.setAuthToken(cookies?.cookies["accessToken"] == undefined ? '': cookies?.cookies["accessToken"])
    const serieIdValue = serieId === undefined ? "" : serieId;
    const request = {
      serieId: serieIdValue,
      featureName: feature.trim().split(":")[0].trim(),
      value: feature.trim().split(":")[1].trim(),
    } as AddFeatureToSerieCommand;

    client
      .addFeatureToSerie(serieIdValue, request)
      .then(() => {
        onChanges();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeTag = (
    featureName: string | undefined,
    value: string | undefined
  ) => {
    const client = new ItemSerieClient(import.meta.env.VITE_HOST_API_JEWERLY);
    const serieIdValue = serieId === undefined ? "" : serieId;

    const request = {
      serieId: serieIdValue,
      featureName: featureName,
      value: value,
    } as RemoveFeatureToSerieCommand;
    client
      .removeFeatureToSerie(serieIdValue, request)
      .then(() => {
        onChanges();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="nombre: valor"
          value={feature}
          onChange={(e) => {
            setfeature(e.target.value);
          }}
        />
        <button type="button" className="btn btn-secondary" onClick={addNewTag}>
          Agregar
        </button>
      </div>
      <div>
        {tags?.map((tag, tagIndex) => {
          return (
            <Badge pill bg="dark" key={tagIndex + "tag"} className="mb-1 mr-1">
              {tag.feature} | {tag.value}
              <i
                className="bi bi-x-circle-fill ms-2"
                role="button"
                onClick={() => removeTag(tag.feature, tag.value)}
              >
                x
              </i>
            </Badge>
          );
        })}
      </div>
    </>
  );
};

export default ItemSerieTagList;
