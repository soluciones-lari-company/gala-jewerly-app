/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import {
  AccessTokenResponse,
  Client,
  CreateSalesOrderCommand,
  LoginRequest,
  RefreshRequest,
  SalesOrderClient,
  SalesOrderDTO,
} from "../api/client/GalaJewerlyClient";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import AuthClientStore from "./AuthClientStore";
import { AxiosInstance } from "axios";
import InstanceAxios from "../api/client/InstanceAxios";
import CartOffCanvas from "../feature/Cart/CartOffCanvas";
import SesssionModalRefreshToken from "../feature/session/SesssionModalRefreshToken";

type Props = {
  children?: ReactNode;
};

type ICookieContext = {
  instance: AxiosInstance;
  handeShowCart: () => void;
  handleHideCart: () => void;
  carts: SalesOrderDTO[];
  addNewCart: (command: CreateSalesOrderCommand) => void;
  cartSelected: string;
  HandleCartSelected: (id: string) => void;
};

const AuthContext = createContext<ICookieContext | null>(null);

const AuthProvider = ({ children }: Props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const instance: AxiosInstance = InstanceAxios();

  // variables for navoff for cart details
  const [showCart, SetShowCart] = useState(false)
  const handeShowCart = () => SetShowCart(true)
  const handleHideCart = () => SetShowCart(false)
  const [carts,SetCarts] = useState<SalesOrderDTO[]>([])
  const [cartSelected, setCartSelected] = useState<string>("")

  const HandleCartSelected = (id: string) => {
    setCartSelected(id);
    AuthClientStore.setCartSelectedId(id);
  }

  const refreshSession = () => {
    const client = new Client();
    const request = {
      refreshToken: AuthClientStore.getRefreshToken(),
    } as RefreshRequest;
    client
      .postApiIdentityRefresh(request)
      .then((result) => {
        setShow(false);
        startTimer();
      })
      .catch((error) => {});
  };

  const startTimer = () => {
    // if (cookies["accessToken"] != undefined) {
    //   const timer = setInterval(() => {
    //     const date = new Date();
    //     const dateExpireIn = AuthClientStore.getDateExpireIn() ?? new Date();
    //     // console.log({date,dateExpireIn})
    //     if (dateExpireIn === null) {
    //       clearInterval(timer);
    //       setShow(true);
    //     }

    //     if (dateExpireIn < date) {
    //       clearInterval(timer);
    //       setShow(true);
    //     }
    //   }, 1000);
    // }
  };

  const listCartsOpen = () => {
    const client = new SalesOrderClient(undefined, instance);

    client.getSalesOrdersOpen().then((result) => {
      SetCarts(result)
    })
    .catch(() => {});
  }

  const addNewCart = (command: CreateSalesOrderCommand) =>{
    const client = new SalesOrderClient(undefined, instance);

    client.create(command).then((result) => {
      // console.log(result)
      listCartsOpen()
    })
    .catch(() => {});
  }



  const value = useMemo(
    () => ({
      refreshSession,
      instance,
      handeShowCart,
      carts,
      handleHideCart,
      addNewCart,
      cartSelected,
      HandleCartSelected
    }),
    [carts, cartSelected]
  );

  // useEffect(() => {
  //   listCartsOpen();
  //     const _cartselected = AuthClientStore.getCartSelectedId();
  //     if(_cartselected != undefined && _cartselected.trim() !== ""){
  //       setCartSelected(_cartselected);
  //     }
  // }, []);

  return (
    <>
      <AuthContext.Provider value={value}>
        {/* <SesssionModalRefreshToken show={show} onHide={handleClose}></SesssionModalRefreshToken> */}
        {/* <CartOffCanvas  show={showCart} onHide={handleHideCart}></CartOffCanvas> */}
        {children}
        {/* <div>{AuthClientStore.getLoggedAt() } / {AuthClientStore.getDateExpireIn()?.toLocaleString()}</div> */}
      </AuthContext.Provider>
    </>
  );
};

export { AuthContext, AuthProvider };
