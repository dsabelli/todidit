import React, { useEffect, useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "./context/UserContext";

const ProtectedRoutes = () => {
  const { user } = useContext(UserContext);
  return user ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
