import { RegisterContainer } from "../features/authentication/components/register/Index.tsx";

export function Register() {
    document.title = "Einsrocket | Signup";

    return (
        <div>
            <RegisterContainer />
        </div>
    );
}
