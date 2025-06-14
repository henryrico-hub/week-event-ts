// src/components/PublicRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuthContext } from "src/context/AuthContext";
import { ReactNode } from "react";

interface PublicRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

const PublicRoute = ({ children, redirectTo = "/admin" }: PublicRouteProps) => {
  const { user, isLoading } = useAuthContext();

  if (isLoading) return <p>Cargando...Cargando...Cargando...</p>;

  return user ? <Navigate to={redirectTo} replace /> : children;
};

export default PublicRoute;
