import { Envelope, Lock } from "phosphor-react";
import { PulseLoader } from "react-spinners";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import style from "./styles.module.css";

const loginUserFormSchema = z.object({
    email: z
        .string()
        .nonempty("O e-mail é obrigatorio")
        .email("Formato de e-mail invalido"),

    password: z
        .string()
        .min(6, "A senha precisa de no minimo 6 caracteres")
        .nonempty("A senha é obrigatoria"),
});

type loginUserFormData = z.infer<typeof loginUserFormSchema>;

export function LoginContainer() {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<loginUserFormData>({
        resolver: zodResolver(loginUserFormSchema),
    });

    async function loginUser(data: { password: string; email: string }) {
        if (isLoading) return;
        setIsLoading(true);

        let url = `${import.meta.env.VITE_SERVER_ENDPOINT}/users/login`;
        const obj = {
            password: data.password,
            email: data.email,
        };

        try {
            let res = await fetch(url, {
                method: "POST",
                body: JSON.stringify(obj),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            let response_data = await res.json();

            if (response_data?.succes === true) {
                localStorage.setItem("x-access-token", response_data?.token);
                localStorage.setItem("slug", response_data?.userData?.slug);
                localStorage.setItem(
                    "first-letter-username",
                    response_data?.userData?.username[0]
                );
                localStorage.setItem(
                    "username",
                    response_data?.userData?.username
                );

                navigate("/dashboard");
            }
            if (response_data?.succes === false) {
                Swal.fire({
                    title: "ALERTA!",
                    text: response_data?.message,
                    icon: "error",
                    confirmButtonText: "OK",
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "Erro!",
                text: "Erro ao fazer login",
                icon: "error",
                confirmButtonText: "OK",
            });
        }

        setIsLoading(false);
    }

    return (
        <div className={style.container}>
            <form onSubmit={handleSubmit(loginUser)}>
                <strong>LOGIN</strong>
                <section>
                    <div>
                        <Envelope size={20} weight="fill" />
                        <input
                            type="email"
                            placeholder="Seu E-mail"
                            {...register("email")}
                        />
                    </div>
                    {errors.email && <span>{errors.email.message}</span>}

                    <div>
                        <Lock size={20} weight="fill" />
                        <input
                            type="password"
                            {...register("password")}
                            placeholder="Sua senha"
                        />
                    </div>
                    {errors.password && <span>{errors.password.message}</span>}
                </section>
                {/* <a href="#">Esqueci minha senha</a> */}

                <br />
                {!isLoading && <button>ENTRAR</button>}
                {isLoading && (
                    <button className={style.loading_button}>
                        <PulseLoader color="white" size={10} />
                    </button>
                )}

                <br />
                <p>
                    Não tem uma conta? <a href="/signup">Registre-se</a>
                </p>
            </form>
        </div>
    );
}
