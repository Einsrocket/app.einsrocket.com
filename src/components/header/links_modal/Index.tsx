import style from "./styles.module.css";

export function Links() {
    return (
        <div className={style.container}>
            <a href="/dashboard">Home</a>
            <a href="/discover">Discover</a>
            <a href="#">Explorer</a>
        </div>
    );
}
