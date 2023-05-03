import { useEffect, useState } from "react";
import style from "./styles.module.css";
import axios from "axios";
import IMG from "./banner-plus-desktop.webp";

import { TutorialModal } from "../tutorial_Modal/Index.js";
import { Welcome } from "../welcome/Index.js";
import { useDecript } from "../../../utils/decriptData.js";

export function DashboarContainer() {
    const storageData = useDecript();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [username, setUsername] = useState("");
    const [profile_link, setProfile_link] = useState("");
    const [firstLetter, setFirstLetter] = useState("");

    async function getUserInfo() {
        setUsername(storageData.username);
        setProfile_link(`/me/${storageData.slug}`);
        setFirstLetter(storageData.first_letter);

        let url = `${
            import.meta.env.VITE_SERVER_ENDPOINT
        }/users/get_single_user_information/${storageData?.id}`;

        try {
            let response = await axios(url);
            let response_data = await response.data;

            if (response_data?.result?.made_tutorial === "false") {
                setIsModalVisible(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUserInfo();
    }, []);
    return (
        <div className={style.dashboard}>
            <Welcome username={username} />

            <div className={style.dashboard_row}>
                <div className={style.dashboard_left}>
                    <div className={style.dashboard_left_content}>
                        <span>{firstLetter}</span>
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
