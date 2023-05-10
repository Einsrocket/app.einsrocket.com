import { Check, Info, XCircle } from "phosphor-react";
import Style from "./Style.module.css";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";
import axios from "axios";
import { useDecript } from "../../../features/utils/decriptData";
import Swal from "sweetalert2";

const initialOptions = {
    "client-id": import.meta.env.VITE_PAYPAL_CLIENTID,
    currency: "USD",
    // intent: "capture",
    // "data-client-token": "abc123xyz==",
};

interface Iprops {
    close: () => void;
}

export const PaymentModal = ({ close }: Iprops) => {
    const [isMpesaSelected, setIsMpesaSelected] = useState(false);
    const storageData = useDecript();

    async function aproveSell(details: any) {
        // console.log(details);
        console.log(
            `Transaction completed by ${details.payer.name.given_name}`
        );

        makePayment("Paypal");
    }

    async function makePayment(payment_method: string) {
        let url = `${import.meta.env.VITE_SERVER_ENDPOINT}/users/make-payment`;

        let obj = {
            user_id: storageData.id,
            amount: 4.99,
            payment_method: payment_method,
        };

        try {
            let res = await axios.post(url, obj);
            console.log(res.data);

            if (res.data?.success === true) {
                Swal.fire({
                    title: "SUCESSO!",
                    text: "Registro de pagamento adicionado",
                    icon: "success",
                    confirmButtonText: "OK",
                });
            }
            if (res.data?.success === false) {
                Swal.fire({
                    title: "ALERTA!",
                    text: "Erro ao adicionar registro de pagamento",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            }
        } catch (error) {
            console.log(error);
        }

        close();
    }

    return (
        <div className={Style.container}>
            {isMpesaSelected ? (
                <div className={Style.mpesa}>
                    <XCircle
                        color="#fff"
                        weight="fill"
                        size={30}
                        onClick={() => setIsMpesaSelected(false)}
                    />
                    <input type="number" placeholder="Seu numero" />
                    <button>CONCLUIR</button>
                </div>
            ) : (
                <div className={Style.box}>
                    <div className={Style.top}>ASSINATURA MENSAL</div>

                    <div className={Style.first_row}>
                        <span>Essentials</span>
                        <span>$4.99 USD</span>
                    </div>
                    <br />
                    <br />

                    <button onClick={() => setIsMpesaSelected(true)}>
                        Mpesa
                    </button>
                    {/* <button>ASSINAR AGORA</button> */}
                    <PayPalScriptProvider options={initialOptions}>
                        <PayPalButtons
                            createOrder={(data, actions) => {
                                return actions.order.create({
                                    purchase_units: [
                                        {
                                            amount: {
                                                value: "4.99",
                                            },
                                        },
                                    ],
                                });
                            }}
                            onApprove={(data: any, actions: any) => {
                                return actions.order
                                    ?.capture()
                                    .then(aproveSell);
                            }}
                        />
                    </PayPalScriptProvider>

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
            )}
        </div>
    );
};
