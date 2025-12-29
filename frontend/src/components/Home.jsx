// Home.jsx
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();

  const leadText = `InsightFlow uncovers the stories inside your spreadsheets and turns them into actionable, stakeholder-ready intelligence. Upload CSV or Excel files and let our automated pipelines detect trends, surface anomalies and prepare polished reports.`;


  const [activeIndex, setActiveIndex] = React.useState(0);
  // const [learnMoreData, setLearnMoreData] = React.useState(null);
  const [aiResult, setAiResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  
  const featureData = [
    {
      tag: "Business performance",
      title: "Track operational performance with real-time clarity",
      desc: "Identify bottlenecks, improve productivity, and understand how your business is performing across departments using automated dashboards and AI-generated insights."
    },
    {
      tag: "Workforce & attendance",
      title: "Improve workforce efficiency with smart attendance analytics",
      desc: "Detect absenteeism trends, shift inefficiencies, and optimize staffing decisions using daily, weekly, and monthly attendance insights powered by machine learning."
    },
    {
      tag: "Financial insights",
      title: "Make data-driven financial decisions with confidence",
      desc: "Analyze revenue patterns, cost leakage, cash-flow fluctuations, and financial risks instantly. Turn spreadsheets into actionable financial intelligence."
    },
    {
      tag: "Energy & consumption",
      title: "Understand and optimize your energy consumption",
      desc: "Measure energy usage, find abnormal spikes, reduce wastage, and control operating costs using AI-guided consumption breakdowns and trend detection."
    },
    {
      tag: "Asset & equipment health",
      title: "Predict equipment failures before they happen",
      desc: "Use data-driven diagnostics to detect performance issues, reduce downtime, and extend the life of machinery and electrical assets."
    },
    {
      tag: "Sustainability metrics",
      title: "Track and improve your environmental impact",
      desc: "Monitor CO₂ footprint, track power quality, and understand how operational decisions influence sustainability targets."
    }
  ];

  /* ---------------- AI LEARN MORE ---------------- */
  const handleLearnMore = async () => {
    setLoading(true);
    setError(null);
    setAiResult(null);

    try {
      const res = await fetch("http://localhost:8000/ai/feature-explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feature: featureData[activeIndex].tag })
      });

      if (!res.ok) throw new Error("Failed to fetch AI insights");

      const data = await res.json();
      setAiResult(data);
    } catch (err) {
      setError("Unable to load AI insights. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <main className="home-page">
      {/* Top nav placeholder (optional) */}

      {/* HERO - similar structure to tricentis: prominent but not full-page */}
      <header className="hero" role="banner">
        <div className="hero-inner">
          <div className="hero-left">
            <span className="eyebrow">Introducing InsightFlow</span>
            <h1 className="hero-title">Turn your data into clarity and momentum</h1>
            <p className="hero-lead">{leadText}</p>

            <div className="hero-actions">
              <button className="btn-primary" onClick={() => navigate('/analysis-selection')} type="button">Get started</button>
              <a className="btn-secondary" href="#features">Learn more</a>
            </div>

            {/* <div className="trusted-by">
              <strong>Trusted by</strong>
              <div className="logos">
                <img src="/images/1541108531612.jpeg" alt="Client 1" />
                <img src="/images/1541108531612.jpeg" alt="Client 2" />
                <img src="/images/1541108531612.jpeg" alt="Client 3" />
                <img src="/images/1541108531612.jpeg" alt="Client 4" />
              </div>
            </div> */}
          </div>

          <div className="hero-right" aria-hidden="true">
            <div className="hero-image" />
          </div>
        </div>
      </header>

      {/* Metrics Circles ABOVE feature cards */}
      {/* <section className="metrics-section">
        <div className="container metrics-container">
          <div className="metric-card">
            <div className="metric-circle" style={{background: 'linear-gradient(135deg,#7c3aed,#06b6d4)'}}>
              <div className="metric-value">1,248</div>
            </div>
            <div className="metric-label">Reports generated</div>
          </div>

          <div className="metric-card">
            <div className="metric-circle" style={{background: 'linear-gradient(135deg,#06b6d4,#7c3aed)'}}>
              <div className="metric-value">23,540</div>
            </div>
            <div className="metric-label">Data points processed</div>
          </div>

          <div className="metric-card">
            <div className="metric-circle" style={{background: 'linear-gradient(135deg,#f97316,#fb7185)'}}>
              <div className="metric-value">~45s</div>
            </div>
            <div className="metric-label">Avg. time to generate</div>
          </div>
        </div>
      </section> */}

      {/* --------------------------------------------- */}
      {/* NEW METRICS SECTION - MODERN DESIGN */}
      {/* --------------------------------------------- */}
      <section className="metrics-modern">
        <div className="metrics-container">

          <div className="metric-modern-card">
            <div className="metric-icon-wrap">
              <span className="metric-icon">📊</span>
            </div>
            <h3 className="metric-number">1,248+</h3>
            <p className="metric-label">Reports Generated</p>
          </div>

          <div className="metric-modern-card">
            <div className="metric-icon-wrap">
              <span className="metric-icon">🧠</span>
            </div>
            <h3 className="metric-number">23,540+</h3>
            <p className="metric-label">Data Points Processed</p>
          </div>

          <div className="metric-modern-card">
            <div className="metric-icon-wrap">
              <span className="metric-icon">⚡</span>
            </div>
            <h3 className="metric-number">~45s</h3>
            <p className="metric-label">Avg. Insight Generation Time</p>
          </div>

        </div>
      </section>

      {/* Features section */}
      <section id="features" className="features">
        <div className="container feature-grid">
          <article className="feature feature-card">
            <div className="feature-img-wrap">
              <img src="/images/secure_by_design.png" alt="Secure by design" />
            </div>
            <h3>Secure by design</h3>
            <p>Role-based access control, SSO-ready, and encrypted storage.</p>
          </article>

          <article className="feature feature-card">
            <div className="feature-img-wrap">
              <img src="/images/shareable_reports.png" alt="Shareable reports" />
            </div>
            <h3>Shareable reports</h3>
            <p>Export PDF or schedule automated email reports.</p>
          </article>

          <article className="feature feature-card">
            <div className="feature-img-wrap">
              <img src="/images/ai_driven_insights.png" alt="AI-driven insights" />
            </div>
            <h3>AI-driven insights</h3>
            <p>Auto-detect anomalies and get suggested actions.</p>
          </article>
        </div>
      </section>



      {/* --------------------------------------------- */}
      {/* NEW SECTION — ENERGY CAPABILITIES */}
      {/* --------------------------------------------- */}
      <section className="energy-cap-section">
        <div className="cap-container">

          {/* SECTION HEADING */}
          <h2 className="cap-title">
            AI-Powered Insights Across Every Business Dimension
          </h2>

          <p className="cap-subtitle">
            InsightFlow transforms your raw spreadsheets into intelligent, decision-ready analytics —
            empowering teams across operations, finance, workforce, assets, and sustainability with
            automated insights and real-time visibility.
          </p>


          {/* MAIN TWO-COLUMN LAYOUT */}
          <div className="cap-grid">

            {/* LEFT SIDE : Feature Menu */}
            <div className="cap-left">

              {[
                "Business performance",
                "Workforce & attendance",
                "Financial insights",
                "Energy & consumption",
                "Asset & equipment health",
                "Sustainability metrics"
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`cap-item ${activeIndex === idx ? "active" : ""}`}
                  onClick={() => setActiveIndex(idx)}
                >
                  {item}
                </div>
              ))
              }

            </div>

            {/* DIVIDER */}
            <div className="cap-divider"></div>

            {/* RIGHT SIDE : Feature Details */}
            <div className="cap-right">
              <span className="cap-right-tag">{featureData[activeIndex].tag}</span>
              <h3 className="cap-right-title">{featureData[activeIndex].title}</h3>
              <p className="cap-right-desc">{featureData[activeIndex].desc}</p>

              <button className="cap-btn" onClick={handleLearnMore}>
                Learn more
              </button>

              {/* LOADING */}
              {loading && <p className="pf-muted">AI is researching…</p>}

              {/* ERROR */}
              {error && <p style={{ color: "#b91c1c" }}>{error}</p>}

              {/* AI RESULT */}
              {aiResult && (
                <div className="pf-card ai-result">
                  <h4>AI-curated insights</h4>

                  <ul>
                    {aiResult.sources.map((src, i) => (
                      <li key={i}>
                        <strong>{src.title}</strong>
                        <p>{src.snippet}</p>
                        <a href={src.link} target="_blank" rel="noreferrer">
                          Read source →
                        </a>
                      </li>
                    ))}
                  </ul>

                  <button
                    className="pf-ghost"
                    onClick={() => setAiResult(null)}
                  >
                    Close
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>



      {/* --------------------------------------------- */}
      {/* NEW SECTION 2 — WHY CHOOSE INSIGHTFLOW */}
      {/* --------------------------------------------- */}
      <section className="why-section">
        <div className="container">

          <h2 className="why-title">Why Teams Choose InsightFlow</h2>

          <div className="why-grid">

            <div className="why-card">
              <div className="why-icon">🔐</div>
              <h4>Secure Infrastructure</h4>
              <p>Role-based access control and enterprise-grade encryption ensure data safety.</p>
            </div>

            <div className="why-card">
              <div className="why-icon">⚙️</div>
              <h4>Automated Pipelines</h4>
              <p>No manual work — upload data and get stakeholder-ready insights instantly.</p>
            </div>

            <div className="why-card">
              <div className="why-icon">📥</div>
              <h4>Easy Integrations</h4>
              <p>Connect with existing databases, cloud systems, and analytics workflows.</p>
            </div>

            <div className="why-card">
              <div className="why-icon">🚀</div>
              <h4>Fast & Reliable</h4>
              <p>Generate deep insights in seconds with zero setup or installation.</p>
            </div>

          </div>

        </div>
      </section>

      {/* CTA strip */}
      <section className="cta-strip">
        <div className="container">
          <h3>Ready to get insights from your data?</h3>
          <button className="btn-primary" onClick={() => navigate('/analysis-selection')} type="button">Try InsightFlow</button>
        </div>
      </section>

    </main>
  );
}

