import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../features/auth/authSlice";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = true,
  redirectTo = "/login",
}) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const location = useLocation();

  if (requireAuth && !isAuthenticated) {
    // Redirect به login page با حفظ location فعلی
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  if (!requireAuth && isAuthenticated) {
    // اگر authenticated باشد و requireAuth نباشد، به homepage redirect کن
    return <Navigate to="/persons" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
