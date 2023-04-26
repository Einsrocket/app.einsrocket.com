import { useEffect, useState } from "react";
import style from "./styles.module.css";
import IMG from "./banner-plus-desktop.webp";

import { TutorialModal } from "../tutorial_Modal/Index.js";
import { Welcome } from "../welcome/Index.js";
import { useNavigate } from "react-router-dom";

export function DashboarContainer() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    let profile_link = `/me/${localStorage.getItem("slug")}`;

    async function getUserInfo() {
        let token = localStorage.getItem("x-access-token");
        let url = `${
            import.meta.env.VITE_SERVER_ENDPOINT
        }/users/get_single_user_information`;

        await fetch(url, {
            headers: {
                x_access_token: token,
            } as any,
        })
            .then((res) => res.json())
            .then((data) => {
                //     console.log(data.result);

                if (data?.token_expired === true) {
                    navigate("/restore_section");
                }

                if (data?.result?.made_tutorial === "false") {
                    setIsModalVisible(true);
                }
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        let _data = localStorage.getItem("username") as any;

        setUsername(_data);
        getUserInfo();
    }, []);
    return (
        <div className={style.dashboard}>
            <Welcome username={username} />

            <div className={style.dashboard_row}>
                <div className={style.dashboard_left}>
                    <div className={style.dashboard_left_content}>
                        <span>
                            {localStorage.getItem("first-letter-username")}
                        </span>
                        <div className={style.dashboard_left_view_profile}>
                            <small>Meu perfil</small>
                            <a href={profile_link}>VISUALIZAR PERFIL</a>
                        </div>
                    </div>

                    <div className={style.dashboard_left_profile_level}>
                        <p>Nivel do perfil</p>
                        <div className={style.line}>
                            <div></div>
                        </div>
                    </div>
                </div>

                <div className={style.dashboard_right}>
                    <a href="/discover">
                        <img src={IMG} alt="discover" />
                    </a>
                </div>
            </div>

            {isModalVisible && (
                <TutorialModal
                    onClose={() => {
                        setIsModalVisible(false);
                    }}
                />
            )}
        </div>
    );
}
