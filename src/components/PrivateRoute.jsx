import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const PrivateRoute=({children})=>{
    const {session}=UserAuth();
    return (
        <>{session? children:<Navigate to={'/signup'}/>}</>
    ) 
}
export default PrivateRoute;