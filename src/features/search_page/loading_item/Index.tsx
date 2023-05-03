import { PulseLoader } from "react-spinners";
import style from "./styles.module.css";

export function LoadingItem() {
    return (
        <div className={style.item}>
            <PulseLoader color="rgb(153, 153, 155)" size={7} />
        </div>
    );
}
