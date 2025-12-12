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

            <div className="trusted-by">
              <strong>Trusted by</strong>
              <div className="logos">
                <img src="/images/logo1.png" alt="Client 1" />
                <img src="/images/logo2.png" alt="Client 2" />
                <img src="/images/logo3.png" alt="Client 3" />
                <img src="/images/logo4.png" alt="Client 4" />
              </div>
            </div>
          </div>

          <div className="hero-right" aria-hidden="true">
            <div className="hero-image" />
          </div>
        </div>
      </header>

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

