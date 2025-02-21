import { useContext } from "react";

import { Navigate } from "react-router-dom";

import { AuthContext } from "../providers/AuthProvider";
import Loading from "../Components/Loading";


const PrivateRoute = ({children}) => {

    const { user, loading }= useContext(AuthContext)

    if(loading){
        return <Loading></Loading>
    }


    if (user && user?.email){
        return children
    }
   
    return (
        <Navigate state={location.pathname} to={"/login"}></Navigate>
    );
};

export default PrivateRoute;