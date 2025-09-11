import { useContext, useEffect, useState } from "react";
import {
  ItemSerieClient,
  QItemSerieFeatureValues,
  SupplierClient,
  SupplierDTO,
  UpdateItemSerieCommand,
} from "../../api/client/GalaJewerlyClient";
import { useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import ItemSerieTagList from "./ItemSerieTagList";
import { AuthContext } from "../../contexts/AuthContext";
import moment from "moment";

const ItemSerieEdit = () => {
  //   const [serie, setSerie] = useState<ItemSerieDTO>(new ItemSerieDTO());
  const contextAuth = useContext(AuthContext);
  const [suppliers, setSuppliers] = useState<SupplierDTO[]>([]);
  const { serieId } = useParams();

  // form attributes
  const [serieCode, setSerieCode] = useState<string | undefined>("");
  const [description, setDescription] = useState<string | undefined>("");
  const [material, setMaterial] = useState<string | undefined>("");
  const [quantity, setQuantity] = useState<number | undefined>(0);
  const [supplier, setSupplier] = useState<string | undefined>("");
  const [purchaseUnitMeasure, setPurchaseUnitMeasure] = useState<
    string | undefined
  >("");
  const [purchaseDate, setPurchaseDate] = useState<string>("2025-01-01"); //?: Date;
  const [purchaseUnitPrice, setPurchaseUnitPrice] = useState<
    number | undefined
  >(0);
  const [salePercentRentability, setSalePercentRentability] = useState<
    number | undefined
  >(0);
  const [saleUnitPrice, setSaleUnitPrice] = useState<number | undefined>(0);
  const [featureValues, setFeatureValues] = useState<
    QItemSerieFeatureValues[] | undefined
  >([]);

  const getSerialDetails = async () => {
    if (serieId != undefined) {
      const serieIdValue = serieId === undefined ? "" : serieId;
      const client = new ItemSerieClient(undefined, contextAuth?.instance);

      client
        .getById(serieIdValue)
        .then(async (result) => {
          // setSerie(result);
          console.log(result.purchaseDate?.toString());
          setSerieCode(result.serieCode);
          setDescription(result.description);
          setMaterial(result.material?.materialName);
          setQuantity(result.quantity);
          setSupplier(result.supplier?.id);
          setPurchaseUnitMeasure(result.purchaseUnitMeasure);
          setPurchaseDate(
            result.purchaseDate ? result.purchaseDate.format("YYYY-MM-DD") : ""
          );
          setPurchaseUnitPrice(result.purchaseUnitPrice);
          setSalePercentRentability(result.salePercentRentability);
          setSaleUnitPrice(result.saleUnitPrice);
          setFeatureValues(result.featureValues);
        })
        .catch((error) => {
          // console.log(error);
          // // setSerie(null)()
          // refreshSession?.refreshSession();
        });
    }
  };

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

  const calculateSalePrice = async () => {
    if (purchaseUnitPrice != undefined && salePercentRentability != undefined) {
      console.log(purchaseUnitPrice);
      console.log(salePercentRentability);
      setSaleUnitPrice(
        purchaseUnitPrice + purchaseUnitPrice * (salePercentRentability / 100)
      );
      // purchaseUnitPrice != undefined && salePercentRentability != undefined ?  purchaseUnitPrice + (purchaseUnitPrice * (salePercentRentability/100)) : 0
    } else {
      setSaleUnitPrice(0);
    }
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

  const saveInformation = async () => {
    const client = new ItemSerieClient(undefined, contextAuth?.instance);

    const command = {
      id: serieId ?? "",
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
    } as UpdateItemSerieCommand;

    client
      .update(serieId ?? "", command)
      .then((result) => {
        alert("Serie actualizada");
      })
      .catch((error) => {
        // console.log(error);
        if (error.status && error.status === 400) {
          alert(error.detail);
        }
      });
  };

  useEffect(() => {
    getSerialDetails();
    listSuppliers();
  }, []);

  return (
    <>
      <div className="row gutter-1 align-items-end">
        <div className="col-md-6">
          <h1>Detalle de articulo</h1>
        </div>
      </div>
      <div className="row gutter-1">
        <div className="col">
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
                        console.log(e.currentTarget.value);
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
              <ItemSerieTagList
                serieId={serieId === undefined ? "" : serieId}
                tags={featureValues == undefined ? [] : featureValues}
                onChanges={getSerialDetails}
              ></ItemSerieTagList>

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

export default ItemSerieEdit;
