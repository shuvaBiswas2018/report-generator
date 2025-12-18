import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";



export default function EnergyAnalysis() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  /* -------------------- CONSTANTS -------------------- */
  const COUNTRY_LIST = [
    "India", "USA", "UK", "Europe",
    "Australia", "Canada", "UAE",
    "Singapore", "Japan"
  ];

  const CURRENCY_MAP = {
    India: "₹",
    USA: "$",
    UK: "£",
    Europe: "€",
    Australia: "A$",
    Canada: "C$",
    UAE: "AED",
    Singapore: "S$",
    Japan: "¥",
  };

  const REPORT_TYPES = ["Monthly", "Quarterly", "Half-Yearly", "Yearly"];

  const GRAPH_TITLES = [
    "Daily Energy Consumption",
    "Monthly Energy Trend",
    "Yearly Consumption Overview",
    "Peak Hour Analysis",
    "Off-Peak Usage Pattern",
    "Weekday vs Weekend Usage",
    "Load Distribution Curve",
    "Energy Intensity per Employee",
    "Seasonal Consumption Pattern",
    "Base Load Identification",
    "Abnormal Spike Detection",
    "Energy Cost Impact",
    "Tariff Sensitivity Analysis",
    "Equipment Usage Pattern",
    "Energy Efficiency Indicator",
    "Consumption Forecast Preview",
  ];

  /* -------------------- FORM STATE -------------------- */
  const [companyName, setCompanyName] = useState("");
  const [country, setCountry] = useState("");
  const [currency, setCurrency] = useState("₹");
  const [companyArea, setCompanyArea] = useState("");
  const [employees, setEmployees] = useState("");
  const [tariff, setTariff] = useState("");
  const [reportType, setReportType] = useState("");
  const [fileUploaded, setFileUploaded] = useState(false);
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);

  /* -------------------- REPORT STATE -------------------- */
  const [showReport, setShowReport] = useState(false);

  const [insights, setInsights] = useState(
    GRAPH_TITLES.map(
      () =>
        "This insight is auto-generated based on observed energy patterns. You can edit it to match operational context."
    )
  );

  const [saving, setSaving] = useState(
    GRAPH_TITLES.map(() => "idle") // idle | saving | saved
  );

  /* -------------------- HANDLERS -------------------- */
  const handleCountryChange = (value) => {
    setCountry(value);
    setCurrency(CURRENCY_MAP[value] || "₹");
  };

  const handleFileUpload = (e) => {
    if (e.target.files.length > 0) {
      setFileUploaded(true);
      setShowReport(true);
    }
  };

  const saveInsight = async (index) => {
    const updated = [...saving];
    updated[index] = "saving";
    setSaving(updated);

    // Simulated API save
    setTimeout(() => {
      updated[index] = "saved";
      setSaving([...updated]);
    }, 800);
  };

  const downloadReport = async (format) => {
  const res = await fetch(`http://localhost:8000/download-report/${format}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      companyName,
      reportType,
      insights
    })
  });

  const blob = await res.blob();

  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${companyName}_${reportType}_Energy_Report.${format}`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
};

const resetForm = () => {
  setCompanyName("");
  setCountry("");
  setCurrency("₹");
  setCompanyArea("");
  setEmployees("");
  setTariff("");
  setReportType("");
  setFileUploaded(false);
  setShowReport(false);
  setShowDownloadMenu(false);

  // Reset insights & save states
  setInsights(
    GRAPH_TITLES.map(
      () =>
        "This insight is auto-generated based on observed energy patterns. You can edit it to match operational context."
    )
  );
  setSaving(GRAPH_TITLES.map(() => "idle"));

  // / ✅ CLEAR FILE INPUT VISUALLY
  if (fileInputRef.current) {
    fileInputRef.current.value = "";
  }
};


  /* -------------------- REPORT HEADING -------------------- */
  const reportHeading = reportType
    ? `${reportType} Energy Consumption Report`
    : "Energy Consumption Report";

  return (
    <div className="pf-page" style={{ padding: "80px 100px" }}>
      {/* PAGE HEADING */}
      <h1 style={{ fontSize: 32, fontWeight: 800 }}>
        Energy Consumption Analysis
      </h1>

      {/* INSTRUCTIONS */}
      <div className="pf-card" style={{ padding: 20, margin: "16px 0" }}>
        <h3>How it works</h3>
        <ul style={{ marginLeft: 18, lineHeight: 1.7 }}>
          <li>Upload CSV or Excel energy data</li>
          <li>Select report type (monthly, quarterly, etc.)</li>
          <li>System generates visual insights automatically</li>
          <li>Edit and save insights as needed</li>
          <li>Download report in PDF, Word, or PowerPoint</li>
        </ul>
      </div>

      {/* DETAILS PAGE */}
      <div style={{ textAlign: "right", marginBottom: 20 }}>
        <button
          className="btn-primary"
          onClick={() => navigate("/analysis-details/energy")}
        >
          View Detailed Energy Insights →
        </button>
      </div>

      {/* FORM */}
      <div className="ea-form-card">
        <h3 className="ea-form-title">Company Information</h3>

        <div className="ea-form-grid">
          <div className="ea-field">
            <label>Company Name *</label>
            <input value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
          </div>

          <div className="ea-field">
            <label>Country *</label>
            <select value={country} onChange={(e) => handleCountryChange(e.target.value)}>
              <option value="">Select Country</option>
              {COUNTRY_LIST.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="ea-field">
            <label>Company Area</label>
            <input value={companyArea} onChange={(e) => setCompanyArea(e.target.value)} />
          </div>

          <div className="ea-field">
            <label>No. of Employees</label>
            <input type="number" value={employees} onChange={(e) => setEmployees(e.target.value)} />
          </div>

          <div className="ea-field">
            <label>Electricity Tariff ({currency}/kWh)</label>
            <input type="number" value={tariff} onChange={(e) => setTariff(e.target.value)} />
          </div>

          <div className="ea-field">
            <label>Report Type *</label>
            <select value={reportType} onChange={(e) => setReportType(e.target.value)}>
              <option value="">Select Report Type</option>
              {REPORT_TYPES.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </div>

          <div className="ea-field file-field">
            <label>Upload Energy Data (CSV / Excel)</label>
            <input
  ref={fileInputRef}
  type="file"
  accept=".csv,.xlsx"
  onChange={handleFileUpload}
/>

          </div>
        </div>
        
        <div style={{ marginTop: 20, display: "flex", justifyContent: "flex-end" }}>
  <button
    className="pf-ghost"
    type="button"
    onClick={resetForm}
  >
    Reset
  </button>
</div>

      </div>

      {/* REPORT UI */}
      {showReport && (
        <div className="ea-report-wrapper" style={{ marginTop: 40 }}>
          <h2 style={{ fontWeight: 800 }}>{reportHeading}</h2>
          <p className="pf-muted">Automatically generated insights (editable)</p>

          {/* DOWNLOAD BUTTONS */}
          <div style={{ position: "relative", display: "inline-block" }}>

  {/* MAIN DOWNLOAD BUTTON */}
  <button
    className="btn-primary"
    onClick={() => setShowDownloadMenu(!showDownloadMenu)}
  >
    Download Report ⬇️
  </button>

  {/* DROPDOWN MENU */}
  {showDownloadMenu && (
    <div
      style={{
        position: "absolute",
        top: "110%",
        right: 0,
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: 8,
        boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        minWidth: 180,
        zIndex: 10,
      }}
    >
      <div
        className="download-item"
        onClick={() => downloadReport("pdf")}
      >
        📄 Download as PDF
      </div>

      <div
        className="download-item"
        onClick={() => downloadReport("docx")}
      >
        📝 Download as Word
      </div>

      <div
        className="download-item"
        onClick={() => downloadReport("pptx")}
      >
        📊 Download as PowerPoint
      </div>
    </div>
  )}
</div>


          <div className="ea-report-grid">
            {GRAPH_TITLES.map((title, index) => (
              <div key={index} className="ea-report-card">
                <h4>{title}</h4>

                <div className="ea-graph-placeholder">
                  📊 Graph Placeholder
                </div>

                <textarea
                  className="ea-insight-box"
                  rows={4}
                  value={insights[index]}
                  onChange={(e) => {
                    const updated = [...insights];
                    updated[index] = e.target.value;
                    setInsights(updated);

                    const s = [...saving];
                    s[index] = "idle";
                    setSaving(s);
                  }}
                />

                <button
                  className="btn-primary small"
                  disabled={saving[index] === "saving"}
                  onClick={() => saveInsight(index)}
                >
                  {saving[index] === "idle" && "Save Insight"}
                  {saving[index] === "saving" && "Saving..."}
                  {saving[index] === "saved" && "Saved ✓"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
