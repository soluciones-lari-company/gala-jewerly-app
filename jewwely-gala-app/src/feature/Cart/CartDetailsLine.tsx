import { BsXLg } from "react-icons/bs";
import { DeleteLineFromOrderCommand, SaleOrderLineDTO, SalesOrderClient } from "../../api/client/GalaJewerlyClient";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";

type CartDetailsLineProps = {
    idOrder: string;
  line: SaleOrderLineDTO;
  onDeleteLine: () => void;
};

const CartDetailsLine = ({ idOrder, line, onDeleteLine }: CartDetailsLineProps) => {
    const userContext  = useContext(UserContext)
  // delete item modal
  const [showDeleteItemModal, setShowDeleteItemModal] =
    useState<boolean>(false);
  const [deleteAll, setDeleteAll] = useState<boolean>(false);
  const [toDeleteItems, setToDeleteItems] = useState<number>(0);

  const _deleteLine = () => {
    let itemsQtyToDelete  = 0;
    if(line.quantity === 1){
        itemsQtyToDelete = 1;
    }else {
        if(deleteAll){
            itemsQtyToDelete = line.quantity ?? 0;
        }else{
            itemsQtyToDelete = toDeleteItems
        }
    }

    const client = new SalesOrderClient(undefined, userContext?.instance)
    const command = {
        salesOrderId: idOrder,
        itemSerieId: line.itemSerieId,
        quantity: itemsQtyToDelete
    } as DeleteLineFromOrderCommand
    client.deleteLineFromOrder(idOrder, line.itemSerieId ?? "", command).then((result) =>{
        setShowDeleteItemModal(false)
        onDeleteLine()
    }).catch((error) =>{
        console.log(error)
    })
  };

  useEffect(() => {
    if (line.quantity === 1) {
      setDeleteAll(true);
      setToDeleteItems(1);
    } else {
      setDeleteAll(false);
      setToDeleteItems(1);
    }
  }, []);

  return (
    <div className="cart-item">
      <a href="#!" className="cart-item-image">
        <img
          src="https://www.joyeriasbizzarro.com/media/catalog/product/p/a/pat110-a_1.jpg?quality=80&bg-color=0,0,0&fit=bounds&height=&width=&canvas=:"
          alt="Image"
        />
      </a>
      <div className="cart-item-body">
        <div className="row">
          <div className="col-10">
            <div className="row">
              <div className="col-md-6">
                <h5 className="cart-item-title">
                  {" "}
                  {line.serieCode}-{line.descripcion}
                </h5>
                <small className="cart-item-subtitle"></small>
                <ul className="cart-item-meta">
                  <li>Total: ${line.total}</li>
                  <li className="text-red"></li>
                </ul>
              </div>
              <div className="col-md-6">
                <ul className="list list--horizontal">
                  <li className="mr-2">Cant: {line.quantity}</li>
                  <li>Precio: ${line.unitPrice}</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-2 text-right">
            <ul className="cart-item-options">
              <li>
                <button
                  className="btn btn-link"
                  onClick={() => {
                    setShowDeleteItemModal(true)
                  }}
                >
                  <BsXLg />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Modal
        show={showDeleteItemModal}
        onHide={() => {
          setShowDeleteItemModal(false);
        }}
        backdrop="static"
        keyboard={false}
        centered={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Eliminar articulo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>
            {line.serieCode}-{line.descripcion}
          </h6>
          Cantidad: {line.quantity}
          {(line.quantity ?? 0) > 1 ? (
            <div key={`default-full-item`} className="mb-3 mt-3">
              <Form.Check // prettier-ignore
                type={"checkbox"}
                id={`default-full-item`}
                label={`Eliminar todo el articulo`}
                onChange={(e) => setDeleteAll(e.target.checked)}
                checked={deleteAll}
              />
            </div>
          ) : (
            ""
          )}
          {(line.quantity ?? 0) > 1 && deleteAll === false ? (
            <FloatingLabel
              controlId="floatingSelect"
              label="Cantidad a eliminar parcialmente"
            >
              <Form.Select
                aria-label="Floating label select example"
                value={`${toDeleteItems}`}
                onChange={(e) => setToDeleteItems(parseInt(e.target.value))}
              >
                {Array.from({ length: line.quantity ?? 0 }, (_, index) => (
                  <option value={index + 1} key={`${line.id}-${index}`}>
                    {index + 1}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          ) : (
            ""
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowDeleteItemModal(false);
            }}
          >
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              _deleteLine();
            }}
          >
            {(line.quantity ?? 0) > 1 && deleteAll === false
              ? `Quitar ${toDeleteItems} Articulo(s)`
              : "Eliminar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CartDetailsLine;
