import Icon from "./Icon";
import StatusBadge from "./StatusBadge";

// A saved session plan that expands to show its details.
export default function PlanCard({ plan }) {
  const steps = plan.steps.split("\n").filter(Boolean);
  return (
    <details className="card">
      <summary>
        <span>{plan.title}</span>
        <StatusBadge status={plan.status} />
      </summary>
      <p className="sec">Steps</p>
      <ol className="steps">
        {steps.map((line, i) => (
          <li key={i}>{line}</li>
        ))}
      </ol>
      <p className="sec">Materials</p>
      <p>{plan.materials}</p>
      <div className="callout">
        <Icon name="alert" size={20} />
        <div>
          <b>Safety</b>
          <br />
          {plan.safety}
        </div>
      </div>
      <p className="sec">Inclusion</p>
      <p>{plan.inclusion}</p>
    </details>
  );
}
