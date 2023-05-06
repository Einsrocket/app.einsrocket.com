import { PaperPlaneTilt } from "phosphor-react";
import style from "./styles.module.css";
import IMG from "./einsrocket.webp";
import IMG2 from "./ai.png";
import { useState, useRef, useEffect } from "react";
import { PulseLoader } from "react-spinners";
import axios from "axios";
import { useDecript } from "../utils/decriptData";

export function Chat() {
    const [messages, setMessages] = useState([]) as any;
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const storageData = useDecript();
    const bottomRef = useRef() as any;

    async function sendMessage() {
        if (input.trim() === "") return;

        setMessages((list: []) => [
            ...list,
            { from: "myself", content: `${input}` },
        ]);

        let url = `${
            import.meta.env.VITE_SERVER_ENDPOINT
        }/assistant/make-question`;
        let obj = {
            user: storageData.username,
            message: input,
        };

        setIsLoading(true);
        setInput("");
        try {
            let res = await axios.post(url, obj);

            setMessages((list: []) => [...list, res.data.result]);

            // console.log(res.data.result);
        } catch (error) {
            console.log(error);
        }

        setIsLoading(false);
    }

    useEffect(() => {
        // 👇️ scroll to bottom every time messages change
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className={style.container}>
            <div className={style.top} ref={bottomRef}>
                {messages?.map(
                    (v: { from: string; content: string }, i: number) => {
                        return (
                            <div
                                key={i}
                                className={
                                    v?.from == "myself"
                                        ? style?.my_message
                                        : style?.ai_message
                                }
                            >
                                <img src={v?.from == "myself" ? IMG : IMG2} />
                                <div>
                                    <p>{v?.content}</p>
                                </div>
                            </div>
                        );
                    }
                )}
                {isLoading && (
                    <div className={style.ai_message}>
                        <img src={IMG2} />
                        <div>
                            <p>
                                <PulseLoader size={8} color="white" />
                            </p>
                        </div>
                    </div>
                )}
            </div>

            <div className={style.bottom}>
                <div className={style.input}>
                    <textarea
                        value={input}
                        placeholder="Mande uma mensagem"
                        onChange={(e) => setInput(e.target.value)}
                    ></textarea>
                    <button onClick={() => sendMessage()}>
                        <PaperPlaneTilt size={32} />
                    </button>
                </div>
                <p>
                    Visualização de pesquisa gratuita. A assitente integrada com
                    o ChatGPT pode produzir informações imprecisas sobre
                    pessoas, lugares ou fatos.
                    <a
                        href="https://help.openai.com/en/articles/6825453-chatgpt-release-notes"
                        target="_blank"
                    >
                        ChatGPT Versão de 3 de maio
                    </a>
                </p>
            </div>
        </div>
    );
}
