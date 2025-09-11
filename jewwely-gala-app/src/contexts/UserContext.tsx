import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import { AccessTokenResponse } from "../api/client/GalaJewerlyClient";
import { useLocation, useNavigate } from "react-router-dom";
import { UserAuthStorage } from "./UserAuthStorage";
import { AxiosInstance } from "axios";
import InstanceAxios from "../api/client/InstanceAxios";

type Props = {
  children?: ReactNode;
};

type IUserContext = {
  userEmail: string;
  instance: AxiosInstance;
  startCookie: (email: string, authResult: AccessTokenResponse) => void;
  removeCookies: () => void;
};

const UserContext = createContext<IUserContext | null>(null);

const UserProvider = ({ children }: Props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const instance: AxiosInstance = InstanceAxios();

  const [userEmail, setUserEmail] = useState<string>("")

  const startCookie = (email: string, authResult: AccessTokenResponse) => {
    setUserEmail(email)
    UserAuthStorage.init(authResult, email)
    navigate("/");
  };

  const removeCookies = () => {
    UserAuthStorage.destroy()
    navigate("/login");
  };

  const value = useMemo(
    () => ({
      userEmail,
      instance,
      startCookie,
      removeCookies,
    }),
    [userEmail]
  );

  useEffect(() => {
    const url = location;
    // console.log(u)
    if (!UserAuthStorage.info().isAuthenticated()) {
      // console.log(url);
      console.warn("user is not authenticated");
      if (!url.pathname.toLocaleLowerCase().includes("login")) {
        navigate("/login", {
          state: {
            urlRef: url.pathname,
          },
        });
      }
    }else{
      if(url.pathname.toLocaleLowerCase().includes("login")){
        navigate("/");
      }
    }
  },[]);

  return (
    <>
    {/* <button onClick={()=>{console.log(UserAuthStorage.info().isAuthenticated())}}>aas</button> */}
      <UserContext.Provider value={value}>{children}</UserContext.Provider>
    </>
  );
};

export { UserContext, UserProvider };
