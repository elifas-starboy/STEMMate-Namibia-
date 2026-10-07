import Icon from "./Icon";

export default function ActivityChips({ activity }) {
  return (
    <div className="chips">
      <span className={`chip sub t-${activity.subject}`}>{activity.subject}</span>
      <span className="chip">
        <Icon name="clock" size={14} /> {activity.duration} min
      </span>
      <span className="chip">
        <Icon name="cap" size={14} /> {activity.level}
      </span>
    </div>
  );
}
