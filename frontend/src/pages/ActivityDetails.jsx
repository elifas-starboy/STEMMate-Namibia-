import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { findActivityById } from "../utils/activityHelpers";
import Icon from "../components/Icon";
import ActivityIcon from "../components/ActivityIcon";
import ActivityChips from "../components/ActivityChips";
import StatusBadge from "../components/StatusBadge";
import EmptyState from "../components/EmptyState";

// The key makes the page start fresh whenever the activity id changes.
export default function ActivityDetails() {
  const { id } = useParams();
  return <ActivityDetailsView key={id} id={id} />;
}

function ActivityDetailsView({ id }) {
  const { savedIds, saveActivity } = useApp();
  const navigate = useNavigate();
  const [saveFailed, setSaveFailed] = useState(false);
  const activity = findActivityById(id);

  if (!activity) {
    return <EmptyState headingLevel={1} icon="alert" title="Activity not found" text="This activity does not exist." actionLabel="Browse activities" onAction={() => navigate("/browse")} />;
  }

  const isSaved = savedIds.includes(activity.id);
  const handleSave = () => setSaveFailed(!saveActivity(activity.id));

  return (
    <>
      <div className="card">
        <div className="act">
          <ActivityIcon subject={activity.subject} />
          <div>
            <h1 style={{ margin: 0 }}>{activity.title}</h1>
            <ActivityChips activity={activity} />
          </div>
        </div>
        <p>{activity.description}</p>
        <p className="sec" style={{ marginTop: 12 }}>
          Materials
        </p>
        <div className="chips">
          {activity.resources.map((resource) => (
            <span className="chip" key={resource}>
              <Icon name="box" size={14} /> {resource}
            </span>
          ))}
        </div>
      </div>

      {saveFailed && !isSaved && (
        <div className="summary" role="alert">
          <b>Save failed.</b> Not enough space on this device. Remove a saved activity or press Retry.
        </div>
      )}

      {isSaved ? (
        <p>
          <StatusBadge status="Synced" icon="check" label="Available offline" />
        </p>
      ) : (
        <button type="button" className="p block" onClick={handleSave}>
          <Icon name="download" size={20} /> {saveFailed ? "Retry save" : "Save for offline use"}
        </button>
      )}

      <div className="row">
        <button type="button" onClick={() => navigate(`/plan/${activity.id}`)}>
          <Icon name="edit" size={18} /> Create session plan
        </button>
        <button type="button" onClick={() => navigate("/browse")}>
          Back
        </button>
      </div>
    </>
  );
}
