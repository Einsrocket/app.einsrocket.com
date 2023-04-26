import { useState } from "react";
import { UserPlus, List, Bell, MagnifyingGlass, X } from "phosphor-react";

import style from "./styles.module.css";
import IMG from "./assets/rocketseat-logo-mobile.svg";
import { Links } from "./links_modal/Index";
import { MenuModal } from "./menu_Modal/Index";
import { GiveFeedback } from "./give_feedback/Index";

export function Header() {
    const [areLinksVisible, setAreLinksVisible] = useState(false);
    const [isMenuModalVisible, setIsMenuModalVisible] = useState(false);
    const [isGiveFeedbackModalVisible, setIsGiveFeedbackModalVisible] =
        useState(false);

    return (
        <header className={style.header}>
            <nav>
                <div className={style.logo}>
                    <img src={IMG} alt="Logo" />
                    <span>einsrocket</span>

                    {areLinksVisible ? (
                        <X
                            weight="duotone"
                            size={30}
                            onClick={() => setAreLinksVisible(false)}
                        />
                    ) : (
                        <List
                            weight="duotone"
                            size={30}
                            onClick={() => setAreLinksVisible(true)}
                        />
                    )}

                    {areLinksVisible && <Links />}
                </div>

                <div className={style.buttons}>
                    <button>
                        <MagnifyingGlass size={27} weight="duotone" />
                    </button>
                    <button>
                        <UserPlus size={27} weight="fill" />
                    </button>
                    <button>
                        <Bell size={27} weight="fill" />
                    </button>
                    <button
                        className={style.circle}
                        onClick={() =>
                            setIsMenuModalVisible(!isMenuModalVisible)
                        }
                    >
                        {localStorage.getItem("first-letter-username")}
                    </button>

                    {isMenuModalVisible && (
                        <MenuModal
                            // setIsGiveFeedbackModalVisible={
                            //     setIsGiveFeedbackModalVisible
                            // }
                            openModal={() =>
                                setIsGiveFeedbackModalVisible(true)
                            }
                        />
                    )}
                </div>
            </nav>
            {isGiveFeedbackModalVisible && (
                <GiveFeedback
                    closeModal={() => setIsGiveFeedbackModalVisible(false)}
                />
            )}
        </header>
    );
}
