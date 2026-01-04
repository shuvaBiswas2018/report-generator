// src/components/AnalysisSelection.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./AnalysisSelection.css";

export default function AnalysisSelection() {
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
    <div className="as-page">

      {/* Animated Title */}
      <h1 className="as-title">Choose Your Analysis</h1>
      <p className="as-subtitle">
        Powerful AI tools wrapped in a beautiful interface — upload, explore, and generate insights instantly.
      </p>

      {/* Cards */}
      <div className="as-grid">
        {analyses.map((item, index) => (
          <div
            key={item.name}
            className={`as-card fade-in`}
            style={{ animationDelay: `${index * 0.12}s` }}
          >
            <div className="as-icon">{item.icon}</div>

            <h3 className="as-name">{item.name}</h3>

            {item.active ? (
              <div className="as-btn-row">

                {/* Start Analysis */}
                <Link to={item.path} className="as-btn-primary">
                  Start Analysis
                </Link>

                {/* Get Details */}
                <Link
                  to={`/analysis-details/${item.path.replace("/analysis/", "")}`}
                  className="as-btn-secondary"
                >
                  Details
                </Link>

              </div>
            ) : (
              <span className="as-soon">Coming Soon</span>
            )}

            {/* Animated Gradient Border */}
            <div className="as-card-glow"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
