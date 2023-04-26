import { Navigate } from "react-router-dom";

export function Redirect({ children }: any) {
    let token = localStorage.getItem("x-access-token");
    // console.log(token);

    return token ? <Navigate to="/dashboard" /> : children;
}
