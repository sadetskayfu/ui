import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import { Provider } from "react-redux";
import { store } from "@/app/providers/store/index.ts";
import { ThemeProvider } from "@/app/providers/theme/ThemeProvider.tsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
        <Provider store={store}>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </Provider>
    </BrowserRouter>
  </StrictMode>
);
