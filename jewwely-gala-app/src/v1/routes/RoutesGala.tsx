import { Routes as Router, Route, Outlet, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import AuthGalaProvider, {
  useGalaAuth,
} from "../contexts/authentication/AuthGalaProvider";
import Login from "../pages/authentication/Login";
import AuthTheme from "../theme/AuthTheme";
import UnAuthTheme from "../theme/UnAuthTheme";
import ChekoutViewCartList from "../pages/checkout/ChekoutViewCartList";
import CheckoutIndex from "../pages/checkout/CheckoutIndex";
import CheckoutViewCart from "../pages/checkout/ChekoutViewCart";
import CheckoutHandler from "../pages/checkout/CheckoutHandler";
import CheckoutPaymentTerms from "../pages/checkout/OrderPaymentTerms";
import CheckoutPayments from "../pages/checkout/CheckoutPayments";
import CheckoutConfirm from "../pages/checkout/CheckoutConfirm";
import CheckoutSubmited from "../pages/checkout/CheckoutSubmited";
import CheckoutNewCart from "../pages/checkout/CheckoutNewCart";
import UserSession from "../pages/authentication/UserSession";
import CreateSerie from "../pages/inventory/CreateSerie";
import InventoryIndex from "../pages/inventory/InventoryIndex";
import InventorySerieEdit from "../pages/inventory/InventorySerieEdit";
import Step3Payment from "../pages/checkout/Step3Payment";
import Step3AddPayments from "../pages/checkout/Step3AddPayments";
import Step4Confirm from "../pages/checkout/Step4Confirm";
import ViewCart from "../pages/checkout/ViewCart";
import Step5OrderSubmitted from "../pages/checkout/Step5OrderSubmitted";
import CustomerList from "../pages/customer/CustomerList";

const PrivateRoute = () => {
  const user = useGalaAuth();
  if (user?.userInfo === undefined) return <Navigate to="/login" />;
  return (
    <AuthTheme>
      <Outlet />
    </AuthTheme>
  );
};

const RoutesGala = () => {
  return (
      <AuthGalaProvider>
        <Router>
          <Route path="/login" element={<UnAuthTheme><Login /></UnAuthTheme>} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/user" element={<UserSession />} />
            <Route path="/cart"  element={<CheckoutHandler/>}>
                <Route index  element={<ChekoutViewCartList />} />
                <Route path="new-cart"  element={<CheckoutNewCart />} />
                <Route path=":idOrder" element={<CheckoutIndex />}>
                  <Route index element={<ViewCart />} />
                  
                  <Route path="payment-terms" element={<CheckoutPaymentTerms />} />
                  <Route path="payment-list" element={<CheckoutPayments />} />
                  <Route path="confirm" element={<CheckoutConfirm />} />
                  <Route path="submited" element={<CheckoutSubmited />} />


                  <Route path="Step3Payment" element={<Step3Payment />} />
                  <Route path="Step3AddPayments" element={<Step3AddPayments />} />
                  <Route path="Step4Confirm" element={<Step4Confirm />} />
                  <Route path="Step5OrderSubmitted" element={<Step5OrderSubmitted />} />
                </Route>
            </Route>
            <Route path="/inventory/" element={<InventoryIndex />} />
            <Route path="/inventory/create-serie" element={<CreateSerie />} />
            <Route path="/inventory/serie/:serieId" element={<InventorySerieEdit />} />
            <Route path="/customer/" element={<CustomerList />} />
          </Route>
          {/* Other routes */}
        </Router>
      </AuthGalaProvider>
  );
};

export default RoutesGala;
