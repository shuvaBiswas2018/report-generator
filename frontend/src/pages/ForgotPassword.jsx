// src/pages/ForgotPassword.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);
    const navigate = useNavigate();

    const submit = (e) => {
        e.preventDefault();
        setSent(true);

        // simulate email sent
        setTimeout(() => {
            alert(`Reset link sent to ${email}`);
            navigate("/login");
        }, 800);
    };

    return (
        <div className="pf-forgot-password-page">

            <div className="forgot-card slide-in">
                <h2 className="pf-login-title">Reset Password 🔐</h2>
                <p className="pf-login-sub">
                    Enter your email and we will send you a password reset link.
                </p>

                {!sent ? (
                    <form onSubmit={submit} className="pf-login-form">
                        <label className="pf-label">Email address</label>
                        <input
                            type="email"
                            className="pf-input animated-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <button className="btn-primary" style={{ marginTop: 14 }}>
                            Send Reset Link
                        </button>

                        <div className="back-login" onClick={() => navigate("/login")}>
                            ← Back to Login
                        </div>
                    </form>
                ) : (
                    <div style={{ marginTop: 20, fontSize: 16 }}>
                        Sending reset link...
                    </div>
                )}
            </div>

        </div>
    );
}
