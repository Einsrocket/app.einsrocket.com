import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Play, Pause, CornersOut } from "phosphor-react";

import { PaymentModal } from "../../../../components/Modals/payment_Modal/Index.jsx";
import style from "./styles.module.css";
// import VV from "./e.mp4";
import { RightDiv } from "../right_div/Index";
import { Comments } from "../comments/Index";
import { Header } from "../header/Index.jsx";
import { LoadingScreen } from "../../../../components/loading_screen/Index.js";

export function DiscoverLesson() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [lesson, setLesson] = useState([]) as any;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [IsLoading, setIsLoading] = useState(true);

    const [playerState, setPlayerState] = useState({
        playing: false,
        percentage: 0,
        fullscreen: false,
    });
    const videoRef = useRef() as any;

    async function toggleVideoPlay() {
        playerState.playing
            ? videoRef?.current?.pause()
            : videoRef?.current?.play();

        setPlayerState({
            ...playerState,
            playing: !playerState.playing,
        });
    }
    async function handleVideoTimeUpdate() {
        let currentPercentage =
            (videoRef.current.currentTime / videoRef.current.duration) * 100;

        setPlayerState({
            ...playerState,
            percentage: currentPercentage,
        });
    }
    async function handleChangeVideoPercentage(e: any) {
        let currentPercentage = e.target.value;

        videoRef.current.currentTime =
            (videoRef.current.duration / 100) * currentPercentage;

        setPlayerState({
            ...playerState,
            percentage: currentPercentage,
        });
    }
    async function handleChangeVideoFullscreen() {
        if (playerState.fullscreen === false) {
            videoRef.current.requestFullscreen();
        } else {
            if (videoRef.current.exitFullscreen) {
                videoRef.current.exitFullscreen();
            } else if (videoRef.current.webkitExitFullscreen) {
                /* Safari */
                videoRef.current.webkitExitFullscreen();
            } else if (videoRef.current.msExitFullscreen) {
                /* IE11 */
                videoRef.current.msExitFullscreen();
            }
        }

        setPlayerState({
            ...playerState,
            fullscreen: !playerState.fullscreen,
        });
    }

    async function getLesson() {
        let token = localStorage.getItem("x-access-token");
        let url = `${
            import.meta.env.VITE_SERVER_ENDPOINT
        }/lessons/lesson/${id}`;

        await fetch(url, {
            headers: {
                x_access_token: token,
            } as any,
        })
            .then((res) => res.json())
            .then((data) => {
                if (data?.token_expired === true) {
                    navigate("/restore_section");
                }
                if (data?.success === true) {
                    setLesson(data?.result);
                }
                // console.log(data.result);
            })
            .catch((err) => console.log(err));

        setIsLoading(false);
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
        check_if_user_is_allowed();
        getLesson();
    }, []);

    return (
        <>
            {IsLoading ? (
                <LoadingScreen />
            ) : (
                <div className={style.container}>
                    <Header />

                    <div className={style.box}>
                        <div className={style.video_wrapper}>
                            <div>
                                <video
                                    ref={videoRef}
                                    // src={VV}
                                    src={lesson?.video}
                                    poster={lesson?.poster}
                                    onTimeUpdate={() => {
                                        handleVideoTimeUpdate();
                                    }}
                                    onClick={() => {
                                        handleChangeVideoFullscreen();
                                    }}
                                ></video>
                            </div>
                            <div>
                                {playerState.playing ? (
                                    <button onClick={() => toggleVideoPlay()}>
                                        <Pause
                                            color="rgb(255,255,255)"
                                            weight="fill"
                                            size={30}
                                        />
                                    </button>
                                ) : (
                                    <button onClick={() => toggleVideoPlay()}>
                                        <Play
                                            color="rgb(255,255,255)"
                                            weight="fill"
                                            size={30}
                                        />
                                    </button>
                                )}
                                <input
                                    type="range"
                                    value={playerState.percentage}
                                    min="0"
                                    max="100"
                                    onChange={(e) => {
                                        handleChangeVideoPercentage(e);
                                    }}
                                />
                                <button
                                    onClick={() =>
                                        handleChangeVideoFullscreen()
                                    }
                                >
                                    <CornersOut
                                        color="rgb(255,255,255)"
                                        weight="fill"
                                        size={30}
                                    />
                                </button>
                            </div>
                        </div>
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
                    </div>

                    <Comments id={id} />

                    {isModalVisible && <PaymentModal />}
                </div>
            )}
        </>
    );
}
