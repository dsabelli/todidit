import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
let loggedIn = false;

export const setLoggedIn = (user) => {
  console.log(user);
  user ? (loggedIn = true) : false;
};

const ProtectedRoutes = () => {
  useEffect(() => {
    const user = window.localStorage.getItem("loggedIn");
    if (user) {
      loggedIn = true;
    }
  }, []);
  return loggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
