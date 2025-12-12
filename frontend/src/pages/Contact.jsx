// src/pages/Contact.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthProvider';

export default function Contact() {
    const auth = useAuth();
    const user = auth?.user || null;

    // form state
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});
    const [busy, setBusy] = useState(false);
    const [success, setSuccess] = useState(null);
    const [serverError, setServerError] = useState(null);
    const [infoType, setInfoType] = useState('');


    // when auth changes (user logs in), prefill fields
    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setEmail(user.email || '');
        }
    }, [user]);

    function validate() {
        const e = {};

        if (!infoType) e.infoType = 'Please select an information type.';
        if (!message || message.trim().length < 5) e.message = 'Please enter a message (min 5 characters).';
        if (!email || !/^\S+@\S+\.\S+$/.test(email)) e.email = 'Please enter a valid email address.';
        if (!name || name.trim().length < 2) e.name = 'Please enter your name.';

        setErrors(e);
        return Object.keys(e).length === 0;
    }

    async function submit(e) {
        e.preventDefault();
        setSuccess(null);
        setServerError(null);
        if (!validate()) return;

        setBusy(true);
        try {
            // Replace with your real backend endpoint
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim(), infoType }),
            });

            if (!res.ok) {
                const payload = await res.json().catch(() => ({}));
                throw new Error(payload.error || `Server returned ${res.status}`);
            }

            setSuccess('Thank you — your message has been sent. We will contact you shortly.');
            setMessage('');
            // keep name/email when logged in or prefilled
            setErrors({});
        } catch (err) {
            console.error('Contact submit error', err);
            setServerError(err.message || 'Failed to send message. Please try again later.');
        } finally {
            setBusy(false);
        }
    }

    return (
        <div className="pf-page">
            <div style={{ maxWidth: 1100, margin: '32px auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 20 }}>
                    {/* card container */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                        {/* Left: company info */}
                        <div className="pf-card" style={{ padding: 22 }}>
                            <h2 style={{ marginTop: 0 }}>Contact & Office</h2>
                            <p className="pf-muted">
                                We're here to help. Reach out to us for product queries, support, partnership or feedback.
                            </p>

                            <div style={{ marginTop: 18, lineHeight: 1.6 }}>
                                <div>
                                    <strong>Company:</strong><br />
                                    EfficioTech Software Solutions Pvt. Ltd.
                                </div>

                                <div style={{ marginTop: 12 }}>
                                    <strong>Website:</strong><br />
                                    <a
                                        href="https://www.insightflow.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ color: '#2563eb', fontWeight: 500 }}
                                    >
                                        www.insightflow.com
                                    </a>
                                </div>

                                <div style={{ marginTop: 12 }}>
                                    <strong>Office:</strong><br />
                                    House No. 12, Example Street,<br />
                                    Barasat, North 24 Parganas,<br />
                                    West Bengal - 700124, India
                                </div>

                                <div style={{ marginTop: 12 }}>
                                    <strong>Email:</strong><br />
                                    <a href="mailto:support@insightflow.com">support@insightflow.com</a>
                                </div>

                                <div style={{ marginTop: 12 }}>
                                    <strong>Phone:</strong><br />
                                    <a href="tel:+911234567890">+91 12 3456 7890</a>
                                </div>

                                <div style={{ marginTop: 18, fontSize: 13, color: '#6b7280' }}>
                                    Business hours: Mon – Fri, 9:30 AM – 6:30 PM IST
                                </div>
                            </div>
                        </div>

                        {/* Right: contact form */}
                        <div className="pf-card" style={{ padding: 22 }}>
                            <h2 style={{ marginTop: 0 }}>Send us a message</h2>
                            <p className="pf-muted">Tell us about your requirement and we’ll get back within one business day.</p>

                            {success && (
                                <div style={{ marginBottom: 12, padding: 10, background: '#ecfdf5', borderRadius: 8, color: '#065f46' }}>
                                    {success}
                                </div>
                            )}

                            {serverError && (
                                <div style={{ marginBottom: 12, padding: 10, background: '#ffeded', borderRadius: 8, color: '#7f1d1d' }}>
                                    {serverError}
                                </div>
                            )}

                            <form onSubmit={submit} noValidate>
                                <label className="if-label">Select Information Type</label>
                                <select
                                    className="pf-input"
                                    value={infoType}
                                    onChange={(e) => setInfoType(e.target.value)}
                                    aria-invalid={!!errors.infoType}
                                    required
                                >
                                    <option value="">-- Select --</option>
                                    <option value="general">General Inquiry</option>
                                    <option value="support">Technical Support</option>
                                    <option value="pricing">Pricing Details</option>
                                    <option value="partnership">Partnership & Collaboration</option>
                                    <option value="report-help">Report / Analysis Help</option>
                                    <option value="other">Other</option>
                                </select>
                                {errors.infoType && <div style={{ color: 'crimson', marginTop: 6 }}>{errors.infoType}</div>}
                                <label className="if-label">Message</label>
                                <textarea
                                    className="pf-input"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    rows={6}
                                    placeholder="Write your message..."
                                    aria-invalid={!!errors.message}
                                />
                                {errors.message && <div style={{ color: 'crimson', marginTop: 6 }}>{errors.message}</div>}

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
                                    <div>
                                        <label className="if-label">Your name</label>
                                        <input
                                            className="pf-input"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Full name"
                                            aria-invalid={!!errors.name}
                                            disabled={!!user} // lock if logged in
                                        />
                                        {errors.name && <div style={{ color: 'crimson', marginTop: 6 }}>{errors.name}</div>}
                                    </div>

                                    <div>
                                        <label className="if-label">Your email</label>
                                        <input
                                            className="pf-input"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="you@example.com"
                                            aria-invalid={!!errors.email}
                                            disabled={!!user} // lock if logged in
                                        />
                                        {errors.email && <div style={{ color: 'crimson', marginTop: 6 }}>{errors.email}</div>}
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 14 }}>
                                    <button type="submit" className="pf-primary" disabled={busy}>
                                        {busy ? 'Sending...' : 'Send message'}
                                    </button>

                                    <button
                                        type="button"
                                        className="pf-outlined"
                                        onClick={() => {
                                            setMessage('');
                                            if (!user) {
                                                setName('');
                                                setEmail('');
                                            }
                                            setErrors({});
                                            setServerError(null);
                                            setSuccess(null);
                                        }}
                                    >
                                        Reset
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* small footer note under the two columns */}
                    <div style={{ textAlign: 'center', color: '#6b7280', marginTop: 8 }}>
                        By contacting us you agree to our <a href="/privacy" style={{ color: 'inherit' }}>Privacy Policy</a>.
                    </div>
                </div>
            </div>
        </div>
    );
}
