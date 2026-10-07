import { Navigate, Route, Routes } from "react-router-dom";
import { useApp } from "./context/AppContext";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import SignIn from "./pages/SignIn";
import SignedOut from "./pages/SignedOut";
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import ActivityDetails from "./pages/ActivityDetails";
import Saved from "./pages/Saved";
import SessionPlan from "./pages/SessionPlan";
import Plans from "./pages/Plans";
import SyncStatus from "./pages/SyncStatus";
import SignOut from "./pages/SignOut";
import NotFound from "./pages/NotFound";

// "/" sends you to Home when signed in (also after a refresh), otherwise to Sign in.
function StartRedirect() {
  const { user } = useApp();
  return <Navigate to={user ? "/home" : "/signin"} replace />;
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<StartRedirect />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signed-out" element={<SignedOut />} />

        <Route element={<ProtectedRoute />}>
          <Route path="home" element={<Home />} />
          <Route path="browse" element={<Browse />} />
          <Route path="activity/:id" element={<ActivityDetails />} />
          <Route path="saved" element={<Saved />} />
          <Route path="plan/:id" element={<SessionPlan />} />
          <Route path="plans" element={<Plans />} />
          <Route path="sync" element={<SyncStatus />} />
          <Route path="sign-out" element={<SignOut />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
