export default function AlertPage() {
  return (
    <div className="generic-page">
      <h1>Price Alerts</h1>
      <p className="generic-page-sub">Get notified when coins hit your target price.</p>
      <div className="empty-state">
        <div className="empty-state-icon">🔔</div>
        <h3>No alerts set</h3>
        <p>Price alert creation coming soon. You will be able to set upper and lower price targets for any coin.</p>
      </div>
    </div>
  );
}
