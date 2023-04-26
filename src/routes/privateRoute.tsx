import { Navigate } from "react-router-dom";

export function PrivateRoute({ children }: any) {
    let token = localStorage.getItem("x-access-token");
    // console.log(token);

    return token ? children : <Navigate to="/" />;
}
