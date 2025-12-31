import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const res = await fetch(`${API_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Failed to send reset link");
      }

      // Always show same success message (security)
      setSuccessMsg(
        "A password reset link has been sent to this email."
      );

      // Redirect to login after short delay
      setTimeout(() => {
        navigate("/login");
      }, 2500);

    } catch (err) {
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pf-forgot-password-page">

      <div className="forgot-card slide-in">
        <h2 className="pf-login-title">Reset Password 🔐</h2>

        <p className="pf-login-sub">
          Enter your email and we’ll send you a password reset link.
        </p>

        {/* SUCCESS MESSAGE */}
        {successMsg && (
          <div
            style={{
              background: "#ecfdf5",
              color: "#065f46",
              padding: 12,
              borderRadius: 8,
              marginBottom: 14,
              fontSize: 14,
            }}
          >
            {successMsg}
          </div>
        )}

        {/* ERROR MESSAGE */}
        {errorMsg && (
          <div
            style={{
              background: "#fee2e2",
              color: "#7f1d1d",
              padding: 12,
              borderRadius: 8,
              marginBottom: 14,
              fontSize: 14,
            }}
          >
            {errorMsg}
          </div>
        )}

        {!successMsg && (
          <form onSubmit={submit} className="pf-login-form">

            <label className="pf-label">Email address</label>
            <input
              type="email"
              className="pf-input animated-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              disabled={loading}
            />

            <button
              className="btn-primary"
              style={{ marginTop: 14 }}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>

            <div
              className="back-login"
              onClick={() => navigate("/login")}
              style={{ marginTop: 16 }}
            >
              ← Back to Login
            </div>

          </form>
        )}
      </div>

    </div>
  );
}
