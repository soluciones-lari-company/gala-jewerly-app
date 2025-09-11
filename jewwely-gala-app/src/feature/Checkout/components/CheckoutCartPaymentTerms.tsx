import { useContext, useEffect, useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import {
  AddPaymentInfoToSOCommand,
  SalesOrderClient,
} from "../../../api/client/GalaJewerlyClient";
import { UserContext } from "../../../contexts/UserContext";

type ICheckoutCartPaymentTermsProps = {
  idOrder: string;
  defaultPaymentTerms: string;
  defaultPaymentConditions: string;
  onChangeTems: () => void;
  showEditButtons: boolean;
};

const CheckoutCartPaymentTerms = ({
  idOrder,
  defaultPaymentTerms,
  defaultPaymentConditions,
  onChangeTems,
  showEditButtons,
}: ICheckoutCartPaymentTermsProps) => {
  // contexts
  const userContext = useContext(UserContext);
  // query params from url
  //context variables
  const [paymentTerms, setPaymentTerms] = useState<string>(defaultPaymentTerms);
  const [paymentConditions, setPaymentConditions] = useState<string>(
    defaultPaymentConditions
  );
  const [isLoadding, setIsLoadding] = useState<boolean>(false);
  const [enableEditMode, setEnableEditMode] = useState<boolean>(false);

  // functions
  const savePaymentInfo = () => {
    setIsLoadding(true);
    const client = new SalesOrderClient(undefined, userContext?.instance);
    const command = {
      salesOrderId: idOrder,
      paymentTerms: paymentTerms,
      paymentConditions: paymentConditions,
    } as AddPaymentInfoToSOCommand;

    client
      .addPaymentInfo(idOrder, command)
      .then((result) => {
        onChangeTems();
        setEnableEditMode(false);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoadding(false));
  };

  useEffect(() => {
    setPaymentTerms(defaultPaymentTerms);
    setPaymentConditions(defaultPaymentConditions);
  }, [defaultPaymentTerms, defaultPaymentConditions]);

  return (
    <div className="row">
      <div className="col-12">
        <h2 className="mb-1 text-uppercase fs-20">Terminos de pago</h2>
      </div>

      {!enableEditMode ? (
        <>
          <div className="col-12">
            <div className="col">
              <div className="bordered p-1">
                <ul className="order-meta">
                  <li>
                    <h5 className="order-meta-title">Terminos de pago</h5>
                    <span>{defaultPaymentTerms}</span>
                  </li>
                  {defaultPaymentTerms !== "PUE" ? (
                    <li>
                      <h5 className="order-meta-title">Condiciones de pago</h5>
                      <span>{defaultPaymentConditions}</span>
                    </li>
                  ) : (
                    ""
                  )}
                </ul>
              </div>
            </div>
          </div>
          {showEditButtons ? (
            <div className="col-12 mt-1 text-end">
              <a
                href="#"
                className=" underlined mt-2"
                onClick={() => setEnableEditMode(true)}
              >
                Cambiar
              </a>
            </div>
          ) : (
            ""
          )}
        </>
      ) : (
        ""
      )}
      {enableEditMode ? (
        <>
          <div className="col-lg-6 col-12">
            <FloatingLabel
              controlId="floatingSelect"
              label="Forma de compra"
              className="select-frame"
            >
              <Form.Select
                aria-label="Floating label select example"
                value={paymentTerms}
                onChange={(e) => setPaymentTerms(e.currentTarget.value)}
              >
                <option value={"PUE"}>Pago en una sola exhibición</option>
                <option value={"PPD"}>Pago en Parcialidades o Diferido</option>
              </Form.Select>
            </FloatingLabel>
          </div>
          {paymentTerms === "PPD" ? (
            <div className="col-lg-6 col-12">
              <FloatingLabel
                controlId="floatingSelect"
                label="Condiciones de pago"
                className="select-frame"
              >
                <Form.Select
                  aria-label="Condiciones de pago"
                  value={paymentConditions}
                  onChange={(e) => setPaymentConditions(e.currentTarget.value)}
                >
                  <option value={"NET00"}>00 dias</option>
                  <option value={"NET07"}>07 dias</option>
                  <option value={"NET10"}>10 dias</option>
                  <option value={"NET15"}>15 dias</option>
                  <option value={"NET30"}>30 dias</option>
                  <option value={"NET60"}>60 dias</option>
                  <option value={"NET90"}>90 dias</option>
                </Form.Select>
              </FloatingLabel>
            </div>
          ) : (
            ""
          )}
          <div className="col-12 mt-2">
            <button
              className="btn btn-primary"
              type="button"
              id="button-addon2"
              onClick={() => savePaymentInfo()}
              disabled={isLoadding}
            >
              {isLoadding ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default CheckoutCartPaymentTerms;
