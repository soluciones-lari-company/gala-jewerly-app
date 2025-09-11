import { Suspense } from "react";
import { Routes as Router, Route, Outlet } from "react-router-dom";
import Login from "../feature/session/login";
import Home from "../feature/shared/HomeView";
import InventoryView from "../feature/inventory/InventoryView";
import ItemSerieList from "../feature/inventory/ItemSerieList";
import ItemSerieEdit from "../feature/inventory/ItemSerieEdit";
import UserNavBar from "../feature/shared/UserNavBar";
import ItemSerieCreatePage from "../feature/inventory/ItemSerieCreatePage";
import CartView from "../feature/Cart/CartView";
import CartStartNewCart from "../feature/Cart/CartStartNewCart";
import CartStartExistsCustomer from "../feature/Cart/CartStartExistsCustomer";
import CartStartNewCustomer from "../feature/Cart/CartStartNewCustomer";
import ItemSerieDetails from "../feature/inventory/ItemSerieDetails";
import ItemSerieNotFound from "../feature/inventory/ItemSerieNotFound";
import CartDetails from "../feature/Cart/CartDetails";
import CheckoutView from "../feature/Checkout/CheckoutView";
import CheckoutViewCart from "../feature/Checkout/views/CheckoutViewCart";
import CheckoutNew from "../feature/Checkout/views/CheckoutNew";
import CheckoutPaymentTerms from "../feature/Checkout/views/CheckoutPaymentTerms";
import CheckoutConfirm from "../feature/Checkout/views/CheckoutConfirm";

const PrivateRoutes = () => {
  return (
    <>
      <header className="header border-bottom">
        <div className="container">
          <div className="row">
            <UserNavBar></UserNavBar>
          </div>
        </div>
      </header>
      <section className="pt-6">
        <div className="container">
          <Outlet />
        </div>
      </section>
      {/* <Footer></Footer> */}
    </>
  );
};

const Loadder = () => {
  return <h4>Cargando.....</h4>;
};

const Routes = () => {
  return (
    <Suspense fallback={<Loadder></Loadder>}>
      {/* <BrowserRouter> */}
      <Router>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/inventario" element={<InventoryView />}>
            <Route index element={<ItemSerieList />}></Route>
            <Route path="serie/:serieId/details" element={<ItemSerieEdit />}></Route>
            <Route path="serie/create-new" element={<ItemSerieCreatePage />}></Route>
          </Route>
          <Route path="/cart" element={<CartView />}>
            <Route index element={<CartStartNewCart />}></Route>
            <Route path="create-with-new-customer" element={<CartStartNewCustomer />}></Route>
            <Route path="create-with-exists-customer" element={<CartStartExistsCustomer />}></Route>
            <Route path="view-cart" element={<CartDetails />}></Route>
          </Route>
          <Route path="/checkout/:idOrder" element={<CheckoutView />}>
            <Route index element={<CheckoutNew/>}></Route>
            <Route path="details"  element={<CheckoutViewCart />}></Route>
            <Route path="payment-terms"  element={<CheckoutPaymentTerms />}></Route>
            <Route path="confirm-order"  element={<CheckoutConfirm />}></Route>
          </Route>
          <Route path="product/:serieId/details" element={<ItemSerieDetails />}></Route>
          <Route path="product/:serieId/not-found" element={<ItemSerieNotFound />}></Route>
        </Route>
      </Router>
      {/* </BrowserRouter> */}
    </Suspense>
  );
};

export default Routes;
