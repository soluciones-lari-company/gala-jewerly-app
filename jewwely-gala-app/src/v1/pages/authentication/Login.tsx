import { useState } from "react";
import { Client, LoginRequest } from "../../../api/client/GalaJewerlyClient";
import { useGalaAuth } from "../../contexts/authentication/AuthGalaProvider";
import { Spinner } from "react-bootstrap";

const Login = () => {
  const user = useGalaAuth();

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
        user?.login(email, result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <main className="form-signin mt-5">
        <form >
          Joyería Gala
          <h1 className="h3 mb-3 fw-normal">Bienvenidos</h1>
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
            <label htmlFor="floatingInput">Correo</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="floatingPassword">Contraseña</label>
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="button" onClick={() => handleLogin()}>
          {startLogin ? <Spinner animation="border" /> : "Ingresar"}
          </button>
          <p className="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
        </form>
      </main>
    </>
  );
};

export default Login;
