// src/components/MyProfile.jsx
import React, { useState } from "react";
import { useAuth } from "../auth/AuthProvider";

export default function MyProfile() {
  const { user } = useAuth();
  const API_URL = process.env.REACT_APP_API_URL;
  /* ---------------- PASSWORD UI STATE ---------------- */
  const [showPasswordBox, setShowPasswordBox] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);

  /* ---------------- MOCK DATA ---------------- */
  const previousAnalyses = [
    { name: "Energy Benchmarking - Jan 2025", file: "energy_benchmark_jan_2025.pdf" },
    { name: "Voltage Optimization Summary", file: "voltage_optimization.pdf" },
    { name: "Leakage Detection Report", file: "leakage_detection.pdf" },
  ];

  const datasets = [
    { name: "Device Dataset - December 2024", file: "device_dataset_dec_2024.xlsx" },
    { name: "Energy Consumption Dataset", file: "energy_consumption.csv" },
    { name: "Voltage Stability Dataset", file: "voltage_stability.xlsx" },
  ];

  const handleDownload = (file) => {
    alert(`Downloading: ${file}`);
  };

  /* ---------------- PASSWORD SAVE ---------------- */
  const handlePasswordChange = async () => {
  if (!currentPassword || !newPassword || !confirmPassword) {
    return alert("Please fill all password fields");
  }

  if (newPassword !== confirmPassword) {
    return alert("Passwords do not match");
  }

  setSavingPassword(true);

  try {
    const res = await fetch(`${API_URL}/auth/change-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: user.id,
        current_password: currentPassword,
        new_password: newPassword
      })
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.detail);

    alert("Password updated successfully");
    setShowPasswordBox(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

  } catch (err) {
    alert(err.message);
  } finally {
    setSavingPassword(false);
  }
};


  return (
    <div className="pf-page">
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "90px 24px 40px" }}>

        {/* PAGE HEADER */}
        <div style={{ marginBottom: 36 }}>
          <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 6 }}>
            My Profile
          </h1>
          <p className="pf-muted">
            View your personal details, previous analyses, and uploaded datasets.
          </p>
        </div>

        {/* USER INFO CARD */}
        <div
          style={{
            background: "#fff",
            borderRadius: 14,
            padding: 24,
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          {/* LEFT */}
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: "linear-gradient(135deg,#7c3aed,#06b6d4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: 24,
                fontWeight: 800,
              }}
            >
              {user?.name?.charAt(0).toUpperCase()}
            </div>

            <div>
              <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>
                {user?.name}
              </h2>
              <p style={{ margin: "4px 0 0", color: "#6b7280" }}>
                {user?.email}
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <button
            className="btn-primary"
            onClick={() => setShowPasswordBox(!showPasswordBox)}
          >
            Change Password
          </button>
        </div>

        {/* CHANGE PASSWORD PANEL */}
        {showPasswordBox && (
          <div
            style={{
              background: "#fff",
              borderRadius: 14,
              padding: 24,
              boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
              marginBottom: 40,
              maxWidth: 520,
            }}
          >
            <h3 style={{ fontWeight: 700, marginBottom: 16 }}>
              Update Password
            </h3>

            <div style={{ display: "grid", gap: 14 }}>
              <div>
                <label className="if-label">Current Password</label>
                <input
                  className="pf-input"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>

              <div>
                <label className="if-label">New Password</label>
                <input
                  className="pf-input"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <div>
                <label className="if-label">Confirm New Password</label>
                <input
                  className="pf-input"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
              <button
                className="btn-primary"
                disabled={savingPassword}
                onClick={handlePasswordChange}
              >
                {savingPassword ? "Updating..." : "Update Password"}
              </button>

              <button
                className="pf-ghost"
                onClick={() => setShowPasswordBox(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 28,
          }}
        >
          {/* PREVIOUS ANALYSES */}
          <section>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 14 }}>
              Previous Analyses
            </h3>

            {previousAnalyses.map((item, index) => (
              <div
                key={index}
                style={{
                  background: "#fff",
                  borderRadius: 12,
                  padding: 16,
                  marginBottom: 12,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
                }}
              >
                <span style={{ fontWeight: 600 }}>{item.name}</span>
                <button
                  className="btn-primary small"
                  onClick={() => handleDownload(item.file)}
                >
                  Download
                </button>
              </div>
            ))}
          </section>

          {/* DATASETS */}
          <section>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 14 }}>
              Datasets
            </h3>

            {datasets.map((item, index) => (
              <div
                key={index}
                style={{
                  background: "#fff",
                  borderRadius: 12,
                  padding: 16,
                  marginBottom: 12,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
                }}
              >
                <span style={{ fontWeight: 600 }}>{item.name}</span>
                <button
                  className="btn-primary small"
                  onClick={() => handleDownload(item.file)}
                >
                  Download
                </button>
              </div>
            ))}
          </section>
        </div>

      </div>
    </div>
  );
}
