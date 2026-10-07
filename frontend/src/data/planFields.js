// The five required sections of a session plan.
// The form, the validation and the progress bar are all built from this list.
export const PLAN_FIELDS = [
  { key: "title", label: "Plan title", hint: "Example: Grade 8 Friday rocket session", multiline: false, errorMessage: "Enter a plan title." },
  { key: "steps", label: "Steps", hint: "One step per line, with minutes. Example: Prepare bottles – 10 min", multiline: true, errorMessage: "Add at least one step with its timing." },
  { key: "materials", label: "Materials checklist", hint: "What you must bring", multiline: true, errorMessage: "List the materials you need." },
  { key: "safety", label: "Safety notes", hint: "Example: Goggles on, launch away from people", multiline: true, errorMessage: "Add a safety note. Safety notes cannot be skipped." },
  { key: "inclusion", label: "Inclusion prompt", hint: "How can every learner take part?", multiline: true, errorMessage: "Add one inclusion prompt." },
];
