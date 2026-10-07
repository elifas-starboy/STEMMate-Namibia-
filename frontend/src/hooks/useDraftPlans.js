import { useMemo } from "react";
import useLocalStorage from "./useLocalStorage";
import { STORAGE_KEYS } from "../utils/storageKeys";
import { isDraftMap } from "../utils/storageValidators";

// Drafts are stored per activity: { [activityId]: { title, steps, ..., updatedAt } }.
// Every keystroke updates the draft, which useLocalStorage saves automatically.
export default function useDraftPlans() {
  const [drafts, setDrafts] = useLocalStorage(STORAGE_KEYS.draftPlans, {}, isDraftMap);

  const updateDraftField = (activityId, field, value) => {
    const updatedAt = Date.now();
    setDrafts((prev) => ({ ...prev, [activityId]: { ...prev[activityId], [field]: value, updatedAt } }));
  };

  const discardDraft = (activityId) =>
    setDrafts((prev) => {
      const next = { ...prev };
      delete next[activityId];
      return next;
    });

  const clearDrafts = () => setDrafts({});

  // Newest first, with the activity id as a number.
  const draftList = useMemo(
    () =>
      Object.entries(drafts)
        .map(([id, draft]) => ({ ...draft, activityId: Number(id) }))
        .sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0)),
    [drafts]
  );

  return { drafts, draftList, updateDraftField, discardDraft, clearDrafts };
}
