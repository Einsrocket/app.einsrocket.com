import style from "./styles.module.css";

interface Props {
    username: string;
    profile_link: string;
    points: number;
}

export function Item({ username, profile_link, points }: Props) {
    return (
        <a href={profile_link} className={style.item}>
            <div className={style.row}>
                <div className={style.left}>
                    <div className={style.img}>{username[0].toUpperCase()}</div>
                    <div>
                        <span>{username}</span>
                        <span>Estudante</span>
                    </div>
                </div>
                <div className={style.right}>
                    <span>Classificacação</span>
                    <span>{points} pontos</span>
                </div>
            </div>
        </a>
    );
}
