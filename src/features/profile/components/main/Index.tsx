import { useEffect, useState } from "react";
import { Pen, Plus } from "phosphor-react";
import style from "./styles.module.css";

import { UpdateModal } from "../update_modal/Index";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingScreen } from "../../../../components/loading_screen/Index";

export function ProfileContainer() {
    const navigate = useNavigate();
    const slug = useParams().slug;
    const [biography, setBiography] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [ocupation, setOcupation] = useState();
    const [entryDate, setEntryDate] = useState();
    const [isloading, setIsloading] = useState(true);
    const [modalVisible, setmodalVisible] = useState(false);
    const [username, setUsername] = useState("");
    const [is_user_who_sent_token, setIs_user_who_sent_token] = useState(false);

    async function getUserData() {
        let token = localStorage.getItem("x-access-token");

        let url = `${
            import.meta.env.VITE_SERVER_ENDPOINT
        }/users/get_single_user_information_with_slug_verfication/${slug}`;

        await fetch(url, {
            headers: {
                x_access_token: token,
            } as any,
        })
            .then((res) => res.json())
            .then((data) => {
                if (data?.token_expired === true) {
                    setIsloading(false);
                    navigate("/restore_section");
                }
                if (data?.is_user_who_sent_token === true) {
                    setIs_user_who_sent_token(true);
                }

                if (data?.success === true) {
                    // console.log(data);

                    setEntryDate(data?.entry_date);
                    setEmail(
                        typeof data?.result?.email === "object"
                            ? ""
                            : data?.result?.email
                    );
                    setPhone(
                        typeof data?.result?.phone === "object"
                            ? ""
                            : data?.result?.phone
                    );
                    setOcupation(
                        typeof data?.result?.ocupation === "object"
                            ? ""
                            : data?.result?.ocupation
                    );
                    setBiography(
                        typeof data?.result?.biography === "object"
                            ? ""
                            : data?.result?.biography
                    );
                    setUsername(data?.result?.username);
                }
            })
            .catch((err) => console.log(err));

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
                        {is_user_who_sent_token && (
                            <Pen color="hsl(210, 38%, 95%)" size={20} />
                        )}
                    </div>

                    <div className={style.profile_row}>
                        <div className={style.profile_left}>
                            <div className={style.sigla_circle}>
                                {username[0]?.toUpperCase()}
                            </div>
                            <strong>{username}</strong>
                            {is_user_who_sent_token && (
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
                            <div className={style.profile_right_box}>
                                <strong>Sobre mim</strong>
                                {biography && <p>{biography}</p>}
                                {!biography && is_user_who_sent_token && (
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
                                {is_user_who_sent_token && (
                                    <Pen
                                        color="hsl(210, 38%, 95%)"
                                        size={20}
                                        className={style.pen}
                                        onClick={() => setmodalVisible(true)}
                                    />
                                )}
                            </div>
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
