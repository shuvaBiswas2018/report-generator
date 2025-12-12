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
    <div className="pf-page">
      <div style={{ maxWidth: 460, margin: '36px auto' }}>
        <div className="pf-card">
          <h2>Create account</h2>
          <p className="pf-muted">Start using InsightFlow for free.</p>

          <form onSubmit={submit} style={{ marginTop: 12 }}>
            {error && <div style={{ color: 'crimson', marginBottom: 10 }}>{error}</div>}

            <label className="if-label">Full name</label>
            <input className="pf-input" value={name} onChange={(e) => setName(e.target.value)} required />

            <label className="if-label" style={{ marginTop: 10 }}>Email</label>
            <input className="pf-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

            <label className="if-label" style={{ marginTop: 10 }}>Password</label>
            <input className="pf-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

            <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
              <button type="submit" className="pf-primary" disabled={busy}>{busy ? 'Creating...' : 'Create account'}</button>
              <Link to="/login" className="pf-outlined" style={{ alignSelf: 'center', padding: '8px 12px' }}>Sign in</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
