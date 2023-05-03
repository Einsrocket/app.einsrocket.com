import { useState, useEffect } from "react";
import Style from "./Style.module.css";
import { PulseLoader } from "react-spinners";
import { useDecript } from "../../../utils/decriptData";
import axios from "axios";

export const UpdateModal = ({
    onClose = () => {},
    updateValues = () => {},
}) => {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [biography, setBiography] = useState("");
    const [ocupation, setOcupation] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const storageData = useDecript();

    async function getUserInfo() {
        let url = `${
            import.meta.env.VITE_SERVER_ENDPOINT
        }/users/get_single_user_information/${storageData?.id}`;

        try {
            let response = await axios(url);

            if (response.data?.success === true) {
                setEmail(response.data?.result?.email);
                setPhone(response.data?.result?.phone);
                setBiography(response.data?.result?.biography);
                setOcupation(response.data?.result?.ocupation);
                setCity(response.data?.result?.city);
                setState(response.data?.result?.state);
                setCountry(response.data?.result?.country);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // submit values to update
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (isLoading) {
            return;
        }

        let url = `${
            import.meta.env.VITE_SERVER_ENDPOINT
        }/users/update_user_informations`;

        // object to be submited
        const valuesToSubmit = {
            email,
            city,
            state,
            country,
            ocupation,
            biography,
            phone,
            id: storageData.id,
        };

        setIsLoading(true);

        try {
            let res = await axios.post(url, valuesToSubmit);

            if (res.data.success) {
                updateValues();
                onClose();
            }
        } catch (error) {
            console.log(error);
        }

        setIsLoading(false);
    };

    useEffect(() => {
        getUserInfo();
    }, []);

    return (
        <div className={Style.container}>
            <div className={Style.box}>
                <div className={Style.form}>
                    <div onClick={onClose} className={Style.closeContainer}>
                        <div className={Style.close}></div>
                    </div>
                    <h3>Meu perfil</h3>
                    <br />

                    <small>Seu E-mail</small>
                    <input
                        required
                        type="text"
                        value={email !== "null" ? email : ""}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <small>Telefone</small>
                    <input
                        required
                        type="number"
                        value={phone !== "null" ? phone : ""}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <small>Sua ocupção</small>
                    <input
                        required
                        type="text"
                        value={ocupation !== "null" ? ocupation : ""}
                        onChange={(e) => setOcupation(e.target.value)}
                    />

                    <div className={Style.form_row}>
                        <div>
                            <small>Cidade</small>
                            <input
                                required
                                type="text"
                                value={city !== "null" ? city : ""}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>
                        <div>
                            <small>Estado/provincia</small>
                            <input
                                required
                                type="text"
                                value={state !== "null" ? state : ""}
                                onChange={(e) => setState(e.target.value)}
                            />
                        </div>
                        <div>
                            <small>País</small>
                            <input
                                required
                                type="text"
                                value={country !== "null" ? country : ""}
                                onChange={(e) => setCountry(e.target.value)}
                            />
                        </div>
                    </div>

                    <small>Sua biografia</small>
                    <textarea
                        value={biography !== "null" ? biography : ""}
                        onChange={(e) => setBiography(e.target.value)}
                    ></textarea>

                    <div className={Style.form_buttons}>
                        <button onClick={onClose}>CANCELAR</button>

                        <button onClick={handleSubmit}>
                            {isLoading ? (
                                <PulseLoader size={16} color="#fff" />
                            ) : (
                                "CONFIRMAR ALTERAÇÕES"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
