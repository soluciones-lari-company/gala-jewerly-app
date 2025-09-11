import { Link } from "react-router-dom";

const CartCeroCarts = () =>{
    return(
        <div className="row">
            <div className="col-sm-12 empty-cart-cls text-center">
              <img
                src="https://lizotel.pt/optimal-html/assets/images/sad-icon.png"
                width="130"
                height="130"
                className="img-fluid mb-4 "
              />
              <h3>
                <strong>Sin carritos!</strong>
              </h3>
              <h6>Crea uno nuevo!</h6>
                <Link to="/cart"  className="btn btn-primary cart-btn-transform m-3">
                Crear nuevo
                </Link>
            </div>
        </div>
    )
}

export default CartCeroCarts;