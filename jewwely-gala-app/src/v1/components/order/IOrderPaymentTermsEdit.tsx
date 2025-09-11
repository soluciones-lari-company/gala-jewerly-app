import {
  Accordion,
  Badge,
  FloatingLabel,
  Form,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import {
  AddPaymentInfoToSOCommand,
  SalePaymentDTO,
  SalesOrderClient,
} from "../../../api/client/GalaJewerlyClient";
import { useEffect, useState } from "react";
import { useGalaAuth } from "../../contexts/authentication/AuthGalaProvider";
import { BiArrowToRight, BiRightArrow } from "react-icons/bi";

type IOrderPaymentTermsEdit = {
  idOrder: string;
  onChanges: () => void;
  paymentTerms: string;
  paymentConditions: string;
  payments: SalePaymentDTO[];
};

const OrderPaymentTermsEdit = ({
  idOrder,
  onChanges,
  paymentTerms,
  paymentConditions,
  payments,
}: IOrderPaymentTermsEdit) => {
  const [isLoadding, setIsLoadding] = useState<boolean>(false);
  const [enableEditMode, setEnableEditMode] = useState<boolean>(false);

  const [terms, setTerms] = useState<string>(paymentTerms);
  const [conditions, setConditions] = useState<string>(paymentConditions);
  const user = useGalaAuth();
  // functions
  const savePaymentInfo = (_terms: string, _conditions: string) => {
    setIsLoadding(true);
    const client = new SalesOrderClient(undefined, user?.instance);
    const command = {
      salesOrderId: idOrder,
      paymentTerms: _terms,
      paymentConditions: _conditions,
    } as AddPaymentInfoToSOCommand;

    client
      .addPaymentInfo(idOrder, command)
      .then((result) => {
        onChanges();
        setEnableEditMode(false);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoadding(false));
  };

  useEffect(() => {
    setTerms(paymentTerms);
    setConditions(paymentConditions);
  }, [paymentTerms, paymentConditions]);
  return (
    <>
      <h2 className="h5 mt-1 mb-0">Forma de pago</h2>
      <ListGroup>
        <ListGroupItem
          action
          className="d-flex align-items-center"
          active={terms === "PUE"}
          onClick={() => savePaymentInfo("PUE", "")}
        >
          <i className="ci-message-circle fs-base opacity-75 me-2" />
          COMPRA DE CONTADO
          <BiRightArrow className="ms-auto"></BiRightArrow>
        </ListGroupItem>
      </ListGroup>
      <ListGroup className="mt-3 mb-3">
        <ListGroupItem
          action
          className="d-flex align-items-center"
          active={terms === "PPD" && conditions === "NET00"}
          onClick={() => {
            savePaymentInfo("PPD","NET00");
          }}
        >
          <i className="ci-message-circle fs-base opacity-75 me-2" />
          COMPRA PARCIAL 00 DIAS 
          <BiRightArrow className="ms-auto"></BiRightArrow>
        </ListGroupItem>
        <ListGroupItem
          action
          className="d-flex align-items-center"
          active={terms === "PPD" && conditions === "NET15"}
          onClick={() => {
            savePaymentInfo("PPD","NET15");
          }}
        >
          <i className="ci-message-circle fs-base opacity-75 me-2" />
          COMPRA PARCIAL 15 DIAS 
          <BiRightArrow className="ms-auto"></BiRightArrow>
        </ListGroupItem>
        <ListGroupItem
          action
          className="d-flex align-items-center"
          active={terms === "PPD" && conditions === "NET30"}
          onClick={() => {
            savePaymentInfo("PPD","NET30");
          }}
        >
          <i className="ci-message-circle fs-base opacity-75 me-2" />
          COMPRA PARCIAL 30 DIAS 
          <BiRightArrow className="ms-auto"></BiRightArrow>
        </ListGroupItem>
        <ListGroupItem
          action
          className="d-flex align-items-center"
          active={terms === "PPD" && conditions === "NET60"}
          onClick={() => {
            savePaymentInfo("PPD","NET60");
          }}
        >
          <i className="ci-message-circle fs-base opacity-75 me-2" />
          COMPRA PARCIAL 60 DIAS 
          <BiRightArrow className="ms-auto"></BiRightArrow>
        </ListGroupItem>
      </ListGroup>
      {isLoadding ? "Guardando..." : ""}
    </>
  );
};

export default OrderPaymentTermsEdit;
