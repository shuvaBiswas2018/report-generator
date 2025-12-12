// src/components/EnergyAnalysis.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import axios from 'axios';

export default function EnergyAnalysis() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reportReady, setReportReady] = useState(null);
  const fileRef = useRef();
  const isLoggedIn = !!auth.user;

  // Restore report after login
  useEffect(() => {
    const pendingKey = location.state?.pendingReportKey;
    if (pendingKey) {
      const raw = sessionStorage.getItem(pendingKey);
      if (raw) {
        try {
          const report = JSON.parse(raw);
          setReportReady(report);
          navigate(location.pathname, { replace: true, state: {} });
        } catch (err) { console.error(err); }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);

  // Upload and wait for the report
  async function uploadAndWait(fileToUpload) {
    setLoading(true);
    setReportReady(null);

    try {
      const fd = new FormData();
      fd.append('file', fileToUpload);
      fd.append('analysisType', 'energy-analysis');

      const headers = auth.token ? { Authorization: `Bearer ${auth.token}` } : {};
      const url = 'http://localhost:5000/api/upload-and-generate';

      const res = await axios.post(url, fd, { headers, timeout: 120000 });
      const report = res.data;

      const key = `pending_report_${report.reportId || Date.now()}`;
      try { sessionStorage.setItem(key, JSON.stringify(report)); } catch (e) {}

      setReportReady({ ...report, storageKey: key });
    } catch (err) {
      console.warn("Backend unreachable. Showing mock report.");

      const mock = {
        reportId: 'mock-' + Date.now(),
        columns: ['Date', 'Value', 'Category'],
        summary: "Mock report generated (backend unreachable).",
        reportHtml: `<div><h3>Mock report</h3><p>This is a demo report only.</p></div>`
      };

      const key = `pending_report_${mock.reportId}`;
      sessionStorage.setItem(key, JSON.stringify(mock));

      setReportReady({ ...mock, storageKey: key });
    } finally {
      setLoading(false);
    }
  }

  const onAnalyze = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file first.");
    await uploadAndWait(file);
  };

  const onLoginToView = () => {
    if (!reportReady?.storageKey) return;
    navigate('/login', {
      state: { from: { pathname: location.pathname }, pendingReportKey: reportReady.storageKey }
    });
  };

  // FAQ PANEL (RIGHT SIDE)
  function FAQPanel() {
    return (
      <div className="pf-card" style={{ padding: 18, position: 'sticky', top: 90 }}>
        <h3 style={{ marginTop: 0 }}>Energy Analysis FAQ</h3>

        <div className="ea-faq-block">
          <strong>⚡ What is Energy Analysis?</strong>
          <p>
            It evaluates electricity usage across your operations. Detects inefficiencies,
            wastage, and helps you reduce energy cost.
          </p>
        </div>

        <div className="ea-faq-block">
          <strong>📈 How does it help grow a business?</strong>
          <p>
            Reduce operational costs, improve equipment performance, reduce downtime, 
            increase margins and improve sustainability.
          </p>
        </div>

        <div className="ea-faq-block">
          <strong>❓ Why do businesses need it?</strong>
          <p>
            Rising energy costs, compliance needs and preventing equipment failure make
            energy analysis essential.
          </p>
        </div>

        <div className="ea-faq-block">
          <strong>📤 How to share reports?</strong>
          <p>
            Export PDF/Excel, create secure share links, or schedule automated email reports.
          </p>
        </div>

        <div className="ea-faq-block">
          <strong>📝 How to generate a report?</strong>
          <p>
            Upload CSV/XLSX → Click Analyze → View automatically generated insights.
          </p>
        </div>

        <div className="ea-faq-block">
          <strong>📊 Sample Data Example</strong>
          <p>
            Typical columns: Date & Time, Energy_Consumption (kWh), Equipment/Zone.
          </p>
        </div>

        <div className="ea-faq-block">
          <strong>📘 Definition</strong>
          <p>
            A structured evaluation of consumption patterns to reduce cost and improve reliability.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pf-page">

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
        
        {/* LEFT SIDE — Upload + Report */}
        <div>
          <div className="pf-card">
            <h1 style={{ marginTop: 0 }}>Energy Analysis</h1>
            <p className="pf-muted">
              Upload your energy dataset to detect trends, anomalies and generate a ready-to-share report.
            </p>

            {/* Upload */}
            <form onSubmit={onAnalyze}>
              <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
                <input
                  ref={fileRef}
                  type="file"
                  accept=".csv,.xlsx"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <button className="pf-primary" type="submit" disabled={loading}>
                  {loading ? "Generating..." : "Upload & Analyze"}
                </button>
              </div>
            </form>

            {/* Report section */}
            <div style={{ marginTop: 20 }}>
              {!reportReady && !loading && (
                <div className="pf-muted">No report yet. Upload a dataset to begin.</div>
              )}

              {loading && (
                <div style={{ marginTop: 14 }}>
                  <strong>Generating report...</strong>
                  <div className="pf-placeholder" style={{ marginTop: 8 }}>Processing</div>
                </div>
              )}

              {reportReady && (
                <div style={{ position: 'relative', marginTop: 12 }}>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <strong>Report ready</strong>
                      <div className="pf-muted">{reportReady.summary}</div>
                    </div>

                    {!isLoggedIn && (
                      <button className="pf-outlined" onClick={onLoginToView}>
                        Sign in to view full report
                      </button>
                    )}
                  </div>

                  {/* Report display (blur if not logged in) */}
                  <div className="report-wrapper" style={{ marginTop: 12 }}>
                    <div className="report-content" aria-hidden={!isLoggedIn}>
                      <div style={{ padding: 16, background: "#fff" }}>
                        {reportReady.reportHtml ? (
                          <div dangerouslySetInnerHTML={{ __html: reportReady.reportHtml }} />
                        ) : (
                          <div>
                            <h4>Detected Columns</h4>
                            {(reportReady.columns || []).map(c => (
                              <span key={c} className="pf-tag">{c}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {!isLoggedIn && (
                      <div
                        className="report-overlay"
                        onClick={onLoginToView}
                      >
                        <div className="overlay-inner">
                          <h3 style={{ marginBottom: 8 }}>Sign in to view your full report</h3>
                          <p style={{ marginBottom: 12 }}>
                            Your report is ready! Please sign in to reveal all insights.
                          </p>
                          <button className="pf-primary">Sign in</button>
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE — FAQ */}
        <FAQPanel />
      </div>
    </div>
  );
}
