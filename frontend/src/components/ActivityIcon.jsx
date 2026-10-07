import Icon from "./Icon";

// Coloured square with the subject icon (colours come from the .t-<Subject> class).
export default function ActivityIcon({ subject }) {
  return (
    <div className={`ic t-${subject}`}>
      <Icon name={subject} size={26} />
    </div>
  );
}
