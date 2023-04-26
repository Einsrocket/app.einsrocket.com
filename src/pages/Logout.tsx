import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Logoutpage() {
    const navigate = useNavigate();

    async function log_user_out() {
        await localStorage.removeItem("x-access-token");
        await localStorage.removeItem("slug");
        await localStorage.removeItem("first-letter-username");
        await localStorage.removeItem("username");

        navigate("/");
    }

    useEffect(() => {
        log_user_out();
    }, []);
    return <div></div>;
}
