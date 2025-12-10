import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import MuiThemeProvider from "./providers/MuiThemeProvider.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/stroe";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MuiThemeProvider>
      <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
      </BrowserRouter>
    </MuiThemeProvider>
  </StrictMode>
);
