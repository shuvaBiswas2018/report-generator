// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
// import Sidebar from './components/Sidebar';
import Home from './components/Home';
import AnalysisSelection from "./components/AnalysisSelection";
import AnalysisPage from './components/AnalysisPage';
import EnergyAnalysis from './components/EnergyAnalysis';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ComingSoon from './pages/ComingSoon';
import { AuthProvider } from './auth/AuthProvider';
import './App.css';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="pf-app">
          <Header />
          <div className="pf-body">
            {/* <Sidebar /> */}
            <main className="pf-main">
              <Routes>
                {/* Public auth pages */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Coming soon modules */}
                <Route path="/stock-analysis" element={<ComingSoon />} />
                <Route path="/attendance-analysis" element={<ComingSoon />} />

                {/* Real analysis page */}
                <Route path="/energy-analysis" element={<EnergyAnalysis />} />
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
      </Router>
    </AuthProvider>
  );
}
