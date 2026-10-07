import { useEffect, useRef } from "react";
import { Outlet, useLocation, useNavigate, useNavigationType } from "react-router-dom";
import { useApp } from "../context/AppContext";
import useEvaluatorPanel from "../hooks/useEvaluatorPanel";
import SkipLink from "./SkipLink";
import Header from "./Header";
import OfflineBanner from "./OfflineBanner";
import BottomNavigation from "./BottomNavigation";
import Toast from "./Toast";
import EvaluatorPanel from "./EvaluatorPanel";

// The frame around every page: header, banner, bottom nav, toast and the page itself.
export default function Layout() {
  const app = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const navigationType = useNavigationType();
  const showEvaluator = useEvaluatorPanel();
  const mainRef = useRef(null);
  const previousPath = useRef(location.pathname);

  // Accessibility: after moving to a new page, focus its main heading.
  useEffect(() => {
    if (previousPath.current === location.pathname) return;
    previousPath.current = location.pathname;
    if (navigationType === "REPLACE") return; // redirects should not steal focus
    const heading = mainRef.current?.querySelector("h1");
    if (heading) {
      heading.tabIndex = -1;
      heading.focus();
    }
  }, [location.pathname, navigationType]);

  const handleReopen = () => {
    app.say(app.draftList.length ? "App reopened. Your draft was restored." : "App reopened.");
    navigate(app.user ? "/home" : "/signin");
  };

  return (
    <>
      <SkipLink />
      <div className="app">
        <Header isOffline={app.isOffline} onToggleOffline={() => app.setOfflineMode(!app.isOffline)} />
        <OfflineBanner isOffline={app.isOffline} />
        {app.user && <BottomNavigation />}
        <Toast message={app.toast.message} visible={app.toast.visible} />
        <main id="main" tabIndex={-1} ref={mainRef}>
          <Outlet />
        </main>
        {showEvaluator && (
          <EvaluatorPanel
            failNextSync={app.failNextSync}
            onFailNextSyncChange={app.setFailNextSync}
            failNextSave={app.failNextSave}
            onFailNextSaveChange={app.setFailNextSave}
            onReopen={handleReopen}
          />
        )}
      </div>
    </>
  );
}
