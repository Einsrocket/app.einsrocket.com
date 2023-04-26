import { useNavigate } from "react-router-dom";
import style from "./styles.module.css";

interface Props {
    avatar?: string;
    title?: string;
    description?: string;
    first_topic?: string;
    second_topic?: string;
    id?: string;
    third_topic?: string;
}

export function DiscoverCourse({
    avatar,
    title,
    description,
    id,
    first_topic,
    second_topic,
    third_topic,
}: Props) {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/discover/trails/${id}`)}
            className={style.discover_course}
        >
            <div className={style.discover_course_left}>
                <div className={style.discover_course_left_row}>
                    <img src={avatar}></img>
                    <div>
                        <span>{title}</span>
                        <p>{description}</p>
                    </div>
                </div>
            </div>
            <div className={style.discover_course_right}>
                <div className={style.discover_course_right_topics}>
                    <p>{first_topic}</p>
                    <p>{second_topic}</p>
                    <p>{third_topic}</p>
                </div>
            </div>
        </div>
    );
}
