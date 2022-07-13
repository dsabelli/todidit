import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";

import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { UserContext } from "./components/context/UserContext";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/UI/ErrorFallback";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, errorInfo) => console.log({ error, errorInfo })}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
