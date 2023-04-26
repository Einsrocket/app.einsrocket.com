import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./styles.module.css";
import IMG from "./discover-reduced.svg";

import { DiscoverCourse } from "../course/Index.tsx";
import { PaymentModal } from "../../../../components/Modals/payment_Modal/Index.tsx";

export function DiscoverContainer() {
    const navigate = useNavigate();
    const [coursesList, setCoursesList] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLoading, setisLoading] = useState(true);
    const [firstCourse, setFirstCourse] = useState("");

    async function getCoursesInfo() {
        let url = `${
            import.meta.env.VITE_SERVER_ENDPOINT
        }/courses/get-discover-courses`;

        setisLoading(true);

        await fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setFirstCourse(`/discover/trails/${data?.result[0]?.id}`);
                if (data?.success === true) {
                    setCoursesList(data.result);
                }
            })
            .catch((err) => console.log(err));

        setisLoading(false);
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
        getCoursesInfo();
        check_if_user_is_allowed();
    }, []);

    return (
        <div className={style.discover}>
            {!isLoading && (
                <>
                    <div className={style.discover_welcome}>
                        <div>
                            <img src={IMG} alt="" />
                            <p>Aprenda a falar ingles do zero!</p>
                        </div>
                    </div>

                    <div className={style.discover_start}>
                        <div>
                            <strong>Inicie seus estudos</strong>
                            <p>
                                Jornada prática de introdução aos <br />
                                estudos para conhecer o universo da <br />
                                lingua inglesa.
                            </p>
                            <a href={firstCourse}>INICIAR JORNADA</a>
                        </div>
                    </div>

                    <div className={style.discover_column}>
                        {coursesList &&
                            coursesList.map((value: any, index) => {
                                return (
                                    <DiscoverCourse
                                        key={index}
                                        avatar={value?.avatar}
                                        title={value?.title}
                                        description={value?.description}
                                        id={value?.id}
                                        first_topic={value?.first_topic}
                                        second_topic={value?.second_topic}
                                        third_topic={value?.third_topic}
                                    />
                                );
                            })}
                    </div>
                </>
            )}

            {isModalVisible && <PaymentModal />}
        </div>
    );
}
