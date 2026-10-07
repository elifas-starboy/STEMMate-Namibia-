import Icon from "./Icon";

export default function EmptyState({ icon, title, text, actionLabel, onAction, headingLevel = 2 }) {
  const Heading = `h${headingLevel}`;
  return (
    <div className="card empty">
      <div className="ic">
        <Icon name={icon} size={30} />
      </div>
      <Heading>{title}</Heading>
      <p className="hint">{text}</p>
      {actionLabel && (
        <button type="button" className="p" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
