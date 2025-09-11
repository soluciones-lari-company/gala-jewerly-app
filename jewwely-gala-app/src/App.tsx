import "bootstrap/dist/css/bootstrap.css";
import "./templateVendor.css";
import "./templateStyle.css";
import "./App.css";

import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Routes from "./routing/Routes";
import { UserProvider } from "./contexts/UserContext";
import { CartsProvider } from "./contexts/CartContext";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <CartsProvider>
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </CartsProvider>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
