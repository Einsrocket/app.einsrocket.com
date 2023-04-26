import { useEffect } from "react";
import "./App.css";
import Aos from "aos";
import "aos/dist/aos.css";
import { Router } from "./routes/Index.tsx";

function App() {
    useEffect(() => {
        Aos.init({ duration: 500 });
    }, []);

    return (
        <div className="app">
            <Router />
        </div>
    );
}

export default App;
