import Icon from "./Icon";

const STATUS_ICONS = { Pending: "clock", Syncing: "refresh", Synced: "check", Failed: "x" };

// Shows a sync status. Use label/icon to reuse the same look for other messages,
// e.g. <StatusBadge status="Synced" label="Available offline" />.
export default function StatusBadge({ status, label, icon }) {
  const iconName = icon || STATUS_ICONS[status];
  return (
    <span className={`status s-${status}`}>
      {iconName && <Icon name={iconName} size={14} />} {label ?? status}
    </span>
  );
}
