import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Logoutpage() {
    const navigate = useNavigate();

    function log_user_out() {
        localStorage.removeItem("@skylab-einsrocket");

        navigate("/");
    }

    useEffect(() => {
        log_user_out();
    }, []);
    return <div></div>;
}
