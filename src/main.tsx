import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./app/model/store";
import { App } from "./app/ui/App";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/700.css";
import "@/styles/index.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App demo={false} />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
);
