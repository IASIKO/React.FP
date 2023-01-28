import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ hasAccess, children }) => {
  if (!hasAccess) {
    return <Navigate to="/" replace />;
  }
  return children;
};
