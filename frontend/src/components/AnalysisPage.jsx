// src/components/AnalysisPage.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import axios from 'axios';

export default function AnalysisPage() {
  const { analysisType } = useParams();
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reportReady, setReportReady] = useState(null);
  const fileRef = useRef();
  const isLoggedIn = !!auth.user;

  useEffect(() => {
    const pendingKey = location.state?.pendingReportKey;
    if (pendingKey) {
      const raw = sessionStorage.getItem(pendingKey);
      if (raw) {
        try {
          const report = JSON.parse(raw);
          setReportReady(report);
          // cleanup navigation state so it won't try again on refresh
          navigate(location.pathname, { replace: true, state: {} });
        } catch (err) {
          console.error('failed to parse pending report', err);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);

  async function uploadAndWait(fileToUpload) {
    setLoading(true);
    setReportReady(null);
    try {
      const fd = new FormData();
      fd.append('file', fileToUpload);
      fd.append('analysisType', analysisType);

      const headers = auth.token ? { Authorization: `Bearer ${auth.token}` } : {};
      const url = 'http://localhost:5000/api/upload-and-generate';

      // Try actual upload; if fails, fallback to mock report
      const res = await axios.post(url, fd, { headers, timeout: 120000 });
      const report = res.data;
      const key = `pending_report_${report.reportId || Date.now()}`;
      try { sessionStorage.setItem(key, JSON.stringify(report)); } catch (e) { /* ignore */ }
      setReportReady({ ...report, storageKey: key });
    } catch (err) {
      console.warn('Upload failed or backend unavailable — using mock report', err?.message || err);
      const mock = {
        reportId: 'mock-' + Date.now(),
        columns: ['Date', 'Value', 'Category'],
        summary: 'Mock report generated (backend unreachable).',
        reportHtml: `<div style="font-family:inherit"><h3>Mock report</h3><p>This is a demo report because the backend failed or is not reachable.</p></div>`
      };
      const key = `pending_report_${mock.reportId}`;
      try { sessionStorage.setItem(key, JSON.stringify(mock)); } catch (e) { /* ignore */ }
      setReportReady({ ...mock, storageKey: key });
    } finally {
      setLoading(false);
    }
  }

  const onAnalyze = async (e) => {
    e?.preventDefault?.();
    if (!file) {
      alert('Please choose a file first');
      return;
    }
    await uploadAndWait(file);
  };

  const onLoginToView = () => {
    if (!reportReady || !reportReady.storageKey) return;
    const from = { pathname: location.pathname };
    navigate('/login', { state: { from, pendingReportKey: reportReady.storageKey } });
  };

  return (
    <div className="pf-page">
      <div className="pf-card">
        <h2>{analysisType ? analysisType.replace('-', ' ') : 'Analysis'}</h2>

        <form onSubmit={onAnalyze}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <input
              ref={fileRef}
              type="file"
              accept=".csv,.xlsx"
              onChange={(e) => setFile(e.target.files[0])}
              aria-label="Upload data file"
            />
            <button className="pf-primary" type="submit" disabled={loading}>
              {loading ? 'Generating report...' : 'Upload & Analyze'}
            </button>
          </div>
        </form>

        <div style={{ marginTop: 18 }}>
          {!reportReady && !loading && (
            <div className="pf-muted">No report yet. Upload a file to generate an analysis report.</div>
          )}

          {loading && (
            <div style={{ marginTop: 12 }}>
              <div>Generating report — please wait...</div>
              <div style={{ marginTop: 8 }} className="pf-placeholder">Processing...</div>
            </div>
          )}

          {reportReady && (
            <div style={{ position: 'relative', marginTop: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong>Report ready</strong>
                  <div className="pf-muted" style={{ fontSize: 13 }}>{reportReady.summary}</div>
                </div>

                {!isLoggedIn && (
                  <div>
                    <button className="pf-outlined" onClick={onLoginToView}>
                      Login to view report
                    </button>
                  </div>
                )}
              </div>

              {/* Report rendering area */}
              <div className="report-wrapper" style={{ marginTop: 12 }}>
                {/* The actual content container that will be blurred when user isn't logged in */}
                <div className="report-content" aria-hidden={!isLoggedIn}>
                  <div style={{ padding: 16, background: '#fff' }}>
                    {reportReady.reportHtml ? (
                      <div dangerouslySetInnerHTML={{ __html: reportReady.reportHtml }} />
                    ) : (
                      <div>
                        <h4>Detected columns</h4>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                          {(reportReady.columns || []).map((c) => (
                            <span key={c} className="pf-tag">{c}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Overlay shown when not logged in — sits in front of the blurred content */}
                {!isLoggedIn && (
                  <div
                    className="report-overlay card-elevated"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Sign in required to view report"
                    onClick={onLoginToView}
                  >
                    <div className="overlay-inner">
                      <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
                        Please sign in to view the full report
                      </div>
                      <div style={{ color: '#475569', marginBottom: 12 }}>
                        We generated your report. Sign in to view detailed charts, tables and recommendations.
                      </div>
                      <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                        <button
                          className="pf-primary"
                          onClick={(e) => { e.stopPropagation(); onLoginToView(); }}
                        >
                          Sign in to view
                        </button>
                        <button
                          className="pf-outlined"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (reportReady.storageKey) sessionStorage.removeItem(reportReady.storageKey);
                            setReportReady(null);
                          }}
                        >
                          Dismiss
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
