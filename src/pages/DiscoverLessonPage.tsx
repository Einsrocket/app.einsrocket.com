import { BottomNavigation } from "../components/bottom_navigation/Index";
import { Header } from "../components/header/Index";

import { DiscoverLesson } from "../features/discover_lesson/components/main/Index";

export function DiscoverLessonPage() {
    return (
        <div>
            <Header />
            <DiscoverLesson />
            <BottomNavigation route="" />
        </div>
    );
}
