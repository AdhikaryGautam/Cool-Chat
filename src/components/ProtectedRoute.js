import React from "react";
import { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import { UserContext } from "../context/context";

const ProtectedRoute = ({ children, redirectTo }) => {
  const { user } = useContext(UserContext);
  return user ? children : <Navigate to={redirectTo} />;
};

export default ProtectedRoute;
