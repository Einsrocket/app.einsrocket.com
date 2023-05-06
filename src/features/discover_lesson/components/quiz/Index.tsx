import { useEffect, useState } from "react";
import style from "./styles.module.css";
import { XCircle } from "phosphor-react";
import { Finished } from "./finished/Index";
import { useDecript } from "../../../utils/decriptData";
import axios from "axios";

const IQuestions = [
    {
        question: "Quem eh o heroi mais foda do mundo?",
        answers: [
            {
                answer: "Frasio",
                isCorrect: false,
            },
            {
                answer: "Fred",
                isCorrect: false,
            },
            {
                answer: "Saitama",
                isCorrect: true,
            },
            {
                answer: "AJ",
                isCorrect: false,
            },
        ],
    },
];

interface IProps {
    close: () => void;
    quiz: string;
    lesson_id: string;
}

export function Quiz({ close, lesson_id, quiz }: IProps) {
    const [Questions, setQuestions] = useState<typeof IQuestions>([]);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [wasQuestionCliqued, setWasQuestionCliqued] = useState(false);
    const [giveFeeadBack, setgiveFeeadBack] = useState(false);
    const [isloading, setIsloading] = useState(true);
    const storageData = useDecript();

    function handleOptionClick(isCorrect: boolean) {
        if (wasQuestionCliqued === false) {
            isCorrect && setScore(score + 1); //if question was correct

            setgiveFeeadBack(true); //giving feedback to the user
        }

        setWasQuestionCliqued(true); //makes it so that the user cannot click again
    }

    function goToNextQuestion() {
        // if questions have not ended
        if (currentQuestion < Questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);

            setgiveFeeadBack(false);
            setWasQuestionCliqued(false);
        } else {
            addConcludedQuiz();
            setFinished(true);
        }
    }

    async function addConcludedQuiz() {
        const obj = {
            user_id: storageData.id,
            lesson_id,
            points: score,
        };

        try {
            let url = `${
                import.meta.env.VITE_SERVER_ENDPOINT
            }/quizes/add-concluded-quiz`;

            let res = await axios.post(url, obj);

            console.log(res.data?.success);
        } catch (error) {
            console.log(error);
        }
    }

    function leaveQuiz() {
        close();
    }

    useEffect(() => {
        async function initialize() {
            setQuestions(JSON.parse(quiz));
            setIsloading(false);
        }

        initialize();
    }, []);

    return (
        <>
            {!isloading && (
                <div className={style.container}>
                    {!finished ? (
                        <div className={style.box}>
                            <div className={style.left}>
                                <h1>
                                    Questão {currentQuestion + 1} de{" "}
                                    {Questions.length}
                                </h1>
                                <p>Seus pontos: {score}</p>
                                <br />
                                <p>{Questions[currentQuestion]?.question}</p>
                            </div>

                            <div
                                className={style.close}
                                onClick={() => leaveQuiz()}
                            >
                                <XCircle size={30} weight="fill" />
                            </div>

                            <div className={style.right}>
                                {Questions[currentQuestion]?.answers?.map(
                                    (value, index) => {
                                        return (
                                            <div
                                                key={index}
                                                style={{
                                                    background:
                                                        giveFeeadBack &&
                                                        value?.isCorrect
                                                            ? "#04d361"
                                                            : "none",
                                                    borderColor:
                                                        giveFeeadBack &&
                                                        value?.isCorrect
                                                            ? "transparent"
                                                            : "#4863f7",
                                                }}
                                                onClick={() =>
                                                    handleOptionClick(
                                                        value?.isCorrect
                                                    )
                                                }
                                            >
                                                {value?.answer}
                                            </div>
                                        );
                                    }
                                )}

                                {giveFeeadBack && (
                                    <button onClick={() => goToNextQuestion()}>
                                        AVANÇAR
                                    </button>
                                )}
                            </div>
                        </div>
                    ) : (
                        <Finished
                            Questions={Questions}
                            score={score}
                            leaveQuiz={() => leaveQuiz()}
                        />
                    )}
                </div>
            )}
        </>
    );
}
