import { createContext, ReactNode, useState } from "react";
import { AccessTokenResponse } from "../api/client/GalaJewerlyClient";
// import { useNavigate } from "react-router-dom";

type Props = {
    children?: ReactNode;
  }
  
  type IAuthInfo = {
    authenticated: boolean;
    token: AccessTokenResponse|null
  }

  type IAuthContext = {
    authenticated: IAuthInfo;
    setAuthenticated: (newState: IAuthInfo) => void,  
  }
  
//   const initialValue = {
//     authenticated: false,
//     setAuthenticated: () => {}
//   }
  
  const AuthContext = createContext<IAuthContext|null>(null)
  
  const AuthProvider = ({children}: Props) => {
    //Initializing an auth state with false value (unauthenticated)
    const [ authenticated, setAuthenticated ] = useState<IAuthInfo>({authenticated: false, token: null})
  
    // const navigate = useNavigate()
  
    return (
      <AuthContext.Provider value={{authenticated, setAuthenticated}}>
        {children}
      </AuthContext.Provider>
    )
  }
  
  export {  AuthContext, AuthProvider }