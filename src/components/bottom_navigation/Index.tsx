import { HouseLine, User, Binoculars } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import style from "./styles.module.css";
import { useDecript } from "../../features/utils/decriptData";

interface Props {
    route: string;
}

export function BottomNavigation({ route }: Props) {
    const [profile_link, set_profile_link] = useState("");
    const navigate = useNavigate();
    const storageData = useDecript();

    const navigateToPage = async (rota: string) => {
        navigate(`/${rota}`);
    };

    useEffect(() => {
        set_profile_link(`me/${storageData.slug}`);
    }, []);
    return (
        <div className={style.bottom_navigation}>
            <button onClick={() => navigateToPage("dashboard")}>
                <HouseLine
                    color={
                        route === "dashboard"
                            ? "rgb(255, 223, 44)"
                            : "rgba(157, 109, 235, 1)"
                    }
                    weight="fill"
                />
                {route === "dashboard" && <span>Dashboard</span>}
            </button>
            <button onClick={() => navigateToPage("discover")}>
                <Binoculars
                    color={
                        route === "discover"
                            ? "rgb(255, 223, 44)"
                            : "rgba(157, 109, 235, 1)"
                    }
                    weight="fill"
                />
                {route === "discover" && <span>Discover</span>}
            </button>
            <button onClick={() => navigateToPage(profile_link)}>
                <User
                    color={
                        route === "profile"
                            ? "rgb(255, 223, 44)"
                            : "rgba(157, 109, 235, 1)"
                    }
                    weight="fill"
                />
                {route === "profile" && <span>Perfil</span>}
            </button>
        </div>
    );
}
