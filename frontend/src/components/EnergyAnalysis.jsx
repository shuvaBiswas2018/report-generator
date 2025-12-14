// src/pages/EnergyAnalysis.jsx
import React, { useState, useRef } from "react";
import axios from "axios";
import { useAuth } from "../auth/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function EnergyAnalysis() {
  const auth = useAuth();
  const navigate = useNavigate();
  const fileRef = useRef();

  const [expanded, setExpanded] = useState(false);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reportReady, setReportReady] = useState(null);

  // Upload + Generate Report
  async function uploadAndGenerate() {
    if (!file) return alert("Please select a file first.");

    setLoading(true);
    setReportReady(null);

    try {
      const form = new FormData();
      form.append("file", file);
      form.append("analysisType", "energy-analysis");

      const headers = auth.token ? { Authorization: `Bearer ${auth.token}` } : {};
      const url = "http://localhost:5000/api/upload-and-generate";

      const res = await axios.post(url, form, { headers, timeout: 120000 });
      setReportReady(res.data);
    } catch (e) {
      console.log("Backend unavailable. Using mock data.");
      setReportReady({
        reportHtml: `<div><h3>Mock Report</h3><p>The backend is offline.</p></div>`
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="pf-page">

      {/* ------------------------------ */}
      {/*     TOP SECTION — DETAILS      */}
      {/* ------------------------------ */}

      <div className="pf-card" style={{ padding: 22 }}>

        <h1 style={{ marginTop: 0 }}>Energy Analysis</h1>

        {/* Short Description */}
        <p className="pf-muted" style={{ fontSize: 16 }}>
          Understand energy consumption patterns, detect inefficiencies, and
          improve equipment performance using automated energy insights.
        </p>

        {/* Partial details (always visible) */}
        <p style={{ marginTop: 12 }}>
          Energy analysis helps organizations reduce cost, improve efficiency,
          identify anomalies, and plan maintenance based on real operational data.
        </p>

        {/* Full details (hidden until Learn More is clicked) */}
        {expanded && (
          <div className="expand-box fade-slide">
            <p>
              With advanced analytics, businesses can track equipment behavior,
              detect early failure signs, optimize power usage, and reduce carbon
              footprint. Energy analysis also identifies peak usage, seasonal
              trends, and operational inefficiencies that impact overall cost.
            </p>

            <p>
              When combined with detailed visualization and automated reporting,
              energy analytics provide leadership teams with actionable insights
              for strategic planning, budgeting, and sustainability improvements.
            </p>
          </div>
        )}

        {/* Learn More Button */}
        {!expanded && (
          <button
            className="pf-outlined animated-outline-btn"
            style={{ marginTop: 14 }}
            onClick={() => setExpanded(true)}
          >
            Learn More
          </button>
        )}

        {/* Upload Button appears AFTER expansion */}
        {expanded && (
          <div style={{ marginTop: 18 }}>
            <button
              className="pf-primary animated-btn"
              onClick={() => {
                const el = document.getElementById("upload-section");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Upload & Get Report
            </button>
          </div>
        )}
      </div>

      {/* ------------------------------ */}
      {/*         UPLOAD SECTION          */}
      {/* ------------------------------ */}

      <div id="upload-section" className="pf-card" style={{ padding: 22, marginTop: 22 }}>
        <h2 style={{ marginTop: 0 }}>Upload Your File</h2>

        <p className="pf-muted" style={{ marginBottom: 10 }}>
          Upload your CSV or Excel file to generate a detailed energy report.
        </p>

        <div style={{ display: "flex", gap: 12 }}>
          <input
            ref={fileRef}
            type="file"
            accept=".csv,.xlsx"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <button
            className="pf-primary"
            onClick={uploadAndGenerate}
            disabled={loading}
          >
            {loading ? "Generating..." : "Upload & Analyze"}
          </button>
        </div>

        {/* ------------------------------ */}
        {/*          REPORT SECTION         */}
        {/* ------------------------------ */}

        <div style={{ marginTop: 22 }}>
          {loading && <div>Generating report...</div>}

          {!loading && reportReady && (
            <div
              style={{
                background: "#fff",
                padding: 16,
                borderRadius: 8,
                marginTop: 12
              }}
              dangerouslySetInnerHTML={{ __html: reportReady.reportHtml }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
