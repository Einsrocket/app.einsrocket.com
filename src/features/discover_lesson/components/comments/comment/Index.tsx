import style from "./styles.module.css";

export function Comment({ value }: any) {
    return (
        <div className={style.post_comment}>
            <div key={value.id} className={style.post_comment_avatar_div}>
                {value?.author[0]?.toUpperCase()}
            </div>
            <div className={style.post_comment_box}>
                <span className={style.post_comment_username}>
                    {value.author}
                </span>
                <span className={style.post_comment_comment}>
                    {value.description}
                </span>
            </div>
        </div>
    );
}
