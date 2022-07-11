import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import All from "./routes/All";
import Landing from "./routes/Landing";
import Register from "./routes/Register";
import Login from "./routes/Login";

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
        <Routes>
          {/* <Route path="/" element={<Landing />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
          <Route exact path="login" element={<Login />}></Route> */}
          <Route path="/" element={<App />}>
            <Route path="all" element={<All />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
