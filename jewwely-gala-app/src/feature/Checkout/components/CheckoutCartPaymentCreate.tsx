import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import {
  AccountClient,
  AddPaymentToSOCommand,
  CustomerDTO,
  SalesOrderClient,
} from "../../../api/client/GalaJewerlyClient";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";

type ICheckoutCartPaymentCreateProps = {
  idOrder: string;
  pendingToPay:number;
  onPaymentAdded: () => void;
  onClose: () => void;
  show: boolean;
};

const CheckoutCartPaymentCreate = ({
  idOrder,
  onPaymentAdded,
  onClose,
  show,
  pendingToPay
}: ICheckoutCartPaymentCreateProps) => {
  // contexts
  const userContext = useContext(UserContext);

  // variables
  const [accounts, setAccounts] = useState<CustomerDTO[]>([])
  const [isLoadding, setIsLoadding] = useState<boolean>(false);
  const [paymentTotal, setPaymentTotal] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<string>("01");
  const [paymentAccount, setPaymentAccount] = useState<string>("");

  // functions
  const savePayment = () => {
    setIsLoadding(true);
    const client = new SalesOrderClient(undefined, userContext?.instance);
    const command = {
      salesOrderId: idOrder,
      total: paymentTotal,
      paymentMethod: paymentMethod,
      idReceivingAccount: paymentAccount
    } as AddPaymentToSOCommand;

    client
      .addPaymentToSO(idOrder, command)
      .then((result) => {
        onPaymentAdded();
        setPaymentTotal(0)
        setPaymentMethod("")
        setPaymentAccount("")
        onClose();
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoadding(false));
  };

  const getAccounts = () => {
    const client = new AccountClient(undefined, userContext?.instance);
    client
      .getAllAccounts()
      .then((result) => {setAccounts(result)})
      .catch((error) => console.log(error))
      .finally();
  };

  useEffect(() => {
    getAccounts()
  }, [onClose]);

  return (
    <Modal
      show={show}
      onHide={() => onClose()}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Registrar pago</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-12">
          En esta orden existen: <strong>${pendingToPay}</strong> pendientes
          </div>
        </div>
        <fieldset className="mb-2">
          <div className="row">
            <div className="col-12">
              <FloatingLabel controlId="floatingInput" label="Importe del pago">
                <Form.Control
                  type="number"
                  placeholder="introduce aqui..."
                  value={paymentTotal}
                  onChange={(e) =>
                    setPaymentTotal(parseFloat(e.currentTarget.value))
                  }
                />
              </FloatingLabel>
            </div>
            <div className="col-12">
              <FloatingLabel
                controlId="floatingSelect"
                label="Metodo de pago"
                className="select-frame"
              >
                <Form.Select
                  aria-label="Floating label select example"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.currentTarget.value)}
                >
                  <option value={""}>Selecciona...</option>
                  <option value={"01"}>Efectivo</option>
                  <option value={"03"}>Transferencia</option>
                </Form.Select>
              </FloatingLabel>
            </div>
            <div className="col-12">
            <FloatingLabel
                controlId="floatingSelect"
                label="Cuenta receptora"
                className="select-frame"
              >
                <Form.Select
                  aria-label="Floating label select example"
                  value={paymentAccount}
                  onChange={(e) => setPaymentAccount(e.currentTarget.value)}
                >
                    <option value={""}>Selecciona...</option>
                  {accounts.map((account) => {
                    return (
                      <option key={account.id} value={account.id}>
                        {account.name}
                      </option>
                    );
                  })}
                </Form.Select>
              </FloatingLabel>
            </div>
          </div>
        </fieldset>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => onClose()}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={() => savePayment()}>{isLoadding ? "Guardando..." : "Guardar"}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CheckoutCartPaymentCreate;
