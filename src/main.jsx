import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import ShopProvider from "./context/ShopContext";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./app/store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ShopProvider>
        <App />
      </ShopProvider>
    </Provider>
  </StrictMode>
);
