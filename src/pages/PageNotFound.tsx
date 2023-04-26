import { PageNotFound } from "../features/404/Index";

export function Pagenotfound() {
    document.title = "404... Repito, 404. Câmbio!";

    return (
        <div>
            <PageNotFound />
        </div>
    );
}
