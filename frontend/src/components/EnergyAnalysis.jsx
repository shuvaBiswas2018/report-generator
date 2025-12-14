// src/components/EnergyAnalysis.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
// import GraphRenderer from "./GraphRenderer";

export default function EnergyAnalysis() {
  const navigate = useNavigate();
  const [country, setCountry] = useState("");
  const [currencySymbol, setCurrencySymbol] = useState("₹");

  const COUNTRY_LIST = [
    "India",
    "USA",
    "UK",
    "Europe",
    "Australia",
    "Canada",
    "UAE",
    "Singapore",
    "Japan",
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

  const handleCountryChange = (value) => {
    setCountry(value);
    setCurrencySymbol(CURRENCY_MAP[value] || "₹");
  };


  // FORM FIELDS
  const [companyName, setCompanyName] = useState("");
  const [companyArea, setCompanyArea] = useState("");
  const [employees, setEmployees] = useState("");
  const [tariff, setTariff] = useState("");
  const [file, setFile] = useState(null);

  // DATA EXTRACTED FROM FILE
  const [dataset, setDataset] = useState([]);
  const [graphOptionsVisible, setGraphOptionsVisible] = useState(false);
  const [selectedGraph, setSelectedGraph] = useState(null);

  // GRAPH TYPES
  const graphTypes = [
    "Daily Consumption",
    "Monthly Trend",
    "Weekday Pattern",
    "Peak Hour Analysis"
  ];

  /* -------------------------------------- */
  /* FILE PARSER */
  /* -------------------------------------- */
  const handleFileUpload = (e) => {
    const uploaded = e.target.files[0];
    if (!uploaded) return;

    setFile(uploaded);

    const reader = new FileReader();
    reader.onload = (evt) => {
      const workbook = XLSX.read(evt.target.result, { type: "binary" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(sheet);

      if (!json.length) return;

      // Auto-detect date column
      const firstRow = json[0];
      const keys = Object.keys(firstRow);
      const dateKey = keys.find(
        (k) =>
          k.toLowerCase().includes("date") ||
          k.toLowerCase().includes("time") ||
          k.toLowerCase().includes("timestamp")
      );

      json.forEach((row) => {
        const dt = new Date(row[dateKey]);

        if (!isNaN(dt)) {
          row.__date = dt.toISOString().split("T")[0];
          row.__year = dt.getFullYear();
          row.__month = dt.getMonth() + 1;
          row.__day = dt.getDate();
          row.__weekday = dt.toLocaleString("en-US", { weekday: "long" });
          row.__week = Math.ceil((dt.getDate() + dt.getDay()) / 7);
          row.__hour = dt.getHours();
        }
      });

      setDataset(json);
      setGraphOptionsVisible(true);
    };

    reader.readAsBinaryString(uploaded);
  };

  return (
    <div className="pf-page" style={{ padding: "80px 100px" }}>

      {/* -------------------------------------- */}
      {/* 1. HEADING */}
      {/* -------------------------------------- */}
      <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 10 }}>
        Energy Consumption Analysis
      </h1>

      {/* -------------------------------------- */}
      {/* 2. BASIC INSTRUCTIONS */}
      {/* -------------------------------------- */}
      <div className="pf-card" style={{ padding: 20, marginBottom: 20 }}>
        <h3>How This Works</h3>
        <ul style={{ lineHeight: 1.7, marginLeft: 20 }}>
          <li>Upload your CSV or Excel dataset.</li>
          <li>We extract Date, Month, Year, Weekday, Week, Hour etc.</li>
          <li>Choose from different graph types.</li>
          <li>View visualized insights instantly.</li>
          <li>You can modify insights using natural language prompts.</li>
        </ul>
      </div>

      {/* -------------------------------------- */}
      {/* 3. DETAILS PAGE BUTTON */}
      {/* -------------------------------------- */}
      <div style={{ textAlign: "right", marginBottom: 25 }}>
        <button
          className="btn-primary"
          style={{ padding: "10px 20px" }}
          onClick={() => navigate("/analysis-details/energy")}
        >
          View Detailed Energy Insights →
        </button>
      </div>

      {/* -------------------------------------- */}
      {/* 4. BEAUTIFUL FORM SECTION */}
      {/* -------------------------------------- */}
      <div className="ea-form-card">
        <h3 className="ea-form-title">Company Information</h3>

        <div className="ea-form-grid">
          {/* COMPANY NAME */}
          <div className="ea-field">
            <label>Company Name *</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
          </div>
          {/* COUNTRY */}
          <div className="ea-field">
            <label>Country *</label>
            <select
              value={country}
              onChange={(e) => handleCountryChange(e.target.value)}
              className="ea-select"
            >
              <option value="">Select Country</option>
              {COUNTRY_LIST.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>



          {/* AREA */}
          <div className="ea-field">
            <label>Company Area (Optional)</label>
            <input
              type="text"
              value={companyArea}
              onChange={(e) => setCompanyArea(e.target.value)}
            />
          </div>

          {/* EMPLOYEES */}
          <div className="ea-field">
            <label>No. of Employees (Optional)</label>
            <input
              type="number"
              value={employees}
              onChange={(e) => setEmployees(e.target.value)}
            />
          </div>

          {/* TARIFF */}
          <div className="ea-field">
            <label>Electricity Tariff ({currencySymbol}/kWh)</label>
            <input
              type="number"
              value={tariff}
              onChange={(e) => setTariff(e.target.value)}
            />
          </div>

          {/* FILE UPLOAD */}
          <div className="ea-field file-field">
            <label>Upload Energy Data (CSV / Excel)</label>
            <input
              type="file"
              accept=".csv,.xlsx"
              onChange={handleFileUpload}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>

        {/* -------------------------------------- */}
        {/* BUTTONS INSIDE FORM CARD */}
        {/* -------------------------------------- */}
        <div className="ea-form-actions-inside">
          <button
            className="btn-primary"
            type="button"
            onClick={() => alert("Form submitted successfully!")}
          >
            Submit
          </button>

          <button
            className="pf-ghost"
            type="button"
            onClick={() => {
              setCompanyName("");
              setCompanyArea("");
              setEmployees("");
              setTariff("");
              setCountry("");
              setCurrencySymbol("₹");
              setFile(null);
            }}
          >
            Reset
          </button>
        </div>
      </div>


    </div>
  );
}
