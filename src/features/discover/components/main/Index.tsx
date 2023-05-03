import { useEffect, useState } from "react";
import style from "./styles.module.css";
import IMG from "./discover-reduced.svg";
import axios from "axios";

import { DiscoverCourse } from "../course/Index.tsx";
import { PaymentModal } from "../../../../components/Modals/payment_Modal/Index.tsx";
import { LoadingScreen } from "../../../../components/loading_screen/Index.tsx";
import { useDecript } from "../../../utils/decriptData.ts";

export function DiscoverContainer() {
    const [coursesList, setCoursesList] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLoading, setisLoading] = useState(true);
    const [firstCourse, setFirstCourse] = useState("");
    const storageData = useDecript();

    async function getCoursesInfo() {
        let url = `${
            import.meta.env.VITE_SERVER_ENDPOINT
        }/courses/get-discover-courses`;

        setisLoading(true);

        try {
            let res = await axios(url);

            setFirstCourse(`/discover/trails/${res.data?.result[0]?.id}`);

            if (res.data?.success === true) {
                setCoursesList(res.data.result);
            }
        } catch (error) {
            console.log(error);
        }

        setisLoading(false);
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
        getCoursesInfo();
        check_if_user_is_allowed();
    }, []);

    return (
        <>
            {isLoading ? (
                <LoadingScreen />
            ) : (
                <div className={style.discover}>
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

                    {isModalVisible && <PaymentModal />}
                </div>
            )}
        </>
    );
}
