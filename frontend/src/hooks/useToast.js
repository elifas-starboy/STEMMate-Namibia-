import { useCallback, useEffect, useRef, useState } from "react";

// Short status message shown at the bottom of the screen (read out by screen readers).
export default function useToast(duration = 5000) {
  const [toast, setToast] = useState({ message: "", visible: false });
  const timerRef = useRef(null);

  const say = useCallback(
    (message) => {
      clearTimeout(timerRef.current);
      setToast({ message, visible: true });
      timerRef.current = setTimeout(() => setToast((t) => ({ ...t, visible: false })), duration);
    },
    [duration]
  );

  useEffect(() => () => clearTimeout(timerRef.current), []);
  return { toast, say };
}
