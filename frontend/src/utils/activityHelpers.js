import { activities } from "../data/activities";

// Accepts a number or a string (route params are strings). Returns undefined if missing.
export function findActivityById(id) {
  return activities.find((a) => String(a.id) === String(id));
}
