import { Suspense, useContext } from "react";
import {
  Routes as Router,
  Route,
  Navigate,
  Outlet,
  BrowserRouter,
} from "react-router-dom";
import Login from "../feature/session/login";
import { AuthContext } from "../contexts/AuthContext";
import Home from "../feature/shared/HomeView";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import InventoryView from "../feature/inventory/InventoryView";
import ItemSerieList from "../feature/inventory/ItemSerieList";
import ItemSerieEdit from "../feature/inventory/ItemSerieEdit";
// import ItemSerieList from "../feature/inventory/ItemSerieList";

const PrivateRoutes = () => {
  const cookies = useContext(AuthContext);

  if (cookies?.cookies["accessToken"] == undefined) {
    return <Navigate to="/login" replace />;
  }

  const logout = () => {
    cookies?.logout();
  };

  return (
    <>
      <main>
        <div className="container">
          <Navbar expand="lg" sticky="top" bg="light" data-bs-theme="light" className="justify-content-md-center">
            <Container fluid className="">
              <Navbar.Brand href="#home">Gala Joyería</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav" className="text-end">
                <Nav className="me-auto">
                  <Nav.Link href="./inventario">Inventario</Nav.Link>
                  <Nav.Link href="#link">Link</Nav.Link>
                  <NavDropdown
                    title={cookies?.cookies["email"]}
                    id="basic-nav-dropdown"
                  >
                    <NavDropdown.Item href="#action/3.1">
                      Action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">
                      Something
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logout}>
                      Cerrar sessión
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <div className="mt-3">
            <div className="">
              <Outlet />
            </div>
            <footer className="pt-5 my-5 text-muted border-top">
              Created by the Gala Joyeria team · © 2021
            </footer>
          </div>
        </div>
      </main>
    </>
  );
};

const Loadder = () => {
  return <h4>Cargando.....</h4>;
};

const Routes = () => {
  //   const { authenticated } = useContext(AuthContext)

  return (
    <Suspense fallback={<Loadder></Loadder>}>
      {/* <BrowserRouter> */}
      <Router>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/inventario" element={<InventoryView />}>
            <Route index element={<ItemSerieList />}></Route>
            <Route
              path="serie/:serieId/details"
              element={<ItemSerieEdit />}
            ></Route>
          </Route>
        </Route>
      </Router>
      {/* </BrowserRouter> */}
    </Suspense>
  );
};

export default Routes;
