import { useRef, useState } from "react";
import { Play, Pause, CornersOut } from "phosphor-react";

import style from "./styles.module.css";
// import VV from "./e.mp4";

export function VideoComponent({
    video,
    poster,
}: {
    video: string;
    poster: string;
}) {
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

    return (
        <div className={style.video_wrapper}>
            <div>
                <video
                    ref={videoRef}
                    // src={VV}
                    src={video}
                    poster={poster}
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
                <button onClick={() => handleChangeVideoFullscreen()}>
                    <CornersOut
                        color="rgb(255,255,255)"
                        weight="fill"
                        size={30}
                    />
                </button>
            </div>
        </div>
    );
}
