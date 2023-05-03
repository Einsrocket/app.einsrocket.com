import Style from "./Style.module.css";
import IMG from "./oops.png";

export const PendantInvitations = () => {
    return (
        <div className={Style.y_container}>
            <strong>Convites pendentes</strong>
            <div className={Style.y_box}>
                <img src={IMG} alt="oops" />
                <p>Ainda não tem nada por aqui</p>
            </div>
        </div>
    );
};
