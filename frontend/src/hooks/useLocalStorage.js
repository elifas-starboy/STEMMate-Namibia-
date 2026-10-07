import { useEffect, useState } from "react";

// Read a value from localStorage. Falls back to initialValue when the key is
// missing, the JSON is corrupted, the shape is wrong, or storage is blocked.
function readFromStorage(key, initialValue, isValid) {
  try {
    const stored = window.localStorage.getItem(key);
    if (stored === null) return initialValue;
    const parsed = JSON.parse(stored);
    return !isValid || isValid(parsed) ? parsed : initialValue;
  } catch {
    return initialValue;
  }
}

// Works like useState, but the value is restored on reload and saved on every change.
//   const [saved, setSaved] = useLocalStorage("savedActivities", [], Array.isArray);
// isValid (optional) checks that stored data has the shape the app expects.
export default function useLocalStorage(key, initialValue, isValid) {
  const [value, setValue] = useState(() => readFromStorage(key, initialValue, isValid));

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage is unavailable or full: the app keeps working from memory.
    }
  }, [key, value]);

  return [value, setValue];
}
