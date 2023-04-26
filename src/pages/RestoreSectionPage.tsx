import { RestoreSection } from "../features/restore_section/Index";

export function RestoreSectionPage() {
    document.title = "Sessão expirou!... Repito, A sessão expirou!";

    return (
        <div>
            <RestoreSection />
        </div>
    );
}
