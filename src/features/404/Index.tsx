import style from "./styles.module.css";
import IMG from "./rocketseat.svg";

export function PageNotFound() {
    return (
        <div className={style.container}>
            <div className={style.left}>
                <img
                    src="\assets\images\black-hole.svg"
                    alt="Buraco negro"
                ></img>
            </div>

            <div className={style.right}>
                <img src={IMG} alt="Logo" />

                <h1>404...</h1>
                <h2>Repito, 404. Câmbio!</h2>
                <span>ESTAÇÃO RESPONDE:</span>
                <p>
                    Acho que você chegou ao limite do universo. A página que
                    você requisitou não foi encontrada.
                </p>
                <a href="/">RETORNAR À HOME</a>
            </div>
        </div>
    );
}
