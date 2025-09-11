import { ChangeEvent, useContext, useEffect, useState } from "react";
import {
  AddFeatureToSerieCommand,
  FeatureValuesDTO,
  ItemSerieClient,
  QItemSerieFeatureValues,
  RemoveFeatureToSerieCommand,
} from "../../../api/client/GalaJewerlyClient";
import { Badge, Form, ListGroup } from "react-bootstrap";
import { useGalaAuth } from "../../contexts/authentication/AuthGalaProvider";

type ISerieTagsEditor = {
  serieId: string;
  tags: QItemSerieFeatureValues[];
  onChanges: () => void;
};

const SerieTagsEditor = ({ serieId, tags, onChanges }: ISerieTagsEditor) => {
  const user = useGalaAuth();

  // variables for tag manager
  const [features, setFeatures] = useState<FeatureValuesDTO>();
  const [optionsFet, setOptionsFet] = useState<string[]>([]);

  const [featureStr, setFeatureStr] = useState<string>("");
  const [featureStrReal, setFeatureStrReal] = useState<string>("");
  const [featureValStrReal, setFeatureValStrReal] = useState<string>("");
  const [newFeatureStr, setNewFeatureStr] = useState<string>("");

  const addNewTag = async () => {
    const client = new ItemSerieClient(undefined, user?.instance);
    const serieIdValue = serieId === undefined ? "" : serieId;
    const request = {
      serieId: serieIdValue,
      featureName: newFeatureStr.trim().split(":")[0].trim(),
      value: newFeatureStr.trim().split(":")[1].trim(),
    } as AddFeatureToSerieCommand;

    client
      .addFeatureToSerie(serieIdValue, request)
      .then(async () => {
        onChanges();
        setNewFeatureStr("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeTag = (
    featureName: string | undefined,
    value: string | undefined
  ) => {
    const client = new ItemSerieClient(undefined, user?.instance);
    const serieIdValue = serieId === undefined ? "" : serieId;

    const request = {
      serieId: serieIdValue,
      featureName: featureName,
      value: value,
    } as RemoveFeatureToSerieCommand;
    client
      .removeFeatureToSerie(serieIdValue, request)
      .then(async () => {
        onChanges();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const listFeaturesValues = async () => {
    const client = new ItemSerieClient(undefined, user?.instance);
    client
      .getFeatureValues()
      .then((result) => {
        setFeatures(result);
        // setSuppliers(result);
      })
      .catch((error) => {
        // console.log(error);
      });
  };
  const handleClikSelectTagValue = (option: string) => {
    //{featureStrReal}:{featureValStrReal}
    if (featureValStrReal.trim() === "") {
      setFeatureStrReal(option);
      setNewFeatureStr(option + ":");
    } else {
      setFeatureValStrReal(option);
      setNewFeatureStr(`${featureStrReal}:${option}`);
    }
    setFeatureStr("");
  };

  const handleInputChangeTagMang = (event: ChangeEvent<HTMLInputElement>) => {
    setNewFeatureStr(event.target.value.trim());
    const valueStr: string = event.target.value.trim();
    const values = valueStr.split(":");

    setFeatureStrReal("");
    setFeatureValStrReal("");

    if (values.length === 2) {
      const feature = valueStr.split(":")[0].trim();
      const value = valueStr.split(":")[1].trim();
      setFeatureStr(value);
      setFeatureStrReal(feature);
      setFeatureValStrReal(value);
      setOptionsFet(features?.values ?? []);
    } else {
      setFeatureStr(valueStr);
      setFeatureStrReal(valueStr);
      setOptionsFet(features?.features ?? []);
    }
  };
  useEffect(() => {
    listFeaturesValues();
  }, []);

  return (
    <>
      <div className="col-12">
        <Form.Group className="typeahead-form-group">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="nombre: valor"
              value={newFeatureStr}
              onChange={handleInputChangeTagMang}
            />
            <button
              type="button"
              className="btn btn-secondary"
              onClick={addNewTag}
            >
              Agregar
            </button>
          </div>
          <ListGroup className="typeahead-list-group">
            {featureStr.length > 0 &&
              optionsFet
                .filter((item) => item.toLocaleLowerCase().includes(featureStr.toLocaleLowerCase() ))
                .map((value) => {
                  return (
                    <ListGroup.Item
                      className="typeahead-list-group-item"
                      key={value}
                      onClick={() => handleClikSelectTagValue(value)}
                    >
                      {value}
                    </ListGroup.Item>
                  );
                })}
          </ListGroup>
        </Form.Group>
      </div>
      <div className="col-12">
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

export default SerieTagsEditor;
