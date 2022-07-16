import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../components/context/UserContext";

const ProtectedRoutes = () => {
  const { user } = useContext(UserContext);
  return user || window.localStorage.getItem("loggedIn") ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

export default ProtectedRoutes;
