import { Header } from "../components/header/Index";
import { Chat } from "../features/chat/Index";

export function Chatpage() {
    document.title = "Einsrocket | Chat";

    return (
        <div>
            <Header />
            <Chat />
        </div>
    );
}
