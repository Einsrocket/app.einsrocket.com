import { BottomNavigation } from "../components/bottom_navigation/Index";

import { ProfileContainer } from "../features/profile/components/main/Index";
import { Header } from "../components/header/Index";

export function Profile() {
    return (
        <div>
            <Header />
            <ProfileContainer />
            <BottomNavigation route="profile" />
        </div>
    );
}
