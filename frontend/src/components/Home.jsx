// Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();

  const leadText = `InsightFlow uncovers the stories inside your spreadsheets and turns them into actionable, stakeholder-ready intelligence. Upload CSV or Excel files and let our automated pipelines detect trends, surface anomalies and prepare polished reports.`;

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

      {/* Metrics Circles ABOVE feature cards */
      <section className="metrics-section">
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
      </section>

      /* Features section */}
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

