import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";

document.documentElement.classList.add("dark");
(document.documentElement.style as any).colorScheme = "dark";

createRoot(document.getElementById("root")!).render(<App />);
