import { Alert, AlertHeading, ListGroup, ListGroupItem } from "react-bootstrap";
import { BiRightArrow } from "react-icons/bi";

type IOrderPaymentTerms = {
  paymentTerms: string;
  paymentConditions: string;
};

const OrderPaymentTerms = ({
  paymentTerms,
  paymentConditions,
}: IOrderPaymentTerms) => {
  return (
    <ListGroup className="mt-3 mb-3">
      {paymentTerms === "PUE" ? (
        <ListGroupItem
          action
          className="d-flex align-items-center"
        >
          <i className="ci-message-circle fs-base opacity-75 me-2" />
          COMPRA DE CONTADO
          <BiRightArrow className="ms-auto"></BiRightArrow>
        </ListGroupItem>
      ) : (
        ""
      )}

    {paymentTerms === "PPD" ? (
        <ListGroupItem
          action
          className="d-flex align-items-center"
        >
          <i className="ci-message-circle fs-base opacity-75 me-2" />
          COMPRA PARCIAL - {paymentConditions}
          <BiRightArrow className="ms-auto"></BiRightArrow>
        </ListGroupItem>
      ) : (
        ""
      )}
    </ListGroup>
  );
};

export default OrderPaymentTerms;
