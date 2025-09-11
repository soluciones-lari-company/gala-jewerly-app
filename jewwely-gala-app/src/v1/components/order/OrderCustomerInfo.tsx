import { useEffect } from "react";
import { CustomerDTO } from "../../../api/client/GalaJewerlyClient";

type IOrderCustomerInfo = {
  customer: CustomerDTO | undefined;
};

const OrderCustomerInfo = ({ customer }: IOrderCustomerInfo) => {
  useEffect(() => {}, [customer]);

  if (customer === undefined) {
    return "loadding customer info";
  }

  return (
    <>
      <h2 className="h5 mb-2">Cliente</h2>
      <div id="infoPreview" className="collapse show mb-3">
        <ul className="list-unstyled fs-sm m-0">
          <li>{customer.name}</li>
          <li>{customer.phoneNumber}</li>
        </ul>
      </div>
    </>
  );
};

export default OrderCustomerInfo;
