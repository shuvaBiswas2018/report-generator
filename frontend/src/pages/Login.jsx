// src/pages/Login.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const pendingReportKey = location.state?.pendingReportKey;

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await auth.signin({ email, password });

      if (pendingReportKey) {
        // navigate back to analysis page and include key so page can load stored report
        navigate(from, { replace: true, state: { pendingReportKey } });
      } else {
        navigate(from, { replace: true });
      }
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="pf-page">
      <div style={{ maxWidth: 420, margin: '36px auto' }}>
        <div className="pf-card">
          <h2>Sign in</h2>
          <p className="pf-muted">Sign in to access your analyses and saved reports.</p>

          {pendingReportKey && (
            <div style={{ marginBottom: 10, padding: 10, background: '#fff7ed', borderRadius: 8 }}>
              <strong>Sign in to continue:</strong> we generated a report for you — after signing in we will reveal it automatically.
            </div>
          )}

          <form onSubmit={submit} style={{ marginTop: 12 }}>
            {error && <div style={{ color: 'crimson', marginBottom: 10 }}>{error}</div>}

            <label className="if-label">Email</label>
            <input className="pf-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

            <label className="if-label" style={{ marginTop: 10 }}>Password</label>
            <input className="pf-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

            <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
              <button type="submit" className="pf-primary" disabled={busy}>{busy ? 'Signing in...' : 'Sign in'}</button>
              <Link to="/signup" className="pf-outlined" style={{ alignSelf: 'center', padding: '8px 12px' }}>Create account</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
    