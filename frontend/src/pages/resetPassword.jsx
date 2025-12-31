// src/pages/ResetPassword.jsx
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL;
  useEffect(() => {
    if (!token) {
      setError("Invalid or missing reset token.");
    }
  }, [token]);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      return setError("Password must be at least 6 characters.");
    }

    if (password !== confirm) {
      return setError("Passwords do not match.");
    }

    try {
      const res = await fetch(`${API_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();
      
      if (!res.ok) throw new Error(data.detail);

      setSuccess("Password reset successful. Redirecting...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="pf-forgot-password-page">
      <div className="forgot-card slide-in">
        <h2 className="pf-login-title">Reset Password 🔑</h2>

        {error && <div className="error-box">{error}</div>}
        {success && <div className="success-box">{success}</div>}

        {!success && (
          <form onSubmit={submit} className="pf-login-form">

            {/* NEW PASSWORD */}
            <label className="pf-label">New Password</label>
            <input
              type="password"
              className="pf-input animated-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              required
            />

            {/* CONFIRM PASSWORD */}
            <label className="pf-label" style={{ marginTop: 12 }}>
              Confirm Password
            </label>
            <input
              type="password"
              className="pf-input animated-input"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Re-enter new password"
              required
            />

            <button className="btn-primary" style={{ marginTop: 18 }}>
              Reset Password
            </button>

          </form>
        )}
      </div>
    </div>
  );
}
