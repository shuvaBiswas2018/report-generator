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
        <div className="pf-login-page slide-left">

            {/* Animated Card */}
            <div className="pf-login-card">

                <h2 className="pf-login-title">Welcome Back 👋</h2>
                <p className="pf-login-sub">Sign in to access your analyses and datasets.</p>
                {/* SOCIAL LOGIN SECTION */}
                <div className="social-wrapper">

                    {/* Google Long Button */}
                    <button
                        className="google-long-btn"
                        onClick={() => window.location.href = "http://localhost:8000/auth/google/login"}
                    >
                        <img src="/icons/google.png" className="google-icon" alt="Google" />
                        Continue with Google
                    </button>


                    {/* Social Icons Row */}
                    <div className="social-circle-row">

                        <button className="circle-btn">
                            <img src="/icons/facebook.png" alt="facebook" />
                        </button>

                        <button className="circle-btn">
                            <img src="/icons/linkedin.png" alt="linkedin" />
                        </button>

                        <button className="circle-btn">
                            <img src="/icons/github.png" alt="github" />
                        </button>

                        <button className="circle-btn">
                            <img src="/icons/microsoft.png" alt="microsoft" />
                        </button>

                    </div>
                </div>

                {/* OR DIVIDER */}
                <div className="divider">
                    <span>OR</span>
                </div>


                {pendingReportKey && (
                    <div className="pf-login-warning">
                        <strong>Sign in to continue:</strong> your generated report will open automatically.
                    </div>
                )}

                {/* Login Form */}
                <form onSubmit={submit} className="pf-login-form">

                    {error && <div className="pf-login-error">{error}</div>}

                    {/* Email */}
                    <label className="pf-label">Email</label>
                    <input
                        className="pf-input animated-input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    {/* Password */}
                    <label className="pf-label" style={{ marginTop: 14 }}>Password</label>
                    <input
                        className="pf-input animated-input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {/* Forgot Password */}
                    <div className="pf-forgot">
                        <Link to="/forgot-password">Forgot Password?</Link>
                    </div>

                    {/* Buttons */}
                    <div className="pf-login-buttons">
                        <button
                            type="submit"
                            className="btn-primary"
                            disabled={busy}
                        >
                            {busy ? 'Signing in...' : 'Sign in'}
                        </button>

                        <Link to="/signup" className="pf-outlined animated-outline-btn">
                            Create account
                        </Link>
                    </div>

                </form>

            </div>
        </div>
    );
}
