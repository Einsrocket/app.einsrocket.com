import {
    FacebookLogo,
    InstagramLogo,
    YoutubeLogo,
    LinkedinLogo,
    GithubLogo,
    WhatsappLogo,
} from "phosphor-react";
import style from "./styles.module.css";
import IMG from "./boosting.svg";

export function Footer() {
    return (
        <footer className={style.footer}>
            <div className={style.row}>
                <div>
                    <img src={IMG} alt="Logo" />
                    <p>Rocketseat 2023</p>
                    <p>Todos os direitos reservados</p>
                </div>
                <div>
                    <span>Sobre</span>
                    <a href="/sobre">A Einsrocket</a>
                    <a href="/copyright">Direitos autorais</a>
                    <a href="/terms">Termos de uso</a>
                    <a href="/privacy">Políticas de privacidade</a>
                </div>
                <div>
                    <span>Programas</span>
                    <a href="/programa-discover">Discover</a>
                    <a href="/programa-explorer">Explorer</a>
                </div>
                <div>
                    <span>Dúvidas</span>
                    <a href="https://api.whatsapp.com/send?1=pt_br&phone=258865504448">
                        Central de ajuda
                    </a>
                </div>
            </div>

            <div className={style.second_row}>
                <a href="#">
                    <YoutubeLogo size={30} weight="fill" />
                </a>
                <a href="#">
                    <InstagramLogo size={30} weight="fill" />
                </a>
                <a href="#">
                    <FacebookLogo size={30} weight="fill" />
                </a>
                <a href="#">
                    <LinkedinLogo size={30} weight="fill" />
                </a>
                <a href="#">
                    <GithubLogo size={30} weight="fill" />
                </a>
                <a href="https://api.whatsapp.com/send?1=pt_br&phone=258865504448">
                    <WhatsappLogo size={30} weight="fill" />
                </a>
            </div>
        </footer>
    );
}
