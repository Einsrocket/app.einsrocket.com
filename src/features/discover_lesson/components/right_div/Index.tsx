import { useEffect, useState } from "react";
import axios from "axios";
import style from "./styles.module.css";

interface Props {
    course_id: string;
}

export function RightDiv({ course_id }: Props) {
    const [lessonsList, setLessonsList] = useState([]);

    async function getLessons() {
        let url = `${
            import.meta.env.VITE_SERVER_ENDPOINT
        }/lessons/get/${course_id}`;

        try {
            let res = await axios(url);
            if (res.data?.success === true) {
                setLessonsList(res.data?.result);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getLessons();
    }, []);

    return (
        <div className={style.container}>
            {lessonsList.length > 0 && (
                <div className={style.box}>
                    <h4>Aulas</h4>

                    <div className={style.playlist}>
                        {lessonsList.map((value: any, index) => {
                            return (
                                <a
                                    key={index}
                                    href={`/discover/lesson/${value.id}`}
                                >
                                    <div className={style.playlist_lesson}>
                                        <div>
                                            <span>
                                                {value?.lesson_number} -{" "}
                                                {value?.title}
                                            </span>
                                        </div>
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
