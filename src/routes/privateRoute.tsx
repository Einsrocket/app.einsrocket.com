import { Navigate } from "react-router-dom";

export function PrivateRoute({ children }: any) {
    let token = localStorage.getItem("@skylab-einsrocket");
    // console.log(token);

    return token ? children : <Navigate to="/" />;
}
