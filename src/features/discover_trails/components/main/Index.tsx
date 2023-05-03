import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import style from "./styles.module.css";
import IMG from "./discover-reduced.svg";
import { PaymentModal } from "../../../../components/Modals/payment_Modal/Index.js";
import { LoadingScreen } from "../../../../components/loading_screen/Index.js";
import axios from "axios";
import { useDecript } from "../../../utils/decriptData.ts";

export function DiscoverTails() {
    const navigate = useNavigate();
    const storageData = useDecript();
    const { id } = useParams();
    const [lessonsList, setLessonsList] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [IsLoading, setIsLoading] = useState(true);

    async function getTrailLessons() {
        let url = `${import.meta.env.VITE_SERVER_ENDPOINT}/lessons/get/${id}`;

        try {
            let res = await axios(url);

            if (res.data?.success === true) {
                setLessonsList(res.data?.result);
            }
        } catch (error) {
            console.log(error);
        }

        setIsLoading(false);
    }

    async function check_if_user_is_allowed() {
        let url = `${
            import.meta.env.VITE_SERVER_ENDPOINT
        }/users/check-if-user-paid/${storageData.id}`;

        try {
            let res = await axios(url);
            if (res.data?.success === true) {
                if (res.data?.needToPay === true) {
                    setIsModalVisible(true);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getTrailLessons();
        check_if_user_is_allowed();
    }, []);

    return (
        <>
            {IsLoading ? (
                <LoadingScreen />
            ) : (
                <div className={style.trail}>
                    <div className={style.welcome}>
                        <div>
                            <img src={IMG} alt="" />
                            <p>Aprenda a falar ingles do zero!</p>
                        </div>
                    </div>

                    <div className={style.trail_column}>
                        {lessonsList?.map((value: any) => {
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
            )}
        </>
    );
}
