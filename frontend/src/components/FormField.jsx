import Icon from "./Icon";

// A labelled input/textarea with hint text and an accessible error message.
export default function FormField({ field, value, error, onChange }) {
  const id = `p_${field.key}`;
  const describedBy = `h_${field.key}${error ? ` e_${field.key}` : ""}`;
  const shared = {
    id,
    value,
    onChange: (e) => onChange(field.key, e.target.value),
    "aria-describedby": describedBy,
    "aria-invalid": error ? "true" : undefined,
  };
  return (
    <div className={error ? "field-err" : ""}>
      <label htmlFor={id}>
        {field.label} <span className="hint">(required)</span>
      </label>
      <span id={`h_${field.key}`} className="hint">
        {field.hint}
      </span>
      {field.multiline ? <textarea rows={3} {...shared} /> : <input {...shared} />}
      {error && (
        <div id={`e_${field.key}`} className="err">
          <Icon name="alert" size={14} /> {error}
        </div>
      )}
    </div>
  );
}
