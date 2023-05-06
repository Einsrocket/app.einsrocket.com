import { useNavigate } from "react-router-dom";
import style from "./styles.module.css";
import { Chat } from "phosphor-react";

export function ChatButton() {
    const navigate = useNavigate();
    return (
        <button className={style.container} onClick={() => navigate("/chat")}>
            <Chat size={40} weight="fill" color="white" />
        </button>
    );
}
