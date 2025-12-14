// src/components/AnalysisSelection.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./AnalysisSelection.css"; // We will reuse the same image card animations

export default function AnalysisSelection() {
  // All analysis items
  const analyses = [
    { name: "Energy Analysis", path: "/analysis/energy", icon: "⚡", active: true },
    { name: "Stock Analysis", path: "/stock-analysis", icon: "📈", active: false },
    { name: "Attendance Analysis", path: "/attendance-analysis", icon: "👥", active: false },
    { name: "Financial Analysis", path: "/financial-analysis", icon: "📊", active: false },
    { name: "Asset Analysis", path: "/asset-analysis", icon: "🔧", active: false },
    { name: "Sustainability", path: "/sustainability", icon: "🌱", active: false },
    { name: "Custom Analysis", path: "/custom-analysis", icon: "🧩", active: false },
  ];

  return (
    <div className="home-container">
      <h1 className="home-title">Choose Your Analysis</h1>
      <p className="home-subtitle">
        Select an analysis type to begin. Upload your dataset and generate insights instantly.
      </p>

      <div className="analysis-grid">
        {analyses.map((item) => (
          <div key={item.name} className={`analysis-card ${!item.active ? "disabled" : ""}`}>
            <div className="analysis-icon">{item.icon}</div>

            <h3 className="analysis-name">{item.name}</h3>

            {item.active ? (
              <div className="analysis-btn-row">
                <Link to={item.path} className="analysis-button">
                  Start Analysis
                </Link>

                {/* NEW: GET DETAILS BUTTON */}
                <Link
                  to={`/analysis-details/${item.path.replace("/analysis/", "")}`}
                  className="details-button"
                >
                  Get Details
                </Link>
              </div>
            ) : (
              <span className="coming-soon">Coming Soon</span>
            )}

          </div>
        ))}
      </div>
    </div>
  );
}
