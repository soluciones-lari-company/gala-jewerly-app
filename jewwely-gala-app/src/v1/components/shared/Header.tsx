import { Nav, Navbar, Offcanvas } from "react-bootstrap";
import { CiReceipt, CiShoppingCart, CiSun, CiUser, CiWallet } from "react-icons/ci";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="navbar-sticky sticky-top z-fixed px-2 container">
      <Navbar
        className="flex-nowrap bg-body rounded-pill shadow ps-0 mx-1"
        expand="lg"
      >
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Brand
          href="#home"
          className="position-relative z-1 ms-4 ms-sm-5 ms-lg-4 me-2 me-sm-0 me-lg-3"
        >
          Joyeria Gala
        </Navbar.Brand>
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-sm`}
          aria-labelledby={`offcanvasNavbarLabel-expand-sm`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>
              Joyeria Gala
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              {/* <Nav.Link href="#action1">Home</Nav.Link>
              <Nav.Link href="#action2">Link</Nav.Link> */}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
        <div className="d-flex gap-sm-1 position-relative z-1">
                    <Link
            to={`/customer/`}
            type="button"
            aria-label="Shopping cart"
            className="btn btn-icon btn-secondary rounded-circle animate-scale btn-lg fs-lg bg-transparent border-0"
          >
            <CiWallet className="animate-target"></CiWallet>
          </Link>
          <Link
            to={`/inventory/`}
            type="button"
            aria-label="Shopping cart"
            className="btn btn-icon btn-secondary rounded-circle animate-scale btn-lg fs-lg bg-transparent border-0"
          >
            <CiReceipt className="animate-target"></CiReceipt>
          </Link>
          <Link
            to={`/cart/`}
            type="button"
            aria-label="Shopping cart"
            className="btn btn-icon btn-secondary rounded-circle animate-scale btn-lg fs-lg bg-transparent border-0"
          >
            <CiShoppingCart className="animate-target"></CiShoppingCart>
          </Link>
          <div className="dropdown">
            <Link
              to={`/user/`}
              type="button"
              id="react-aria-«R1tifetmlb»"
              aria-expanded="false"
              aria-label="Toggle search bar"
              className="btn btn-icon btn-secondary rounded-circle animate-scale btn-lg fs-lg bg-transparent border-0"
            >
              <CiUser className="animate-target"></CiUser>
            </Link>
          </div>
        </div>
      </Navbar>
    </header>
  );
};

export default Header;
