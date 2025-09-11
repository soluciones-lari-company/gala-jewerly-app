import { createContext, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AccessTokenResponse } from "../../../api/client/GalaJewerlyClient";
import { GalaUser } from "./GalaUser";
import { UserInfoStorage } from "../../utilities/localstorage/UserInfoStorage";
import { GenProps } from "../../utilities/GenProps";
import { AxiosInstance } from "axios";
import InstanceAxios from "../../../api/client/InstanceAxios";

type IAuthGalaProvider = {
    userInfo: GalaUser|undefined,
    login: (email: string, authResult: AccessTokenResponse) => void
    logout: () => void
    instance: AxiosInstance
}

const AuthGalaContext = createContext<IAuthGalaProvider|null>(null);

const AuthGalaProvider = ({ children }: GenProps) => {
    const instance: AxiosInstance = InstanceAxios();
    const navigate = useNavigate();
    const location = useLocation();
    const redirectPath = location.state?.path || "/cart"

    const [userInfo, setUserInfo] = useState<GalaUser|undefined>(UserInfoStorage.info())

    const login = (email: string, authResult: AccessTokenResponse) => {
        const userAuthenticated = new GalaUser(authResult, email);
        setUserInfo(userAuthenticated)
        UserInfoStorage.init(userAuthenticated)
        navigate(redirectPath, { replace: true });
    }

    const logout = () =>{
        setUserInfo(undefined)
        UserInfoStorage.destroy();
        navigate("/login", { replace: true });
    }

    return (
        <AuthGalaContext.Provider value={{
            userInfo,
            login,
            logout,
            instance
        }}>
            {children}
        </AuthGalaContext.Provider>
    )
}
export default AuthGalaProvider;

export const useGalaAuth = () => {
    return useContext(AuthGalaContext)
}

