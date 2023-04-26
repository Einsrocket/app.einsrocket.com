import { BottomNavigation } from "../components/bottom_navigation/Index";

import { Header } from "../components/header/Index";
import { DiscoverContainer } from "../features/discover/components/main/Index";

export function Discover() {
    return (
        <div>
            <Header />
            <DiscoverContainer />
            <BottomNavigation route="discover" />
        </div>
    );
}
