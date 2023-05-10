import { PaperPlaneTilt } from "phosphor-react";
import style from "./styles.module.css";
import IMG from "./einsrocket.webp";
import IMG2 from "./ai.png";
import { useState, useRef, useEffect } from "react";
import { PulseLoader } from "react-spinners";
import axios from "axios";
import { useDecript } from "../utils/decriptData";

export function Chat() {
    const [messages, setMessages] = useState([
        {
            role: "user",
            content: `Only speak in portuguese, and in english if it is needed! You are suposed to talk only about questions related to the topic of english!`,
        },
    ]) as any;
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const storageData = useDecript();
    const bottomRef = useRef() as any;

    async function sendMessage() {
        if (input.trim() === "") return;

        let _m = messages.map((v: any) => {
            return v;
        });
        _m.push({ role: "user", content: `${input}` });

        setMessages(_m);

        let url = `${
            import.meta.env.VITE_SERVER_ENDPOINT
        }/assistant/make-question`;
        let obj = {
            user: storageData.username,
            message: input,
            messages: _m,
        };

        setIsLoading(true);
        setInput("");
        try {
            let res = await axios.post(url, obj);

            if (res.data.success === true) {
                // console.log(res.data.result.content);
                setMessages((list: []) => [...list, res.data.result]);
            }
        } catch (error) {
            console.log(error);
        }

        setIsLoading(false);
    }

    useEffect(() => {
        // 👇️ scroll to bottom every time messages change
        bottomRef.current.scroll({
            top: bottomRef.current.scrollHeight,
            behavior: "smooth",
        });
    }, [messages]);

    return (
        <div className={style.container}>
            <div className={style.top} ref={bottomRef}>
                {messages?.map(
                    (v: { role: string; content: string }, i: number) => {
                        return (
                            <div
                                key={i}
                                className={
                                    v?.role == "user"
                                        ? style?.my_message
                                        : style?.ai_message
                                }
                                style={{
                                    display:
                                        v?.content ===
                                        "Only speak in portuguese, and in english if it is needed! You are suposed to talk only about questions related to the topic of english!"
                                            ? "none"
                                            : "djs",
                                }}
                            >
                                <img src={v?.role == "user" ? IMG : IMG2} />
                                <div>
                                    <p>{v?.content}</p>
                                    {/* {<Paragraph content={v?.content} />} */}
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
