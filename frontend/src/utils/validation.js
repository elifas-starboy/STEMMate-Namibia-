import { PLAN_FIELDS } from "../data/planFields";

// Returns the cleaned ID (e.g. "FAC-01") or null when the format is wrong.
export function validateFacilitatorId(value) {
  const id = value.trim().toUpperCase();
  return /^FAC-\d{2}$/.test(id) ? id : null;
}

const hasText = (value) => (value || "").trim().length > 0;

// Returns an object like { safety: "Add a safety note..." } (empty when valid).
export function validatePlanDraft(draft = {}) {
  const errors = {};
  PLAN_FIELDS.forEach((field) => {
    if (!hasText(draft[field.key])) errors[field.key] = field.errorMessage;
  });
  return errors;
}

export function countCompletedSections(draft = {}) {
  return PLAN_FIELDS.filter((field) => hasText(draft[field.key])).length;
}
