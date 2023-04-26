import { User, XCircle, Database, CircleWavyQuestion } from "phosphor-react";
import Style from "./Style.module.css";
import { useEffect, useState } from "react";

interface Props {
    openModal: () => void;
}

export const MenuModal = ({ openModal }: Props) => {
    const [profile_link, set_profile_link] = useState("");

    useEffect(() => {
        set_profile_link(`/me/${localStorage.getItem("slug")}`);
    }, []);

    return (
        <div className={Style.Menu_Modal}>
            <div className={Style.Menu_Modal_links}>
                <a href={profile_link}>
                    <User size={25} weight="fill" /> Meu perfil
                </a>
                <a href={profile_link}>
                    <Database size={25} weight="fill" /> MEUS DADOS
                </a>
                <a href="https://api.whatsapp.com/send?1=pt_br&phone=258865504448">
                    <CircleWavyQuestion size={25} weight="fill" /> Central de
                    ajuda
                </a>
                <a href="/logout">
                    <XCircle size={25} weight="fill" /> Sair da plataforma
                </a>
                <span onClick={() => openModal()}>DAR FEEDBACK</span>
            </div>
        </div>
    );
};
