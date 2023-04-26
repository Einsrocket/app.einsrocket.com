import { LoginContainer } from "../features/authentication/components/login/Index";

export function Homepage() {
    document.title = "Einsrocket";

    return (
        <div>
            <LoginContainer />
        </div>
    );
}
