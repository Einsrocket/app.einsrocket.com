import style from "./styles.module.css";

export function RestoreSection() {
    return (
        <div className={style.container}>
            <div className={style.box}>
                <h1>707</h1>
                <h2>Sessão expirou!... Repito, A sessão expirou!</h2>
                <span>ESTAÇÃO RESPONDE:</span>
                <p>
                    A sua sessão dentro da platafrma expirou, Clique no link
                    abaixo para restaurar a sua sessão.
                </p>
                <a href="/logout">RESTAURAR SESSÃO</a>
            </div>
        </div>
    );
}
