export default function PortfolioPage() {
  return (
    <div className="generic-page">
      <h1>Portfolio</h1>
      <p className="generic-page-sub">Track the performance of your holdings.</p>
      <div className="empty-state">
        <div className="empty-state-icon">💼</div>
        <h3>No holdings yet</h3>
        <p>Portfolio tracking coming soon. You'll be able to import your trades and monitor P&L.</p>
      </div>
    </div>
  );
}
