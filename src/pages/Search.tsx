import { Header } from "../components/header/Index";
import { Searchpage } from "../features/search_page/Index";

export function Search() {
    document.title = "Einsrocket";

    return (
        <div>
            <Header />
            <Searchpage />
        </div>
    );
}
