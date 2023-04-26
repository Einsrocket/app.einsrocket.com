import { BottomNavigation } from "../components/bottom_navigation/Index";

import { Header } from "../components/header/Index";
import { DiscoverTails } from "../features/discover_trails/components/main/Index";

export function DiscoverTailsPage() {
    return (
        <div>
            <Header />
            <DiscoverTails />
            <BottomNavigation route="" />
        </div>
    );
}
