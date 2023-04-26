import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Style from "./Style.module.css";
import { PulseLoader } from "react-spinners";

export const UpdateModal = ({
    onClose = () => {},
    updateValues = () => {},
}) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState() as any;
    const [phone, setPhone] = useState() as any;
    const [biography, setBiography] = useState() as any;
    const [ocupation, setOcupation] = useState() as any;
    const [city, setCity] = useState() as any;
    const [state, setState] = useState() as any;
    const [country, setCountry] = useState() as any;
    const [isLoading, setIsLoading] = useState(false);

    async function getUserInfo() {
        let token = await localStorage.getItem("x-access-token");
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
                if (data?.token_expired === true) {
                    navigate("/restore_section");
                }

                if (data?.success === true) {
                    // console.log(data);

                    setEmail(data?.result?.email);
                    setPhone(data?.result?.phone);
                    setBiography(data?.result?.biography);
                    setOcupation(data?.result?.ocupation);
                    setCity(data?.result?.city);
                    setState(data?.result?.state);
                    setCountry(data?.result?.country);
                }
            })
            .catch((err) => console.log(err));
    }

    // submit values to update
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (isLoading) {
            return;
        }

        let token = await localStorage.getItem("x-access-token");
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
        };

        setIsLoading(true);

        await fetch(url, {
            method: "POST",
            body: JSON.stringify(valuesToSubmit),
            headers: {
                "Content-Type": "application/json",
                x_access_token: token,
            } as any,
        })
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                setIsLoading(false);

                if (data?.token_expired === true) {
                    navigate("/restore_section");
                }

                if (data.success) {
                    updateValues();
                    onClose();
                }
            })
            .catch((err) => console.log(err));

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
