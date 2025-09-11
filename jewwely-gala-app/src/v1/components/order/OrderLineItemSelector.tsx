import { useState } from "react";
import { Button, Form, InputGroup, Modal, Table } from "react-bootstrap";
import {
  AddLineToSalesOrderCommand,
  GetSeriesBySerieCodeQuery,
  ItemSerieClient,
  ItemSeriePublicDTO,
  SalesOrderClient,
  SalesOrderDTO,
} from "../../../api/client/GalaJewerlyClient";
import { useGalaAuth } from "../../contexts/authentication/AuthGalaProvider";
import ItemCard from "../item/ItemCard";
import CheckoutSummary from "../checkout/CheckoutSummary";

type IOrderLineItemSelector = {
  idOrder: string;
  onChanges: () => void;
  order?: SalesOrderDTO;
};

const OrderLineItemSelector = ({
  idOrder,
  onChanges,
  order
}: IOrderLineItemSelector) => {
  const [flagSelector, setFlagSelector] = useState<boolean>(false);
  // contex
  const user = useGalaAuth();
  // component variables
  const [isLoadding, setIsLoadding] = useState<boolean>(false);
  const [serieCode, setSerieCode] = useState<string>("");
  const [series, setSeries] = useState<ItemSeriePublicDTO[]>([]);

  // functions component
  const _addNewline = async (serieId: string) => {
    setIsLoadding(true);
    //   setResponse("")
    const client = new SalesOrderClient(undefined, user?.instance);

    const command = {
      salesOrderId: idOrder,
      serieId: serieId,
      quantity: 1,
    } as AddLineToSalesOrderCommand;
    client
      .addLineToSalesOrder(idOrder, command)
      .then((result) => {
        onChanges();
      })
      .catch((error) => {
        if (error.status) {
          // setResponse(
          //   `Codigo: ${error.status} -${error.detail} `
          // );
        }
      })
      .finally(() => setIsLoadding(false));
  };

  const _listSeriesByCode = () => {
    const client = new ItemSerieClient(undefined, user?.instance);
    const command = {
      serieCode: serieCode,
    } as GetSeriesBySerieCodeQuery;
    setSeries([])
    client.getSeriesBySerieCode(command).then((result) => {
      setSeries(result);
    });
  };

  return (
    <>
      <Button
        variant="primary mt-2 mb-2"
        onClick={() => setFlagSelector(true)}
      >
        Abrir buscador
      </Button>
      <Modal
        show={flagSelector}
        onHide={() => setFlagSelector(false)}
        size={"xl"}
        scrollable={true}
        centered={true}
        fullscreen={true}
        aria-labelledby={`label-item-selector`}
      >
        <Modal.Header closeButton>
          <Modal.Title as="h5" id={`label-item-selector`}>
            Selector de articulos
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          

          <div className="container">
            <div className="row">
            <p>Nuevo articulo.</p>
            <InputGroup className="pb-3">
              <Form.Control
                type="text"
                placeholder="Serie de producto"
                value={serieCode}
                onChange={(e) => setSerieCode(e.target.value)}
              />
              <Button
                onClick={() => _listSeriesByCode()}
                disabled={isLoadding}
                variant="outline-dark"
              >
                {isLoadding ? "Buscando..." : "Buscar"}
              </Button>
            </InputGroup>
          </div>
            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 gy-5">
            {series.map((line) => {
              return <ItemCard serie={line} onSelected={() => _addNewline(line.id ?? "")}></ItemCard>;
            })}
          </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <CheckoutSummary cart={order}></CheckoutSummary>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default OrderLineItemSelector;
