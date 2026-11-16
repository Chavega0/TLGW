import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BlueprintPage } from "./components/BlueprintPage.tsx";

document.documentElement.dataset.theme = "light";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BlueprintPage />
  </StrictMode>
);
