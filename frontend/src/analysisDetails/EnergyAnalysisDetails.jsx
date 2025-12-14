// src/pages/EnergyAnalysisDetails.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function EnergyAnalysisDetails() {
    const [expanded, setExpanded] = useState(false);
    const navigate = useNavigate();
const [country, setCountry] = useState("");
const [currencySymbol, setCurrencySymbol] = useState("₹");

    // ------------------------------------------
    // HERO SECTION SLIDESHOW IMAGES
    // ------------------------------------------
    const heroImages = [
        "/images/energyAnalysisDetails.png",
        "/images/loadOptimization.png",
        // "/images/energy-3.png",
        // "/images/energy-4.png",
    ];

    const [heroIndex, setHeroIndex] = useState(0);

    // AUTO ROTATE EVERY 1 SECOND
    useEffect(() => {
        const interval = setInterval(() => {
            setHeroIndex((prev) => (prev + 1) % heroImages.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [heroImages.length]);


    // ------------------------------------------
    // FEATURE SECTION DATA (Dynamic)
    // ------------------------------------------
    const featureData = {
        "Energy monitoring": {
            label: "Energy monitoring",
            title: "Real-time visibility for better energy decisions",
            desc: "Monitor energy consumption, detect inefficiencies, prevent overloads, and take informed actions using real-time dashboards. Improve cost efficiency and operational reliability using advanced analytics.",
            //   img: "/images/energy-main.png",
        },
        "Load optimization": {
            label: "Load optimization",
            title: "Optimize load distribution for operational efficiency",
            desc: "Balance energy load across equipment, lower peak demand, and enhance equipment lifespan through intelligent load optimization algorithms.",
            //   img: "/images/load-optimization.png",
        },
        "Consumption forecasting": {
            label: "Consumption forecasting",
            title: "Predict future consumption with advanced analytics",
            desc: "Use historical data, seasonal trends, and machine learning to forecast energy requirements accurately and minimize cost uncertainty.",
            //   img: "/images/forecasting.png",
        },
        "Equipment health": {
            label: "Equipment health",
            title: "Detect equipment faults before breakdown occurs",
            desc: "Analyze equipment behavior, identify anomalies early, and prevent downtime with predictive maintenance insights.",
            //   img: "/images/equipment-health.png",
        },
        "Power quality": {
            label: "Power quality",
            title: "Improve energy stability and operational performance",
            desc: "Evaluate voltage fluctuations, power factor issues, and harmonic distortions to ensure stable, efficient power delivery.",
            //   img: "/images/power-quality.png",
        },
    };

    const [activeFeature, setActiveFeature] = useState("Energy monitoring");

    const downloadSampleCSV = () => {
        const csvContent =
            "Date & Time,Energy (kWh),Equipment/Zone\n" +
            "2024-01-01 00:00,12.4,HVAC\n" +
            "2024-01-01 01:00,10.9,Lighting\n" +
            "2024-01-01 02:00,9.8,Production Floor\n";

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "sample_energy_data.csv";
        link.click();
    };

    return (
        <div className="pf-page" style={{ padding: "80px 100px" }}>

            {/* ---------------------------------------------- */}
            {/* HERO SECTION — LEFT TEXT + RIGHT SLIDESHOW      */}
            {/* ---------------------------------------------- */}

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1.5fr 1fr",
                    gap: 40,
                    alignItems: "center",
                }}
            >
                {/* LEFT CONTENT */}
                <div>
                    <h1
                        style={{
                            marginTop: 0,
                            fontSize: 36,
                            fontWeight: 800,
                            background: "linear-gradient(90deg, #0f4c75, #3282b8)",
                            WebkitBackgroundClip: "text",
                            color: "transparent",
                        }}
                    >
                        AI-Driven Energy Intelligence
                    </h1>


                    <p className="pf-muted" style={{ maxWidth: 600, fontSize: 16 }}>
                        Energy analysis helps organizations understand consumption patterns,
                        detect inefficiencies, and reduce operational costs while improving
                        sustainability and equipment reliability.
                    </p>

                    <p style={{ marginTop: 16, maxWidth: 600, lineHeight: 1.6 }}>
                        It provides visibility into real-time energy behavior, equipment
                        performance, seasonal fluctuations, and long-term usage trends—
                        enabling smarter operational decisions.
                    </p>

                    {/* EXPANDABLE SECTION */}
                    {expanded && (
                        <div
                            className="fade-slide"
                            style={{ marginTop: 18, maxWidth: 600, lineHeight: 1.6 }}
                        >
                            <p>
                                Detailed analytics help businesses detect anomalies, avoid downtime,
                                and optimize their energy load. Automated alerts help teams respond
                                to inefficiencies before they escalate.
                            </p>

                            <p>
                                Forecasting tools support long-term planning by identifying energy
                                patterns, seasonal peaks, carbon footprint insights, and cost-saving
                                opportunities.
                            </p>


                        </div>
                    )}



                    {/* BUTTON ROW */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginTop: 10,
                            gap: 10,
                        }}
                    >
                        {/* LEFT SIDE BUTTON (TOGGLE) */}
                        {!expanded ? (
                            <button
                                className="pf-outlined"
                                onClick={() => setExpanded(true)}
                                style={{ whiteSpace: "nowrap" }}
                            >
                                Learn More
                            </button>
                        ) : (
                            <button
                                className="pf-outlined"
                                onClick={() => setExpanded(false)}
                                style={{ whiteSpace: "nowrap" }}
                            >
                                Less
                            </button>
                        )}

                        {/* RIGHT SIDE BUTTON — ALWAYS FIXED ON RIGHT */}
                        <button
                            className="btn-primary"
                            style={{ padding: "10px 22px", marginRight: '150px', whiteSpace: "nowrap" }}
                            onClick={() => navigate("/analysis/energy")}
                        >
                            Upload & Analyze
                        </button>
                    </div>

                </div>

                <div
                    style={{
                        position: "relative",
                        width: "100%",
                        overflow: "hidden",
                        height: "360px",
                        borderRadius: "14px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            height: "100%",
                            transform: `translateX(-${heroIndex * 100}%)`,
                            transition: "transform 1.2s ease-in-out",
                        }}
                    >
                        {heroImages.map((src, i) => (
                            <div key={i} style={{ minWidth: "100%", height: "100%" }}>
                                <img
                                    src={src}
                                    alt={`Slide ${i}`}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        borderRadius: "14px",
                                    }}
                                    onError={() => console.log("Image failed:", src)}
                                />
                            </div>
                        ))}
                    </div>

                    {/* DOTS */}
                    <div
                        style={{
                            position: "absolute",
                            bottom: "10px",
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            gap: "8px",
                        }}
                    >
                        {heroImages.map((_, i) => (
                            <div
                                key={i}
                                onClick={() => setHeroIndex(i)}
                                className={heroIndex === i ? "dot active-dot" : "dot"}
                            ></div>
                        ))}
                    </div>
                </div>



            </div>

            {/* FEATURE SECTION HEADING */}
            <div style={{ marginTop: 60, textAlign: "center" }}>
                <h2
                    style={{
                        fontSize: 30,
                        fontWeight: 800,
                        marginBottom: 8,
                        color: "#1e3a5f",
                    }}
                >
                    We Provide AI-Powered Insights Across Multiple Energy Dimensions
                </h2>

                <p
                    style={{
                        fontSize: 16,
                        color: "#6b7280",
                        maxWidth: 700,
                        margin: "0 auto 40px auto",
                        lineHeight: 1.6,
                    }}
                >
                    Discover how AI-driven analysis transforms your operations — from monitoring to
                    forecasting, optimization, equipment health, and power quality management.
                </p>
            </div>
            {/* ---------------------------------------------- */}
            {/*        FEATURE SECTION (Dynamic)                */}
            {/* ---------------------------------------------- */}

            <div
                style={{
                    marginTop: 60,
                    display: "grid",
                    gridTemplateColumns: "1fr 1px 2fr",
                    gap: 40,
                    alignItems: "start",
                }}
            >

                {/* LEFT MENU */}
                <div style={{ textAlign: "left" }}>
                    {Object.keys(featureData).map((item) => (
                        <div
                            key={item}
                            className={`left-item ${activeFeature === item ? "active-left-item" : ""
                                }`}
                            onClick={() => setActiveFeature(item)}
                        >
                            {item}
                        </div>
                    ))}
                </div>

                {/* VERTICAL LINE */}
                <div
                    style={{
                        width: "1px",
                        background: "#e5e7eb",
                        height: "100%",
                    }}
                ></div>

                {/* RIGHT CONTENT */}
                <div>
                    <div style={{ color: "#0077b6", fontWeight: 600, marginBottom: 8 }}>
                        {featureData[activeFeature].label}
                    </div>

                    <h2 style={{ margin: "0 0 14px 0", fontSize: 32, fontWeight: 800 }}>
                        {featureData[activeFeature].title}
                    </h2>

                    <p style={{ maxWidth: 700, marginBottom: 22, lineHeight: 1.6 }}>
                        {featureData[activeFeature].desc}
                    </p>

                    <button className="pf-primary" style={{ padding: "10px 24px" }}>
                        Learn more
                    </button>

                    {/* <div style={{ marginTop: 25 }}>
    <img
      src={featureData[activeFeature].img}
      alt={activeFeature}
      style={{
        width: "100%",
        maxWidth: "650px",
        borderRadius: "14px",
        boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.1)",
      }}
    />
  </div> */}
                </div>

            </div>
            {/* ---------------------------------------------- */}
            {/*               FAQ SECTION                      */}
            {/* ---------------------------------------------- */}

            <div style={{ marginTop: 80 }}>

                {/* FAQ Heading */}
                <h2
                    style={{
                        fontSize: 28,
                        fontWeight: 800,
                        color: "#1e3a5f",
                        textAlign: "center",
                        marginBottom: 8,
                    }}
                >
                    Frequently Asked Questions
                </h2>

                <p
                    style={{
                        textAlign: "center",
                        color: "#6b7280",
                        maxWidth: 700,
                        margin: "0 auto 40px auto",
                        fontSize: 16,
                        lineHeight: 1.6,
                    }}
                >
                    A quick overview to help you understand why Energy Analysis is important
                    and how it supports cost reduction, equipment efficiency, and smarter decisions.
                </p>

                {/* FAQ BLOCK LIST */}
                <div
                    style={{
                        maxWidth: 900,
                        margin: "0 auto",
                        display: "flex",
                        flexDirection: "column",
                        gap: "18px",
                    }}
                >

                    {/* FAQ Blocks – using your original text EXACTLY */}
                    <div className="faq-block fade-up">
                        <strong>⚡ What is Energy Analysis?</strong>
                        <p>
                            It evaluates electricity usage across your operations. Detects inefficiencies,
                            wastage, and helps you reduce energy cost.
                        </p>
                    </div>

                    <div className="faq-block fade-up">
                        <strong>📈 How does it help grow a business?</strong>
                        <p>
                            Reduce operational costs, improve equipment performance, reduce downtime,
                            increase margins and improve sustainability.
                        </p>
                    </div>

                    <div className="faq-block fade-up">
                        <strong>❓ Why do businesses need it?</strong>
                        <p>
                            Rising energy costs, compliance needs and preventing equipment failure make
                            energy analysis essential.
                        </p>
                    </div>

                    <div className="faq-block fade-up">
                        <strong>📤 How to share reports?</strong>
                        <p>
                            Export PDF/Excel, create secure share links, or schedule automated email reports.
                        </p>
                    </div>

                    <div className="faq-block fade-up">
                        <strong>📝 How to generate a report?</strong>
                        <p>
                            Upload CSV/XLSX → Click Analyze → View automatically generated insights.
                        </p>
                    </div>

                    <div className="faq-block fade-up">
                        <strong>📊 Sample Data Example</strong>
                        <p style={{ marginBottom: 12 }}>
                            Typical columns: Date & Time, Energy_Consumption (kWh), Equipment/Zone.
                        </p>

                        {/* Sample Table */}
                        <table className="sample-table">
                            <thead>
                                <tr>
                                    <th>Date & Time</th>
                                    <th>Energy (kWh)</th>
                                    <th>Equipment / Zone</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>2024-01-01 00:00</td>
                                    <td>12.4</td>
                                    <td>HVAC</td>
                                </tr>
                                <tr>
                                    <td>2024-01-01 01:00</td>
                                    <td>10.9</td>
                                    <td>Lighting</td>
                                </tr>
                                <tr>
                                    <td>2024-01-01 02:00</td>
                                    <td>9.8</td>
                                    <td>Production Floor</td>
                                </tr>
                            </tbody>
                        </table>

                        {/* Download Button */}
                        <button
                            className="btn-primary"
                            style={{ marginTop: 14, padding: "8px 16px" }}
                            onClick={downloadSampleCSV}
                        >
                            Download Sample Data
                        </button>
                    </div>



                </div>
            </div>
        </div>
    );
}
