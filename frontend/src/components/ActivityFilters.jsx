import { SUBJECTS, DURATIONS, LEVELS, MATERIALS } from "../data/activities";

const FILTER_FIELDS = [
  { name: "subject", id: "fs", label: "Subject", options: SUBJECTS },
  { name: "duration", id: "fm", label: "Minutes", options: DURATIONS },
  { name: "level", id: "fv", label: "Level", options: LEVELS },
  { name: "material", id: "fr", label: "Material I have", options: MATERIALS },
];

export default function ActivityFilters({ filters, onFilterChange }) {
  return (
    <div className="card">
      <div className="fg">
        {FILTER_FIELDS.map((field) => (
          <div key={field.name}>
            <label htmlFor={field.id}>{field.label}</label>
            <select id={field.id} value={filters[field.name]} onChange={(e) => onFilterChange(field.name, e.target.value)}>
              <option value="">Any</option>
              {field.options.map((option) => (
                <option key={option} value={String(option)}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
