import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"

type Props = {}

const Home = ( props: Props) => {
    const cookie = useContext(AuthContext)
    const logout = () =>{
        cookie?.logout()
    }
    return(
        <div className="row">
            home
        </div>
    )
}


export default Home;
