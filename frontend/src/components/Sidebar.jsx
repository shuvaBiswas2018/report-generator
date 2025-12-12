// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside className="pf-sidebar">
      <nav>
        <ul>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/energy-analysis">Energy Analysis</Link></li>
          <li><Link to="/stock-analysis">Stock Analysis</Link></li>
          <li><Link to="/attendance-analysis">Attendance Analysis</Link></li>

          <li className="pf-sep">Integrations</li>
          <li><a href="#">Settings</a></li>
          <li><a href="#">Help</a></li>
        </ul>
      </nav>

      <div className="pf-compact-cta">
        <div className="pf-cta-title">Pro features</div>
        <div className="pf-cta-text">Export scheduled reports & team sharing</div>
        <button className="pf-primary pf-block">Upgrade</button>
      </div>
    </aside>
  );
}
