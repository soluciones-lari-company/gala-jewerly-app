import { Link } from "react-router-dom";
import Breadcums from "../../components/shared/Breadcums";

const ChekoutViewCartEdit = () => {
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
        <h1 className="h3 mb-4">Detalle de orden</h1>
        <div className="row">
          <div className="col-lg-8 border">
            
          </div>
          <div className="col-lg-4 border">
            
          </div>
        </div>
      </section>
    </>
  );
};

export default ChekoutViewCartEdit;
