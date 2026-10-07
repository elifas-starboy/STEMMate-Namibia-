import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { findActivityById } from "../utils/activityHelpers";
import { SYNC_STATUS } from "../utils/syncStatus";
import Icon from "../components/Icon";
import StatusBadge from "../components/StatusBadge";
import StatTile from "../components/StatTile";

export default function Home() {
  const { user, savedIds, plans, draftList } = useApp();
  const navigate = useNavigate();
  const unsyncedCount = plans.filter((p) => p.status !== SYNC_STATUS.SYNCED).length;

  return (
    <>
      <div className="hero">
        <p className="eyebrow">Welcome back</p>
        <h1>{user}</h1>
        <p>Plan your next session, even without signal.</p>
        <button type="button" className="cta" onClick={() => navigate("/browse")}>
          <Icon name="search" size={20} /> Find an activity
        </button>
      </div>

      {draftList.map((draft) => {
        const activity = findActivityById(draft.activityId);
        if (!activity) return null;
        return (
          <div className="card" key={draft.activityId}>
            <h2>
              <Icon name="edit" size={18} /> Draft in progress
            </h2>
            <p>{draft.title?.trim() || "Untitled plan"}</p>
            {draftList.length > 1 && <p className="hint">For: {activity.title}</p>}
            <StatusBadge status="Synced" icon="check" label="Draft saved on this device" />
            <div className="row">
              <button type="button" className="p" onClick={() => navigate(`/plan/${activity.id}`)}>
                Continue draft
              </button>
            </div>
          </div>
        );
      })}

      <p className="sec">Your device</p>
      <div className="tiles">
        <StatTile icon="download" count={savedIds.length} label="Saved offline" onClick={() => navigate("/saved")} />
        <StatTile icon="clip" count={plans.length} label="Session plans" onClick={() => navigate("/plans")} />
        <StatTile icon="refresh" count={unsyncedCount} label="Waiting to sync" warn={unsyncedCount > 0} onClick={() => navigate("/sync")} />
        <StatTile icon="lock" count="" label="Sign out safely" onClick={() => navigate("/sign-out")} />
      </div>
    </>
  );
}
