import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { SYNC_STATUS } from "../utils/syncStatus";
import Icon from "../components/Icon";

export default function SignOut() {
  const { plans, signOut } = useApp();
  const navigate = useNavigate();
  const unsyncedCount = plans.filter((p) => p.status !== SYNC_STATUS.SYNCED).length;

  const handleSignOut = () => {
    navigate("/signed-out");
    signOut();
  };

  return (
    <>
      <h1>Sign out</h1>
      {unsyncedCount > 0 ? (
        <>
          <div className="summary" role="alert">
            <b>
              <Icon name="alert" size={18} /> {unsyncedCount} plan{unsyncedCount > 1 ? "s are" : " is"} not synced.
            </b>
            <p>Signing out clears all plans, drafts and saved activities from this device. Unsynced work will be lost.</p>
          </div>
          <button type="button" className="p block" onClick={() => navigate("/sync")}>
            Cancel and go to Sync
          </button>
          <div className="row">
            <button type="button" className="d block" onClick={handleSignOut}>
              Sign out anyway
            </button>
          </div>
        </>
      ) : (
        <div className="card">
          <p>All plans are synced. Signing out clears this device for the next user.</p>
          <button type="button" className="p block" onClick={handleSignOut}>
            <Icon name="logout" size={18} /> Sign out
          </button>
        </div>
      )}
    </>
  );
}
