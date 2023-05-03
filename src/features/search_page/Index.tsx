import { MagnifyingGlass } from "phosphor-react";
import axios from "axios";
import style from "./styles.module.css";
import { Item } from "./item/Index";
import { useEffect, useState } from "react";
import { LoadingItem } from "./loading_item/Index";

export function Searchpage() {
    const [usersList, setUsersList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [input, setInput] = useState("");

    async function fetchUsers() {
        let url = `${import.meta.env.VITE_SERVER_ENDPOINT}/users/get-all-users`;

        try {
            let response = await axios(url);

            if (response.data?.success === true) {
                let shuffled = shuffleArray(response.data?.result);
                setUsersList(shuffled);
            }
        } catch (error) {
            console.log(error);
        }

        setIsLoading(false);
    }

    async function searchUser() {
        let url = `${
            import.meta.env.VITE_SERVER_ENDPOINT
        }/users/search-user/${input}`;

        if (input.trim() === "") {
            return;
        }

        setIsLoading(true);

        try {
            let response = await axios(url);

            if (response.data?.success === false) {
                setUsersList([]);
            }
            if (response.data?.success === true) {
                let shuffled = shuffleArray(response.data?.result);
                setUsersList(shuffled);
            }
        } catch (error) {
            console.log(error);
        }

        setIsLoading(false);
    }

    const shuffleArray = (array: any) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }

        return array;
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className={style.container}>
            <div className={style.input_box}>
                <button onClick={() => searchUser()}>
                    <MagnifyingGlass color="#a8a8b3" size={28} />
                </button>
                <input type="text" onChange={(e) => setInput(e.target.value)} />
            </div>

            <div className={style.scroll}>
                <button>Pessoas</button>
            </div>

            {!isLoading ? (
                <div className={style.items_container}>
                    {usersList?.map((v: any, i) => {
                        return (
                            <Item
                                username={v?.username}
                                points={v?.points}
                                key={i}
                                profile_link={`/me/${v?.slug}`}
                            />
                        );
                    })}
                </div>
            ) : (
                <div className={style.items_container}>
                    <LoadingItem />
                    <LoadingItem />
                    <LoadingItem />
                </div>
            )}
        </div>
    );
}
