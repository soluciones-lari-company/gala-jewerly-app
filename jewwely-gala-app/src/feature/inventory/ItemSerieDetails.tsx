import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import {
  ItemSerieClient,
  ItemSeriePublicDTO,
} from "../../api/client/GalaJewerlyClient";
import { UserContext } from "../../contexts/UserContext";
import { CartsContext } from "../../contexts/CartContext";

const ItemSerieDetails = () => {
  const contextAuth = useContext(AuthContext);
  const cartContext = useContext(CartsContext)
  const navigate = useNavigate();

  const { serieId } = useParams();
  const [serie, setSerie] = useState<ItemSeriePublicDTO>(new ItemSeriePublicDTO());

  const getSerialDetails = async () => {
    if (serieId != undefined) {
      const serieIdValue = serieId === undefined ? "" : serieId;
      const client = new ItemSerieClient(undefined, contextAuth?.instance);

      client
        .getBySerieCode(serieIdValue)
        .then(async (result) => {
          setSerie(result);
        })
        .catch((error) => {
            if(error.status && error.status === 404){
                navigate(`/product/${serieId}/not-found`);
            }
        });
    }
  };

  useEffect(() => {
    getSerialDetails();
  }, []);

  return (
    <div className="row gutter-2 gutter-md-4 justify-content-between">
      <div className="col-lg-7">
        <div className="row gutter-1 justify-content-between">
          <div className="col-lg-10 order-lg-2">
            <div
              className="owl-carousel owl-carousel--alt gallery"
              data-margin="0"
              data-slider-id="1"
              data-thumbs="true"
              data-nav="true"
              style={{ display: "block" }}
            >
              <figure>
                <a href="https://img.gala-joyeria.com/sample.jpg">
                  <img
                    src="https://img.gala-joyeria.com/sample.jpg"
                    alt="Image"
                  />
                </a>
              </figure>
            </div>
          </div>
          <div className="col-lg-2 text-center text-lg-left order-lg-1">
            <div className="owl-thumbs" data-slider-id="1">
              <span className="owl-thumb-item">
                <img src="https://img.gala-joyeria.com/sample.jpg" alt="" />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-4 mb-5 mb-lg-0">
        <div className="row">
          <div className="col-12">
            <span className="eyebrow text-muted">
              {serie.material?.materialName}
            </span>
            <h2>{serie.description}</h2>
            <span className="price fs-30 underlined">${serie.saleUnitPrice}</span>
          </div>
        </div>

        <div className="row gutter-2">
          <div className="col-12">
            <div className="form-group">
              <label>Descripcion</label>
              <ul className="list list--unordered">
                {serie.featureValues?.map((feature) =>{
                    return(
                        <li key={`${feature.feature}${feature.value}`}><strong>{feature.feature}</strong>: {feature.value}</li>
                    )
                })}
                
              </ul>
            </div>
          </div>
          <div className="col-12">
            <div className="form-group">
              <label>Codigo del producto</label>
              <small className="d-block text-dark">{serie.serieCode}</small>
            </div>
          </div>
          <div className="col-12">
            <button  className="btn btn-block btn-primary" onClick={() => { cartContext?.addLineToCart(serie.id ?? "", 1) }}>
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemSerieDetails;
