import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import { ThemeProvider } from "@/app/providers/theme/ThemeProvider.tsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
          <ThemeProvider>
            <App />
          </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
