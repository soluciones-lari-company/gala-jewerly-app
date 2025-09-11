import { Button } from "react-bootstrap";
import { useGalaAuth } from "../../contexts/authentication/AuthGalaProvider";

const UserSession = () => {
    const user = useGalaAuth();
    return (
        <>
        <Button variant="primary" onClick={()=> user?.logout()}>Cerrar sesión</Button>
        </>
    )
}

export default UserSession;