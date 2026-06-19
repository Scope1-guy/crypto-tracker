import { useState } from "react";
import { loginUser, registerUser } from "../data/users";
import { useAuth } from "./AuthContext";

export default function AuthPage() {
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    if (mode === "login") {
      const result = loginUser(username.trim(), password);
      if (result.success) {
        setUser(result.user);
      } else {
        setError(result.error);
      }
    } else {
      if (password.length < 6) {
        setError("Password must be at least 6 characters.");
        return;
      }
      const result = registerUser(username.trim(), password, displayName.trim() || username.trim());
      if (result.success) {
        setUser(result.user);
      } else {
        setError(result.error);
      }
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-brand">CryptoTracker</h1>
        <p className="auth-tagline">Your crypto dashboard, all in one place.</p>

        <div className="auth-tabs">
          <button
            className={mode === "login" ? "auth-tab active" : "auth-tab"}
            onClick={() => { setMode("login"); setError(""); }}
          >
            Log In
          </button>
          <button
            className={mode === "signup" ? "auth-tab active" : "auth-tab"}
            onClick={() => { setMode("signup"); setError(""); }}
          >
            Sign Up
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {mode === "signup" && (
            <div className="auth-field">
              <label>Display Name</label>
              <input
                type="text"
                placeholder="Your name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
          )}

          <div className="auth-field">
            <label>Username</label>
            <input
              type="text"
              placeholder="e.g. demo1"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="auth-field">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-submit">
            {mode === "login" ? "Log In" : "Create Account"}
          </button>
        </form>

        <div className="auth-demo-hint">
          <p>Demo accounts:</p>
          <code>demo1 / password123</code>
          <code>demo2 / password456</code>
        </div>
      </div>
    </div>
  );
}
