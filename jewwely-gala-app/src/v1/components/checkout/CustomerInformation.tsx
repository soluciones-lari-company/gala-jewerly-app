import { CustomerDTO } from "../../../api/client/GalaJewerlyClient";

type ICustomerInformation = {
    customer: CustomerDTO 
};

const CustomerInformation = ({customer}: ICustomerInformation) => {
  return (
    <div className="  mb-1">
      <div className="p-3 bg-light bg-opacity-10">
        <h6 className="card-title mb-3">Informacion del cliente</h6>
        <span className="mb-1 small">{customer.name}</span>
      </div>
    </div>
  );
};

export default CustomerInformation;
