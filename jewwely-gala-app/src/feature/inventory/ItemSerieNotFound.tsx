import { useEffect } from "react";
import { useParams } from "react-router-dom";

const ItemSerieNotFound = () => {
    const { serieId } = useParams();
    useEffect(() =>{

    })
  return (
    <div className="d-flex align-items-center py-4  h-100">
      <main className="form-signin w-100 m-auto">
        <form>
          {/* <img className="mb-4" src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" /> */}
          <h1 className="h1 mb-3 fw-normal">Gala Joyería</h1>
          <hr />
          <h1 className="h3 mb-3 fw-normal">Producto <strong className="text-red">"{serieId}"</strong>  no encontrado</h1>

          
          <p className="mt-5 mb-3 text-body-secondary">&copy; 2017–2024</p>
        </form>
      </main>
    </div>
  );
};

export default ItemSerieNotFound;
