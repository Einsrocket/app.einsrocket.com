import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { InstagramLogo, FacebookLogo, MapPin } from "phosphor-react";
import Style from "./Style.module.css";
import axios from "axios";
import { useDecript } from "../../../utils/decriptData";

export const OnboardingContainer = () => {
    const navigate = useNavigate();
    const [tourIndex, setTourIndex] = useState(0);
    const [connectedButton, setConnectedButton] = useState(false);

    const navigateToDashboard = async () => {
        updateMadeTutorialStatus();

        navigate("/dashboard");
    };

    const incrementIndex = async () => {
        setTourIndex(tourIndex + 1);
    };

    const updateMadeTutorialStatus = async () => {
        let storageData = useDecript();

        let url = `${
            import.meta.env.VITE_SERVER_ENDPOINT
        }/users/update_user_made_tutorial_status`;

        try {
            await axios.post(url, { id: storageData.id });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={Style.container}>
            {tourIndex === 0 && (
                <>
                    <div className={Style.next_box} data-aos="fade-down">
                        <h2>
                            <span>Quem é voce?</span>
                        </h2>
                        <p>
                            O primeiro passo da jornada é sua biografia. Aqui
                            você pode apresentar um breve resumo sobre você.
                            Suas experiencias, interesses, objetivos, motivações
                            e conquistas. Mostre para o mundo o que é relevante
                            para você! Além disso você também pode linkar suas
                            redes sociais como Instagram, Facebook, e Twitter
                            para as pessoas te conhecerem ainda mais.
                        </p>
                        <div className={Style.next_buttons}>
                            <button onClick={incrementIndex}>PROXIMO</button>
                        </div>
                    </div>
                    <div className={Style.about_box} data-aos="fade-down">
                        <h2>Sobre mim</h2>
                        <p>
                            Entusiasta das melhores technologias de
                            desenvolvimento web & Mobile.
                        </p>
                        <p>
                            Apaixonado por educação e mudar a vida das pessoas
                            através do poder das technologias. Mais de 10.000
                            pessoas já tiveram contacto com algum dos meus
                            treinamentos.
                        </p>
                        <p>
                            "Nada no mundo pode superar a persistência . O
                            talento não supera. Não há nada mais comum que
                            talentosos fracassados. A genialidade não supera. O
                            mundo está cheio de tolos educados. A persistência e
                            a determinação são muito poderosas."
                        </p>

                        <div className={Style.about_buttons}>
                            <a href="#">
                                <FacebookLogo
                                    color="hsl(211, 25%, 84%)"
                                    size={30}
                                />{" "}
                                FACEBOOK
                            </a>
                            <a href="#">
                                <InstagramLogo
                                    color="hsl(211, 25%, 84%)"
                                    size={30}
                                />{" "}
                                INSTAGRAM
                            </a>
                        </div>
                    </div>
                </>
            )}

            {tourIndex === 1 && (
                <>
                    <div className={Style.next_box} data-aos="fade-down">
                        <h2>
                            <span>Informação une as pessoas</span>
                        </h2>
                        <p>
                            Aqui é para você mostrar o máximo de informação
                            sobre você. Os seus interesses, habilidades por
                            desenvolver e o porque de estar estudando inglês.
                        </p>
                        <div className={Style.next_buttons}>
                            <button onClick={incrementIndex}>PROXIMO</button>
                        </div>
                    </div>
                    <div className={Style.about_box} data-aos="fade-down">
                        <h2>
                            <span>Interesses</span>
                        </h2>

                        <div className={Style.about_interests}>
                            <span>PROGRAMAÇÃO</span>
                            <span>HACKING</span>
                            <span>INTELIGENCIAS ARITFICIAIS</span>
                            <span>EDUCAÇÃO</span>
                            <span>JAPONES</span>
                        </div>
                    </div>
                </>
            )}

            {tourIndex !== 0 && tourIndex !== 1 && (
                <>
                    <div className={Style.onboard_card} data-aos="fade-down">
                        <img src="https://github.com/EufrasioJoao.png" alt="" />
                        <h2>Frasio João</h2>
                        <p>CEO | EINSROCKET</p>
                        <p>
                            <MapPin color="hsl(211, 25%, 84%)" size={20} />{" "}
                            Nampula, Moçambique
                        </p>
                        {!connectedButton ? (
                            <button onClick={() => setConnectedButton(true)}>
                                +CONECTAR
                            </button>
                        ) : (
                            <button className={Style.connected_button}>
                                CONECTADO
                            </button>
                        )}

                        <div className={Style.member_since}>
                            <p>MEMBRO DESDE: NOVEMBRO, 2022</p>
                        </div>
                    </div>

                    <div className={Style.next_box} data-aos="fade-down">
                        <h2>
                            <span>Seu cartão</span>
                        </h2>
                        <p>
                            Este componente do perfil é a primeira coisa que as
                            pessoas vão ver. Ele será apresentado todas as vezes
                            que você interagir com a comunidade na plataforma.
                            Fique atento! Ele tem suas principais informações.
                            Lembre-se de mante-lo sempre atualizado. É o seu
                            aperto de mão.
                        </p>
                        <div className={Style.next_buttons}>
                            <button onClick={navigateToDashboard}>
                                PROXIMO
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
