/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, ReactNode, useMemo, useState } from "react";
import { Client, LoginRequest, RefreshRequest } from "../api/client/GalaJewerlyClient";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import AuthClientStore from "./AuthClientStore";
import { Button, Modal } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";
// import { useNavigate } from "react-router-dom";

type Props = {
  children?: ReactNode;
};

type ICookieContext = {
  cookies: { [x: string]: any };
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshSession: () => void;
};

const AuthContext = createContext<ICookieContext | null>(null);

const AuthProvider = ({ children }: Props) => {
  const [cookies, setCookies, removeCookie] = useCookies();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
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
        console.log(jwtDecode(result.accessToken ?? '' ))
        AuthClientStore.setAccessToken(result.accessToken ?? "");
        AuthClientStore.setRefreshToken(result.refreshToken ?? "");
        AuthClientStore.setExpireIn(result.expiresIn ?? 0);

        setCookies("accessToken", result.accessToken); // your token
        setCookies("refreshToken", result.refreshToken); // your token
        setCookies("expiresIn", result.expiresIn); // your token
        setCookies("email", email); // optional data
        navigate("/");
      })
      .catch((error) => {
        console.log(error)
        // if (error.status != undefined && error.status == 401)
        //   alert("usuario o contraseña incorrectas");
        // else alert("error vuelve a intentar");
      });
  };

  const logout = () => {
    ["accessToken", "refreshToken", "expiresIn", "email"].forEach((obj) =>
      removeCookie(obj)
    ); // remove data save in cookies
    navigate("/login");
  };

  const refreshSession = () =>{
    setShow(true)
  }

  const doRefreshToken = () =>{
    const client = new Client();
    const request  = {
      refreshToken:  AuthClientStore.getRefreshToken()
    } as RefreshRequest
    client.postApiIdentityRefresh(request).then((result) => {
      setShow(false)
      AuthClientStore.setAccessToken(result.accessToken ?? "");
      AuthClientStore.setRefreshToken(result.refreshToken ?? "");
      AuthClientStore.setExpireIn(result.expiresIn ?? 0);

      setCookies("accessToken", result.accessToken); // your token
      setCookies("refreshToken", result.refreshToken); // your token
      setCookies("expiresIn", result.expiresIn); // your token
    })
    .catch((error) => {
     
    });
  }

  const value = useMemo(
    () => ({
      cookies,
      login,
      logout,
      refreshSession
    }),
    [cookies]
  );

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Session caducada</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, tu session ha caducado!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={doRefreshToken}>
            Renovar
          </Button>
        </Modal.Footer>
      </Modal>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </>
  );
};

export { AuthContext, AuthProvider };
