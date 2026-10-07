import { useApp } from "../context/AppContext";
import { SYNC_STATUS } from "../utils/syncStatus";
import Icon from "../components/Icon";
import StatusBadge from "../components/StatusBadge";
import SyncTimeline from "../components/SyncTimeline";
import EmptyState from "../components/EmptyState";

export default function SyncStatus() {
  const { plans, isOffline, retrySync, keepOffline } = useApp();
  return (
    <>
      <h1>Sync status</h1>
      {isOffline && (
        <div className="callout">
          <Icon name="wifioff" size={20} />
          <div>You are offline. Plans are queued as Pending and sync automatically.</div>
        </div>
      )}
      {plans.length > 0 ? (
        plans.map((plan) => (
          <div className="card" key={plan.id}>
            <div className="act">
              <div>
                <h2>{plan.title}</h2>
              </div>
              <StatusBadge status={plan.status} />
            </div>
            <SyncTimeline status={plan.status} />
            {plan.status === SYNC_STATUS.FAILED && (
              <>
                <p className="err">Sync failed. Your plan is safe on this device.</p>
                <div className="row">
                  <button type="button" className="p" onClick={() => retrySync(plan.id)}>
                    <Icon name="refresh" size={18} /> Retry
                  </button>
                  <button type="button" onClick={() => keepOffline(plan.id)}>
                    Keep offline
                  </button>
                </div>
              </>
            )}
            {plan.status === SYNC_STATUS.PENDING && !isOffline && (
              <button type="button" onClick={() => retrySync(plan.id)}>
                Sync now
              </button>
            )}
          </div>
        ))
      ) : (
        <EmptyState icon="refresh" title="Nothing to sync" text="Completed plans appear here with their sync status." />
      )}
    </>
  );
}
