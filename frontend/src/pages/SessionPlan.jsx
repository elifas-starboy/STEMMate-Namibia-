import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { PLAN_FIELDS } from "../data/planFields";
import { findActivityById } from "../utils/activityHelpers";
import { countCompletedSections, validatePlanDraft } from "../utils/validation";
import Icon from "../components/Icon";
import ActivityIcon from "../components/ActivityIcon";
import ActivityChips from "../components/ActivityChips";
import StatusBadge from "../components/StatusBadge";
import ProgressBar from "../components/ProgressBar";
import FormField from "../components/FormField";
import ErrorSummary from "../components/ErrorSummary";
import EmptyState from "../components/EmptyState";

export default function SessionPlan() {
  const { id } = useParams();
  return <SessionPlanView key={id} id={id} />;
}

function SessionPlanView({ id }) {
  const { drafts, updateDraftField, discardDraft, addPlan } = useApp();
  const navigate = useNavigate();
  const activity = findActivityById(id);
  const [errors, setErrors] = useState({});
  const [failedAttempts, setFailedAttempts] = useState(0);
  const summaryRef = useRef(null);

  // After a failed save, move focus to the error summary.
  useEffect(() => {
    if (failedAttempts > 0) summaryRef.current?.focus();
  }, [failedAttempts]);

  if (!activity) {
    return <EmptyState headingLevel={1} icon="alert" title="Activity not found" text="This activity does not exist." actionLabel="Browse activities" onAction={() => navigate("/browse")} />;
  }

  const draft = drafts[activity.id];
  const completed = countCompletedSections(draft);

  const handleSave = () => {
    const found = validatePlanDraft(draft);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setFailedAttempts((n) => n + 1);
      return;
    }
    addPlan(activity.id, draft);
    discardDraft(activity.id);
    navigate("/plans");
  };

  return (
    <>
      <h1>Session plan</h1>
      <div className="card act">
        <ActivityIcon subject={activity.subject} />
        <div>
          <h2>{activity.title}</h2>
          <ActivityChips activity={activity} />
        </div>
      </div>

      <p className="status" role="status">
        {draft ? (
          <>
            <Icon name="check" size={14} /> Draft saved on this device
          </>
        ) : (
          "No draft yet"
        )}
      </p>

      <ProgressBar value={completed} max={PLAN_FIELDS.length} label={`${completed} of ${PLAN_FIELDS.length} sections complete`} />
      <ErrorSummary errors={errors} summaryRef={summaryRef} />

      <div className="card">
        {PLAN_FIELDS.map((field) => (
          <FormField key={field.key} field={field} value={draft?.[field.key] ?? ""} error={errors[field.key]} onChange={(key, value) => updateDraftField(activity.id, key, value)} />
        ))}
      </div>

      <button type="button" className="p block" onClick={handleSave}>
        Save plan
      </button>
      <div className="row">
        <button type="button" onClick={() => navigate(`/activity/${activity.id}`)}>
          Back
        </button>
      </div>
    </>
  );
}
