import { XCircle } from "phosphor-react";
import Style from "./Style.module.css";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useDecript } from "../../../../features/utils/decriptData";

interface Props {
    closeModal: () => void;
}

export const GiveFeedback = ({ closeModal }: Props) => {
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const storageData = useDecript();

    const handleSubmit = async () => {
        if (!input) return;

        for (let i = 0; i < input.length; i++) {
            let letter = input[i];

            if (letter === "'") {
                Swal.fire({
                    title: "ALERTA!",
                    text: `O caractere ' não é permitido!`,
                    icon: "error",
                    confirmButtonText: "OK",
                });

                return;
            }
        }

        let url = `${
            import.meta.env.VITE_SERVER_ENDPOINT
        }/feedbacks/register-feedback`;

        setIsLoading(true);

        try {
            let res = await axios.post(url, {
                id: storageData.id,
                content: input,
            });

            if (res.data?.success === true) {
                Swal.fire({
                    title: "Feedback enviado com sucesso!",
                    text: res.data?.message,
                    icon: "success",
                    confirmButtonText: "OK",
                });
            }
            if (res.data?.success === false) {
                Swal.fire({
                    title: "ERRO!",
                    text: res.data?.message,
                    icon: "error",
                    confirmButtonText: "OK",
                });
            }
            console.log(res.data);
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: "ERRO!",
                text: "Falha ao adicionar Feedback",
                icon: "error",
                confirmButtonText: "OK",
            });
        }

        setIsLoading(false);
    };

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

                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                ></textarea>

                {isLoading && <span>Processando...</span>}
                {!isLoading && (
                    <span onClick={() => handleSubmit()}>ENVIAR FEEDBACK</span>
                )}
            </div>
        </div>
    );
};
