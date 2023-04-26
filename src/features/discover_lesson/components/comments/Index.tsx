import { useEffect, useState } from "react";
import { PaperPlaneTilt } from "phosphor-react";

import { Comment } from "../comment/Index";
import style from "./styles.module.css";

export function Comments({ id }: any) {
    const [commentList, setCommentList] = useState([]);
    var [input, setInput] = useState("");

    async function getComments() {
        let lessonId = await id;
        let url = `${
            import.meta.env.VITE_SERVER_ENDPOINT
        }/lessons/get-comments-by-id/${lessonId}`;

        await fetch(url)
            .then((res) => res.json())
            .then((data) => {
                if (data?.success === true) {
                    let reversed = data?.result?.reverse();

                    setCommentList(reversed);
                }
                // console.log(data?.result);
            })
            .catch((err) => console.log(err));
    }

    //handles comment adding
    const handleCommentAdding = async () => {
        if (input.trim() == "") {
            return;
        }

        // values to submit when adding a comment
        const values = {
            author: localStorage.getItem("username"),
            lesson_id: id,
            description: input,
        };
        let url = `${import.meta.env.VITE_SERVER_ENDPOINT}/lessons/add_comment`;

        await fetch(url, {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then(() => {})
            .catch((err) => console.log(err));

        /*refresh the comment list*/
        getComments();

        setInput("");
    };

    useEffect(() => {
        getComments();
    }, []);

    return (
        <div
            style={{
                padding: "0 10%",
            }}
        >
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
                        commentList.map((value: any) => {
                            return <Comment key={value.id} value={value} />;
                        })}
                </div>
            </div>
        </div>
    );
}
