import useLocalStorage from "./useLocalStorage";
import { STORAGE_KEYS } from "../utils/storageKeys";
import { isIdList } from "../utils/storageValidators";

// Activities saved for offline use (we store only their ids).
// shouldFailNextSave / onSaveFailed let the evaluator panel simulate "storage full".
export default function useSavedActivities({ say, shouldFailNextSave, onSaveFailed }) {
  const [savedIds, setSavedIds] = useLocalStorage(STORAGE_KEYS.savedActivities, [], isIdList);

  // Returns true when saved, false when the (simulated) save failed.
  const saveActivity = (id) => {
    if (shouldFailNextSave) {
      onSaveFailed();
      say("Save failed.");
      return false;
    }
    setSavedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
    say("Saved. Available offline.");
    return true;
  };

  const removeActivity = (id) => {
    setSavedIds((prev) => prev.filter((x) => x !== id));
    say("Removed.");
  };

  const clearSavedActivities = () => setSavedIds([]);

  return { savedIds, saveActivity, removeActivity, clearSavedActivities };
}
