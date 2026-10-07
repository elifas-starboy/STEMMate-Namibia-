import Icon from "./Icon";

export default function Header({ isOffline, onToggleOffline }) {
  const label = isOffline
    ? "Connection: offline. Press to go online (simulation)"
    : "Connection: online. Press to go offline (simulation)";
  return (
    <header>
      <div className="logo">
        <i aria-hidden="true">S</i>STEMMate Namibia
      </div>
      <button type="button" className="net" onClick={onToggleOffline} aria-label={label}>
        {isOffline ? (
          <>
            <Icon name="wifioff" size={16} /> Offline
          </>
        ) : (
          "● Online"
        )}
      </button>
    </header>
  );
}
