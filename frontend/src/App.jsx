// src/App.jsx
import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthRoutes from "./routes/AuthRoutes";

import Header from './components/Header';
import Home from './components/Home';
import AnalysisSelection from "./components/AnalysisSelection";
import MyProfile from "./pages/MyProfile";
import EnergyAnalysis from './components/EnergyAnalysis';
import EnergyAnalysisDetails from "./analysisDetails/EnergyAnalysisDetails";

import Contact from './pages/Contact';
import ComingSoon from './pages/ComingSoon';
import { AuthProvider, useAuth} from './auth/AuthProvider';
import LoginPromptModal from "./components/LoginPromptModal";
// import './App.css';

/* ---------------- LAYOUT WITH LOGIN PROMPT ---------------- */

function AppLayout({ children }) {
  const { user } = useAuth();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const firstTimerRef = useRef(null);
  const repeatTimerRef = useRef(null);

  useEffect(() => {
    /* If user logs in → clear everything */
    if (user) {
      clearAllTimers();
      setShowLoginPrompt(false);
      return;
    }

    /*  Show first prompt after 2 minutes of inactivity */
    firstTimerRef.current = setTimeout(() => {
      setShowLoginPrompt(true);
    }, 0.5 * 60 * 1000);

    return clearAllTimers;
  }, [user]);

  const clearAllTimers = () => {
    if (firstTimerRef.current) clearTimeout(firstTimerRef.current);
    if (repeatTimerRef.current) clearTimeout(repeatTimerRef.current);
  };

  const handleIgnoreLogin = () => {
    setShowLoginPrompt(false);

    // Show again after 5 minutes
    repeatTimerRef.current = setTimeout(() => {
      setShowLoginPrompt(true);
    }, 5 * 60 * 1000);
  };

  return (
    <>
      {children}

      {!user && showLoginPrompt && (
        <LoginPromptModal onClose={handleIgnoreLogin} />
      )}
    </>
  );
}


export default function App() {
  return (
    <AuthProvider>
      
      <Router>
        <AppLayout>
        <div className="pf-app">
          <Header />
          <div className="pf-body">
            {/* <Sidebar /> */}
            <main className="pf-main">
              {/* AUTH ROUTES WITH ANIMATION */}
              <AuthRoutes />

              <Routes>
                {/* Public auth pages */}
                {/* <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/signup" element={<Signup />} /> */}
                {/* {My Profile} */}
                <Route path="/my-profile" element={<MyProfile />} />


                {/* Coming soon modules */}
                <Route path="/stock-analysis" element={<ComingSoon />} />
                <Route path="/attendance-analysis" element={<ComingSoon />} />

                {/* Real analysis page */}
                <Route path="/analysis/energy" element={<EnergyAnalysis />} />
                <Route path="/analysis-details/:type" element={<EnergyAnalysisDetails />} />

                <Route path="/contact" element={<Contact />} />

                {/* Public app pages (anyone can browse) */}
                <Route path="/" element={<Home />} />
                <Route path="/analysis-selection" element={<AnalysisSelection />} />
                {/* <Route path="/:analysisType" element={<AnalysisPage />} /> */}
              </Routes>
            </main>
          </div>
          <footer className="pf-footer">© {new Date().getFullYear()} InsightFlow — All rights reserved<div style={{ marginTop: 4, fontSize: 13 }}>
            Built by EfficioTech
          </div></footer>
        </div>
        </AppLayout>
      </Router>
    </AuthProvider>
  );
}
