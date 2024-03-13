import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const RestrictedRoute = ({children}) => {
    const {user} = useAuth()

    if(!user){
        return <Navigate to="/login" replace />
    }

    return children
}

export default RestrictedRoute