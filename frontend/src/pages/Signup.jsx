// src/pages/Signup.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const auth = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);

    try {
      await auth.signup({ name, email, password });
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.message || 'Signup failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="pf-login-page">

      <div className="pf-login-card slide-in">

        <h2 className="pf-login-title">Create Account ✨</h2>
        <p className="pf-login-sub">Start using InsightFlow for free.</p>

        <form onSubmit={submit} className="pf-login-form">

          {error && <div className="pf-login-error">{error}</div>}

          {/* NAME */}
          <label className="pf-label">Full Name</label>
          <input
            className="pf-input animated-input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          {/* EMAIL */}
          <label className="pf-label" style={{ marginTop: 12 }}>Email</label>
          <input
            className="pf-input animated-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* PASSWORD */}
          <label className="pf-label" style={{ marginTop: 12 }}>Password</label>
          <input
            className="pf-input animated-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* BUTTONS */}
          <div className="pf-login-buttons">
            <button
              type="submit"
              className="btn-primary"
              disabled={busy}
            >
              {busy ? 'Creating...' : 'Create Account'}
            </button>

            <Link to="/login" className="pf-outlined animated-outline-btn">
              Sign In
            </Link>
          </div>

        </form>

      </div>
    </div>
  );
}
