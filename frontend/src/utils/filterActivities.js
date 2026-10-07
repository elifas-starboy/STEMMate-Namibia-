export const DEFAULT_FILTERS = { subject: "", duration: "", level: "", material: "" };

// An empty filter value means "Any".
export function filterActivities(activities, filters) {
  return activities.filter(
    (a) =>
      (!filters.subject || a.subject === filters.subject) &&
      (!filters.duration || String(a.duration) === filters.duration) &&
      (!filters.level || a.level === filters.level) &&
      (!filters.material || a.resources.includes(filters.material))
  );
}
