import Style from "./Style.module.css";
import IMG from "./oops.png";

export const Notifications = () => {
    return (
        <div className={Style.v_container}>
            <strong>Notificações</strong>
            <div className={Style.v_box}>
                <img src={IMG} alt="oops" />
                <p>Nenhuma notificação por aqui</p>
            </div>
        </div>
    );
};
