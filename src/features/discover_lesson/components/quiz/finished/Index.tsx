import style from "./styles.module.css";

interface IProps {
    Questions: any;
    score: number;
    leaveQuiz: () => void;
}

export function Finished({ Questions, score, leaveQuiz }: IProps) {
    return (
        <div className={style._container}>
            <div className={style._box}>
                {score >= 5 && (
                    <h1>
                        Quiz concluido com sucesso!
                        <br />
                    </h1>
                )}

                {score < 5 && (
                    <h1>Media abaixo de 50%, Tente novamente amanha</h1>
                )}
                <p>
                    voce acertou{" "}
                    <span style={{ color: "greenyellow" }}>{score}</span>{" "}
                    perguntas
                </p>
                <p>
                    voce errou{" "}
                    <span style={{ color: "red" }}>
                        {Questions?.length - score}
                    </span>{" "}
                    perguntas
                </p>

                <button onClick={() => leaveQuiz()}>Voltar</button>
            </div>
        </div>
    );
}
