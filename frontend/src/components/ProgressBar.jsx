export default function ProgressBar({ value, max, label }) {
  const percent = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="prog">
      <span>{label}</span>
      <div className="bar" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={max} aria-valuenow={value}>
        <i style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
