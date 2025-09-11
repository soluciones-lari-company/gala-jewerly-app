import { useEffect, useState } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import {
  AccountClient,
  AddPaymentToSOCommand,
  CustomerDTO,
  SalesOrderClient,
} from "../../../api/client/GalaJewerlyClient";
import { useGalaAuth } from "../../contexts/authentication/AuthGalaProvider";

type IPaymentCreateForOrder = {
  idOrder: string;
  onChanges: () => void;
};

const PaymentCreateForOrder = ({
  idOrder,
  onChanges,
}: IPaymentCreateForOrder) => {
  // contexts
  const user = useGalaAuth();

  // variables
  const [accounts, setAccounts] = useState<CustomerDTO[]>([]);
  const [isLoadding, setIsLoadding] = useState<boolean>(false);
  const [paymentTotal, setPaymentTotal] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<string>("01");
  const [paymentAccount, setPaymentAccount] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  // functions
  const savePayment = () => {
    setIsLoadding(true);
    const client = new SalesOrderClient(undefined, user?.instance);
    const command = {
      salesOrderId: idOrder,
      total: paymentTotal,
      paymentMethod: paymentMethod,
      idReceivingAccount: paymentAccount,
    } as AddPaymentToSOCommand;

    client
      .addPaymentToSO(idOrder, command)
      .then((result) => {
        onChanges();
        setPaymentTotal(0);
        setPaymentMethod("");
        setPaymentAccount("");
        setShow(false);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoadding(false));
  };

  const getAccounts = () => {
    const client = new AccountClient(undefined, user?.instance);
    client
      .getAllAccounts()
      .then((result) => {
        setAccounts(result);
      })
      .catch((error) => console.log(error))
      .finally();
  };
  useEffect(() => {
    getAccounts();
  }, [idOrder]);
  return (
    <>
      <Button
        variant="dark"
        className="w-100 mb-1"
        onClick={() => setShow(true)}
      >
        Nueva referencia de pago
      </Button>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Registrar referencia de pago</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <fieldset className="mb-2">
            <div className="row">
              <div className="col-12 mb-2">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Importe del pago"
                >
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
                <div className="row">
                  <div className="col-12">
                    <h6 className="mb-2">Metodo de pago:</h6>
                  </div>
                  <div className="col-lg-6 col-sm-6">
                    <div>
                      <label className="card-radio-label mb-1">
                        <input
                          type="radio"
                          name="address"
                          id="info-address1"
                          className="card-radio-input"
                          value="01"
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          checked={paymentMethod === "01"}
                        />
                        <div className="card-radio text-truncate p-3">
                          <span className="fs-14 d-block">Efectivo(01)</span>
                        </div>
                      </label>
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-6">
                    <div>
                      <label className="card-radio-label mb-1">
                        <input
                          type="radio"
                          name="address"
                          id="info-address1"
                          className="card-radio-input"
                          value="03"
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          checked={paymentMethod === "03"}
                        />
                        <div className="card-radio text-truncate p-3">
                          <span className="fs-14 d-block">
                            Transferencia(03)
                          </span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="row">
                  <div className="col-12">
                    <h6 className="mb-2">Cuenta receptora:</h6>
                  </div>
                  {accounts.map((account) => {
                    return (
                      <div className="col-lg-6 col-sm-6">
                        <div>
                          <label className="card-radio-label mb-1">
                            <input
                              type="radio"
                              name="paymentAccount"
                              id="account"
                              className="card-radio-input"
                              value={account.id}
                              onChange={(e) =>
                                setPaymentAccount(e.target.value)
                              }
                              checked={paymentAccount === account.id}
                            />
                            <div className="card-radio text-truncate p-3">
                              <span className="fs-14 d-block">
                                {" "}
                                {account.name}
                              </span>
                            </div>
                          </label>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </fieldset>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={() => savePayment()}
            disabled={
              paymentTotal === 0 ||
              paymentMethod === "" ||
              paymentAccount === ""
            }
          >
            {isLoadding ? "Registrando..." : "Agregar referencia"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PaymentCreateForOrder;
