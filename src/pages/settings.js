import { useAuth } from "../components/AuthContext";

export default function SettingsPage() {
  const { user, logout } = useAuth();

  return (
    <div className="generic-page">
      <h1>Settings</h1>
      <p className="generic-page-sub">Manage your account and preferences.</p>

      <div className="settings-card">
        <h3>Account</h3>
        <div className="settings-row">
          <span>Username</span>
          <strong>{user?.username}</strong>
        </div>
        <div className="settings-row">
          <span>Display Name</span>
          <strong>{user?.displayName}</strong>
        </div>
        <button className="settings-logout-btn" onClick={logout}>
          Log Out
        </button>
      </div>

      <div className="settings-card">
        <h3>Preferences</h3>
        <div className="settings-row">
          <span>Default Currency</span>
          <select className="settings-select">
            <option>USD</option>
            <option>NGN</option>
            <option>CAD</option>
          </select>
        </div>
        <div className="settings-row">
          <span>Notifications</span>
          <label className="settings-toggle">
            <input type="checkbox" defaultChecked />
            <span className="slider"></span>
          </label>
        </div>
      </div>
    </div>
  );
}
