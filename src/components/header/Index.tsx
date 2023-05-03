import { useState } from "react";
import { UserPlus, List, Bell, MagnifyingGlass, X } from "phosphor-react";

import style from "./styles.module.css";
import IMG from "./assets/rocketseat-logo-mobile.png";
import { Links } from "./components/links_modal/Index";
import { MenuModal } from "./components/menu_Modal/Index";
import { GiveFeedback } from "./components/give_feedback/Index";
import { PendantInvitations } from "./components/pendant_invitations/Index";
import { Notifications } from "./components/Notifications/Index";
import { useNavigate } from "react-router-dom";
import { useDecript } from "../../features/utils/decriptData";

export function Header() {
    const [areLinksVisible, setAreLinksVisible] = useState(false);
    const [isMenuModalVisible, setIsMenuModalVisible] = useState(false);
    const [isGiveFeedbackModalVisible, setIsGiveFeedbackModalVisible] =
        useState(false);
    const [isPendantInvitationsVisible, setIsPendantInvitationsVisible] =
        useState(false);
    const [isNotificationsVisible, setIsNotificationsVisible] = useState(false);

    const navigate = useNavigate();
    const firstLetter = useDecript()?.first_letter;

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
                    <button onClick={() => navigate("/search")}>
                        <MagnifyingGlass size={27} weight="duotone" />
                    </button>

                    <button
                        onClick={() => {
                            setIsPendantInvitationsVisible(
                                !isPendantInvitationsVisible
                            );

                            setIsNotificationsVisible(false);
                        }}
                    >
                        <UserPlus size={27} weight="fill" />
                    </button>

                    <button
                        onClick={() => {
                            setIsNotificationsVisible(!isNotificationsVisible);
                            setIsPendantInvitationsVisible(false);
                        }}
                    >
                        <Bell size={27} weight="fill" />
                    </button>

                    <button
                        className={style.circle}
                        onClick={() => {
                            setIsMenuModalVisible(!isMenuModalVisible);
                            setIsNotificationsVisible(false);
                        }}
                    >
                        {firstLetter}
                    </button>

                    {isPendantInvitationsVisible && <PendantInvitations />}

                    {isNotificationsVisible && <Notifications />}

                    {isMenuModalVisible && (
                        <MenuModal
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
