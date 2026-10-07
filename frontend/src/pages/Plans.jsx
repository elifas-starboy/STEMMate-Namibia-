import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import PlanCard from "../components/PlanCard";
import EmptyState from "../components/EmptyState";

export default function Plans() {
  const { plans } = useApp();
  const navigate = useNavigate();
  return (
    <>
      <h1>My plans</h1>
      {plans.length > 0 ? (
        plans.map((plan) => <PlanCard key={plan.id} plan={plan} />)
      ) : (
        <EmptyState icon="clip" title="No plans yet" text="Open an activity and choose Create session plan." actionLabel="Find an activity" onAction={() => navigate("/browse")} />
      )}
    </>
  );
}
