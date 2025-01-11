import { useContext } from "react";
import { Routes as Router, Route, Navigate, Outlet } from "react-router-dom";
import Login from "../feature/session/login";
import { AuthContext } from "../contexts/AuthContext";
import Home from "../feature/shared/HomeView";

type Props = {}

const PrivateRoutes = () => {
  const authenticated = useContext(AuthContext)
  if(!authenticated?.authenticated.authenticated) return <Navigate to='/login' replace />

  return <Outlet />
}

const Routes = (props: Props) => {
  const { authenticated } = useContext(AuthContext)


  return (
    <Router>
      <Route path='/login' element={<Login />}/>
      <Route element={<PrivateRoutes />}>
        <Route path='/' element={<Home />} />
      </Route>
    </Router>
  )
}

export default Routes