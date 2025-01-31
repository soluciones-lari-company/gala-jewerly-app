import { useContext, useEffect, useState } from "react";
import {
  ItemSerieClient,
  QItemSerieFeatureValues,
  SupplierClient,
  SupplierDTO,
} from "../../api/client/GalaJewerlyClient";
import { useParams } from "react-router-dom";
import { Card } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import ItemSerieTagList from "./ItemSerieTagList";
import { AuthContext } from "../../contexts/AuthContext";

const ItemSerieEdit = () => {
  //   const [serie, setSerie] = useState<ItemSerieDTO>(new ItemSerieDTO());
  const {refreshSession} = useContext(AuthContext);
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
      const client = new ItemSerieClient();

      client
        .getById(serieIdValue)
        .then((result) => {
          // setSerie(result);
          // console.log(result.purchaseDate)
          setSerieCode(result.serieCode);
          setDescription(result.description);
          setMaterial(result.material?.materialName);
          setQuantity(result.quantity);
          setSupplier(result.supplier?.id);
          setPurchaseUnitMeasure(result.purchaseUnitMeasure);
          setPurchaseDate(
            result.purchaseDate ? result.purchaseDate.format('YYYY-MM-DD') : ''
          );
          setPurchaseUnitPrice(result.purchaseUnitPrice);
          setSalePercentRentability(result.salePercentRentability);
          setSaleUnitPrice(result.saleUnitPrice);
          setFeatureValues(result.featureValues);
        })
        .catch((error) => {
          console.log(error);
          // setSerie(null)()
          refreshSession()
        });
    }
  };

  const listSuppliers = async () => {
    const client = new SupplierClient(import.meta.env.VITE_HOST_API_JEWERLY);
    client
      .getAllSuppliers()
      .then((result) => {
        setSuppliers(result);
      })
      .catch((error) => {
        console.log(error);
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

  useEffect(() => {
    getSerialDetails();
    listSuppliers();
  }, []);

  return (
    <div className="row g-5">
      <div className="col-md-7 col-lg-8">
        <Card className="mb-2">
          <Card.Body>
            <Card.Title>Datos generales</Card.Title>
            <div className="row">
              <FloatingLabel
                controlId="floatingInput"
                label="Codigo"
                className="mb-1 col-lg-3 col-sm-12"
              >
                <Form.Control
                  type="text"
                  placeholder="Codigo"
                  value={serieCode}
                  onChange={(e) => setSerieCode(e.currentTarget.value)}
                />
              </FloatingLabel>
            </div>
            <div className="row">
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
          </Card.Body>
        </Card>

        <Card className="mb-2">
          <Card.Body>
            <Card.Title>Almacen</Card.Title>
            <div className="row">
              <FloatingLabel
                controlId="floatingInput"
                label="Material"
                className="mb-1 col-lg-3 col-sm-12"
              >
                <Form.Control
                  type="text"
                  placeholder="Material"
                  value={material}
                  onChange={(e) => setMaterial(e.currentTarget.value)}
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingInput"
                label="Cantidad"
                className="mb-1 col-lg-3 col-sm-12"
              >
                <Form.Control
                  type="text"
                  placeholder="Cantidad"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(parseFloat(e.currentTarget.value))
                  }
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingSelect"
                label="Proveedor"
                className="mb-1 col-lg-6 col-sm-12"
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
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <Card.Title>Costos y ventas</Card.Title>
            <div className="row">
              <FloatingLabel
                controlId="floatingInput"
                label="Fecha de compra"
                className="mb-1 col-lg-3 col-sm-12"
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
            <div className="row">
              <FloatingLabel
                controlId="floatingSelect"
                label="Forma de compra"
                className="mb-1 col-lg-6 col-sm-12"
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
            <div className="row">
              <FloatingLabel
                controlId="floatingInput"
                label="Precio de compra"
                className="mb-1 col-lg-3 col-sm-12"
              >
                <Form.Control
                  type="number"
                  placeholder="Precio de compra"
                  value={purchaseUnitPrice}
                  onChange={handlePurchaseUnitPrice}
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingInput"
                label={`Esquema de venta(%) ${salePercentRentability}`}
                className="mb-1 col-lg-3 col-sm-12"
              >
                <Form.Control
                  type="number"
                  placeholder="Esquema de venta(%)"
                  value={salePercentRentability}
                  onChange={handleSalePercentRentability}
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingInput"
                label="Precio de venta"
                className="mb-1 col-lg-3 col-sm-12"
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
          </Card.Body>
        </Card>
      </div>
      <div className="col-md-5 col-lg-4">
        <h4 className="mb-3">Tags de busqueda</h4>
        <div className="card p-2">
          <ItemSerieTagList
            serieId={serieId === undefined ? "" : serieId}
            tags={featureValues == undefined ? [] : featureValues}
            onChanges={getSerialDetails}
          ></ItemSerieTagList>
        </div>
      </div>
    </div>
  );
};

export default ItemSerieEdit;
