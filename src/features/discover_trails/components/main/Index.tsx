import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import style from "./styles.module.css";
import IMG from "./discover-reduced.svg";
import { PaymentModal } from "../../../../components/Modals/payment_Modal/Index.js";

export function DiscoverTails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [lessonsList, setLessonsList] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);

    async function getTrailLessons() {
        let token = await localStorage.getItem("x-access-token");
        let url = `${import.meta.env.VITE_SERVER_ENDPOINT}/lessons/get/${id}`;

        await fetch(url, {
            headers: {
                x_access_token: token,
            } as any,
        })
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                if (data?.success === true) {
                    setLessonsList(data?.result);
                }
            })
            .catch((err) => console.log(err));
    }

    async function check_if_user_is_allowed() {
        let token = await localStorage.getItem("x-access-token");
        let url = `${
            import.meta.env.VITE_SERVER_ENDPOINT
        }/users/check-if-user-paid`;

        await fetch(url, {
            headers: {
                x_access_token: token,
            } as any,
        })
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);

                if (data?.token_expired === true) {
                    navigate("/restore_section");
                }
                if (data?.success === true) {
                    if (data?.needToPay === true) {
                        setIsModalVisible(true);
                    }
                }
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        getTrailLessons();
        check_if_user_is_allowed();
    }, []);

    return (
        <div className={style.trail}>
            <div className={style.welcome}>
                <div>
                    <img src={IMG} alt="" />
                    <p>Aprenda a falar ingles do zero!</p>
                </div>
            </div>

            <div className={style.trail_column}>
                {lessonsList &&
                    lessonsList.map((value: any) => {
                        return (
                            <div
                                key={value.id}
                                onClick={() =>
                                    navigate(`/discover/lesson/${value.id}`)
                                }
                                className={style.trail_lesson}
                            >
                                <div className={style.trail_lesson_left}>
                                    <span>{value.lesson_number}</span>
                                </div>
                                <div className={style.trail_lesson_right}>
                                    <strong>{value.title}</strong>
                                    <p>
                                        {value.description &&
                                        value.description.length > 162
                                            ? value.description.substring(
                                                  0,
                                                  160
                                              ) + "..."
                                            : value.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
            </div>

            {isModalVisible && <PaymentModal />}
        </div>
    );
}
