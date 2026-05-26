import { useEffect, useRef, useState, useMemo } from "react";
import "./Portfolio.css";
import profileImg from "./assets/profile.png";

// SVG Icons
function IconMapPin() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function IconMail() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function IconLinkedin() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function IconGithub() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function IconArrowUpRight() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

function IconGraduation() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
      <path d="M6 18.8v-4L2 13v6a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-.2" />
      <path d="M18 13v6a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6" />
    </svg>
  );
}

function IconAward() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  );
}

function IconMenu() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function IconClose() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

const NAV_LINKS = ["About", "Experience", "Projects", "Skills", "Education", "Certifications", "Contact"];

const SKILL_BARS = [
  { name: "Python", level: 92, color: "#00f2fe" },
  { name: "SQL", level: 85, color: "#d946ef" },
  { name: "Machine Learning", level: 88, color: "#00f2fe" },
  { name: "Deep Learning", level: 82, color: "#d946ef" },
  { name: "TensorFlow / Keras", level: 80, color: "#00f2fe" },
  { name: "Data Visualization", level: 85, color: "#d946ef" },
  { name: "Power BI", level: 78, color: "#00f2fe" },
  { name: "GenAI / LLMs & RAG", level: 75, color: "#d946ef" },
];

function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, { threshold });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}

function SkillBar({ name, level, color, delay }) {
  const [width, setWidth] = useState(0);
  const [ref, visible] = useInView(0.3);

  useEffect(() => {
    if (!visible) return;
    const timer = window.setTimeout(() => setWidth(level), delay);
    return () => window.clearTimeout(timer);
  }, [visible, level, delay]);

  return (
    <div ref={ref} className="skill-bar-container">
      <div className="skill-bar-header">
        <span className="skill-name">{name}</span>
        <span className="skill-percent" style={{ color }}>{width}%</span>
      </div>
      <div className="skill-track">
        <div 
          className="skill-fill" 
          style={{ 
            width: `${width}%`, 
            background: `linear-gradient(90deg, ${color}44, ${color})`,
            boxShadow: `0 0 8px ${color}66` 
          }} 
        />
      </div>
    </div>
  );
}

function getSkillIcon(name) {
  const normName = name.toLowerCase().trim();

  // Python
  if (normName === "python") {
    return (
      <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.93 2C6.44 2 6.64 4.38 6.64 4.38v2.09c.8 0 1.45.65 1.45 1.45v2.86h4.35c.8 0 1.45-.65 1.45-1.45V4.98s-.24-2.98-5.96-2.98zm-2.07 1c.36 0 .64.28.64.64a.64.64 0 0 1-1.28 0c0-.36.28-.64.64-.64zM12.07 22c5.49 0 5.29-2.38 5.29-2.38v-2.09c-.8 0-1.45-.65-1.45-1.45v-2.86h-4.35c-.8 0-1.45.65-1.45 1.45v4.35s.24 2.98 5.96 2.98zm2.07-1c-.36 0-.64-.28-.64-.64a.64.64 0 0 1 1.28 0c0 .36-.28.64-.64.64zm-7.5-6.64h-2.2c-.8 0-1.45-.65-1.45-1.45v-4.35s.2-2.98 5.96-2.98c5.76 0 5.96 2.98 5.96 2.98v1h-2.18s-1.45.05-1.45 1.45v3.35zm9.68-4.72h2.2c.8 0 1.45.65 1.45 1.45v4.35s-.2 2.98-5.96 2.98c-5.76 0-5.96-2.98-5.96-2.98v-1h2.18s1.45-.05 1.45-1.45v-3.35z"/>
      </svg>
    );
  }

  // SQL, mysql, postgresql, mongodb, database
  if (normName.includes("sql") || normName.includes("db") || normName.includes("database")) {
    return (
      <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
        <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"></path>
      </svg>
    );
  }

  // C++
  if (normName.includes("c++")) {
    return (
      <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
        <line x1="12" y1="4" x2="12" y2="20"></line>
        <line x1="4" y1="12" x2="20" y2="12"></line>
      </svg>
    );
  }

  // Bash, terminal, command
  if (normName === "bash" || normName.includes("terminal") || normName.includes("command")) {
    return (
      <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 17 10 11 4 5"></polyline>
        <line x1="12" y1="19" x2="20" y2="19"></line>
      </svg>
    );
  }

  // NumPy, pandas, dataframe, table, grid, data structures
  if (normName.includes("numpy") || normName.includes("pandas") || normName.includes("dataframe") || normName.includes("table") || normName.includes("data structures")) {
    return (
      <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="3" rx="2"></rect>
        <path d="M3 9h18"></path>
        <path d="M3 15h18"></path>
        <path d="M9 3v18"></path>
        <path d="M15 3v18"></path>
      </svg>
    );
  }

  // Scikit-learn, tensorflow, pytorch, keras, brain, ml, dl, deep learning, machine learning, ai, neural, cnn, rnn, lstm
  if (
    normName.includes("scikit") ||
    normName.includes("tensorflow") ||
    normName.includes("pytorch") ||
    normName.includes("keras") ||
    normName.includes("brain") ||
    normName.includes("ml") ||
    normName.includes("dl") ||
    normName.includes("deep") ||
    normName.includes("learning") ||
    normName.includes("machine") ||
    normName.includes("neural") ||
    normName.includes("cnn") ||
    normName.includes("rnn") ||
    normName.includes("lstm")
  ) {
    return (
      <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
        <path d="M12 6v12"></path>
        <path d="M8 10c0-2.21 1.79-4 4-4s4 1.79 4 4"></path>
        <path d="M12 18c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4"></path>
      </svg>
    );
  }

  // Matplotlib, seaborn, visualization, plot, chart, graph
  if (
    normName.includes("matplotlib") ||
    normName.includes("seaborn") ||
    normName.includes("visual") ||
    normName.includes("plot") ||
    normName.includes("chart") ||
    normName.includes("graph")
  ) {
    return (
      <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"></line>
        <line x1="12" y1="20" x2="12" y2="4"></line>
        <line x1="6" y1="20" x2="6" y2="14"></line>
      </svg>
    );
  }

  // XGBoost, LightGBM, CatBoost, flash, energy, fast
  if (normName.includes("boost") || normName.includes("gbm") || normName.includes("lightning") || normName.includes("fast")) {
    return (
      <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
      </svg>
    );
  }

  // Hugging Face, Transformers, GPT-4o, GPT, LLM, LLMs, BERT, T5, RoBERTa, AI, agent, crewai, multi-agent, systems
  if (
    normName.includes("hugging") ||
    normName.includes("transformer") ||
    normName.includes("gpt") ||
    normName.includes("llm") ||
    normName.includes("bert") ||
    normName.includes("t5") ||
    normName.includes("roberta") ||
    normName.includes("crewai") ||
    normName.includes("agent") ||
    normName.includes("system")
  ) {
    return (
      <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="10" x="3" y="11" rx="2"></rect>
        <circle cx="12" cy="5" r="2"></circle>
        <path d="M12 7v4"></path>
        <line x1="8" y1="16" x2="8" y2="16"></line>
        <line x1="16" y1="16" x2="16" y2="16"></line>
      </svg>
    );
  }

  // spaCy, NLP, text, prompt, engineering
  if (normName.includes("spacy") || normName.includes("nlp") || normName.includes("text") || normName.includes("prompt") || normName.includes("pen") || normName.includes("write")) {
    return (
      <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9"></path>
        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path>
      </svg>
    );
  }

  // RAG, search, find
  if (normName.includes("rag") || normName.includes("search") || normName.includes("find")) {
    return (
      <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.3-4.3"></path>
      </svg>
    );
  }

  // Quantization, Pruning, compression
  if (normName.includes("quant") || normName.includes("prun") || normName.includes("scissor") || normName.includes("compress")) {
    return (
      <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="6" r="3"></circle>
        <circle cx="6" cy="18" r="3"></circle>
        <line x1="20" y1="4" x2="8.12" y2="15.88"></line>
        <line x1="14.47" y1="14.48" x2="20" y2="20"></line>
        <line x1="8.12" y1="8.12" x2="12" y2="12"></line>
      </svg>
    );
  }

  // Docker, container
  if (normName.includes("docker") || normName.includes("container")) {
    return (
      <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="10" x="3" y="11" rx="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
      </svg>
    );
  }

  // n8n, workflow, flow, node, pipeline, MLflow, CI/CD
  if (
    normName.includes("n8n") ||
    normName.includes("workflow") ||
    normName.includes("flow") ||
    normName.includes("node") ||
    normName.includes("pipeline") ||
    normName.includes("ci") ||
    normName.includes("cd")
  ) {
    return (
      <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        <polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline>
        <polyline points="7.5 19.79 12 17.19 16.5 19.79"></polyline>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
        <line x1="12" y1="22.08" x2="12" y2="12"></line>
      </svg>
    );
  }

  // Streamlit, webapp, website, app, frontend, layout
  if (normName.includes("streamlit") || normName.includes("web") || normName.includes("app") || normName.includes("layout")) {
    return (
      <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="14" x="2" y="3" rx="2"></rect>
        <line x1="8" y1="21" x2="16" y2="21"></line>
        <line x1="12" y1="17" x2="12" y2="21"></line>
      </svg>
    );
  }

  // OpenCV, camera, image, video, cv
  if (normName.includes("opencv") || normName.includes("camera") || normName.includes("image") || normName.includes("video") || normName.includes("cv")) {
    return (
      <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
        <circle cx="12" cy="13" r="3"></circle>
      </svg>
    );
  }

  // Git, github, version control
  if (normName.includes("git")) {
    return (
      <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="18" r="3"></circle>
        <circle cx="6" cy="6" r="3"></circle>
        <circle cx="6" cy="12" r="3"></circle>
        <path d="M18 15V9a4 4 0 0 0-4-4H9"></path>
        <line x1="6" y1="9" x2="6" y2="9"></line>
      </svg>
    );
  }

  // OOP, Object, class
  if (normName.includes("oop") || normName.includes("object") || normName.includes("class")) {
    return (
      <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="8" height="8" x="8" y="2" rx="1"></rect>
        <rect width="8" height="8" x="2" y="14" rx="1"></rect>
        <rect width="8" height="8" x="14" y="14" rx="1"></rect>
        <path d="M12 10v4"></path>
        <path d="M12 12H6"></path>
        <path d="M12 12h6"></path>
      </svg>
    );
  }

  // Algorithms, math, calc
  if (normName.includes("algorithm") || normName.includes("math") || normName.includes("calc")) {
    return (
      <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="3" rx="2"></rect>
        <line x1="9" y1="9" x2="15" y2="15"></line>
        <line x1="15" y1="9" x2="9" y2="15"></line>
        <line x1="9" y1="12" x2="15" y2="12"></line>
      </svg>
    );
  }

  // Default fallback code tag icon
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"></polyline>
      <polyline points="8 6 2 12 8 18"></polyline>
    </svg>
  );
}

function SectionLabel({ children }) {
  return <div className="sec-label">{children}</div>;
}

function SectionTitle({ children }) {
  return <h2 className="sec-title">{children}</h2>;
}

export default function Portfolio({ portfolioData, onGoToAdmin }) {
  const {
    profile,
    stats,
    experience,
    projects,
    skills,
    education,
    certifications,
  } = portfolioData;
  const [active, setActive] = useState("about");
  const [typed, setTyped] = useState("");
  const [roleIdx, setRoleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const roles = portfolioData.roles || ["Data Scientist", "ML Engineer", "AI Researcher", "Deep Learning Dev", "GenAI Explorer"];
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [lightboxImg, setLightboxImg] = useState("");
  const apiBaseUrl = useMemo(() => import.meta.env?.VITE_API_BASE_URL ?? "", []);

  // Sticky Navbar Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Text Typing Loop
  useEffect(() => {
    if (!roles || roles.length === 0) return;
    
    // Ensure roleIdx is within current roles bounds
    const safeIdx = roleIdx % roles.length;
    const current = roles[safeIdx] || "";

    const timer = window.setTimeout(() => {
      if (!deleting) {
        setTyped(current.slice(0, charIdx + 1));
        if (charIdx + 1 >= current.length) {
          window.setTimeout(() => setDeleting(true), 1800);
        } else {
          setCharIdx((v) => v + 1);
        }
      } else {
        setTyped(current.slice(0, charIdx - 1));
        if (charIdx - 1 <= 0) {
          setDeleting(false);
          // Advance to next role safely
          setRoleIdx((v) => (v + 1) % roles.length);
          setCharIdx(0);
        } else {
          setCharIdx((v) => v - 1);
        }
      }
    }, deleting ? 45 : 85);

    return () => window.clearTimeout(timer);
  }, [charIdx, deleting, roleIdx, roles]);

  // Section Tracker for Active Links
  useEffect(() => {
    const handler = () => {
      for (const section of NAV_LINKS.map((item) => item.toLowerCase())) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActive(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const go = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80; // height of fixed navbar
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formState.name || !formState.email || !formState.message) {
      setStatus("please-fill");
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      if (!response.ok) throw new Error("Request failed");

      setStatus("sent");
      setFormState({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Failed to submit contact message to Serverless API:", err);
      setStatus("error");
    }
  };

  return (
    <>
      {/* Decorative Canvas Backgrounds */}
      <div className="bg-canvas">
        <div className="bg-grid-faint" />
        <div className="bg-glow-blob-1" />
        <div className="bg-glow-blob-2" />
      </div>

      {/* Navigation Header */}
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="navbar-brand" onClick={() => go("about")}>
          AA<span className="neon-text-violet">.DS</span>
        </div>
        
        {/* Desktop Links */}
        <div className={`navbar-links ${mobileMenuOpen ? "open" : ""}`}>
          {NAV_LINKS.map((item) => (
            <span 
              key={item} 
              className={`navbar-link ${active === item.toLowerCase() ? "active" : ""}`} 
              onClick={() => go(item.toLowerCase())}
            >
              {item}
            </span>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <IconClose /> : <IconMenu />}
        </button>
      </nav>

      {/* Hero Section */}
      <section id="about" className="hero-section">
        <div className="hero-container">
          <div className="hero-main">
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", letterSpacing: "0.4em", color: "var(--accent-secondary)", marginBottom: "1.5rem" }}>
              <span className="terminal-prefix">&gt;</span>INITIALIZING PROFESSIONAL PROFILE...
            </div>

            <h1 className="hero-title">
              <span className="gradient-text">{profile.name}</span>
            </h1>

            <div className="hero-typing">
              <span className="terminal-prefix">&gt;</span>
              <span className="neon-text-cyan">{typed}</span>
              <span className="typing-cursor" />
            </div>

            {/* Quick Metrics Panel */}
            <div className="hero-stats-panel">
              {stats.map((item) => (
                <div key={item.label} className="stat-glow-card">
                  <div className="stat-value">{item.value}</div>
                  <div className="stat-label">{item.label}</div>
                </div>
              ))}
            </div>

            <div className="hero-meta-row">
              <div className="hero-meta-inline-item">
                <IconMapPin />
                <span>{profile.location}</span>
              </div>
              <div className="hero-meta-inline-item">
                <IconMail />
                <span>{profile.email}</span>
              </div>
              <div className="hero-meta-inline-item">
                <IconPhone />
                <span>{profile.phone}</span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <button className="btn-modern btn-primary" onClick={() => go("projects")}>
                View Projects <IconArrowUpRight />
              </button>
              <button className="btn-modern btn-secondary" onClick={() => go("contact")}>
                Get in Touch
              </button>
            </div>
          </div>

          {/* Profile Image Wrapper */}
          <div className="hero-image-container">
            <div className="hero-image-glow-bg" />
            <div className="hero-image-wrapper">
              <img src={profileImg} alt={profile.name} />
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section-wrapper">
        <SectionLabel>Experience</SectionLabel>
        <SectionTitle>Work, Training & Community</SectionTitle>
        
        <div className="timeline">
          {experience.map((item, index) => {
            const isMagenta = index >= experience.length / 2;
            return (
              <div 
                key={`${item.role}-${item.period}`} 
                className={`timeline-item ${isMagenta ? "magenta-dot" : ""}`}
              >
                <div className="timeline-dot" />
                <div className="timeline-header">
                  <div>
                    <h3 className="timeline-role">{item.role}</h3>
                    <span className="timeline-org">{item.org}</span>
                  </div>
                  <div className="timeline-meta">
                    <div className="timeline-location">{item.location}</div>
                    <div className="timeline-period">{item.period}</div>
                  </div>
                </div>
                <div className="timeline-body">
                  <ul>
                    {item.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section id="projects" className="section-wrapper">
        <SectionLabel>Projects</SectionLabel>
        <SectionTitle>Featured Engineering Projects</SectionTitle>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem", width: "100%" }}>
          {projects.map((project, index) => {
            const emoji = index === 0 ? "🍎" : index === 1 ? "🤖" : "📊";
            return (
              <div 
                key={project.name} 
                className={`glass-card ${index % 2 === 0 ? "primary-edge" : "secondary-edge"}`}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", marginBottom: "1.25rem" }}>
                  <span style={{ fontSize: "2.25rem", lineHeight: 1 }}>{emoji}</span>
                  <div>
                    <h3 style={{ fontSize: "1.25rem", fontWeight: 700, letterSpacing: "0.02em" }}>
                      {project.github ? (
                        <a 
                          href={project.github} 
                          target="_blank" 
                          rel="noreferrer" 
                          style={{ color: "inherit", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
                          className="project-title-link"
                        >
                          {project.name} <IconArrowUpRight />
                        </a>
                      ) : (
                        project.name
                      )}
                    </h3>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: index % 2 === 0 ? "var(--accent-primary)" : "var(--accent-secondary)", marginTop: "0.25rem" }}>
                      {project.meta}
                    </div>
                  </div>
                </div>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.75, color: "var(--text-secondary)", marginBottom: "1.25rem" }}>
                  {project.summary}
                </p>
                <ul style={{ paddingLeft: "0", listStyle: "none", marginBottom: "1.5rem" }}>
                  {project.highlights.map((bullet) => (
                    <li key={bullet} style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "0.5rem", position: "relative", paddingLeft: "1.25rem" }}>
                      <span style={{ position: "absolute", left: 0, color: index % 2 === 0 ? "var(--accent-primary)" : "var(--accent-secondary)" }}>•</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
                <div className="tag-list">
                  {project.tools.map((tool) => (
                    <span 
                      key={tool} 
                      className={`pill-tag ${index % 2 === 0 ? "accent-cyan" : "accent-violet"}`}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section-wrapper">
        <SectionLabel>Proficiencies</SectionLabel>
        <SectionTitle>Technical Skill Landscape</SectionTitle>

        <div className="skills-main-card">
          <div className="skills-pill-grid">
            {(Array.isArray(skills) ? skills : Object.values(skills || {}).flat()).map((skill) => (
              <div key={skill} className="skills-pill-item">
                <span className="skills-pill-icon">{getSkillIcon(skill)}</span>
                <span className="skills-pill-name">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="section-wrapper">
        <SectionLabel>Education</SectionLabel>
        <SectionTitle>University</SectionTitle>
        
        <div style={{ width: "100%" }}>
          {education.map((item) => (
            <div key={item.degree} className="glass-card secondary-edge" style={{ padding: "2.5rem" }}>
              <div style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
                <div style={{ display: "flex", alignItems: "center", justifyItems: "center", padding: "0.75rem", background: "rgba(217, 70, 239, 0.08)", border: "1px solid rgba(217, 70, 239, 0.2)", borderRadius: "8px", color: "var(--accent-secondary)" }}>
                  <IconGraduation />
                </div>
                <div>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.4rem" }}>
                    {item.degree}
                  </h3>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.875rem", color: "var(--accent-primary)", marginBottom: "0.5rem" }}>
                    {item.school}
                  </div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "1rem" }}>
                    {item.period}
                  </div>
                  <p style={{ fontSize: "0.95rem", lineHeight: 1.7, color: "var(--text-secondary)" }}>
                    {item.note}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="section-wrapper">
        <SectionLabel>Credentials</SectionLabel>
        <SectionTitle>Certifications & Qualifications</SectionTitle>
        
        <div className="cert-grid">
          {certifications.map((item, index) => {
            const isObj = typeof item === "object" && item !== null;
            const name = isObj ? item.name : item;
            const issuer = isObj ? item.issuer : "";
            const issueDate = isObj && item.issueMonth ? `${item.issueMonth} ${item.issueYear}` : "";
            const expDate = isObj && item.expMonth ? `${item.expMonth} ${item.expYear}` : "";
            
            return (
              <div key={index} className="cert-card">
                {isObj && item.image && (
                  <div 
                    onClick={() => setLightboxImg(item.image)}
                    className="cert-image-thumbnail"
                    title="Click to view full certificate"
                  >
                    <img 
                      src={item.image} 
                      alt={name} 
                    />
                  </div>
                )}
                
                <div className="cert-info-container">
                  <div className="cert-icon">
                    <IconAward />
                  </div>
                  <div className="cert-details">
                    <div className="cert-title">{name}</div>
                    {issuer && (
                      <div className="cert-issuer">
                        {issuer}
                      </div>
                    )}
                    {issueDate && (
                      <div className="cert-date">
                        Issued: {issueDate} {expDate ? `• Expired: ${expDate}` : "• No Expiration"}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-wrapper">
        <SectionLabel>Get In Touch</SectionLabel>
        <SectionTitle>Connect With Me</SectionTitle>
        
        <div className="contact-grid">
          <div className="contact-info">
            <p className="contact-text">
              I am always open to exploring professional opportunities, collaboration on open-source machine learning projects, or discussing the latest in AI and data. Send a message, and I'll get back to you shortly.
            </p>
            
            <div className="contact-methods">
              <a href={`mailto:${profile.email}`} className="contact-method-card">
                <div className="contact-icon">
                  <IconMail />
                </div>
                <div>
                  <div className="contact-label">Email</div>
                  <div className="contact-value">{profile.email}</div>
                </div>
              </a>
              
              <a href={`tel:${profile.phone.replace(/\s+/g, "")}`} className="contact-method-card">
                <div className="contact-icon">
                  <IconPhone />
                </div>
                <div>
                  <div className="contact-label">Phone</div>
                  <div className="contact-value">{profile.phone}</div>
                </div>
              </a>

              <a href={`https://${profile.linkedin}`} target="_blank" rel="noreferrer" className="contact-method-card">
                <div className="contact-icon">
                  <IconLinkedin />
                </div>
                <div>
                  <div className="contact-label">LinkedIn</div>
                  <div className="contact-value">Amir Ali Torad</div>
                </div>
              </a>

              <a href={`https://${profile.github}`} target="_blank" rel="noreferrer" className="contact-method-card">
                <div className="contact-icon">
                  <IconGithub />
                </div>
                <div>
                  <div className="contact-label">GitHub</div>
                  <div className="contact-value">AmirAliAttiaAli</div>
                </div>
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="contact-form-container">
            <h3 style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              color: "var(--text-primary)",
              marginBottom: "1.5rem",
              fontFamily: "var(--font-sans, inherit)",
              letterSpacing: "0.02em",
              textAlign: "left"
            }}>
              Send Me a Message
            </h3>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div className="form-group">
                <input 
                  className="form-input" 
                  name="name" 
                  value={formState.name} 
                  onChange={handleChange} 
                  placeholder="Your Name" 
                  type="text" 
                />
              </div>
              <div className="form-group">
                <input 
                  className="form-input" 
                  name="email" 
                  value={formState.email} 
                  onChange={handleChange} 
                  placeholder="Your Email Address" 
                  type="email" 
                />
              </div>
              <div className="form-group">
                <textarea 
                  className="form-input" 
                  name="message" 
                  value={formState.message} 
                  onChange={handleChange} 
                  placeholder="Tell me about your project or opportunity..." 
                  rows={5} 
                  style={{ resize: "none" }} 
                />
              </div>

              <button className="btn-modern btn-primary" style={{ width: "100%" }} type="submit">
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>

              {status === "please-fill" && (
                <div className="form-status error">
                  Please fill in all the fields before sending.
                </div>
              )}
              {status === "missing-backend" && (
                <div className="form-status info">
                  Contact API is currently offline. Please reach out directly via email or social links!
                </div>
              )}
              {status === "sent" && (
                <div className="form-status success">
                  Your message has been sent successfully. Thank you!
                </div>
              )}
              {status === "error" && (
                <div className="form-status error">
                  An error occurred. Please try again or email me directly.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-copy">
          © {new Date().getFullYear()} AMIR ALI. ALL RIGHTS RESERVED.
        </div>
        <div style={{ display: "flex", gap: "1.5rem", alignItems: "center", flexWrap: "wrap" }}>
          <button 
            onClick={onGoToAdmin} 
            style={{ background: "none", border: "none", color: "var(--accent-secondary)", cursor: "pointer", fontFamily: "var(--font-mono)", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase" }}
          >
            🔑 Admin Login
          </button>
          <span style={{ color: "var(--border-light)", fontSize: "0.8rem" }}>|</span>
          <div className="footer-tech">
            ENGINEERED WITH <span>♥</span> & REACT
          </div>
        </div>
      </footer>
      {/* Lightbox Modal */}
      {lightboxImg && (
        <div 
          className="lightbox-overlay" 
          onClick={() => setLightboxImg("")}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(3, 0, 20, 0.95)",
            zIndex: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            backdropFilter: "blur(12px)",
            cursor: "zoom-out"
          }}
        >
          <button 
            onClick={() => setLightboxImg("")}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              color: "white",
              fontSize: "1.5rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            ✕
          </button>
          <img 
            src={lightboxImg} 
            alt="Certificate Preview" 
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "100%",
              maxHeight: "90vh",
              borderRadius: "8px",
              boxShadow: "0 0 40px rgba(0, 242, 254, 0.2)",
              border: "1px solid rgba(255,255,255,0.1)",
              cursor: "default"
            }} 
          />
        </div>
      )}
    </>
  );
}
