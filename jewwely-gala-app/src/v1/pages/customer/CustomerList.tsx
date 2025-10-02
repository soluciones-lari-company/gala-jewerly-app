import { Link } from "react-router-dom";
import Breadcums from "../../components/shared/Breadcums";

const CustomerList = () => {
  return (
    <>
      <Breadcums>
        <ul>
          <li>
            <Link to={"./"}>Inicio</Link>
          </li>
          <li className="active">Lista de carritos</li>
        </ul>
      </Breadcums>
      <section className="pb-5 mb-2 mb-md-3 mb-lg-4 mb-xl-5 container">
        <h1 className="h3 mb-4">Lista de clientes</h1>
        <div className="row">
          <div className="col-lg-8"></div>
          <div className="col-lg-4"></div>
        </div>
      </section>
    </>
  );
};

export default CustomerList;
