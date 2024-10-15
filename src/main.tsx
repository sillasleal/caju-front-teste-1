import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import LoadingProvider from "./providers/loading.provider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <LoadingProvider>
    <App />
  </LoadingProvider>
);
