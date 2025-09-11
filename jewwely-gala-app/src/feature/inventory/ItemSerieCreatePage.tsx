import { Alert, Badge, FloatingLabel, Form, ListGroup } from "react-bootstrap";
import {
  CreateItemSerieCommand,
  FeatureValuesDTO,
  ItemSerieClient,
  ItemSerieFeatures,
  SupplierClient,
  SupplierDTO,
} from "../../api/client/GalaJewerlyClient";
import moment from "moment";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

const ItemSerieCreatePage = () => {
  const contextAuth = useContext(AuthContext);
  const [suppliers, setSuppliers] = useState<SupplierDTO[]>([]);
  // variables for tag manager
  const [features, setFeatures] = useState<FeatureValuesDTO>();
  const [optionsFet, setOptionsFet] = useState<string[]>([]);

  const [featureStr, setFeatureStr] = useState<string>("");
  const [featureStrReal, setFeatureStrReal] = useState<string>("");
  const [featureValStrReal, setFeatureValStrReal] = useState<string>("");
  const [newFeatureStr, setNewFeatureStr] = useState<string>("");

  // form attributes
  const [serieCode, setSerieCode] = useState<string | undefined>("");
  const [description, setDescription] = useState<string | undefined>("");
  const [material, setMaterial] = useState<string | undefined>("");
  const [quantity, setQuantity] = useState<number | undefined>(0);
  const [supplier, setSupplier] = useState<string | undefined>("");
  const [purchaseUnitMeasure, setPurchaseUnitMeasure] = useState<
    string | undefined
  >("");
  const [purchaseDate, setPurchaseDate] = useState<string>(
    moment().format("YYYY-MM-DD")
  ); //?: Date;
  const [purchaseUnitPrice, setPurchaseUnitPrice] = useState<
    number | undefined
  >(0);
  const [salePercentRentability, setSalePercentRentability] = useState<
    number | undefined
  >(160);
  const [saleUnitPrice, setSaleUnitPrice] = useState<number | undefined>(0);
  const [featureValues, setFeatureValues] = useState<ItemSerieFeatures[]>([]);

  const [lastSerieCreatedId, setLastSerieCreatedId] = useState<string>("");
  const [lastSerieSerieCode, setLastSerieSerieCode] = useState<string>("");

  const listSuppliers = async () => {
    const client = new SupplierClient(undefined, contextAuth?.instance);
    client
      .getAllSuppliers()
      .then((result) => {
        setSuppliers(result);
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  const listFeaturesValues = async () => {
    const client = new ItemSerieClient(undefined, contextAuth?.instance);
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

  const saveInformation = async () => {
    const client = new ItemSerieClient(undefined, contextAuth?.instance);

    const command = {
      serieCode: serieCode,
      description: description,
      material: material,
      quantity: quantity,
      supplierId: supplier,
      purchaseUnitMeasure: purchaseUnitMeasure,
      purchasePriceByUnitMeasure: purchaseUnitPrice,
      purchaseDate: moment(purchaseDate),
      purchaseUnitPrice: purchaseUnitPrice,
      salePercentRentability: salePercentRentability,
      saleUnitPrice: saleUnitPrice,
      featuresAndValues: featureValues,
    } as CreateItemSerieCommand;

    client
      .createItemSerie(command)
      .then((result) => {
        alert(`Serie guardada correctamente: Id: ${result}`);
        setLastSerieCreatedId(result)
        setLastSerieSerieCode(serieCode?? "")
      })
      .catch((error) => {
        console.log(error);
        if (error.status && error.status === 400) {
          alert(error.detail);
        }
        // // setSerie(null)()
        // refreshSession();
      });
  };

  const handleSalePercentRentability = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSalePercentRentability(parseFloat(e.target.value));
    calculateSalePrice();
  };

  const handlePurchaseUnitPrice = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPurchaseUnitPrice(parseFloat(e.target.value));
    calculateSalePrice();
  };

  const calculateSalePrice = async () => {
    if (purchaseUnitPrice != undefined && salePercentRentability != undefined) {
      setSaleUnitPrice(
        purchaseUnitPrice + purchaseUnitPrice * (salePercentRentability / 100)
      );
      // purchaseUnitPrice != undefined && salePercentRentability != undefined ?  purchaseUnitPrice + (purchaseUnitPrice * (salePercentRentability/100)) : 0
    } else {
      setSaleUnitPrice(0);
    }
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

  const addNewTag = () => {
    const exists = featureValues.find(
      (x) => x.featureName?.trim() === featureStrReal.trim()
    );
    if (exists === undefined) {
      const newTag = {
        featureName: featureStrReal,
        value: featureValStrReal,
      } as ItemSerieFeatures;

      setFeatureValues([...featureValues, newTag]);
      setNewFeatureStr("");
    }
  };

  const removeTag = (featureName: string, value: string) => {
    const exists = featureValues.find(
      (x) =>
        x.featureName?.trim() === featureName.trim() &&
        x.value?.trim() === value.trim()
    );
    if (exists != undefined) {
      setFeatureValues((prev) => prev.filter((item) => item !== exists));
    }
  };

  useEffect(() => {
    listSuppliers();
    listFeaturesValues();
  }, []);

  return (
    <>
      <div className="row gutter-1 align-items-end">
        <div className="col-md-6">
          <h1>Registrar nuevo articulo</h1>
        </div>
      </div>
      <div className="row gutter-1">
        <div className="col">
          {lastSerieCreatedId !== "" ? (
            <div className="bg-white mb-1 ">
              <Alert variant="warning">
                Ver ulltima serie creada <Link to={`/inventario/serie/${lastSerieCreatedId}/details`}>
                  {lastSerieSerieCode}
                </Link>
              </Alert>
            </div>

          ) : (
            ""
          )}

          <div className="bg-white p-2 p-lg-3 mb-1 border">
            <div className="row gutter-1 align-items-center">
              <div className="col-md-6">
                <h2 className="text-uppercase fs-20">Datos Generales</h2>
              </div>
            </div>
            <fieldset className="mb-2">
              <div className="row">
                <div className="col-6">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Codigo"
                    className=""
                  >
                    <Form.Control
                      type="text"
                      placeholder="Codigo"
                      value={serieCode}
                      onChange={(e) => setSerieCode(e.currentTarget.value)}
                    />
                  </FloatingLabel>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Descripcion"
                    className="mb-1"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Descripcion"
                      value={description}
                      onChange={(e) => setDescription(e.currentTarget.value)}
                    />
                  </FloatingLabel>
                </div>
              </div>
            </fieldset>
          </div>

          <div className="bg-white p-2 p-lg-3 mb-1 border">
            <div className="row gutter-1 align-items-center">
              <div className="col-md-6">
                <h2 className="text-uppercase fs-20">Almacen</h2>
              </div>
            </div>
            <fieldset className="mb-2">
              <div className="row">
                <div className="col-12">
                  <FloatingLabel controlId="floatingInput" label="Material">
                    <Form.Control
                      type="text"
                      placeholder="Material"
                      value={material}
                      onChange={(e) => setMaterial(e.currentTarget.value)}
                    />
                  </FloatingLabel>
                </div>
              </div>

              <div className="row">
                <div className="col-6">
                  <FloatingLabel controlId="floatingInput" label="Cantidad">
                    <Form.Control
                      type="text"
                      placeholder="Cantidad"
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(parseFloat(e.currentTarget.value))
                      }
                    />
                  </FloatingLabel>
                </div>

                <div className="col-6 ">
                  <FloatingLabel
                    controlId="floatingSelect"
                    label="Proveedor"
                    className="select-frame"
                  >
                    <Form.Select
                      aria-label="Floating label select example"
                      value={supplier}
                      onChange={(e) => setSupplier(e.currentTarget.value)}
                    >
                      <option>Open this select menu</option>
                      {suppliers.map((supplier) => {
                        return (
                          <option key={supplier.id} value={supplier.id}>
                            {supplier.supplierName}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </FloatingLabel>
                </div>
              </div>
            </fieldset>

            <div className="row">
              <div className="col-12">
                <p className="text-justify">
                  Aqui algunos materiales usualmente usados en Gala Joyería{" "}
                  <code className="highlighter-rouge">
                    Oro 10k, Oro 14k, Plata 925
                  </code>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-2 p-lg-3 mb-1 border">
            <div className="row gutter-1 align-items-center">
              <div className="col-md-6">
                <h2 className="text-uppercase fs-20">Compra y venta(Costos)</h2>
              </div>
            </div>
            <fieldset className="mb-2">
              <div className="row">
                <div className="col-6">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Fecha de compra"
                  >
                    <Form.Control
                      type="date"
                      placeholder="Codigo"
                      value={purchaseDate}
                      onChange={(e) => {
                        setPurchaseDate(e.currentTarget.value);
                      }}
                    />
                  </FloatingLabel>
                </div>
                <div className="col-6">
                  <FloatingLabel
                    controlId="floatingSelect"
                    label="Forma de compra"
                    className="select-frame"
                  >
                    <Form.Select
                      aria-label="Floating label select example"
                      value={purchaseUnitMeasure}
                      onChange={(e) =>
                        setPurchaseUnitMeasure(e.currentTarget.value)
                      }
                    >
                      <option value={"Item"}>Pieza</option>
                      <option value={"Weight"}>Peso</option>
                    </Form.Select>
                  </FloatingLabel>
                </div>
              </div>

              <div className="row">
                <div className="col-6">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Precio de compra"
                  >
                    <Form.Control
                      type="number"
                      placeholder="Precio de compra"
                      value={purchaseUnitPrice}
                      onChange={handlePurchaseUnitPrice}
                    />
                  </FloatingLabel>
                </div>

                <div className="col-6 ">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Esquema de venta(%)"
                  >
                    <Form.Control
                      type="number"
                      placeholder="Esquema de venta(%)"
                      value={salePercentRentability}
                      onChange={handleSalePercentRentability}
                    />
                  </FloatingLabel>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Precio de venta"
                  >
                    <Form.Control
                      type="number"
                      placeholder="Precio de venta"
                      value={
                        purchaseUnitPrice != undefined &&
                        salePercentRentability != undefined
                          ? purchaseUnitPrice +
                            purchaseUnitPrice * (salePercentRentability / 100)
                          : 0
                      }
                      onChange={(e) => {
                        // console.log(e.currentTarget.value);
                      }}
                      disabled={true}
                    />
                  </FloatingLabel>
                </div>
              </div>
            </fieldset>

            <p className="text-justify">
              De acuerdo con los datos introducidos acerca de compra y venta de
              esta serie, el esquema de venta definido es utilidad del{" "}
              <code className="highlighter-rouge">
                {salePercentRentability}%{" "}
              </code>
              sobre el costo de compra del producto (
              <code className="highlighter-rouge">${purchaseUnitPrice}</code> )
              generando una ganancia de{" "}
              <code className="highlighter-rouge">
                $
                {purchaseUnitPrice != undefined &&
                salePercentRentability != undefined
                  ? purchaseUnitPrice * (salePercentRentability / 100)
                  : 0}{" "}
                pesos{" "}
              </code>
            </p>
          </div>

          
        </div>

        <div className="col-lg-5">
          <div className="bg-white p-2 p-lg-3 mb-1 border">
            <div className="row gutter-1 align-items-center">
              <div className="col-md-6">
                <h2 className="text-uppercase fs-20">Caracteristicas</h2>
              </div>
            </div>
            <div className="row">
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
                        .filter((item) => item.includes(featureStr))
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
                <div>
                  {featureValues?.map((tag, tagIndex) => {
                    return (
                      <Badge
                        pill
                        bg="dark"
                        key={tagIndex + "tag"}
                        className="mb-1 mr-1"
                      >
                        {tag.featureName} | {tag.value}
                        <i
                          className="bi bi-x-circle-fill ms-2"
                          role="button"
                          onClick={() =>
                            removeTag(tag.featureName ?? "", tag.value ?? "")
                          }
                        >
                          x
                        </i>
                      </Badge>
                    );
                  })}
                </div>
              </div>
              {/* <ItemSerieTagList
                serieId={serieId === undefined ? "" : serieId}
                tags={featureValues == undefined ? [] : featureValues}
                onChanges={getSerialDetails}
              ></ItemSerieTagList> */}

              <hr />
              <p className="text-justify">
                Para Gala Joyeria es importante definir caracteristicas de
                nuestros productos, por ello es necesario idear patrones de
                caracteristicas que ayuden a maximizar nuestro esquema de venta
              </p>
            </div>
          </div>

          <div className="bg-white p-2 p-md-3 border">
            <button
              className="btn btn-lg btn-primary btn-block mb-2"
              onClick={saveInformation}
            >
              Guardar y actualizar datos
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemSerieCreatePage;
