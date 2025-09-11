import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { BsCart2, BsPerson } from "react-icons/bs";
import { UserContext } from "../../contexts/UserContext";
import { CartsContext } from "../../contexts/CartContext";

const UserNavBar = () => {
  const userContext = useContext(UserContext);
  const cartContex = useContext(CartsContext);
  const logout = () => {
    userContext?.removeCookies();
  };

  return (
    <Navbar expand="lg">
      <Link to="/" className="navbar-brand order-1 order-lg-2">
        Buscador
      </Link>
      <Navbar.Collapse className="order-4 order-lg-1" id="navbarMenu">
        <Nav className="mr-auto">
          <Nav.Item>
            {/* <Nav.Link href="./invkcentario">Inventario</Nav.Link> */}
            <Link to="/inventario" className="nav-link">
              Inventario
            </Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>

      <Navbar.Collapse className="order-5 order-lg-3" id="navbarMenu2">
        <Nav className="navbar-nav ml-auto position-relative">
          <NavDropdown
            title={<BsPerson />}
            id="basic-nav-dropdown"
            className="dropdown-md dropdown-hover"
          >
            <div className="row gutter-2">
              <div className="col-12">
                <fieldset>
                  <div className="row">
                    <div className="col-12">
                      <h4>{userContext?.userEmail}</h4>
                      {/* <div className="form-label-group">
                        <input
                          type="text"
                          id="inputName"
                          className="form-control form-control-lg"
                          placeholder="Name"
                          value="Dumitru"
                        />
                        <label>First Name</label>
                      </div> */}
                    </div>
                  </div>
                  <div className="row">
                    {/* <div className="col-12">
                      <div className="form-label-group">
                        <input
                          type="text"
                          id="inputSurname"
                          className="form-control form-control-lg"
                          placeholder="Surname"
                        />
                        <label>Surname</label>
                      </div>
                    </div> */}
                  </div>
                </fieldset>
              </div>
              {/* <div className="col-12 text-center">
                <a href="" className="underline fs-14">
                  Forgot Password ?
                </a>
              </div> */}
              <div className="col-12">
                <button className="btn btn-primary btn-block" onClick={logout}>
                  Cerrar Sessión
                </button>
              </div>
            </div>
          </NavDropdown>
          <Nav.Item>
            <a
              onClick={() => cartContex?.handeShowCart(true)}
              className="nav-icon text-danger"
            >
              <BsCart2 />
            </a>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>

      <div className="order-2 d-flex d-lg-none" id="navbarMenuMobile">
        <Nav className="navbar-nav navbar-nav--icons ml-auto position-relative">
          <Nav.Item>
            {/* <Link to="/inventario" className="nav-icon">
              <i className="icon-search"></i>
            </Link> */}
          </Nav.Item>
          <Nav.Item>
            <a
              onClick={() => cartContex?.handeShowCart(true)}
              className="nav-icon"
            >
              <BsCart2 />
            </a>
          </Nav.Item>
        </Nav>
      </div>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
    </Navbar>
  );
};

export default UserNavBar;
