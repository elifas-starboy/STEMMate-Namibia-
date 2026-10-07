import Icon from "./Icon";

export default function OfflineBanner({ isOffline }) {
  if (!isOffline) return null;
  return (
    <div className="offline-banner">
      <Icon name="wifioff" size={18} /> You are offline. Everything still works and plans sync later.
    </div>
  );
}
