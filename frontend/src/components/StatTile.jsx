import Icon from "./Icon";

// Dashboard button showing a number and a label.
export default function StatTile({ icon, count, label, warn, onClick }) {
  return (
    <button type="button" className={warn ? "tile warn" : "tile"} onClick={onClick}>
      <span className="ti">
        <Icon name={icon} size={22} />
      </span>
      <b>{count}</b>
      {label}
    </button>
  );
}
