import React from 'react';
import { useAuth } from '../auth/AuthProvider';

export default function MyProfile() {
  const { user } = useAuth();

  // These can be fetched from DB or API later
  const previousAnalyses = [
    "Energy Benchmarking - Jan 2025",
    "Voltage Optimization Summary",
    "Leakage Detection Report",
  ];

  const datasets = [
    "Device Dataset - December 2024",
    "Energy Consumption Dataset",
    "Voltage Stability Dataset"
  ];

  return (
    <div style={{ padding: "120px 40px" }}>
      <h1 style={{ fontSize: 32, fontWeight: 800 }}>My Profile</h1>

      {/* USER DETAILS */}
      <section style={{ marginTop: 30 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700 }}>User Details</h2>
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
      </section>

      {/* PREVIOUS ANALYSES */}
      <section style={{ marginTop: 40 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700 }}>Previous Analyses</h2>
        <ul>
          {previousAnalyses.map((a, i) => <li key={i}>{a}</li>)}
        </ul>
      </section>

      {/* DATASETS */}
      <section style={{ marginTop: 40 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700 }}>Datasets</h2>
        <ul>
          {datasets.map((d, i) => <li key={i}>{d}</li>)}
        </ul>
      </section>
    </div>
  );
}
