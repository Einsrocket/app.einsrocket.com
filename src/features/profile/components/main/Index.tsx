import { useEffect, useState } from "react";
import { Pen, Plus } from "phosphor-react";
import style from "./styles.module.css";
import axios from "axios";

import { UpdateModal } from "../update_modal/Index";
import { useParams } from "react-router-dom";
import { LoadingScreen } from "../../../../components/loading_screen/Index";
import { useDecript } from "../../../utils/decriptData";

export function ProfileContainer() {
    const slug = useParams().slug;
    const [biography, setBiography] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [ocupation, setOcupation] = useState();
    const [entryDate, setEntryDate] = useState();
    const [isloading, setIsloading] = useState(true);
    const [modalVisible, setmodalVisible] = useState(false);
    const [username, setUsername] = useState("");
    const [is_user_who_sent_id, setIs_user_who_sent_id] = useState(false);
    const storageData = useDecript();

    async function getUserData() {
        let url = `${
            import.meta.env.VITE_SERVER_ENDPOINT
        }/users/get_single_user_information_with_slug_verfication`;

        try {
            let res = await axios.post(url, {
                slug: slug,
                id: storageData.id,
            });

            if (res.data?.is_user_who_sent_id === true) {
                setIs_user_who_sent_id(true);
            }

            if (res.data?.success === true) {
                setEntryDate(res.data?.entry_date);
                setEmail(
                    typeof res.data?.result?.email === "object"
                        ? ""
                        : res.data?.result?.email
                );
                setPhone(
                    typeof res.data?.result?.phone === "object"
                        ? ""
                        : res.data?.result?.phone
                );
                setOcupation(
                    typeof res.data?.result?.ocupation === "object"
                        ? ""
                        : res.data?.result?.ocupation
                );
                setBiography(
                    typeof res.data?.result?.biography === "object"
                        ? ""
                        : res.data?.result?.biography
                );
                setUsername(res.data?.result?.username);
            }
        } catch (error) {
            console.log(error);
        }

        setIsloading(false);
    }

    useEffect(() => {
        getUserData();
    }, []);

    return (
        <>
            {isloading ? (
                <LoadingScreen />
            ) : (
                <div className={style.profile}>
                    <div className={style.profile_banner}>
                        {is_user_who_sent_id && (
                            <Pen color="hsl(210, 38%, 95%)" size={20} />
                        )}
                    </div>

                    <div className={style.profile_row}>
                        <div className={style.profile_left}>
                            <div className={style.sigla_circle}>
                                {username[0]?.toUpperCase()}
                            </div>
                            <strong>{username}</strong>
                            {is_user_who_sent_id && (
                                <Pen
                                    color="hsl(210, 38%, 95%)"
                                    size={20}
                                    onClick={() => setmodalVisible(true)}
                                />
                            )}

                            <div className={style.member_since}>
                                <p>MEMBRO DESDE: {entryDate}</p>
                            </div>
                        </div>

                        <div className={style.profile_right}>
                            {biography && (
                                <div className={style.profile_right_box}>
                                    <strong>Sobre mim</strong>
                                    {biography && biography !== "null" && (
                                        <p>{biography}</p>
                                    )}

                                    {is_user_who_sent_id && (
                                        <Pen
                                            color="hsl(210, 38%, 95%)"
                                            size={20}
                                            className={style.pen}
                                            onClick={() =>
                                                setmodalVisible(true)
                                            }
                                        />
                                    )}
                                </div>
                            )}

                            {!biography && is_user_who_sent_id && (
                                <div
                                    onClick={() => setmodalVisible(true)}
                                    className={
                                        style.profile_right_no_content_box
                                    }
                                >
                                    <Plus
                                        color="rgba(157, 109, 235, 0.856)"
                                        size={25}
                                    />
                                    Quem é voce e o que faz?
                                </div>
                            )}

                            {email && email !== "null" && (
                                <div className={style.profile_right_box}>
                                    <strong>Email</strong>
                                    <p>{email}</p>
                                </div>
                            )}
                            {phone && phone !== "null" && (
                                <div className={style.profile_right_box}>
                                    <strong>Telefone</strong>
                                    <p>{phone}</p>
                                </div>
                            )}
                            {ocupation && ocupation !== "null" && (
                                <div className={style.profile_right_box}>
                                    <strong>Area de ocupação</strong>
                                    <p>{ocupation}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
            {modalVisible && (
                <UpdateModal
                    updateValues={() => getUserData()}
                    onClose={() => setmodalVisible(false)}
                />
            )}
        </>
    );
}
