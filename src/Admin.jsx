import { useState, useEffect } from "react";
import "./Admin.css";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const YEARS = Array.from({ length: 16 }, (_, i) => String(2020 + i));

// Dynamic configuration code generator
function generateConfigFile(data) {
  return `export const profile = ${JSON.stringify(data.profile, null, 2)};

export const stats = ${JSON.stringify(data.stats, null, 2)};

export const experience = ${JSON.stringify(data.experience, null, 2)};

export const projects = ${JSON.stringify(data.projects, null, 2)};

export const skills = ${JSON.stringify(data.skills, null, 2)};

export const education = ${JSON.stringify(data.education, null, 2)};

export const certifications = ${JSON.stringify(data.certifications, null, 2)};

export const roles = ${JSON.stringify(data.roles || [], null, 2)};
`;
}

export default function Admin({ portfolioData, onSaveData, adminPassword, onSetAdminPassword, onClose }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const isLoggedIn = !!adminPassword;
  const [loginError, setLoginError] = useState("");

  const [activeTab, setActiveTab] = useState("inbox");
  const [messages, setMessages] = useState([]);
  const [currentData, setCurrentData] = useState(portfolioData);

  // Experience edit state
  const [editingExpIndex, setEditingExpIndex] = useState(-1);
  const [expForm, setExpForm] = useState({ role: "", org: "", location: "", period: "", bullets: [] });

  // Project edit state
  const [editingProjIndex, setEditingProjIndex] = useState(-1);
  const [projForm, setProjForm] = useState({ name: "", meta: "", summary: "", highlights: [], tools: [] });
  const [projToolsInput, setProjToolsInput] = useState("");

  // Certifications edit state
  const [editingCertIndex, setEditingCertIndex] = useState(-2);
  const [certForm, setCertForm] = useState({ name: "", issuer: "", issueMonth: "", issueYear: "", expMonth: "", expYear: "", image: "" });

  // Local text input states to allow typing spaces freely
  const [rolesInput, setRolesInput] = useState(() => (portfolioData.roles || []).join(", "));
  const [skillsInput, setSkillsInput] = useState(() => {
    return Array.isArray(portfolioData.skills)
      ? portfolioData.skills.join(", ")
      : Object.values(portfolioData.skills || {}).flat().join(", ");
  });

  // Load messages from Serverless Inbox
  useEffect(() => {
    if (!adminPassword) return;
    const fetchInbox = async () => {
      try {
        const response = await fetch("/api/messages", {
          headers: { "Authorization": adminPassword }
        });
        if (response.ok) {
          const result = await response.json();
          setMessages(result);
        } else if (response.status === 401) {
          // Password changed or session expired on server
          onSetAdminPassword("");
        }
      } catch (e) {
        console.error("Error fetching inbox messages:", e);
      }
    };
    fetchInbox();
  }, [adminPassword]);

  // Handle Login via Serverless Auth
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const result = await response.json();
        onSetAdminPassword(result.token); // Saves credentials
      } else {
        const errorResult = await response.json();
        setLoginError(errorResult.error || "Incorrect username or password. Please try again.");
      }
    } catch (err) {
      setLoginError("Failed to communicate with Vercel Auth service.");
    }
  };

  // Save changes to Serverless DB
  const handleSave = async (updatedData) => {
    setCurrentData(updatedData);
    onSaveData(updatedData); // Instant UI feedback

    try {
      const response = await fetch("/api/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": adminPassword
        },
        body: JSON.stringify(updatedData)
      });
      if (response.status === 401) {
        alert("Session expired. Please log in again.");
        onSetAdminPassword("");
      } else if (!response.ok) {
        throw new Error("API responded with an error");
      }
    } catch (err) {
      console.error("Failed to persist data update to serverless backend:", err);
    }
  };

  // Inbox: Delete message from Serverless Inbox
  const handleDeleteMessage = async (index) => {
    try {
      const response = await fetch(`/api/messages?index=${index}`, {
        method: "DELETE",
        headers: { "Authorization": adminPassword }
      });
      if (response.ok) {
        setMessages((prev) => prev.filter((_, i) => i !== index));
      } else if (response.status === 401) {
        onSetAdminPassword("");
      } else {
        alert("Failed to delete message from server.");
      }
    } catch (e) {
      console.error("Error deleting message:", e);
    }
  };

  // Inbox: Clear all messages from Serverless Inbox
  const handleClearAllMessages = async () => {
    if (window.confirm("Are you sure you want to clear all messages?")) {
      try {
        const response = await fetch("/api/messages?clearAll=true", {
          method: "DELETE",
          headers: { "Authorization": adminPassword }
        });
        if (response.ok) {
          setMessages([]);
        } else if (response.status === 401) {
          onSetAdminPassword("");
        } else {
          alert("Failed to clear inbox from server.");
        }
      } catch (e) {
        console.error("Error clearing inbox:", e);
      }
    }
  };

  // Profile Form Handler
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    const updated = {
      ...currentData,
      profile: {
        ...currentData.profile,
        [name]: value,
      },
    };
    handleSave(updated);
  };

  const handleRolesChange = (e) => {
    const valueString = e.target.value;
    setRolesInput(valueString);

    const array = valueString.split(",").map((s) => s.trim());
    const cleanArray = array.filter((s) => s !== "");
    const updated = {
      ...currentData,
      roles: cleanArray,
    };
    handleSave(updated);
  };

  // Stats Form Handler
  const handleStatChange = (index, value) => {
    const updatedStats = [...currentData.stats];
    updatedStats[index] = { ...updatedStats[index], value };
    const updated = {
      ...currentData,
      stats: updatedStats,
    };
    handleSave(updated);
  };

  // --- EXPERIENCE CRUD ---
  const startEditExp = (index) => {
    setEditingExpIndex(index);
    if (index === -1) {
      setExpForm({ role: "", org: "", location: "", period: "", bullets: [""] });
    } else {
      setExpForm({ ...currentData.experience[index] });
    }
  };

  const handleExpFormChange = (e) => {
    const { name, value } = e.target;
    setExpForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleExpBulletChange = (bIndex, value) => {
    const updatedBullets = [...expForm.bullets];
    updatedBullets[bIndex] = value;
    setExpForm((prev) => ({ ...prev, bullets: updatedBullets }));
  };

  const addExpBullet = () => {
    setExpForm((prev) => ({ ...prev, bullets: [...prev.bullets, ""] }));
  };

  const removeExpBullet = (bIndex) => {
    const updatedBullets = expForm.bullets.filter((_, i) => i !== bIndex);
    setExpForm((prev) => ({ ...prev, bullets: updatedBullets }));
  };

  const saveExpItem = () => {
    if (!expForm.role || !expForm.org) {
      alert("Role and Organization are required.");
      return;
    }
    // Clean up empty bullets
    const cleanBullets = expForm.bullets.filter((b) => b.trim() !== "");
    const finalForm = { ...expForm, bullets: cleanBullets };

    const updatedExp = [...currentData.experience];
    if (editingExpIndex === -1) {
      updatedExp.unshift(finalForm); // Add new to top
    } else {
      updatedExp[editingExpIndex] = finalForm;
    }

    handleSave({ ...currentData, experience: updatedExp });
    setEditingExpIndex(-2); // Reset
  };

  const deleteExpItem = (index) => {
    if (window.confirm("Delete this experience?")) {
      const updatedExp = currentData.experience.filter((_, i) => i !== index);
      handleSave({ ...currentData, experience: updatedExp });
    }
  };

  const moveExpUp = (index) => {
    if (index === 0) return;
    const updatedExp = [...currentData.experience];
    const temp = updatedExp[index];
    updatedExp[index] = updatedExp[index - 1];
    updatedExp[index - 1] = temp;
    handleSave({ ...currentData, experience: updatedExp });
  };

  const moveExpDown = (index) => {
    if (index === currentData.experience.length - 1) return;
    const updatedExp = [...currentData.experience];
    const temp = updatedExp[index];
    updatedExp[index] = updatedExp[index + 1];
    updatedExp[index + 1] = temp;
    handleSave({ ...currentData, experience: updatedExp });
  };

  // --- PROJECTS CRUD ---
  const startEditProj = (index) => {
    setEditingProjIndex(index);
    if (index === -1) {
      setProjForm({ name: "", meta: "", summary: "", github: "", highlights: [""], tools: [] });
      setProjToolsInput("");
    } else {
      const proj = currentData.projects[index];
      setProjForm({ ...proj });
      setProjToolsInput((proj.tools || []).join(", "));
    }
  };

  const handleProjFormChange = (e) => {
    const { name, value } = e.target;
    setProjForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleProjHighlightChange = (hIndex, value) => {
    const updatedHighlights = [...projForm.highlights];
    updatedHighlights[hIndex] = value;
    setProjForm((prev) => ({ ...prev, highlights: updatedHighlights }));
  };

  const addProjHighlight = () => {
    setProjForm((prev) => ({ ...prev, highlights: [...prev.highlights, ""] }));
  };

  const removeProjHighlight = (hIndex) => {
    const updatedHighlights = projForm.highlights.filter((_, i) => i !== hIndex);
    setProjForm((prev) => ({ ...prev, highlights: updatedHighlights }));
  };

  const handleProjToolsChange = (e) => {
    const toolsString = e.target.value;
    setProjToolsInput(toolsString);

    const toolsArray = toolsString.split(",").map((t) => t.trim()).filter((t) => t !== "");
    setProjForm((prev) => ({ ...prev, tools: toolsArray }));
  };

  const saveProjItem = () => {
    if (!projForm.name || !projForm.summary) {
      alert("Name and Summary are required.");
      return;
    }
    const cleanHighlights = projForm.highlights.filter((h) => h.trim() !== "");
    const finalForm = { ...projForm, highlights: cleanHighlights };

    const updatedProjs = [...currentData.projects];
    if (editingProjIndex === -1) {
      updatedProjs.push(finalForm);
    } else {
      updatedProjs[editingProjIndex] = finalForm;
    }

    handleSave({ ...currentData, projects: updatedProjs });
    setEditingProjIndex(-2);
  };

  const deleteProjItem = (index) => {
    if (window.confirm("Delete this project?")) {
      const updatedProjs = currentData.projects.filter((_, i) => i !== index);
      handleSave({ ...currentData, projects: updatedProjs });
    }
  };

  const moveProjUp = (index) => {
    if (index === 0) return;
    const updatedProjs = [...currentData.projects];
    const temp = updatedProjs[index];
    updatedProjs[index] = updatedProjs[index - 1];
    updatedProjs[index - 1] = temp;
    handleSave({ ...currentData, projects: updatedProjs });
  };

  const moveProjDown = (index) => {
    if (index === currentData.projects.length - 1) return;
    const updatedProjs = [...currentData.projects];
    const temp = updatedProjs[index];
    updatedProjs[index] = updatedProjs[index + 1];
    updatedProjs[index + 1] = temp;
    handleSave({ ...currentData, projects: updatedProjs });
  };

  // --- EDUCATION CRUD ---
  const handleSkillsChange = (e) => {
    const valueString = e.target.value;
    setSkillsInput(valueString);

    const array = valueString.split(",").map((s) => s.trim()).filter((s) => s !== "");
    handleSave({ ...currentData, skills: array });
  };

  // --- EDUCATION CRUD ---
  const handleEducationChange = (field, value) => {
    const updatedEdu = [...currentData.education];
    updatedEdu[0] = { ...updatedEdu[0], [field]: value };
    handleSave({ ...currentData, education: updatedEdu });
  };

  // --- CERTIFICATIONS CRUD ---
  const startEditCert = (index) => {
    setEditingCertIndex(index);
    if (index === -1) {
      setCertForm({ name: "", issuer: "", issueMonth: "", issueYear: "", expMonth: "", expYear: "", image: "", noExpiration: true });
    } else {
      const cert = currentData.certifications[index];
      if (typeof cert === "object" && cert !== null) {
        setCertForm({ ...cert });
      } else {
        setCertForm({ name: cert || "", issuer: "", issueMonth: "", issueYear: "", expMonth: "", expYear: "", image: "", noExpiration: true });
      }
    }
  };

  const handleCertFormChange = (e) => {
    const { name, value } = e.target;
    setCertForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCertImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Create a canvas to downscale and compress the image
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 1200;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        // Convert the canvas drawing to base64 jpeg with a quality setting of 0.75
        const compressedBase64 = canvas.toDataURL("image/jpeg", 0.75);

        // Check if the compressed string is within localStorage limits (~800KB)
        if (compressedBase64.length > 800000) {
          // If still too large, compress further with lower quality (0.5)
          const highlyCompressed = canvas.toDataURL("image/jpeg", 0.5);
          if (highlyCompressed.length > 800000) {
            alert("This image is extremely large or complex. Please try a different or smaller image file.");
            return;
          }
          setCertForm((prev) => ({ ...prev, image: highlyCompressed }));
        } else {
          setCertForm((prev) => ({ ...prev, image: compressedBase64 }));
        }
      };
      img.onerror = () => {
        alert("Failed to read the image file. Please select a valid image.");
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const saveCertItem = () => {
    if (!certForm.name || !certForm.issuer) {
      alert("Name and Issuing Organization are required.");
      return;
    }

    const updatedCerts = [...currentData.certifications];
    if (editingCertIndex === -1) {
      updatedCerts.push(certForm);
    } else {
      updatedCerts[editingCertIndex] = certForm;
    }

    handleSave({ ...currentData, certifications: updatedCerts });
    setEditingCertIndex(-2);
  };

  const deleteCertItem = (index) => {
    if (window.confirm("Delete this certification?")) {
      const updatedCerts = currentData.certifications.filter((_, i) => i !== index);
      handleSave({ ...currentData, certifications: updatedCerts });
    }
  };

  const moveCertUp = (index) => {
    if (index === 0) return;
    const updatedCerts = [...currentData.certifications];
    const temp = updatedCerts[index];
    updatedCerts[index] = updatedCerts[index - 1];
    updatedCerts[index - 1] = temp;
    handleSave({ ...currentData, certifications: updatedCerts });
  };

  const moveCertDown = (index) => {
    if (index === currentData.certifications.length - 1) return;
    const updatedCerts = [...currentData.certifications];
    const temp = updatedCerts[index];
    updatedCerts[index] = updatedCerts[index + 1];
    updatedCerts[index + 1] = temp;
    handleSave({ ...currentData, certifications: updatedCerts });
  };

  // --- CONFIG RESET ---
  const handleResetToDefault = () => {
    if (window.confirm("Reset all settings to default config code? This clears LocalStorage edits.")) {
      localStorage.removeItem("portfolio_data");
      window.location.reload();
    }
  };

  const handleCopyConfig = () => {
    const configCode = generateConfigFile(currentData);
    navigator.clipboard.writeText(configCode)
      .then(() => alert("Configuration copied to clipboard! Paste it inside src/portfolioData.js to save permanently."))
      .catch(() => alert("Could not copy config automatically. Please copy it manually from the textarea."));
  };

  // LOGIN SCREEN
  if (!isLoggedIn) {
    return (
      <div className="admin-login-wrapper">
        <div className="admin-login-card">
          <h2 className="admin-login-title">
            AA<span className="neon-text-violet">.Admin</span>
          </h2>
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div className="admin-form-group">
              <label className="admin-label">Access Username</label>
              <input
                className="admin-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
                autoFocus
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Access Password</label>
              <input
                className="admin-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
            </div>
            {loginError && <p style={{ color: "#ef4444", fontSize: "0.8rem", textAlign: "center" }}>{loginError}</p>}
            <button className="admin-btn admin-btn-primary" type="submit" style={{ width: "100%", padding: "0.8rem" }}>
              Unlock Dashboard
            </button>
            <button 
              className="admin-btn admin-btn-secondary" 
              type="button" 
              onClick={onClose} 
              style={{ width: "100%", padding: "0.8rem" }}
            >
              Exit to Portfolio
            </button>
          </form>
        </div>
      </div>
    );
  }

  // MAIN DASHBOARD PANEL
  return (
    <div className="admin-canvas">
      {/* Sidebar Navigation */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          AA<span>.Dashboard</span>
        </div>
        <nav className="admin-sidebar-menu">
          <button
            className={`admin-menu-item ${activeTab === "inbox" ? "active" : ""}`}
            onClick={() => { setActiveTab("inbox"); setEditingExpIndex(-2); setEditingProjIndex(-2); setEditingCertIndex(-2); }}
          >
            📥 Inbox ({messages.length})
          </button>
          <button
            className={`admin-menu-item ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => { setActiveTab("profile"); setEditingExpIndex(-2); setEditingProjIndex(-2); setEditingCertIndex(-2); }}
          >
            👤 Profile & Stats
          </button>
          <button
            className={`admin-menu-item ${activeTab === "experience" ? "active" : ""}`}
            onClick={() => { setActiveTab("experience"); setEditingExpIndex(-2); setEditingProjIndex(-2); setEditingCertIndex(-2); }}
          >
            💼 Experience
          </button>
          <button
            className={`admin-menu-item ${activeTab === "projects" ? "active" : ""}`}
            onClick={() => { setActiveTab("projects"); setEditingExpIndex(-2); setEditingProjIndex(-2); setEditingCertIndex(-2); }}
          >
            🚀 Projects
          </button>
          <button
            className={`admin-menu-item ${activeTab === "skills" ? "active" : ""}`}
            onClick={() => { setActiveTab("skills"); setEditingExpIndex(-2); setEditingProjIndex(-2); setEditingCertIndex(-2); }}
          >
            ⚡ Technical Skills
          </button>
          <button
            className={`admin-menu-item ${activeTab === "edu-cert" ? "active" : ""}`}
            onClick={() => { setActiveTab("edu-cert"); setEditingExpIndex(-2); setEditingProjIndex(-2); setEditingCertIndex(-2); }}
          >
            🎓 Edu & Certs
          </button>
          <button
            className={`admin-menu-item ${activeTab === "settings" ? "active" : ""}`}
            onClick={() => { setActiveTab("settings"); setEditingExpIndex(-2); setEditingProjIndex(-2); setEditingCertIndex(-2); }}
          >
            ⚙ Settings & Export
          </button>
          <button className="admin-menu-item logout" onClick={onClose}>
            ◀ View Live Site
          </button>
        </nav>
      </aside>

      {/* Main Panel Content */}
      <main className="admin-main-panel">
        <header className="admin-header">
          <h1 className="admin-header-title">
            {activeTab === "inbox" && "Inbox Messages"}
            {activeTab === "profile" && "Profile Information & Metrics"}
            {activeTab === "experience" && "Work Experience"}
            {activeTab === "projects" && "Portfolio Projects"}
            {activeTab === "skills" && "Skill landscape"}
            {activeTab === "edu-cert" && "Academic & Professional Credentials"}
            {activeTab === "settings" && "System Settings & Code Export"}
          </h1>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button className="admin-btn admin-btn-secondary" onClick={onClose}>
              Site Preview
            </button>
          </div>
        </header>

        <div className="admin-container">
          {/* INBOX SECTION */}
          {activeTab === "inbox" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.5rem" }}>
                <span style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                  Showing {messages.length} contact submissions saved in LocalStorage.
                </span>
                {messages.length > 0 && (
                  <button className="admin-btn admin-btn-danger" onClick={handleClearAllMessages}>
                    Clear All Inbox
                  </button>
                )}
              </div>

              {messages.length === 0 ? (
                <div style={{ padding: "3rem", background: "var(--bg-card)", border: "1px dashed var(--border-light)", borderRadius: "8px", textAlign: "center" }}>
                  <p style={{ color: "var(--text-muted)", fontSize: "1rem" }}>Your inbox is currently empty. Test submissions in the contact form to see them here!</p>
                </div>
              ) : (
                <div className="inbox-list">
                  {messages.map((msg, index) => (
                    <div key={index} className="message-card">
                      <div className="message-header">
                        <div>
                          <div className="message-sender">{msg.name}</div>
                          <div className="message-email">{msg.email}</div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                          <span className="message-date">{msg.date || "Just now"}</span>
                          <button
                            className="admin-btn admin-btn-danger admin-btn-icon"
                            onClick={() => handleDeleteMessage(index)}
                            title="Delete message"
                          >
                            🗑
                          </button>
                        </div>
                      </div>
                      <div className="message-body">{msg.message}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* PROFILE SECTION */}
          {activeTab === "profile" && (
            <div>
              <div className="admin-form-card">
                <h3 className="admin-form-title">Personal Metadata</h3>
                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label className="admin-label">Full Name</label>
                    <input
                      className="admin-input"
                      name="name"
                      value={currentData.profile.name}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Job Title / Headline</label>
                    <input
                      className="admin-input"
                      name="title"
                      value={currentData.profile.title}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Email address</label>
                    <input
                      className="admin-input"
                      name="email"
                      value={currentData.profile.email}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Phone Number</label>
                    <input
                      className="admin-input"
                      name="phone"
                      value={currentData.profile.phone}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Base Location</label>
                    <input
                      className="admin-input"
                      name="location"
                      value={currentData.profile.location}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">LinkedIn URL</label>
                    <input
                      className="admin-input"
                      name="linkedin"
                      value={currentData.profile.linkedin}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">GitHub Username/URL</label>
                    <input
                      className="admin-input"
                      name="github"
                      value={currentData.profile.github}
                      onChange={handleProfileChange}
                    />
                  </div>
                </div>
                <div className="admin-form-group full-width">
                  <label className="admin-label">Profile Biography Summary</label>
                  <textarea
                    className="admin-input admin-textarea"
                    name="summary"
                    value={currentData.profile.summary}
                    onChange={handleProfileChange}
                    rows={4}
                  />
                </div>
                <div className="admin-form-group full-width" style={{ marginTop: "1rem" }}>
                  <label className="admin-label">Typing Animation Roles (comma separated)</label>
                  <input
                    className="admin-input"
                    value={rolesInput}
                    onChange={handleRolesChange}
                    placeholder="e.g. Data Scientist, ML Engineer, AI Researcher"
                  />
                </div>
              </div>

              {/* Stats Edit */}
              <div className="admin-form-card">
                <h3 className="admin-form-title">Header Quick Metrics</h3>
                <div className="admin-form-grid">
                  {currentData.stats.map((stat, idx) => (
                    <div key={stat.label} className="admin-form-group">
                      <label className="admin-label">{stat.label}</label>
                      <input
                        className="admin-input"
                        value={stat.value}
                        onChange={(e) => handleStatChange(idx, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* EXPERIENCE SECTION */}
          {activeTab === "experience" && (
            <div>
              {editingExpIndex === -2 ? (
                <div>
                  <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1.5rem" }}>
                    <button className="admin-btn admin-btn-primary" onClick={() => startEditExp(-1)}>
                      + Add Work/Training
                    </button>
                  </div>
                  <div className="admin-items-list">
                    {currentData.experience.map((exp, idx) => (
                      <div key={idx} className="admin-item-row">
                        <div className="admin-item-info">
                          <div className="admin-item-title">{exp.role}</div>
                          <div className="admin-item-subtitle">{exp.org} • {exp.period}</div>
                        </div>
                        <div className="admin-item-actions">
                          <button 
                            className="admin-btn admin-btn-secondary" 
                            style={{ padding: "0.3rem 0.5rem" }} 
                            onClick={() => moveExpUp(idx)}
                            disabled={idx === 0}
                            title="Move Up"
                          >
                            ▲
                          </button>
                          <button 
                            className="admin-btn admin-btn-secondary" 
                            style={{ padding: "0.3rem 0.5rem" }} 
                            onClick={() => moveExpDown(idx)}
                            disabled={idx === currentData.experience.length - 1}
                            title="Move Down"
                          >
                            ▼
                          </button>
                          <button className="admin-btn admin-btn-secondary" onClick={() => startEditExp(idx)}>
                            Edit
                          </button>
                          <button className="admin-btn admin-btn-danger" onClick={() => deleteExpItem(idx)}>
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="admin-form-card">
                  <h3 className="admin-form-title">
                    {editingExpIndex === -1 ? "Add Experience / Training" : "Edit Experience / Training"}
                  </h3>
                  <div className="admin-form-grid">
                    <div className="admin-form-group">
                      <label className="admin-label">Role Title</label>
                      <input
                        className="admin-input"
                        name="role"
                        value={expForm.role}
                        onChange={handleExpFormChange}
                        placeholder="e.g. Data Science Intern"
                      />
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-label">Organization Name</label>
                      <input
                        className="admin-input"
                        name="org"
                        value={expForm.org}
                        onChange={handleExpFormChange}
                        placeholder="e.g. Orange Digital Center"
                      />
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-label">Location</label>
                      <input
                        className="admin-input"
                        name="location"
                        value={expForm.location}
                        onChange={handleExpFormChange}
                        placeholder="e.g. Egypt"
                      />
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-label">Period / Dates</label>
                      <input
                        className="admin-input"
                        name="period"
                        value={expForm.period}
                        onChange={handleExpFormChange}
                        placeholder="e.g. March 2026 - Present"
                      />
                    </div>
                  </div>

                  <div className="admin-form-group full-width" style={{ marginTop: "1rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                      <label className="admin-label">Key Highlights / Bullets</label>
                      <button className="admin-btn admin-btn-secondary" style={{ padding: "0.3rem 0.75rem" }} onClick={addExpBullet}>
                        + Add Bullet
                      </button>
                    </div>
                    <div className="bullets-builder">
                      {expForm.bullets.map((bullet, bIdx) => (
                        <div key={bIdx} className="bullet-input-row">
                          <span style={{ color: "var(--text-muted)" }}>•</span>
                          <input
                            className="admin-input"
                            style={{ flexGrow: 1 }}
                            value={bullet}
                            onChange={(e) => handleExpBulletChange(bIdx, e.target.value)}
                            placeholder="Describe achievement or responsibility..."
                          />
                          <button
                            className="admin-btn admin-btn-danger admin-btn-icon"
                            onClick={() => removeExpBullet(bIdx)}
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
                    <button className="admin-btn admin-btn-primary" onClick={saveExpItem}>
                      Save Experience
                    </button>
                    <button className="admin-btn admin-btn-secondary" onClick={() => setEditingExpIndex(-2)}>
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* PROJECTS SECTION */}
          {activeTab === "projects" && (
            <div>
              {editingProjIndex === -2 ? (
                <div>
                  <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1.5rem" }}>
                    <button className="admin-btn admin-btn-primary" onClick={() => startEditProj(-1)}>
                      + Add Project
                    </button>
                  </div>
                  <div className="admin-items-list">
                    {currentData.projects.map((proj, idx) => (
                      <div key={idx} className="admin-item-row">
                        <div className="admin-item-info">
                          <div className="admin-item-title">{proj.name}</div>
                          <div className="admin-item-subtitle">{proj.meta}</div>
                        </div>
                        <div className="admin-item-actions">
                          <button 
                            className="admin-btn admin-btn-secondary" 
                            style={{ padding: "0.3rem 0.5rem" }} 
                            onClick={() => moveProjUp(idx)}
                            disabled={idx === 0}
                            title="Move Up"
                          >
                            ▲
                          </button>
                          <button 
                            className="admin-btn admin-btn-secondary" 
                            style={{ padding: "0.3rem 0.5rem" }} 
                            onClick={() => moveProjDown(idx)}
                            disabled={idx === currentData.projects.length - 1}
                            title="Move Down"
                          >
                            ▼
                          </button>
                          <button className="admin-btn admin-btn-secondary" onClick={() => startEditProj(idx)}>
                            Edit
                          </button>
                          <button className="admin-btn admin-btn-danger" onClick={() => deleteProjItem(idx)}>
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="admin-form-card">
                  <h3 className="admin-form-title">
                    {editingProjIndex === -1 ? "Add Portfolio Project" : "Edit Portfolio Project"}
                  </h3>
                  <div className="admin-form-grid">
                    <div className="admin-form-group">
                      <label className="admin-label">Project Name</label>
                      <input
                        className="admin-input"
                        name="name"
                        value={projForm.name}
                        onChange={handleProjFormChange}
                        placeholder="e.g. Fruit-AI-Classifier"
                      />
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-label">Metadata / Timeline</label>
                      <input
                        className="admin-input"
                        name="meta"
                        value={projForm.meta}
                        onChange={handleProjFormChange}
                        placeholder="e.g. ODC Capstone Project, 2026"
                      />
                    </div>
                    <div className="admin-form-group full-width">
                      <label className="admin-label">Short Summary Description</label>
                      <input
                        className="admin-input"
                        name="summary"
                        value={projForm.summary}
                        onChange={handleProjFormChange}
                        placeholder="A deep learning system built to..."
                      />
                    </div>
                    <div className="admin-form-group full-width">
                      <label className="admin-label">GitHub Repository Link</label>
                      <input
                        className="admin-input"
                        name="github"
                        value={projForm.github || ""}
                        onChange={handleProjFormChange}
                        placeholder="e.g. https://github.com/AmirAliAttiaAli/Fruit-AI-Classifier"
                      />
                    </div>
                  </div>

                  <div className="admin-form-group full-width" style={{ marginTop: "1rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                      <label className="admin-label">Technical Highlights</label>
                      <button className="admin-btn admin-btn-secondary" style={{ padding: "0.3rem 0.75rem" }} onClick={addProjHighlight}>
                        + Add Highlight
                      </button>
                    </div>
                    <div className="bullets-builder">
                      {projForm.highlights.map((high, hIdx) => (
                        <div key={hIdx} className="bullet-input-row">
                          <span style={{ color: "var(--text-muted)" }}>•</span>
                          <input
                            className="admin-input"
                            style={{ flexGrow: 1 }}
                            value={high}
                            onChange={(e) => handleProjHighlightChange(hIdx, e.target.value)}
                            placeholder="Describe technical implementation detail..."
                          />
                          <button
                            className="admin-btn admin-btn-danger admin-btn-icon"
                            onClick={() => removeProjHighlight(hIdx)}
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="admin-form-group full-width" style={{ marginTop: "1.5rem" }}>
                    <label className="admin-label">Technologies Used (comma separated)</label>
                    <input
                      className="admin-input"
                      value={projToolsInput}
                      onChange={handleProjToolsChange}
                      placeholder="e.g. TensorFlow, OpenCV, Keras, Streamlit"
                    />
                  </div>

                  <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
                    <button className="admin-btn admin-btn-primary" onClick={saveProjItem}>
                      Save Project
                    </button>
                    <button className="admin-btn admin-btn-secondary" onClick={() => setEditingProjIndex(-2)}>
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SKILLS SECTION */}
          {activeTab === "skills" && (
            <div>
              <div className="admin-form-card">
                <h3 className="admin-form-title">Technical Skills Landscape</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginBottom: "1.5rem" }}>
                  Enter your skills separated by commas. They will automatically be displayed as pill tags with relevant icons in your portfolio.
                </p>
                <div className="admin-form-group full-width">
                  <label className="admin-label">Skills List (comma-separated)</label>
                  <textarea
                    className="admin-input admin-textarea"
                    rows={8}
                    value={skillsInput}
                    onChange={handleSkillsChange}
                    placeholder="e.g. Python, SQL, C++, Bash, NumPy, Pandas, Scikit-learn, TensorFlow, PyTorch"
                  />
                </div>
              </div>
            </div>
          )}

          {/* EDUCATION & CERTS */}
          {activeTab === "edu-cert" && (
            <div>
              <div className="admin-form-card">
                <h3 className="admin-form-title">Academic Degree Details</h3>
                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label className="admin-label">Degree & Major</label>
                    <input
                      className="admin-input"
                      value={currentData.education[0].degree}
                      onChange={(e) => handleEducationChange("degree", e.target.value)}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">School / Institution</label>
                    <input
                      className="admin-input"
                      value={currentData.education[0].school}
                      onChange={(e) => handleEducationChange("school", e.target.value)}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Study Period</label>
                    <input
                      className="admin-input"
                      value={currentData.education[0].period}
                      onChange={(e) => handleEducationChange("period", e.target.value)}
                    />
                  </div>
                </div>
                <div className="admin-form-group full-width" style={{ marginTop: "1rem" }}>
                  <label className="admin-label">Description / Core Syllabus Note</label>
                  <input
                    className="admin-input"
                    value={currentData.education[0].note}
                    onChange={(e) => handleEducationChange("note", e.target.value)}
                  />
                </div>
              </div>

              {/* Certifications Card */}
              {editingCertIndex === -2 ? (
                <div className="admin-form-card">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                    <h3 className="admin-form-title" style={{ margin: 0 }}>Qualifications & Certificates</h3>
                    <button className="admin-btn admin-btn-primary" onClick={() => startEditCert(-1)}>
                      + Add Cert
                    </button>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                    {currentData.certifications.map((cert, idx) => {
                      const isObj = typeof cert === "object" && cert !== null;
                      const name = isObj ? cert.name : cert;
                      const issuer = isObj ? cert.issuer : "Unknown Issuer";
                      const dateStr = isObj && cert.issueMonth ? `${cert.issueMonth} ${cert.issueYear}` : "";
                      return (
                        <div key={idx} className="admin-item-row" style={{ padding: "0.75rem 1rem" }}>
                          <div className="admin-item-info">
                            <div className="admin-item-title" style={{ fontSize: "0.85rem" }}>{name}</div>
                            <div className="admin-item-subtitle" style={{ fontSize: "0.7rem" }}>{issuer} {dateStr ? `• ${dateStr}` : ""}</div>
                          </div>
                          <div className="admin-item-actions">
                            {isObj && cert.image && (
                              <span style={{ fontSize: "0.75rem", color: "var(--accent-primary)", display: "flex", alignItems: "center", marginRight: "0.5rem" }}>
                                🖼️ Attached
                              </span>
                            )}
                            <button 
                              className="admin-btn admin-btn-secondary" 
                              style={{ padding: "0.3rem 0.5rem" }} 
                              onClick={() => moveCertUp(idx)}
                              disabled={idx === 0}
                              title="Move Up"
                            >
                              ▲
                            </button>
                            <button 
                              className="admin-btn admin-btn-secondary" 
                              style={{ padding: "0.3rem 0.5rem" }} 
                              onClick={() => moveCertDown(idx)}
                              disabled={idx === currentData.certifications.length - 1}
                              title="Move Down"
                            >
                              ▼
                            </button>
                            <button className="admin-btn admin-btn-secondary" style={{ padding: "0.3rem 0.6rem" }} onClick={() => startEditCert(idx)}>
                              Edit
                            </button>
                            <button className="admin-btn admin-btn-danger" style={{ padding: "0.3rem 0.6rem" }} onClick={() => deleteCertItem(idx)}>
                              Delete
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="admin-form-card">
                  <h3 className="admin-form-title">
                    {editingCertIndex === -1 ? "Add Certification" : "Edit Certification"}
                  </h3>
                  <div className="admin-form-grid">
                    <div className="admin-form-group full-width">
                      <label className="admin-label">Name*</label>
                      <input
                        className="admin-input"
                        name="name"
                        value={certForm.name}
                        onChange={handleCertFormChange}
                        placeholder="Ex: Microsoft certified network associate security"
                        required
                      />
                    </div>
                    
                    <div className="admin-form-group full-width">
                      <label className="admin-label">Issuing organization*</label>
                      <input
                        className="admin-input"
                        name="issuer"
                        value={certForm.issuer}
                        onChange={handleCertFormChange}
                        placeholder="Ex: Microsoft"
                        required
                      />
                    </div>

                    <div className="admin-form-group">
                      <label className="admin-label">Issue Date - Month</label>
                      <select 
                        className="admin-input"
                        name="issueMonth"
                        value={certForm.issueMonth}
                        onChange={handleCertFormChange}
                      >
                        <option value="">Month</option>
                        {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
                      </select>
                    </div>

                    <div className="admin-form-group">
                      <label className="admin-label">Issue Date - Year</label>
                      <select 
                        className="admin-input"
                        name="issueYear"
                        value={certForm.issueYear}
                        onChange={handleCertFormChange}
                      >
                        <option value="">Year</option>
                        {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                      </select>
                    </div>

                    <div className="admin-form-group">
                      <label className="admin-label">Expiration Date - Month</label>
                      <select 
                        className="admin-input"
                        name="expMonth"
                        value={certForm.expMonth || ""}
                        onChange={handleCertFormChange}
                        disabled={certForm.noExpiration !== false && !certForm.expYear}
                      >
                        <option value="">Month</option>
                        {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
                      </select>
                    </div>

                    <div className="admin-form-group">
                      <label className="admin-label">Expiration Date - Year</label>
                      <select 
                        className="admin-input"
                        name="expYear"
                        value={certForm.expYear || ""}
                        onChange={handleCertFormChange}
                        disabled={certForm.noExpiration !== false && !certForm.expYear}
                      >
                        <option value="">Year</option>
                        {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                      </select>
                    </div>

                    <div className="admin-form-group full-width">
                      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                        <input
                          type="checkbox"
                          id="noExpiration"
                          checked={certForm.noExpiration !== false && !certForm.expYear}
                          onChange={(e) => {
                            const isChecked = e.target.checked;
                            setCertForm(prev => ({
                              ...prev,
                              noExpiration: isChecked,
                              expMonth: isChecked ? "" : prev.expMonth,
                              expYear: isChecked ? "" : prev.expYear
                            }));
                          }}
                        />
                        <label htmlFor="noExpiration" className="admin-label" style={{ cursor: "pointer", textTransform: "none", fontSize: "0.75rem" }}>
                          This credential does not expire
                        </label>
                      </div>
                    </div>

                    <div className="admin-form-group full-width" style={{ marginTop: "1rem" }}>
                      <label className="admin-label">Upload Certificate Image</label>
                      <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginTop: "0.5rem", flexWrap: "wrap" }}>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleCertImageUpload}
                          style={{ display: "none" }}
                          id="cert-image-file"
                        />
                        <label htmlFor="cert-image-file" className="admin-btn admin-btn-secondary" style={{ cursor: "pointer" }}>
                          Choose Image
                        </label>
                        {certForm.image && (
                          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                            <img src={certForm.image} alt="Preview" style={{ height: "50px", borderRadius: "4px", border: "1px solid var(--border-light)" }} />
                            <button className="admin-btn admin-btn-danger" type="button" onClick={() => setCertForm(prev => ({ ...prev, image: "" }))}>
                              Remove Image
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
                    <button className="admin-btn admin-btn-primary" onClick={saveCertItem}>
                      Save Certification
                    </button>
                    <button className="admin-btn admin-btn-secondary" onClick={() => setEditingCertIndex(-2)}>
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SETTINGS / CONFIG EXPORTER */}
          {activeTab === "settings" && (
            <div>
              <div className="admin-form-card">
                <h3 className="admin-form-title">Export Dynamic Changes</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                  Changes are currently saved in your browser's LocalStorage and will display immediately. 
                  To make these changes **permanent** inside your portfolio source files (so they display even after clearing browser cache), 
                  copy the generated config code below and replace the entire content of <strong>src/portfolioData.js</strong>.
                </p>
                <div style={{ display: "flex", gap: "1rem", marginBottom: "1.25rem" }}>
                  <button className="admin-btn admin-btn-primary" onClick={handleCopyConfig}>
                    📋 Copy Config Code
                  </button>
                  <button className="admin-btn admin-btn-danger" onClick={handleResetToDefault}>
                    ⚠️ Reset to Default Code
                  </button>
                </div>
                <textarea
                  className="export-textarea"
                  readOnly
                  value={generateConfigFile(currentData)}
                  onClick={(e) => e.target.select()}
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
