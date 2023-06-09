import { useNavigate } from "react-router-dom";
import Style from "./Style.module.css";
import axios from "axios";
import { useDecript } from "../../../utils/decriptData";

interface Props {
    onClose: () => void;
}

export const TutorialModal = ({ onClose }: Props) => {
    const navigate = useNavigate();

    const navigateToOnboarding = async () => {
        navigate(`/onboarding`);
    };

    async function skipTutorial() {
        let storageData = useDecript();

        let url = `${
            import.meta.env.VITE_SERVER_ENDPOINT
        }/users/update_user_made_tutorial_status`;

        try {
            await axios.post(url, { id: storageData.id });
        } catch (error) {
            console.log(error);
        }

        onClose();
    }

    return (
        <div className={Style.container}>
            <div className={Style.form}>
                <h1>Chegou a hora de darmos mais um passo rumo ao infinito!</h1>
                <p>
                    Agora voce é oficialmente um booster! Vamos te ajudar a
                    mostrar o seu potencial ao mundo, criar conexões com pessoas
                    incriveis e, juntos, avançar para o proximo nivel.
                </p>
                <p>
                    Preparamos este pequeno guia para que fique mais
                    familiarizado com a nossa plataforma. Vamos lá?
                </p>

                <div className={Style.tutorial_buttons}>
                    <button onClick={() => skipTutorial()}>PULAR TOUR</button>
                    <button onClick={navigateToOnboarding}>FAZER TOUR</button>
                </div>
            </div>
        </div>
    );
};
