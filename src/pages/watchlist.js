export default function WatchlistPage() {
  return (
    <div className="generic-page">
      <h1>Watchlist</h1>
      <p className="generic-page-sub">Track your favourite coins here.</p>
      <div className="empty-state">
        <div className="empty-state-icon">⭐</div>
        <h3>Your watchlist is empty</h3>
        <p>Click the star icon next to any coin on the Dashboard to add it here.</p>
      </div>
    </div>
  );
}
