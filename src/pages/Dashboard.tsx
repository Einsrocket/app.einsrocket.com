import { BottomNavigation } from "../components/bottom_navigation/Index";

import { DashboarContainer } from "../features/dashboard/components/main/Index";
import { Header } from "../components/header/Index";

export function Dashboard() {
    document.title = "Einsrocket";

    return (
        <div>
            <Header />
            <DashboarContainer />
            <BottomNavigation route="dashboard" />
        </div>
    );
}
