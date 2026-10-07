import { useCallback, useState } from "react";
import { DEFAULT_FILTERS } from "../utils/filterActivities";

export default function useActivityFilters() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const updateFilter = useCallback((name, value) => setFilters((prev) => ({ ...prev, [name]: value })), []);
  const resetFilters = useCallback(() => setFilters(DEFAULT_FILTERS), []);
  return { filters, updateFilter, resetFilters };
}
