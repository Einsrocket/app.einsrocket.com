import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDecript } from "../../../utils/decriptData.ts";

import { PaymentModal } from "../../../../components/Modals/payment_Modal/Index.jsx";
import style from "./styles.module.css";
import { RightDiv } from "../right_div/Index";
import { Comments } from "../comments/Index";
import { Header } from "../header/Index.jsx";
import { LoadingScreen } from "../../../../components/loading_screen/Index.js";
import { VideoComponent } from "../video/Index.tsx";
import { Quiz } from "../quiz/Index.tsx";

export function DiscoverLesson() {
    const { id } = useParams();
    const storageData = useDecript();
    const [lesson, setLesson] = useState([]) as any;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [IsLoading, setIsLoading] = useState(true);
    const [isQuizOpened, setIsQuizOpened] = useState(false);
    const [showQuizButton, setShowQuizButton] = useState(false);
    const [quiz, setQuiz] = useState("");

    async function getLesson() {
        let url = `${
            import.meta.env.VITE_SERVER_ENDPOINT
        }/lessons/lesson/${id}`;

        try {
            let res = await axios(url);

            if (res.data?.success === true) {
                setLesson(res.data?.result);
                setQuiz(res.data.result.quiz);
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

    async function check_if_user_made_quiz() {
        let url = `${
            import.meta.env.VITE_SERVER_ENDPOINT
        }/quizes/check-if-user-made-quiz`;

        try {
            let res = await axios.post(url, {
                user_id: storageData.id,
                lesson_id: id,
            });
            // console.log(res.data);

            if (res.data?.show_quiz_button === true) {
                setShowQuizButton(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        check_if_user_is_allowed();
        getLesson();
        check_if_user_made_quiz();
    }, []);

    return (
        <>
            {IsLoading ? (
                <LoadingScreen />
            ) : (
                <div className={style.container}>
                    <Header />

                    <div className={style.box}>
                        <VideoComponent
                            poster={lesson?.poster}
                            video={lesson?.video}
                        />
                        <RightDiv course_id={lesson?.course_id} />
                    </div>

                    <div className={style.description}>
                        <h1>{lesson?.title}</h1>

                        <span>Descrição</span>

                        <p>
                            {lesson?.description &&
                            lesson?.description?.length > 500
                                ? lesson?.description.substring(0, 499) + "..."
                                : lesson?.description}
                        </p>

                        {showQuizButton && (
                            <button onClick={() => setIsQuizOpened(true)}>
                                FAZER QUIZ
                            </button>
                        )}
                    </div>

                    <Comments id={id} />

                    {isModalVisible && <PaymentModal />}
                </div>
            )}

            {isQuizOpened && (
                <Quiz
                    quiz={quiz}
                    lesson_id={lesson?.id}
                    close={() => {
                        setShowQuizButton(false);
                        setIsQuizOpened(false);
                    }}
                />
            )}
        </>
    );
}
