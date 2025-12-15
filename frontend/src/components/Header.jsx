// src/components/Header.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';

export default function Header() {
    const auth = useAuth();
    const navigate = useNavigate();

    const [query, setQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [scrolled, setScrolled] = useState(false);

    // Detect scroll for background change
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // SEARCH DATA
    const analyses = [
        { name: "Energy Analysis", path: "/analysis/energy" },
        { name: "Voltage Optimization", path: "/analysis/voltage" },
        { name: "Leakage Detection", path: "/analysis/leakage" },
        { name: "Monthly Report", path: "/report/monthly" },
        { name: "Quarterly Report", path: "/report/quarterly" },
        { name: "Device Runtime Analysis", path: "/analysis/runtime" }
    ];

    const results = analyses.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase())
    );

    // Keyboard navigation for search
    const handleKeyDown = (e) => {
        if (results.length === 0) return;

        if (e.key === "ArrowDown") {
            setSelectedIndex(prev => (prev + 1) % results.length);
        }

        if (e.key === "ArrowUp") {
            setSelectedIndex(prev => (prev <= 0 ? results.length - 1 : prev - 1));
        }

        if (e.key === "Enter" && selectedIndex >= 0) {
            navigate(results[selectedIndex].path);
            setQuery("");
            setSelectedIndex(-1);
        }
    };

    const onSignOut = () => {
        auth.signout();
        navigate('/');
    };

    const onContact = () => navigate('/contact');

    return (
        <header className={`pf-header ${scrolled ? "scrolled" : ""}`}>
            <div className="pf-header-inner">

                {/* ---------------- LOGO + BRAND ---------------- */}
                <div
                    className="pf-brand"
                    onClick={() => navigate('/')}
                    style={{ cursor: 'pointer' }}
                >
                    <img src="/images/94703857126.png" alt="InsightFlow" className="pf-logo" />

                    {/* <div className="pf-brand-text">
                        <div className="pf-title">InsightFlow</div>
                        <div className="pf-sub">Enterprise Analytics</div>
                    </div> */}
                </div>

                {/* ---------------- RIGHT CONTROLS ---------------- */}
                <div className="pf-controls">

                    {/* SEARCH INPUT */}
                    <div className="pf-search-wrapper">
                        <input
                            className="pf-search"
                            placeholder="Search analyses, datasets..."
                            value={query}
                            onChange={(e) => {
                                setQuery(e.target.value);
                                setSelectedIndex(-1);
                            }}
                            onKeyDown={handleKeyDown}
                        />

                        {/* SEARCH RESULTS */}
                        {query.length > 0 && (
                            <div className="pf-search-results">
                                {results.length > 0 ? (
                                    results.map((item, index) => (
                                        <div
                                            key={index}
                                            className={`pf-search-item ${index === selectedIndex ? "pf-selected" : ""}`}
                                            onClick={() => {
                                                navigate(item.path);
                                                setQuery("");
                                                setSelectedIndex(-1);
                                            }}
                                        >
                                            {item.name}
                                        </div>
                                    ))
                                ) : (
                                    <div className="pf-search-item pf-not-found">
                                        Not Found
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* ---------------- USER STATE ---------------- */}
                    {!auth.user ? (
                        <>
                            <Link to="/login" className="pf-ghost">Sign in</Link>
                        </>
                    ) : (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>

                            {/* USER INFO */}
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: 14, fontWeight: 600 }}>
                                    {auth.user.name}
                                </div>
                                <div style={{ fontSize: 12, color: '#6b7280' }}>
                                    {auth.user.email}
                                </div>
                            </div>

                            {/* MY PROFILE BUTTON */}
                            <button
                                className="pf-ghost"
                                onClick={() => navigate('/my-profile')}
                            >
                                My Profile
                            </button>

                            {/* SIGN OUT */}
                            <button className="pf-ghost" onClick={onSignOut}>
                                Sign out
                            </button>
                        </div>
                    )}

                    {/* CONTACT US BUTTON */}
                    <button
                        className="pf-outlined"
                        onClick={onContact}
                        style={{ marginLeft: 10 }}
                    >
                        Contact Us
                    </button>

                </div>
            </div>
        </header>
    );
}
