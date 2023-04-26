import style from "./styles.module.css";

import IMG from "./discover-reduced.svg";

export function Header() {
    return (
        <div className={style.welcome}>
            <div>
                <img src={IMG} alt="" />
                <p>Aprenda a falar ingles do zero!</p>
            </div>
        </div>
    );
}
