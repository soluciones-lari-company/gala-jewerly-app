import React, { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"

type Props = {}

const Home = ( props: Props) => {
    const authenticated = useContext(AuthContext)
    return(
        <div>Home: {authenticated?.authenticated.token?.expiresIn}</div>
    )
}


export default Home;
