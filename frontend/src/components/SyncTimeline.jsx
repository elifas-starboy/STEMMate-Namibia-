import { SYNC_STATUS } from "../utils/syncStatus";

// Pending -> Syncing -> Synced (or Failed). Earlier steps show a tick.
export default function SyncTimeline({ status }) {
  const steps = [SYNC_STATUS.PENDING, SYNC_STATUS.SYNCING, status === SYNC_STATUS.FAILED ? SYNC_STATUS.FAILED : SYNC_STATUS.SYNCED];
  const current = steps.indexOf(status);
  return (
    <ol className="tl" aria-label="Sync progress">
      {steps.map((step, i) => (
        <li key={step} className={i < current ? "done" : i === current ? `now s-${step}` : ""} aria-current={i === current ? "step" : undefined}>
          {step}
        </li>
      ))}
    </ol>
  );
}
