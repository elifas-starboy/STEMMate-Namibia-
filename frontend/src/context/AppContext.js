import { createContext, useContext } from "react";

export const AppContext = createContext(null);

// Pages call useApp() to read shared state and actions.
export function useApp() {
  const value = useContext(AppContext);
  if (!value) throw new Error("useApp must be used inside <AppProvider>");
  return value;
}
