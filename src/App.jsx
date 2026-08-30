import { useState, useEffect } from "react";
import Portfolio from "./Portfolio.jsx";
import Admin from "./Admin.jsx";
import * as defaultData from "./portfolioData";

export default function App() {
  const [view, setView] = useState("portfolio");
  const [loading, setLoading] = useState(true);
  const [adminPassword, setAdminPassword] = useState(() => {
    return sessionStorage.getItem("admin_session_password") || "";
  });

  const [data, setData] = useState(() => {
    // Immediate fallback cache load for fast initial paint
    const saved = localStorage.getItem("portfolio_data");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (!parsed.roles) {
          parsed.roles = defaultData.roles || ["Data Scientist", "ML Engineer", "AI Researcher", "Deep Learning Dev", "GenAI Explorer"];
        }
        return parsed;
      } catch (e) {
        console.error("Failed to load portfolio data from cache:", e);
      }
    }
    return {
      profile: defaultData.profile,
      stats: defaultData.stats,
      experience: defaultData.experience,
      projects: defaultData.projects,
      skills: defaultData.skills,
      education: defaultData.education,
      certifications: defaultData.certifications,
      roles: defaultData.roles || ["Data Scientist", "ML Engineer", "AI Researcher", "Deep Learning Dev", "GenAI Explorer"],
    };
  });

  // Fetch live configuration on mount
  useEffect(() => {
    const fetchLiveConfig = async () => {
      try {
        const response = await fetch("/api/data");
        if (response.ok) {
          const result = await response.json();
          setData(result);
          localStorage.setItem("portfolio_data", JSON.stringify(result));
        }
      } catch (e) {
        console.error("Failed to fetch live configuration from Serverless DB:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchLiveConfig();
  }, []);

  const handleSaveData = (newData) => {
    setData(newData);
    localStorage.setItem("portfolio_data", JSON.stringify(newData));
  };

  const handleSetAdminPassword = (pwd) => {
    setAdminPassword(pwd);
    if (pwd) {
      sessionStorage.setItem("admin_session_password", pwd);
    } else {
      sessionStorage.removeItem("admin_session_password");
    }
  };

  if (loading) {
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#030014",
        color: "#f8fafc",
        fontFamily: "'Outfit', sans-serif"
      }}>
        <div style={{
          width: "50px",
          height: "50px",
          border: "3px solid rgba(255,255,255,0.03)",
          borderTop: "3px solid #00f2fe",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
          boxShadow: "0 0 15px rgba(0, 242, 254, 0.2)",
          marginBottom: "1.5rem"
        }} />
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
        <div style={{ fontFamily: "'Fira Code', monospace", fontSize: "0.8rem", letterSpacing: "0.2em", color: "#00f2fe" }}>
          &gt; CONNECTING TO SERVERLESS DATABASE...
        </div>
      </div>
    );
  }

  if (view === "admin") {
    return (
      <Admin 
        portfolioData={data} 
        onSaveData={handleSaveData} 
        adminPassword={adminPassword}
        onSetAdminPassword={handleSetAdminPassword}
        onClose={() => {
          handleSetAdminPassword(""); // Clear session password on exit
          setView("portfolio");
        }} 
      />
    );
  }

  return (
    <Portfolio 
      portfolioData={data} 
      onGoToAdmin={() => setView("admin")} 
    />
  );
}

