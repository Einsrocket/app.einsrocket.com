import style from "./styles.module.css";

interface Props {
    username: string;
}

export function Welcome({ username }: Props) {
    return (
        <div className={style.welcome}>
            <div>
                <strong>Olá, {username}</strong>
                <p>Sua jornada rumo ao proximo nivel está apenas começando!</p>
            </div>
            <span>#NeverStopLearning</span>
        </div>
    );
}
