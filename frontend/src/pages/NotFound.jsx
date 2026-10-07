import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import EmptyState from "../components/EmptyState";

export default function NotFound() {
  const { user } = useApp();
  const navigate = useNavigate();
  return <EmptyState headingLevel={1} icon="alert" title="Page not found" text="This page does not exist." actionLabel={user ? "Go to Home" : "Go to Sign in"} onAction={() => navigate(user ? "/home" : "/signin")} />;
}
