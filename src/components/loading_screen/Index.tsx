import style from "./style.module.css";
import IMG from "./XOsX.gif";

export function LoadingScreen() {
    return (
        <div className={style.animation_container}>
            <img src={IMG} alt="" />
            {/* <span>processando...</span> */}
        </div>
    );
}
