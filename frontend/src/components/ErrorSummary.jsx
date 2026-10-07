// Lists form problems. Each link moves focus to its field (no hash navigation).
export default function ErrorSummary({ errors, summaryRef }) {
  const keys = Object.keys(errors);
  if (keys.length === 0) return null;

  const focusField = (e, key) => {
    e.preventDefault();
    document.getElementById(`p_${key}`)?.focus();
  };

  return (
    <div className="summary" role="alert" tabIndex={-1} ref={summaryRef}>
      <b>
        {keys.length} problem{keys.length > 1 ? "s" : ""} to fix before saving:
      </b>
      <ul>
        {keys.map((key) => (
          <li key={key}>
            <a href={`#p_${key}`} onClick={(e) => focusField(e, key)}>
              {errors[key]}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
