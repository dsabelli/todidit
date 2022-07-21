import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/UI/ErrorFallback";
import App from "./App";
import "./index.css";
import { Theme } from "react-daisyui";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, errorInfo) => console.log({ error, errorInfo })}
    >
      <Theme dataTheme="forest">
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Theme>
    </ErrorBoundary>
  </React.StrictMode>
);
