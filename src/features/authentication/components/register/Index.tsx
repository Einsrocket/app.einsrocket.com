import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Envelope, Lock } from "phosphor-react";
import style from "./styles.module.css";
import { PulseLoader } from "react-spinners";
import Swal from "sweetalert2";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const createUserrFormSchema = z.object({
    email: z
        .string()
        .nonempty("O e-mail é obrigatorio")
        .email("Formato de e-mail invalido"),

    password: z
        .string()
        .min(6, "A senha precisa de no minimo 6 caracteres")
        .nonempty("A senha é obrigatoria"),

    username: z
        .string()
        .min(4, "O username precisa de no minimo 4 caracteres")
        .nonempty("A username é obrigatorio"),
});

type createUserFormData = z.infer<typeof createUserrFormSchema>;

export function RegisterContainer() {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<createUserFormData>({
        resolver: zodResolver(createUserrFormSchema),
    });

    async function createUser(data: {
        username: string;
        password: string;
        email: string;
    }) {
        if (isLoading) return;
        setIsLoading(true);

        let url = `${import.meta.env.VITE_SERVER_ENDPOINT}/users/register`;
        const obj = {
            username: data.username,
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
                localStorage.setItem("slug", response_data?.slug);
                localStorage.setItem(
                    "first-letter-username",
                    data?.username[0]
                );
                localStorage.setItem("username", data?.username);

                navigate("/dashboard");
            }
            if (response_data?.succes === false) {
                Swal.fire({
                    title: "ALERTA!",
                    text: response_data?.message,
                    icon: "warning",
                    confirmButtonText: "OK",
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "Erro!",
                text: "Erro ao criar conta",
                icon: "error",
                confirmButtonText: "OK",
            });
        }

        setIsLoading(false);
    }

    return (
        <div className={style.container}>
            <form onSubmit={handleSubmit(createUser)}>
                <h1>Crie sua conta</h1>
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
                        <User size={20} weight="fill" />
                        <input
                            type="text"
                            placeholder="Seu nome"
                            {...register("username")}
                        />
                    </div>
                    {errors.username && <span>{errors.username.message}</span>}

                    <div>
                        <Lock size={20} weight="fill" />
                        <input
                            type="password"
                            placeholder="Sua senha"
                            {...register("password")}
                        />
                    </div>
                    {errors.password && <span>{errors.password.message}</span>}
                </section>
                <br />
                <p>
                    Ao se registrar, você aceita nossos{" "}
                    <a href="/terms">termos de uso</a> e a nossa{" "}
                    <a href="/privacy">política de privacidade</a>.
                </p>

                {!isLoading && <button>CADASTRAR</button>}
                {isLoading && (
                    <button className={style.loading_button}>
                        <PulseLoader color="white" size={10} />
                    </button>
                )}
                <br />
                <a href="/" className={style.login}>
                    Voltar para login
                </a>
            </form>
        </div>
    );
}
