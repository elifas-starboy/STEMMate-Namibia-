import { SYNC_STATUS_LIST } from "./syncStatus";

// Used by useLocalStorage: if stored data does not look right, it is ignored.
const isPlainObject = (v) => v !== null && typeof v === "object" && !Array.isArray(v);

export const isStringOrNull = (v) => v === null || typeof v === "string";
export const isBoolean = (v) => typeof v === "boolean";
export const isIdList = (v) => Array.isArray(v) && v.every((id) => typeof id === "number");
export const isDraftMap = (v) => isPlainObject(v) && Object.values(v).every(isPlainObject);
export const isPlanList = (v) =>
  Array.isArray(v) &&
  v.every(
    (p) =>
      isPlainObject(p) &&
      typeof p.id === "string" &&
      ["title", "steps", "materials", "safety", "inclusion"].every((k) => typeof p[k] === "string") &&
      SYNC_STATUS_LIST.includes(p.status)
  );
