import { Navigate, Outlet } from "react-router-dom";
import { useApp } from "../context/AppContext";

// Pages inside this route need a signed-in facilitator.
export default function ProtectedRoute() {
  const { user } = useApp();
  return user ? <Outlet /> : <Navigate to="/signin" replace />;
}
