import { useEffect, useState } from "react";
import { PaperPlaneTilt } from "phosphor-react";
import axios from "axios";
import { useDecript } from "../../../utils/decriptData.ts";

import { Comment } from "./comment/Index.tsx";
import style from "./styles.module.css";

export function Comments({ id }: any) {
    const [commentList, setCommentList] = useState([]) as any;
    var [input, setInput] = useState("");

    async function getComments() {
        let lessonId = await id;
        let url = `${
            import.meta.env.VITE_SERVER_ENDPOINT
        }/lessons/get-comments-by-id/${lessonId}`;

        try {
            let res = await axios(url);

            if (res.data?.success === true) {
                setCommentList(res.data?.result);
            }
        } catch (error) {
            console.log(error);
        }
    }

    //handles comment adding
    const handleCommentAdding = async () => {
        if (input.trim() == "") {
            return;
        }

        // values to submit when adding a comment
        const values = {
            author: useDecript().username,
            author_id: useDecript().id,
            lesson_id: id,
            description: input,
        } as any;
        let url = `${import.meta.env.VITE_SERVER_ENDPOINT}/lessons/add_comment`;

        try {
            await axios.post(url, values);
            setCommentList((list: []) => [values, ...list]);
        } catch (error) {
            console.log(error);
        }

        setInput("");
    };

    useEffect(() => {
        getComments();
    }, []);

    return (
        <div className={style.main_container}>
            <div className={style.container}>
                <div className={style.input_box}>
                    <div>
                        <input
                            type="text"
                            placeholder="Adicionar comentario"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button
                            onClick={() => {
                                handleCommentAdding();
                            }}
                        >
                            <PaperPlaneTilt
                                color="hsl(214, 20%, 69%)"
                                size={30}
                            />
                        </button>
                    </div>
                </div>

                <div className={style.comment_box}>
                    {commentList.length > 0 &&
                        commentList.map((value: any, index: number) => {
                            return <Comment key={index} value={value} />;
                        })}
                </div>
            </div>
        </div>
    );
}
