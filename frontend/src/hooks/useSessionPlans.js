import { useEffect, useRef } from "react";
import useLocalStorage from "./useLocalStorage";
import { STORAGE_KEYS } from "../utils/storageKeys";
import { isPlanList } from "../utils/storageValidators";
import { SYNC_STATUS, SYNC_DELAY_MS } from "../utils/syncStatus";
import { createId } from "../utils/id";

// Saved session plans plus the simulated sync (Pending -> Syncing -> Synced/Failed).
export default function useSessionPlans({ isOffline, say, failNextSync, setFailNextSync }) {
  const [plans, setPlans] = useLocalStorage(STORAGE_KEYS.sessionPlans, [], isPlanList);

  // Keep the latest "fail next sync" flag in a ref so the timer below reads the current value.
  const failNextSyncRef = useRef(failNextSync);
  useEffect(() => {
    failNextSyncRef.current = failNextSync;
  }, [failNextSync]);

  // Whenever any plan is "Syncing", finish the sync after a short delay.
  // This also resumes syncing if the page was refreshed in the middle of one.
  const hasSyncingPlans = plans.some((p) => p.status === SYNC_STATUS.SYNCING);
  useEffect(() => {
    if (!hasSyncingPlans) return undefined;
    const timer = setTimeout(() => {
      const shouldFail = failNextSyncRef.current;
      setPlans((prev) =>
        prev.map((p) => (p.status === SYNC_STATUS.SYNCING ? { ...p, status: shouldFail ? SYNC_STATUS.FAILED : SYNC_STATUS.SYNCED } : p))
      );
      if (shouldFail) {
        setFailNextSync(false);
        say("Sync failed. Your plan is still on this device. Choose Retry or Keep offline.");
      } else {
        say("Sync complete.");
      }
    }, SYNC_DELAY_MS);
    return () => clearTimeout(timer);
  }, [hasSyncingPlans, setPlans, setFailNextSync, say]);

  const setStatus = (id, status) => setPlans((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));

  const addPlan = (activityId, draft) => {
    const clean = (v) => v.trim();
    setPlans((prev) => [
      ...prev,
      {
        id: createId(),
        activityId,
        title: clean(draft.title),
        steps: clean(draft.steps),
        materials: clean(draft.materials),
        safety: clean(draft.safety),
        inclusion: clean(draft.inclusion),
        status: isOffline ? SYNC_STATUS.PENDING : SYNC_STATUS.SYNCING,
      },
    ]);
    say(isOffline ? "Plan saved on this device. Status: Pending." : "Plan saved. Syncing…");
  };

  const retrySync = (id) => {
    setStatus(id, isOffline ? SYNC_STATUS.PENDING : SYNC_STATUS.SYNCING);
    say(isOffline ? "Offline. Plan stays Pending." : "Retrying…");
  };

  const keepOffline = (id) => {
    setStatus(id, SYNC_STATUS.PENDING);
    say("Plan kept offline on this device. No data lost.");
  };

  // Called when the connection comes back: queued plans start syncing.
  const syncPendingPlans = () =>
    setPlans((prev) => prev.map((p) => (p.status === SYNC_STATUS.PENDING ? { ...p, status: SYNC_STATUS.SYNCING } : p)));

  const clearPlans = () => setPlans([]);

  return { plans, addPlan, retrySync, keepOffline, syncPendingPlans, clearPlans };
}
