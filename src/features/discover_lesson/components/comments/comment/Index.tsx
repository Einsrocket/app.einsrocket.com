import { Trash } from "phosphor-react";
import style from "./styles.module.css";
import { useDecript } from "../../../../utils/decriptData";
import axios from "axios";
import { useState } from "react";
import { MoonLoader } from "react-spinners";

export function Comment({ value }: any) {
    const storageData = useDecript();
    const [loading, setLoading] = useState(false);
    const [hide, setHide] = useState(false);

    async function deleteComment() {
        setLoading(true);

        try {
            let url = `${
                import.meta.env.VITE_SERVER_ENDPOINT
            }/lessons/delete-comment`;

            let res = await axios.post(url, { id: value.id });
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }

        setLoading(false);
        setHide(true);
    }

    return (
        <>
            {!hide && (
                <div className={style.post_comment}>
                    <div
                        key={value.id}
                        className={style.post_comment_avatar_div}
                    >
                        {value?.author[0]?.toUpperCase()}
                    </div>
                    <div className={style.post_comment_box}>
                        <span className={style.post_comment_username}>
                            {value.author}{" "}
                            {value.author_id == storageData.id && (
                                <>
                                    {loading ? (
                                        <MoonLoader color="#e1e1e6" size={10} />
                                    ) : (
                                        <Trash
                                            color="#e1e1e6"
                                            weight="duotone"
                                            size={16}
                                            onClick={() => deleteComment()}
                                        />
                                    )}
                                </>
                            )}
                        </span>
                        <span className={style.post_comment_comment}>
                            {value.description}
                        </span>
                    </div>
                </div>
            )}
        </>
    );
}
