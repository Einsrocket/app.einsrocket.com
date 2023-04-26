import { Check, Info } from "phosphor-react";
import Style from "./Style.module.css";

export const PaymentModal = () => {
    return (
        <div className={Style.container}>
            <div data-aos="fade-down" className={Style.box}>
                <div className={Style.top}>ASSINATURA MENSAL</div>

                <div className={Style.first_row}>
                    <span>Essentials</span>
                    <span>200MT/mes</span>
                </div>

                <button>ASSINAR AGORA</button>
                <div className={Style.line}></div>

                <div className={Style.second_row}>
                    <span>
                        {" "}
                        <Check size={19} /> Modulos & Aulas
                    </span>
                    <span>
                        <Info size={19} />
                    </span>
                </div>
                <div className={Style.second_row}>
                    <span>
                        {" "}
                        <Check size={19} /> Suporte 24/7
                    </span>
                    <span>
                        <Info size={19} />
                    </span>
                </div>
                <div className={Style.second_row}>
                    <span>
                        {" "}
                        <Check size={19} /> Exercicios
                    </span>
                    <span>
                        <Info size={19} />
                    </span>
                </div>
                <div className={Style.second_row}>
                    <span>
                        {" "}
                        <Check size={19} /> Quizes
                    </span>
                    <span>
                        <Info size={19} />
                    </span>
                </div>
            </div>
        </div>
    );
};
