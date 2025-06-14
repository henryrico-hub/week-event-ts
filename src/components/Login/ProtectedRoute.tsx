// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

import { ReactNode } from "react";
import { useAuthContext } from "src/context/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

const ProtectedRoute = ({
  children,
  redirectTo = "/admin/signin",
}: ProtectedRouteProps) => {
  const { user, isLoading } = useAuthContext();

  if (isLoading) return <p>Cargando...</p>; // o un spinner

  return user ? children : <Navigate to={redirectTo} replace />;
};

export default ProtectedRoute;
