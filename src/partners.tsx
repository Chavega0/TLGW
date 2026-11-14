import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { PartnersPage } from "./components/PartnersPage.tsx";

document.documentElement.dataset.theme = "light";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PartnersPage />
  </StrictMode>
);
