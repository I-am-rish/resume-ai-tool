import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contentApi/authProvider";

const ProtectedRoute = ({ children, requiredPermission }) => {
  const { isAuthenticated, hasPermission, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or a proper loading component
  }

  if (!isAuthenticated) {
    return <Navigate to="/authentication/login" replace />;
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
