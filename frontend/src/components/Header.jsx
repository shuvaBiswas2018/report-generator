// src/components/Header.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';

export default function Header() {
  const auth = useAuth();
  const navigate = useNavigate();

  const onSignOut = () => {
    auth.signout();
    navigate('/');
  };

  const onContact = () => {
    navigate('/contact');
  };

  return (
    <header className="pf-header">
      <div className="pf-header-inner">

        {/* ------------------ LOGO + BRAND ------------------ */}
        <div
          className="pf-brand"
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer' }}
        >
          <img src="/images/efficioTech_logo.png" alt="InsightFlow" className="pf-logo" />

          <div className="pf-brand-text">
            <div className="pf-title">InsightFlow</div>
            <div className="pf-sub">Enterprise Analytics</div>
          </div>
        </div>

        {/* ------------------ RIGHT CONTROLS ------------------ */}
        <div className="pf-controls">
          
          {/* Search Box */}
          <input
            className="pf-search"
            placeholder="Search analyses, datasets..."
          />

          {/* If NOT logged in */}
          {!auth.user ? (
            <>
              <Link to="/login" className="pf-ghost">Sign in</Link>
              {/* SIGN UP REMOVED */}
            </>
          ) : (
            /* If logged in */
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>
                  {auth.user.name}
                </div>
                <div style={{ fontSize: 12, color: '#6b7280' }}>
                  {auth.user.email}
                </div>
              </div>

              <button className="pf-ghost" onClick={onSignOut}>
                Sign out
              </button>
            </div>
          )}

          {/* Contact Us */}
          <button
            className="pf-outlined"
            onClick={onContact}
            style={{ marginLeft: 10 }}
          >
            Contact Us
          </button>
        </div>
      </div>
    </header>
  );
}
