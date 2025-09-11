import { Button } from "react-bootstrap";
import { ItemSeriePublicDTO } from "../../../api/client/GalaJewerlyClient";

type IItemCard = {
    serie: ItemSeriePublicDTO
    onSelected: () => void
}

const ItemCard = ({serie, onSelected}:IItemCard) =>{
    return (
        <>
  <div className="col">
            <div className="animate-underline mb-sm-2">
              <a className="hover-effect-opacity ratio ratio-1x1 d-block mb-3" href="shop-product-furniture.html">
                <img src="https://cartzilla-html.createx.studio/assets/img/shop/furniture/01.png" className="hover-effect-target opacity-100" alt="Product"/>
                <img src="https://cartzilla-html.createx.studio/assets/img/shop/furniture/01-hover.jpg" className="position-absolute top-0 start-0 hover-effect-target opacity-0 rounded-4" alt="Room"/>
              </a>
              {/* <div className="d-flex gap-2 mb-3">
                <input type="radio" className="btn-check" name="colors-1" id="color-1-1" checked />
                <label className="btn btn-color fs-base" style={{color: "#32808e"}}>
                  <span className="visually-hidden">Emerald</span>
                </label>
                <input type="radio" className="btn-check" name="colors-1" id="color-1-2"/>
                <label className="btn btn-color fs-base" style={{color: "#767e93"}}>
                  <span className="visually-hidden">Bluish gray</span>
                </label>
                <input type="radio" className="btn-check" name="colors-1" id="color-1-3"/>
                <label className="btn btn-color fs-base" style={{color: "#cd8d01"}}>
                  <span className="visually-hidden">Mustard</span>
                </label>
              </div> */}
              <h3 className="mb-2">
                <a className="d-block fs-sm fw-medium text-truncate" href="shop-product-furniture.html">
                  <span className="animate-target" style={{textWrap: "wrap"}}>{serie.description}</span>
                </a>
              </h3>
              <div className="h6">${serie.saleUnitPrice}</div>
              <div className="d-flex gap-2">
                <Button variant="outline-dark w-100" onClick={() => onSelected()}>Agregar</Button>
              </div>
            </div>
          </div>
        </>
    )
}

export default ItemCard;