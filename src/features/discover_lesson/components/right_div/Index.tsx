import { useEffect, useState } from "react";

import style from "./styles.module.css";

interface Props {
    course_id: string;
}

export function RightDiv({ course_id }: Props) {
    const [lessonsList, setLessonsList] = useState([]);

    async function getLessons() {
        let token = await localStorage.getItem("x-access-token");
        let url = `${
            import.meta.env.VITE_SERVER_ENDPOINT
        }/lessons/get/${course_id}`;

        await fetch(url, {
            headers: {
                x_access_token: token,
            } as any,
        })
            .then((res) => res.json())
            .then((data) => {
                // console.log(data.result[0]);
                if (data?.success === true) {
                    setLessonsList(data?.result);
                }
            })
            .catch((err) => console.log(err));
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
