import { useState } from "react";
import { useGalaAuth } from "../../contexts/authentication/AuthGalaProvider";
import {
  AddLineToSalesOrderCommand,
  GetSeriesBySerieCodeQuery,
  ItemSerieClient,
  ItemSeriePublicDTO,
  SalesOrderClient,
  SalesOrderDTO,
} from "../../../api/client/GalaJewerlyClient";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import ItemCard from "../item/ItemCard";

type IOrderLineAddNew = {
  idOrder: string;
  onChanges: () => void;
  order?: SalesOrderDTO;
};

const OrderLineAddNew = ({ idOrder, onChanges, order }: IOrderLineAddNew) => {
  const [flagSelector, setFlagSelector] = useState<boolean>(false);
  // contex
  const user = useGalaAuth();
  // component variables
  const [isLoadding, setIsLoadding] = useState<boolean>(false);
  const [serieCode, setSerieCode] = useState<string>("");
  const [series, setSeries] = useState<ItemSeriePublicDTO[]>([]);

  // functions component
  const _addNewline = async (serieId: string) => {
    if (serieCode !== "") {
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
          setFlagSelector(false)
        })
        .catch((error) => {
          //     console.log(error)
          //   if (error.status != undefined) {
          //     alert(
          //       `Codigo: ${error.status} -${error.detail} `
          //     );
          //   }
        })
        .finally(() => setIsLoadding(false));
    }
  };

  const _listSeriesByCode = () => {
    const client = new ItemSerieClient(undefined, user?.instance);
    const command = {
      serieCode: serieCode,
    } as GetSeriesBySerieCodeQuery;
    setSeries([]);
    setIsLoadding(true);
    client
      .getSeriesBySerieCode(command)
      .then((result) => {
        setSeries(result);
        if (result.length == 1) {
          _addNewline(result[0].id ?? "");
        } else if (result.length > 1) {
          setFlagSelector(true)
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.status != undefined) {
          alert(`Codigo: ${error.status} -${error.detail} `);
        }
      })
      .finally(() => {
        setIsLoadding(false);
      });
  };

  return (
    <>
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
          variant="primary"
        >
          {isLoadding ? "Buscando..." : "Buscar"}
        </Button>
      </InputGroup>
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
            Selecciona alguna opcion del articulo <b>{serieCode}</b>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 gy-5">
              {series.map((line) => {
                return (
                  <ItemCard
                    serie={line}
                    onSelected={() => _addNewline(line.id ?? "")}
                  ></ItemCard>
                );
              })}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default OrderLineAddNew;
