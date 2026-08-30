import { useState, useEffect } from "react";
import {
  Terminal,
  Inbox,
  User,
  Briefcase,
  FolderGit2,
  Cpu,
  GraduationCap,
  Settings,
  LogOut,
  Plus,
  Trash2,
  Edit3,
  ChevronUp,
  ChevronDown,
  CheckCircle2,
  Copy,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Eye,
  KeyRound,
  FileText
} from "lucide-react";
import "./Admin.css";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const YEARS = Array.from({ length: 16 }, (_, i) => String(2020 + i));

// Dynamic configuration code generator
function generateConfigFile(data) {
  return `// Auto-generated baseline portfolio data
export const profile = ${JSON.stringify(data.profile, null, 2)};

export const stats = ${JSON.stringify(data.stats, null, 2)};

export const skillsCategorized = ${JSON.stringify(data.skillsCategorized || {
    dataScience: [
      "Python", "SQL", "Pandas", "NumPy", "Data Cleaning",
      "Exploratory Data Analysis (EDA)", "Data Visualization", "Statistics", "Matplotlib", "Seaborn"
    ],
    machineLearning: [
      "Scikit-learn", "Regression", "Classification", "Clustering", "Feature Engineering", "Model Evaluation"
    ],
    deepLearningAI: [
      "TensorFlow", "Keras", "CNN", "Transfer Learning", "Computer Vision", "Generative AI", "LLMs"
    ],
    toolsDeployment: [
      "Git", "GitHub", "Jupyter Notebook", "Streamlit", "Playwright", "MLOps"
    ]
  }, null, 2)};

export const skills = ${JSON.stringify(data.skills || [], null, 2)};

export const projects = ${JSON.stringify(data.projects, null, 2)};

export const experience = ${JSON.stringify(data.experience, null, 2)};

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
  const [editingExpIndex, setEditingExpIndex] = useState(-2);
  const [expForm, setExpForm] = useState({
    role: "", org: "", location: "", period: "", type: "Internship", priority: "high", bullets: [], skills: []
  });
  const [expSkillsInput, setExpSkillsInput] = useState("");

  // Project edit state
  const [editingProjIndex, setEditingProjIndex] = useState(-2);
  const [projForm, setProjForm] = useState({
    name: "", subtitle: "", category: "", period: "", associatedWith: "", description: "", highlights: [], technologies: [], github: "", demo: ""
  });
  const [projTechInput, setProjTechInput] = useState("");

  // Certifications edit state
  const [editingCertIndex, setEditingCertIndex] = useState(-2);
  const [certForm, setCertForm] = useState({
    name: "", issuer: "", issueMonth: "", issueYear: "", expMonth: "", expYear: "", description: "", image: ""
  });

  // Local text input states
  const [rolesInput, setRolesInput] = useState(() => (portfolioData.roles || []).join(", "));
  const [interestsInput, setInterestsInput] = useState(() => (portfolioData.profile?.areasOfInterest || []).join(", "));
  const [skillsInput, setSkillsInput] = useState(() => {
    return Array.isArray(portfolioData.skills)
      ? portfolioData.skills.join(", ")
      : Object.values(portfolioData.skillsCategorized || {}).flat().join(", ");
  });

  // Load inbox messages
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
        onSetAdminPassword(result.token);
      } else {
        const errorResult = await response.json();
        setLoginError(errorResult.error || "Incorrect username or password. Access denied.");
      }
    } catch (err) {
      setLoginError("Failed to communicate with Serverless Auth service.");
    }
  };

  // Save changes to Serverless DB & Local Cache
  const handleSave = async (updatedData) => {
    setCurrentData(updatedData);
    onSaveData(updatedData);

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
      }
    } catch (err) {
      console.error("Failed to persist data update to backend:", err);
    }
  };

  // Inbox Handlers
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
      }
    } catch (e) {
      console.error("Error deleting message:", e);
    }
  };

  const handleClearAllMessages = async () => {
    if (window.confirm("Are you sure you want to clear all inbox messages?")) {
      try {
        const response = await fetch("/api/messages?clearAll=true", {
          method: "DELETE",
          headers: { "Authorization": adminPassword }
        });
        if (response.ok) {
          setMessages([]);
        }
      } catch (e) {
        console.error("Error clearing inbox:", e);
      }
    }
  };

  // Profile Form Handler
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    const updatedProfile = {
      ...currentData.profile,
      [name]: value,
    };
    if (name === "about") {
      updatedProfile.summary = value;
    }
    const updated = {
      ...currentData,
      profile: updatedProfile,
    };
    handleSave(updated);
  };

  const handleInterestsChange = (e) => {
    const valueString = e.target.value;
    setInterestsInput(valueString);
    const cleanArray = valueString.split(",").map((s) => s.trim()).filter(Boolean);
    const updated = {
      ...currentData,
      profile: {
        ...currentData.profile,
        areasOfInterest: cleanArray,
      },
    };
    handleSave(updated);
  };

  const handleRolesChange = (e) => {
    const valueString = e.target.value;
    setRolesInput(valueString);
    const cleanArray = valueString.split(",").map((s) => s.trim()).filter(Boolean);
    const updated = {
      ...currentData,
      roles: cleanArray,
    };
    handleSave(updated);
  };

  // Stats Handler
  const handleStatChange = (index, field, value) => {
    const updatedStats = [...currentData.stats];
    updatedStats[index] = { ...updatedStats[index], [field]: value };
    handleSave({ ...currentData, stats: updatedStats });
  };

  // --- EXPERIENCE CRUD ---
  const startEditExp = (index) => {
    setEditingExpIndex(index);
    if (index === -1) {
      setExpForm({
        id: "exp-" + Date.now(),
        role: "",
        org: "",
        location: "",
        period: "",
        type: "Internship",
        priority: "high",
        bullets: [""],
        skills: []
      });
      setExpSkillsInput("");
    } else {
      const item = currentData.experience[index];
      setExpForm({ ...item, bullets: item.bullets || [""] });
      setExpSkillsInput((item.skills || []).join(", "));
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
    setExpForm((prev) => ({ ...prev, bullets: prev.bullets.filter((_, i) => i !== bIndex) }));
  };

  const saveExpItem = () => {
    if (!expForm.role || !expForm.org) {
      alert("Role Title and Organization Name are required.");
      return;
    }
    const cleanBullets = expForm.bullets.filter((b) => b.trim() !== "");
    const cleanSkills = expSkillsInput.split(",").map((s) => s.trim()).filter(Boolean);
    const finalForm = { ...expForm, bullets: cleanBullets, skills: cleanSkills };

    const updatedExp = [...currentData.experience];
    if (editingExpIndex === -1) {
      updatedExp.unshift(finalForm);
    } else {
      updatedExp[editingExpIndex] = finalForm;
    }
    handleSave({ ...currentData, experience: updatedExp });
    setEditingExpIndex(-2);
  };

  const deleteExpItem = (index) => {
    if (window.confirm("Delete this experience item?")) {
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
      setProjForm({
        id: "proj-" + Date.now(),
        name: "",
        subtitle: "",
        category: "Machine Learning / AI",
        period: "",
        associatedWith: "",
        description: "",
        highlights: [""],
        technologies: [],
        github: "",
        demo: ""
      });
      setProjTechInput("");
    } else {
      const item = currentData.projects[index];
      setProjForm({ ...item, highlights: item.highlights || [""] });
      setProjTechInput((item.technologies || []).join(", "));
    }
  };

  const handleProjFormChange = (e) => {
    const { name, value } = e.target;
    setProjForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleProjHighlightChange = (hIndex, value) => {
    const updated = [...projForm.highlights];
    updated[hIndex] = value;
    setProjForm((prev) => ({ ...prev, highlights: updated }));
  };

  const addProjHighlight = () => {
    setProjForm((prev) => ({ ...prev, highlights: [...prev.highlights, ""] }));
  };

  const removeProjHighlight = (hIndex) => {
    setProjForm((prev) => ({ ...prev, highlights: prev.highlights.filter((_, i) => i !== hIndex) }));
  };

  const saveProjItem = () => {
    if (!projForm.name || !projForm.description) {
      alert("Project Name and Description are required.");
      return;
    }
    const cleanHighlights = projForm.highlights.filter((h) => h.trim() !== "");
    const cleanTech = projTechInput.split(",").map((s) => s.trim()).filter(Boolean);
    const finalForm = { ...projForm, highlights: cleanHighlights, technologies: cleanTech };

    const updatedProj = [...currentData.projects];
    if (editingProjIndex === -1) {
      updatedProj.unshift(finalForm);
    } else {
      updatedProj[editingProjIndex] = finalForm;
    }
    handleSave({ ...currentData, projects: updatedProj });
    setEditingProjIndex(-2);
  };

  const deleteProjItem = (index) => {
    if (window.confirm("Delete this project?")) {
      const updatedProj = currentData.projects.filter((_, i) => i !== index);
      handleSave({ ...currentData, projects: updatedProj });
    }
  };

  const moveProjUp = (index) => {
    if (index === 0) return;
    const updatedProj = [...currentData.projects];
    const temp = updatedProj[index];
    updatedProj[index] = updatedProj[index - 1];
    updatedProj[index - 1] = temp;
    handleSave({ ...currentData, projects: updatedProj });
  };

  const moveProjDown = (index) => {
    if (index === currentData.projects.length - 1) return;
    const updatedProj = [...currentData.projects];
    const temp = updatedProj[index];
    updatedProj[index] = updatedProj[index + 1];
    updatedProj[index + 1] = temp;
    handleSave({ ...currentData, projects: updatedProj });
  };

  // --- SKILLS HANDLER ---
  const handleSkillsChange = (e) => {
    const valueString = e.target.value;
    setSkillsInput(valueString);
    const cleanArray = valueString.split(",").map((s) => s.trim()).filter(Boolean);
    const updated = {
      ...currentData,
      skills: cleanArray,
    };
    handleSave(updated);
  };

  // --- EDUCATION HANDLER ---
  const handleEducationChange = (field, value) => {
    const updatedEdu = [...currentData.education];
    updatedEdu[0] = { ...updatedEdu[0], [field]: value };
    handleSave({ ...currentData, education: updatedEdu });
  };

  // --- CERTIFICATIONS CRUD ---
  const startEditCert = (index) => {
    setEditingCertIndex(index);
    if (index === -1) {
      setCertForm({ id: "cert-" + Date.now(), name: "", issuer: "", issueMonth: "", issueYear: "", expMonth: "", expYear: "", description: "", image: "" });
    } else {
      const item = currentData.certifications[index];
      if (typeof item === "string") {
        setCertForm({ id: "cert-" + Date.now(), name: item, issuer: "", issueMonth: "", issueYear: "", expMonth: "", expYear: "", description: "", image: "" });
      } else {
        setCertForm({ ...item });
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
    reader.onloadend = () => {
      setCertForm((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const saveCertItem = () => {
    if (!certForm.name || !certForm.issuer) {
      alert("Certificate Name and Issuer are required.");
      return;
    }
    const updatedCerts = [...currentData.certifications];
    if (editingCertIndex === -1) {
      updatedCerts.unshift(certForm);
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

  const handleResetToDefault = () => {
    if (window.confirm("Reset all settings to baseline defaults? This clears LocalStorage edits.")) {
      localStorage.removeItem("portfolio_data");
      window.location.reload();
    }
  };

  const handleCopyConfig = () => {
    const configCode = generateConfigFile(currentData);
    navigator.clipboard.writeText(configCode)
      .then(() => alert("Configuration copied to clipboard! You can paste it into src/portfolioData.js."))
      .catch(() => alert("Could not copy config automatically. Please copy it manually from the textarea."));
  };

  // LOGIN SCREEN - STUNNING DARK TECH DESIGN
  if (!isLoggedIn) {
    return (
      <div className="admin-login-wrapper">
        <div className="admin-login-card">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(0,242,254,0.3)]">
              <Terminal className="w-6 h-6" />
            </div>
          </div>
          <h2 className="admin-login-title text-white">
            AMIR<span className="text-cyan-400">.AI</span>
          </h2>
          <p className="admin-login-subtitle">Control Panel Authentication</p>

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div className="admin-form-group">
              <label className="admin-label">Admin Username</label>
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
              <label className="admin-label">Admin Password</label>
              <input
                className="admin-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
            </div>

            {loginError && (
              <div className="p-3 rounded-lg bg-rose-950/80 border border-rose-500/40 text-rose-300 text-xs font-mono text-center">
                {loginError}
              </div>
            )}

            <button className="admin-btn admin-btn-primary" type="submit" style={{ width: "100%", padding: "0.85rem", marginTop: "0.5rem" }}>
              <KeyRound className="w-4 h-4" />
              <span>Unlock Control Panel</span>
            </button>

            <button 
              className="admin-btn admin-btn-secondary" 
              type="button" 
              onClick={onClose} 
              style={{ width: "100%", padding: "0.75rem" }}
            >
              <Eye className="w-4 h-4 text-cyan-400" />
              <span>Exit to Live Site</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  // MAIN DASHBOARD PANEL - DARK TECH CONTROL CENTER
  return (
    <div className="admin-canvas">
      {/* Sidebar Navigation */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <Terminal className="w-6 h-6 text-cyan-400 shrink-0" />
          <span>AMIR<span className="text-cyan-400">.Admin</span></span>
        </div>

        <nav className="admin-sidebar-menu">
          <button
            className={`admin-menu-item ${activeTab === "inbox" ? "active" : ""}`}
            onClick={() => { setActiveTab("inbox"); setEditingExpIndex(-2); setEditingProjIndex(-2); setEditingCertIndex(-2); }}
          >
            <span className="flex items-center gap-2.5">
              <Inbox className="w-4 h-4 text-cyan-400" />
              <span>Inbox Leads</span>
            </span>
            <span className="admin-menu-badge">{messages.length}</span>
          </button>

          <button
            className={`admin-menu-item ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => { setActiveTab("profile"); setEditingExpIndex(-2); setEditingProjIndex(-2); setEditingCertIndex(-2); }}
          >
            <span className="flex items-center gap-2.5">
              <User className="w-4 h-4 text-cyan-400" />
              <span>Profile & Bio</span>
            </span>
          </button>

          <button
            className={`admin-menu-item ${activeTab === "experience" ? "active" : ""}`}
            onClick={() => { setActiveTab("experience"); setEditingExpIndex(-2); setEditingProjIndex(-2); setEditingCertIndex(-2); }}
          >
            <span className="flex items-center gap-2.5">
              <Briefcase className="w-4 h-4 text-cyan-400" />
              <span>Experience</span>
            </span>
            <span className="admin-menu-badge">{currentData.experience?.length || 0}</span>
          </button>

          <button
            className={`admin-menu-item ${activeTab === "projects" ? "active" : ""}`}
            onClick={() => { setActiveTab("projects"); setEditingExpIndex(-2); setEditingProjIndex(-2); setEditingCertIndex(-2); }}
          >
            <span className="flex items-center gap-2.5">
              <FolderGit2 className="w-4 h-4 text-cyan-400" />
              <span>Projects</span>
            </span>
            <span className="admin-menu-badge">{currentData.projects?.length || 0}</span>
          </button>

          <button
            className={`admin-menu-item ${activeTab === "skills" ? "active" : ""}`}
            onClick={() => { setActiveTab("skills"); setEditingExpIndex(-2); setEditingProjIndex(-2); setEditingCertIndex(-2); }}
          >
            <span className="flex items-center gap-2.5">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>Skills System</span>
            </span>
          </button>

          <button
            className={`admin-menu-item ${activeTab === "edu-cert" ? "active" : ""}`}
            onClick={() => { setActiveTab("edu-cert"); setEditingExpIndex(-2); setEditingProjIndex(-2); setEditingCertIndex(-2); }}
          >
            <span className="flex items-center gap-2.5">
              <GraduationCap className="w-4 h-4 text-cyan-400" />
              <span>Edu & Certs</span>
            </span>
          </button>

          <button
            className={`admin-menu-item ${activeTab === "settings" ? "active" : ""}`}
            onClick={() => { setActiveTab("settings"); setEditingExpIndex(-2); setEditingProjIndex(-2); setEditingCertIndex(-2); }}
          >
            <span className="flex items-center gap-2.5">
              <Settings className="w-4 h-4 text-cyan-400" />
              <span>Exporter & Code</span>
            </span>
          </button>

          <button className="admin-menu-item logout" onClick={onClose}>
            <LogOut className="w-4 h-4" />
            <span>View Live Site</span>
          </button>
        </nav>
      </aside>

      {/* Main Panel Content Workspace */}
      <main className="admin-main-panel">
        <header className="admin-header">
          <div className="flex items-center gap-3">
            <h1 className="admin-header-title">
              {activeTab === "inbox" && "Contact Messages & Recruiter Leads"}
              {activeTab === "profile" && "Profile Information & Bio Metadata"}
              {activeTab === "experience" && "Work Experience & Internships"}
              {activeTab === "projects" && "Featured Projects & Capstone Systems"}
              {activeTab === "skills" && "Technical Skills & Competency Matrix"}
              {activeTab === "edu-cert" && "Academic Degrees & Certifications"}
              {activeTab === "settings" && "Configuration Exporter & Backup"}
            </h1>
          </div>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button className="admin-btn admin-btn-secondary" onClick={onClose}>
              <Eye className="w-4 h-4 text-cyan-400" />
              <span>Live Site Preview</span>
            </button>
          </div>
        </header>

        <div className="admin-container">
          
          {/* Quick Metrics Bar */}
          <div className="admin-overview-grid">
            <div className="admin-stat-card">
              <div className="admin-stat-label">Inbox Leads</div>
              <div className="admin-stat-val">{messages.length}</div>
            </div>
            <div className="admin-stat-card">
              <div className="admin-stat-label">Experience Items</div>
              <div className="admin-stat-val">{currentData.experience?.length || 0}</div>
            </div>
            <div className="admin-stat-card">
              <div className="admin-stat-label">Projects Showcase</div>
              <div className="admin-stat-val">{currentData.projects?.length || 0}</div>
            </div>
            <div className="admin-stat-card">
              <div className="admin-stat-label">Certifications</div>
              <div className="admin-stat-val">{currentData.certifications?.length || 0}</div>
            </div>
          </div>

          {/* INBOX SECTION */}
          {activeTab === "inbox" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.5rem", alignItems: "center" }}>
                <span style={{ fontSize: "0.85rem", color: "var(--admin-text-secondary)", fontFamily: "var(--admin-font-mono)" }}>
                  Showing {messages.length} contact submission(s) saved in Serverless DB.
                </span>
                {messages.length > 0 && (
                  <button className="admin-btn admin-btn-danger" onClick={handleClearAllMessages}>
                    <Trash2 className="w-4 h-4" />
                    <span>Clear All Inbox</span>
                  </button>
                )}
              </div>

              {messages.length === 0 ? (
                <div style={{ padding: "4rem 2rem", background: "var(--admin-bg-card)", border: "1px dashed var(--admin-border-light)", borderRadius: "14px", textAlign: "center" }}>
                  <Inbox className="w-12 h-12 text-cyan-400/40 mx-auto mb-3" />
                  <p style={{ color: "var(--admin-text-muted)", fontSize: "0.95rem" }}>Your inbox is currently empty. Submissions from your website contact form will arrive here instantly!</p>
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
                            <Trash2 className="w-4 h-4" />
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
                <h3 className="admin-form-title">Personal Information & Hero Metadata</h3>
                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label className="admin-label">Full Name</label>
                    <input
                      className="admin-input"
                      name="name"
                      value={currentData.profile.name || ""}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Role Title / Positioning</label>
                    <input
                      className="admin-input"
                      name="title"
                      value={currentData.profile.title || ""}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className="admin-form-group full-width">
                    <label className="admin-label">Hero Headline</label>
                    <input
                      className="admin-input"
                      name="headline"
                      value={currentData.profile.headline || ""}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Email Address</label>
                    <input
                      className="admin-input"
                      name="email"
                      value={currentData.profile.email || ""}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Phone Number</label>
                    <input
                      className="admin-input"
                      name="phone"
                      value={currentData.profile.phone || ""}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Base Location</label>
                    <input
                      className="admin-input"
                      name="location"
                      value={currentData.profile.location || ""}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">LinkedIn URL</label>
                    <input
                      className="admin-input"
                      name="linkedin"
                      value={currentData.profile.linkedin || ""}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">GitHub URL</label>
                    <input
                      className="admin-input"
                      name="github"
                      value={currentData.profile.github || ""}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className="admin-form-group full-width">
                    <label className="admin-label">Download CV Link (Google Drive)</label>
                    <input
                      className="admin-input"
                      name="cv"
                      value={currentData.profile.cv || ""}
                      onChange={handleProfileChange}
                    />
                  </div>
                </div>

                <div className="admin-form-group full-width" style={{ marginTop: "1rem" }}>
                  <label className="admin-label">About Me Biography Text</label>
                  <textarea
                    className="admin-input admin-textarea"
                    name="about"
                    value={currentData.profile.about || currentData.profile.summary || ""}
                    onChange={handleProfileChange}
                    rows={6}
                  />
                </div>

                <div className="admin-form-group full-width" style={{ marginTop: "1rem" }}>
                  <label className="admin-label">Areas of Interest (comma separated)</label>
                  <input
                    className="admin-input"
                    value={interestsInput}
                    onChange={handleInterestsChange}
                    placeholder="Machine Learning, Deep Learning, Data Science, Computer Vision, LLMs, MLOps"
                  />
                </div>

                <div className="admin-form-group full-width" style={{ marginTop: "1rem" }}>
                  <label className="admin-label">Role Titles (comma separated)</label>
                  <input
                    className="admin-input"
                    value={rolesInput}
                    onChange={handleRolesChange}
                    placeholder="Data Scientist, Machine Learning Engineer, AI Instructor"
                  />
                </div>
              </div>

              {/* Stats Edit */}
              <div className="admin-form-card">
                <h3 className="admin-form-title">Header Quick Metrics Highlights</h3>
                <div className="admin-form-grid">
                  {currentData.stats?.map((stat, idx) => (
                    <div key={idx} className="admin-form-group">
                      <label className="admin-label">{stat.label}</label>
                      <input
                        className="admin-input"
                        value={stat.value}
                        onChange={(e) => handleStatChange(idx, "value", e.target.value)}
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
                      <Plus className="w-4 h-4" />
                      <span>Add Work Experience</span>
                    </button>
                  </div>
                  <div className="admin-items-list">
                    {currentData.experience?.map((exp, idx) => (
                      <div key={idx} className="admin-item-row">
                        <div className="admin-item-info">
                          <div className="admin-item-title">{exp.role}</div>
                          <div className="admin-item-subtitle">{exp.org} • {exp.period} ({exp.type || "Role"})</div>
                        </div>
                        <div className="admin-item-actions">
                          <button 
                            className="admin-btn admin-btn-secondary admin-btn-icon" 
                            onClick={() => moveExpUp(idx)}
                            disabled={idx === 0}
                            title="Move Up"
                          >
                            <ChevronUp className="w-4 h-4" />
                          </button>
                          <button 
                            className="admin-btn admin-btn-secondary admin-btn-icon" 
                            onClick={() => moveExpDown(idx)}
                            disabled={idx === currentData.experience.length - 1}
                            title="Move Down"
                          >
                            <ChevronDown className="w-4 h-4" />
                          </button>
                          <button className="admin-btn admin-btn-secondary" onClick={() => startEditExp(idx)}>
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>
                          <button className="admin-btn admin-btn-danger" onClick={() => deleteExpItem(idx)}>
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="admin-form-card">
                  <h3 className="admin-form-title">
                    {editingExpIndex === -1 ? "Add Work Experience" : "Edit Work Experience"}
                  </h3>
                  <div className="admin-form-grid">
                    <div className="admin-form-group">
                      <label className="admin-label">Role Title*</label>
                      <input
                        className="admin-input"
                        name="role"
                        value={expForm.role}
                        onChange={handleExpFormChange}
                        placeholder="e.g. Machine Learning Engineer"
                      />
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-label">Organization Name*</label>
                      <input
                        className="admin-input"
                        name="org"
                        value={expForm.org}
                        onChange={handleExpFormChange}
                        placeholder="e.g. Digital Egypt Pioneers Initiative - DEPI"
                      />
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-label">Period / Duration</label>
                      <input
                        className="admin-input"
                        name="period"
                        value={expForm.period}
                        onChange={handleExpFormChange}
                        placeholder="e.g. Jul 2026 - Present · 2 mos"
                      />
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-label">Location</label>
                      <input
                        className="admin-input"
                        name="location"
                        value={expForm.location}
                        onChange={handleExpFormChange}
                        placeholder="e.g. Al Jizah, Egypt · Hybrid"
                      />
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-label">Experience Type</label>
                      <select
                        className="admin-input"
                        name="type"
                        value={expForm.type || "Internship"}
                        onChange={handleExpFormChange}
                      >
                        <option value="Internship">Internship</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Seasonal">Seasonal</option>
                        <option value="Part-time">Part-time</option>
                      </select>
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-label">Visual Weight / Priority</label>
                      <select
                        className="admin-input"
                        name="priority"
                        value={expForm.priority || "high"}
                        onChange={handleExpFormChange}
                      >
                        <option value="high">High (AI/ML/DS Primary Emphasis)</option>
                        <option value="medium">Medium (Technical Teaching)</option>
                        <option value="secondary">Secondary (Secondary Emphasis)</option>
                      </select>
                    </div>
                  </div>

                  <div className="admin-form-group full-width" style={{ marginTop: "1.5rem" }}>
                    <label className="admin-label">Relevant Skills & Tech (comma separated)</label>
                    <input
                      className="admin-input"
                      value={expSkillsInput}
                      onChange={(e) => setExpSkillsInput(e.target.value)}
                      placeholder="Machine Learning, Python, Scikit-learn, Model Evaluation"
                    />
                  </div>

                  <div className="admin-form-group full-width" style={{ marginTop: "1.5rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                      <label className="admin-label">Responsibilities & Key Accomplishments</label>
                      <button className="admin-btn admin-btn-secondary" style={{ padding: "0.4rem 0.85rem" }} onClick={addExpBullet}>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Bullet</span>
                      </button>
                    </div>
                    <div className="bullets-builder">
                      {expForm.bullets.map((bullet, bIdx) => (
                        <div key={bIdx} className="bullet-input-row">
                          <span style={{ color: "var(--admin-accent-primary)" }}>•</span>
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
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
                    <button className="admin-btn admin-btn-primary" onClick={saveExpItem}>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Save Experience</span>
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
                      <Plus className="w-4 h-4" />
                      <span>Add Project</span>
                    </button>
                  </div>
                  <div className="admin-items-list">
                    {currentData.projects?.map((proj, idx) => (
                      <div key={idx} className="admin-item-row">
                        <div className="admin-item-info">
                          <div className="admin-item-title">{proj.name}</div>
                          <div className="admin-item-subtitle">{proj.subtitle || proj.category} • {proj.period}</div>
                        </div>
                        <div className="admin-item-actions">
                          <button 
                            className="admin-btn admin-btn-secondary admin-btn-icon" 
                            onClick={() => moveProjUp(idx)}
                            disabled={idx === 0}
                            title="Move Up"
                          >
                            <ChevronUp className="w-4 h-4" />
                          </button>
                          <button 
                            className="admin-btn admin-btn-secondary admin-btn-icon" 
                            onClick={() => moveProjDown(idx)}
                            disabled={idx === currentData.projects.length - 1}
                            title="Move Down"
                          >
                            <ChevronDown className="w-4 h-4" />
                          </button>
                          <button className="admin-btn admin-btn-secondary" onClick={() => startEditProj(idx)}>
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>
                          <button className="admin-btn admin-btn-danger" onClick={() => deleteProjItem(idx)}>
                            <Trash2 className="w-3.5 h-3.5" />
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
                      <label className="admin-label">Project Name*</label>
                      <input
                        className="admin-input"
                        name="name"
                        value={projForm.name}
                        onChange={handleProjFormChange}
                        placeholder="e.g. Estate-Miner"
                      />
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-label">Subtitle</label>
                      <input
                        className="admin-input"
                        name="subtitle"
                        value={projForm.subtitle}
                        onChange={handleProjFormChange}
                        placeholder="e.g. Egyptian Real Estate Data Mining & Analytics"
                      />
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-label">Category</label>
                      <input
                        className="admin-input"
                        name="category"
                        value={projForm.category}
                        onChange={handleProjFormChange}
                        placeholder="e.g. Data Analytics & Web Scraping"
                      />
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-label">Period / Duration</label>
                      <input
                        className="admin-input"
                        name="period"
                        value={projForm.period}
                        onChange={handleProjFormChange}
                        placeholder="e.g. May 2026 – Jul 2026"
                      />
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-label">Associated Organization</label>
                      <input
                        className="admin-input"
                        name="associatedWith"
                        value={projForm.associatedWith}
                        onChange={handleProjFormChange}
                        placeholder="e.g. GDG on Campus Al-Azhar"
                      />
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-label">GitHub Link</label>
                      <input
                        className="admin-input"
                        name="github"
                        value={projForm.github}
                        onChange={handleProjFormChange}
                        placeholder="https://github.com/AmirAliAttiaAli/Estate-Miner"
                      />
                    </div>
                    <div className="admin-form-group full-width">
                      <label className="admin-label">Description*</label>
                      <textarea
                        className="admin-input admin-textarea"
                        name="description"
                        rows={4}
                        value={projForm.description}
                        onChange={handleProjFormChange}
                        placeholder="Detailed project summary..."
                      />
                    </div>
                  </div>

                  <div className="admin-form-group full-width" style={{ marginTop: "1.5rem" }}>
                    <div style={{ display: "flex", justify: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                      <label className="admin-label">Key Technical Accomplishments</label>
                      <button className="admin-btn admin-btn-secondary" style={{ padding: "0.4rem 0.85rem" }} onClick={addProjHighlight}>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Highlight</span>
                      </button>
                    </div>
                    <div className="bullets-builder">
                      {projForm.highlights.map((high, hIdx) => (
                        <div key={hIdx} className="bullet-input-row">
                          <span style={{ color: "var(--admin-accent-primary)" }}>•</span>
                          <input
                            className="admin-input"
                            style={{ flexGrow: 1 }}
                            value={high}
                            onChange={(e) => handleProjHighlightChange(hIdx, e.target.value)}
                            placeholder="Describe technical accomplishment..."
                          />
                          <button
                            className="admin-btn admin-btn-danger admin-btn-icon"
                            onClick={() => removeProjHighlight(hIdx)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="admin-form-group full-width" style={{ marginTop: "1.5rem" }}>
                    <label className="admin-label">Technologies Used (comma separated)</label>
                    <input
                      className="admin-input"
                      value={projTechInput}
                      onChange={(e) => setProjTechInput(e.target.value)}
                      placeholder="Python, Playwright, Pandas, NumPy, Matplotlib, Seaborn"
                    />
                  </div>

                  <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
                    <button className="admin-btn admin-btn-primary" onClick={saveProjItem}>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Save Project</span>
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
                <h3 className="admin-form-title">Technical Skills Landscape Matrix</h3>
                <p style={{ color: "var(--admin-text-secondary)", fontSize: "0.85rem", marginBottom: "1.5rem", fontFamily: "var(--admin-font-mono)" }}>
                  Enter skills separated by commas. They will automatically be displayed across Data Science, Machine Learning, Deep Learning, and Tools sections.
                </p>
                <div className="admin-form-group full-width">
                  <label className="admin-label">Skills List (comma-separated)</label>
                  <textarea
                    className="admin-input admin-textarea"
                    rows={8}
                    value={skillsInput}
                    onChange={handleSkillsChange}
                    placeholder="Python, SQL, Pandas, NumPy, Scikit-learn, TensorFlow, Keras, CNN, Transfer Learning, Streamlit, Playwright, MLOps"
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
                      value={currentData.education[0]?.degree || ""}
                      onChange={(e) => handleEducationChange("degree", e.target.value)}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">School / Institution</label>
                    <input
                      className="admin-input"
                      value={currentData.education[0]?.school || ""}
                      onChange={(e) => handleEducationChange("school", e.target.value)}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Study Period</label>
                    <input
                      className="admin-input"
                      value={currentData.education[0]?.period || ""}
                      onChange={(e) => handleEducationChange("period", e.target.value)}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Location</label>
                    <input
                      className="admin-input"
                      value={currentData.education[0]?.location || ""}
                      onChange={(e) => handleEducationChange("location", e.target.value)}
                    />
                  </div>
                </div>
                <div className="admin-form-group full-width" style={{ marginTop: "1rem" }}>
                  <label className="admin-label">Syllabus & Specialization Note</label>
                  <input
                    className="admin-input"
                    value={currentData.education[0]?.note || ""}
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
                      <Plus className="w-4 h-4" />
                      <span>Add Certification</span>
                    </button>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                    {currentData.certifications?.map((cert, idx) => {
                      const isObj = typeof cert === "object" && cert !== null;
                      const name = isObj ? cert.name : cert;
                      const issuer = isObj ? cert.issuer : "Issuer";
                      return (
                        <div key={idx} className="admin-item-row">
                          <div className="admin-item-info">
                            <div className="admin-item-title">{name}</div>
                            <div className="admin-item-subtitle">{issuer}</div>
                          </div>
                          <div className="admin-item-actions">
                            <button 
                              className="admin-btn admin-btn-secondary admin-btn-icon" 
                              onClick={() => moveCertUp(idx)}
                              disabled={idx === 0}
                              title="Move Up"
                            >
                              <ChevronUp className="w-4 h-4" />
                            </button>
                            <button 
                              className="admin-btn admin-btn-secondary admin-btn-icon" 
                              onClick={() => moveCertDown(idx)}
                              disabled={idx === currentData.certifications.length - 1}
                              title="Move Down"
                            >
                              <ChevronDown className="w-4 h-4" />
                            </button>
                            <button className="admin-btn admin-btn-secondary" onClick={() => startEditCert(idx)}>
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>Edit</span>
                            </button>
                            <button className="admin-btn admin-btn-danger" onClick={() => deleteCertItem(idx)}>
                              <Trash2 className="w-3.5 h-3.5" />
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
                      <label className="admin-label">Certification Name*</label>
                      <input
                        className="admin-input"
                        name="name"
                        value={certForm.name}
                        onChange={handleCertFormChange}
                        placeholder="e.g. HCCDA-Tech Essentials"
                      />
                    </div>
                    
                    <div className="admin-form-group full-width">
                      <label className="admin-label">Issuing Organization*</label>
                      <input
                        className="admin-input"
                        name="issuer"
                        value={certForm.issuer}
                        onChange={handleCertFormChange}
                        placeholder="e.g. Huawei Cloud"
                      />
                    </div>

                    <div className="admin-form-group full-width">
                      <label className="admin-label">Validity Period</label>
                      <input
                        className="admin-input"
                        name="period"
                        value={certForm.period || ""}
                        onChange={handleCertFormChange}
                        placeholder="e.g. May 2025 - May 2029"
                      />
                    </div>

                    <div className="admin-form-group full-width">
                      <label className="admin-label">Description</label>
                      <textarea
                        className="admin-input admin-textarea"
                        name="description"
                        rows={3}
                        value={certForm.description || ""}
                        onChange={handleCertFormChange}
                        placeholder="Technical credential details..."
                      />
                    </div>

                    <div className="admin-form-group full-width" style={{ marginTop: "1rem" }}>
                      <label className="admin-label">Certificate Image (Optional)</label>
                      <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginTop: "0.5rem", flexWrap: "wrap" }}>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleCertImageUpload}
                          style={{ display: "none" }}
                          id="cert-image-file"
                        />
                        <label htmlFor="cert-image-file" className="admin-btn admin-btn-secondary" style={{ cursor: "pointer" }}>
                          Choose Image File
                        </label>
                        {certForm.image && (
                          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                            <img src={certForm.image} alt="Preview" style={{ height: "50px", borderRadius: "8px", border: "1px solid var(--admin-border-light)" }} />
                            <button className="admin-btn admin-btn-danger" type="button" onClick={() => setCertForm(prev => ({ ...prev, image: "" }))}>
                              Remove
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
                    <button className="admin-btn admin-btn-primary" onClick={saveCertItem}>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Save Certification</span>
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
                <h3 className="admin-form-title">Export Dynamic Configuration Code</h3>
                <p style={{ color: "var(--admin-text-secondary)", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: "1.5rem", fontFamily: "var(--admin-font-mono)" }}>
                  Changes saved here persist immediately in LocalStorage and your serverless database. 
                  To make these changes permanent in your codebase, click below to copy the code snippet and overwrite <strong>src/portfolioData.js</strong>.
                </p>
                <div style={{ display: "flex", gap: "1rem", marginBottom: "1.25rem" }}>
                  <button className="admin-btn admin-btn-primary" onClick={handleCopyConfig}>
                    <Copy className="w-4 h-4" />
                    <span>Copy Config Code</span>
                  </button>
                  <button className="admin-btn admin-btn-danger" onClick={handleResetToDefault}>
                    <RotateCcw className="w-4 h-4" />
                    <span>Reset to Baseline Defaults</span>
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
