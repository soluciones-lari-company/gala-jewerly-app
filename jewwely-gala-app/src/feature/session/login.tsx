import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import { useNavigate } from "react-router-dom"
import { APIClient, LoginRequest } from "../../api/client/GalaJewerlyClient"

type Props = {}

const Login = ( props: Props) => {
    const authenticated = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLogin = () => {
        const client = new APIClient(import.meta.env.VITE_HOST_API_JEWERLY)
        const request = {
            email: "admin@gala.com",
            password: "C0nnect+1",
            twoFactorCode: undefined,
            twoFactorRecoveryCode: undefined
        } as LoginRequest

        client.login(undefined, undefined, request)
        .then((result) => {
            console.log(result)
            authenticated?.setAuthenticated({authenticated: true, token: result})
            navigate('/')
        }).catch((error) => {
            console.log(error)
            alert("error")
        })
            //        setAuthenticated(true)
            // navigate('/')
        
    }

    return(
        <div><button onClick={handleLogin}>Autenticate</button></div>
    )
}


export default Login;
