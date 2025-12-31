// src/components/LoginPromptModal.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPromptModal({ onClose }) {
  const navigate = useNavigate();

  const handleSignIn = () => {
    onClose();           // close modal
    navigate("/login");  // redirect to login
  };

  return (
    <div className="login-modal-overlay">
      <div className="login-modal-card">

        {/* ❌ CLOSE BUTTON */}
        <button
          className="login-modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        <h3>Sign in to continue 🚀</h3>
        <p>
          Create an account or log in to save insights, access reports,
          and unlock full features.
        </p>

        <div className="login-modal-actions">
          <button
            className="btn-primary"
            onClick={handleSignIn}
          >
            Sign In
          </button>

          <button
            className="pf-ghost"
            onClick={onClose}
          >
            Continue without login
          </button>
        </div>
      </div>
    </div>
  );
}
