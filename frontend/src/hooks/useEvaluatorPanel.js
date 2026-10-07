import { useEffect, useState } from "react";

// The hidden "Evaluator controls" panel. Show it with Ctrl+Shift+E or by adding ?test to the URL.
export default function useEvaluatorPanel() {
  const [isVisible, setIsVisible] = useState(() => /[?&#]test/.test(window.location.href));

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "e") {
        e.preventDefault();
        setIsVisible((v) => !v);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return isVisible;
}
