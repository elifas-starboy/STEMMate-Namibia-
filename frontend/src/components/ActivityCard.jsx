import ActivityIcon from "./ActivityIcon";
import ActivityChips from "./ActivityChips";
import StatusBadge from "./StatusBadge";

// One activity in a list. Pass onRemove to also show a Remove button (Saved page).
export default function ActivityCard({ activity, isSaved, onOpen, openLabel = "View details", onRemove }) {
  return (
    <div className="card act">
      <ActivityIcon subject={activity.subject} />
      <div>
        <h2>{activity.title}</h2>
        <ActivityChips activity={activity} />
        {isSaved && <StatusBadge status="Synced" icon="check" label="Available offline" />}
        <div className="row">
          <button type="button" onClick={() => onOpen(activity.id)}>
            {openLabel}
          </button>
          {onRemove && (
            <button type="button" className="d" onClick={() => onRemove(activity.id)}>
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
