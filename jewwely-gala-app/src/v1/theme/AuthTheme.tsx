import { Container } from "react-bootstrap";
import Footer from "../components/shared/Footer";
import Header from "../components/shared/Header";
import { GenProps } from "../utilities/GenProps";

const AuthTheme = ({ children }: GenProps) => {
  return (
    <>
      <div className="position-relative d-flex justify-content-between z-1 py-3 container">
        <div className="animate-underline nav">
          <span className="text-secondary-emphasis fs-xs me-1">
            Contactanos <span className="d-none d-sm-inline">24/7</span>
          </span>
          <a
            href="tel:+524481695819"
            data-rr-ui-event-key="tel:+524481695819"
            className="animate-target fs-xs fw-semibold p-0 nav-link"
          >
            +52 448 169 58 19
          </a>
        </div>
        <a
          className="text-secondary-emphasis fs-xs text-decoration-none d-none d-md-inline"
          href="#"
        >
          🔥 Encuentra magnificos descuentos pronto, con tu Joyeria de confianza
        </a>
        <ul className="gap-4 nav">
          {/* <li className="animate-underline">
            <a
              data-rr-ui-event-key="#"
              className="animate-target fs-xs p-0 nav-link"
              href="#"
            >
              Wishlist
            </a>
          </li>
          <li className="animate-underline">
            <a
              data-rr-ui-event-key="#"
              className="animate-target fs-xs p-0 nav-link"
              href="#"
            >
              Account
            </a>
          </li> */}
        </ul>
      </div>
      <Header></Header>
      <main className="content-wrapper">
        <Container >
        {children}
        </Container>
      </main>
      <Footer></Footer>
    </>
  );
};

export default AuthTheme;
