import { useState } from "react";
import { AppContext } from "./AppContext";
import useLocalStorage from "../hooks/useLocalStorage";
import useToast from "../hooks/useToast";
import useActivityFilters from "../hooks/useActivityFilters";
import useSavedActivities from "../hooks/useSavedActivities";
import useDraftPlans from "../hooks/useDraftPlans";
import useSessionPlans from "../hooks/useSessionPlans";
import { STORAGE_KEYS } from "../utils/storageKeys";
import { isBoolean, isStringOrNull } from "../utils/storageValidators";

// Holds the app-wide state and combines the smaller hooks into one object.
export default function AppProvider({ children }) {
  const { toast, say } = useToast();
  const [user, setUser] = useLocalStorage(STORAGE_KEYS.user, null, isStringOrNull);
  const [isOffline, setIsOffline] = useLocalStorage(STORAGE_KEYS.offlineMode, false, isBoolean);

  // Evaluator switches (in memory only).
  const [failNextSync, setFailNextSync] = useState(false);
  const [failNextSave, setFailNextSave] = useState(false);

  const { filters, updateFilter, resetFilters } = useActivityFilters();
  const saved = useSavedActivities({
    say,
    shouldFailNextSave: failNextSave,
    onSaveFailed: () => setFailNextSave(false),
  });
  const drafts = useDraftPlans();
  const sessionPlans = useSessionPlans({ isOffline, say, failNextSync, setFailNextSync });

  const signIn = (facilitatorId) => {
    setUser(facilitatorId);
    say("Signed in.");
  };

  // Clears everything stored on this device for the next user.
  const signOut = () => {
    setUser(null);
    sessionPlans.clearPlans();
    saved.clearSavedActivities();
    drafts.clearDrafts();
    resetFilters();
    say("Signed out. Device cleared.");
  };

  const setOfflineMode = (offline) => {
    setIsOffline(offline);
    if (offline) {
      say("You are offline. Saved activities and plans still work.");
    } else {
      say("Connection returned. Syncing plans…");
      sessionPlans.syncPendingPlans();
    }
  };

  const value = {
    toast,
    say,
    user,
    signIn,
    signOut,
    isOffline,
    setOfflineMode,
    filters,
    updateFilter,
    ...saved,
    ...drafts,
    ...sessionPlans,
    failNextSync,
    setFailNextSync,
    failNextSave,
    setFailNextSave,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
