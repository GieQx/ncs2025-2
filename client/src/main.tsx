import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add fonts to ensure they match the design reference
document.documentElement.classList.add('font-sans');

createRoot(document.getElementById("root")!).render(<App />);
