import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ItemSearch = () => {
      const navigate = useNavigate();
const [serieCode, setSerieCode] = useState<string>("")
  return (
    <div className="d-flex align-items-center py-4  h-100">
      <main className="col-lg-5 col-12 w-100 m-auto">
          {/* <img className="mb-4" src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" /> */}
          <h1 className="h1 mb-3 fw-normal">Gala Joyería</h1>
          <hr />
          <h1 className="h3 mb-3 fw-normal">Buscador</h1>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="..."
              value={serieCode}
              onChange={(e) => { setSerieCode(e.target.value) }}

/>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {navigate(`/product/${serieCode}/details`)}}
            >
              Buscar
            </button>
          </div>
          
          <p className="mt-5 mb-3 text-body-secondary">&copy; 2017–2024</p>
      </main>
    </div>
  );
};

export default ItemSearch;
