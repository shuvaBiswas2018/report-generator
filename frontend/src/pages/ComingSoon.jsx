// src/pages/ComingSoon.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function ComingSoon() {
  return (
    <div className="pf-page">
      <div className="pf-card" style={{ textAlign: 'center', padding: '40px' }}>
        <h2 style={{ fontSize: 28, marginBottom: 10 }}>🚀 Coming Soon</h2>
        <p className="pf-muted" style={{ fontSize: 16, marginBottom: 20 }}>
          This analysis module is under development.  
          We’re working hard to bring you this feature soon!
        </p>

        <Link className="pf-primary" to="/" style={{ padding: '10px 20px' }}>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
