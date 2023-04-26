import { XCircle } from "phosphor-react";
import Style from "./Style.module.css";

interface Props {
    closeModal: () => void;
}

export const GiveFeedback = ({ closeModal }: Props) => {
    return (
        <div className={Style.x_container}>
            <div className={Style.x_container_box}>
                <XCircle size={30} weight="fill" onClick={() => closeModal()} />

                <h4>Sua opinião gera evolução!</h4>

                <h1>Como está sendo a sua experiência com a plataforma?</h1>

                <p>
                    Quer nos contar detalhes?
                    <br />
                    Quanto mais informações, mais conseguimos evoluir.
                </p>

                <textarea></textarea>

                <span>ENVIAR FEEDBACK</span>
            </div>
        </div>
    );
};
