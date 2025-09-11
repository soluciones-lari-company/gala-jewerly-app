import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Spinner } from "react-bootstrap";
import { UserContext } from "../../contexts/UserContext";
import { Client, LoginRequest } from "../../api/client/GalaJewerlyClient";

const Login = () => {
  const cookie = useContext(AuthContext);
  const userContx = useContext(UserContext);

  const [email, setemail] = useState("admin@gala.com");
  const [password, setPassword] = useState("C0nnect+1");
  const [startLogin, SetStartLogin] = useState(false);

  const handleLogin = () => {
    SetStartLogin(true);
    const client = new Client();
    const request = {
      email: email,
      password: password,
      twoFactorCode: undefined,
      twoFactorRecoveryCode: undefined,
    } as LoginRequest;

    client
      .postApiIdentityLogin(request, undefined, undefined)
      .then((result) => {
        userContx?.startCookie(email, result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="d-flex align-items-center py-4 bg-body-tertiary h-100">
        <main className="form-signin w-100 m-auto">
          <form>
            {/* <img className="mb-4" src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" /> */}
            <h1 className="h1 mb-3 fw-normal">Gala Joyería</h1>
            <hr />
            <h1 className="h3 mb-3 fw-normal">Inicia sessión</h1>

            <div className="form-floating">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
              <label>Usuario</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label>Contraseña</label>
            </div>
            <button
              className="btn btn-primary w-100 py-2"
              type="button"
              onClick={handleLogin}
            >
              {startLogin ? <Spinner animation="border" /> : "Ingresar"}
            </button>
            <p className="mt-5 mb-3 text-body-secondary">&copy; 2017–2024</p>
          </form>
        </main>
      </div>
    </>
  );
};

export default Login;
