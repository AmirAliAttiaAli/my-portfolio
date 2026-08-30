import { useEffect, useRef } from "react";
import { Download, ArrowRight, Mail, Database, Cpu, Activity, CheckCircle2, Sparkles } from "lucide-react";
import profileImg from "../assets/profile.png";

export default function Hero({ profile }) {
  const canvasRef = useRef(null);

  // Subtle animated neural network background canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    const numPoints = Math.floor(Math.min(width, height) / 18);
    const points = [];

    for (let i = 0; i < numPoints; i++) {
      points.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 2 + 1,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[j].x, points[j].y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${0.18 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw points
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 242, 254, 0.4)";
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex items-center bg-tech-grid overflow-hidden">
      {/* Interactive Canvas Grid */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

      {/* Radial Cyan Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 text-xs font-mono shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
              </span>
              <span>Available for DS & ML Roles</span>
            </div>

            {/* Prominent Name on Left Side */}
            <div className="space-y-1">
              <div className="text-cyan-400 font-mono text-sm sm:text-base font-semibold tracking-widest uppercase flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Hello, I'm</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white font-['Outfit'] tracking-tight">
                {profile.name || "Amir Ali Attia Ali"}
              </h2>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-200 font-['Outfit'] leading-tight tracking-tight">
              Turning Data into Insights.{" "}
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-sky-400">
                Building Models into Solutions.
              </span>
            </h1>

            {/* Role Title */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-900/90 border border-cyan-500/30 text-cyan-300 font-mono text-sm sm:text-base font-medium shadow-[0_0_15px_rgba(0,242,254,0.1)]">
              <Cpu className="w-5 h-5 text-cyan-400 shrink-0" />
              <span>Data Scientist | Machine Learning Engineer</span>
            </div>

            {/* Short Bio */}
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed font-light">
              Computer Science student with hands-on experience in Machine Learning, Deep Learning, Data Analytics, and Generative AI. Mentoring data professionals and building real-world AI systems.
            </p>

            {/* Tech Badges Row */}
            <div className="pt-1 flex flex-wrap items-center gap-3 font-mono text-xs text-slate-400">
              <span className="px-3 py-1.5 rounded-lg bg-slate-900/90 border border-cyan-500/20 text-cyan-300 flex items-center gap-1.5 hover:border-cyan-400 transition-colors">
                <Database className="w-3.5 h-3.5" /> Python / SQL
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-slate-900/90 border border-cyan-500/20 text-cyan-300 flex items-center gap-1.5 hover:border-cyan-400 transition-colors">
                <Cpu className="w-3.5 h-3.5" /> TensorFlow / PyTorch
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-slate-900/90 border border-cyan-500/20 text-cyan-300 flex items-center gap-1.5 hover:border-cyan-400 transition-colors">
                <Activity className="w-3.5 h-3.5" /> MLOps & Streamlit
              </span>
            </div>

            {/* CTA Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => scrollTo("projects")}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-semibold font-['Outfit'] text-sm tracking-wide hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-[0_0_25px_rgba(0,242,254,0.4)] flex items-center gap-2 group cursor-pointer"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => scrollTo("contact")}
                className="px-6 py-3.5 rounded-xl bg-slate-900/90 text-white font-medium text-sm font-['Outfit'] border border-cyan-500/30 hover:border-cyan-400 hover:bg-slate-800 transition-all duration-300 flex items-center gap-2 cursor-pointer"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>Contact Me</span>
              </button>

              <a
                href={profile.cv}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-slate-950 text-cyan-300 font-medium text-sm font-['Outfit'] border border-cyan-500/40 hover:bg-cyan-500 hover:text-black transition-all duration-300 flex items-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
              >
                <Download className="w-4 h-4" />
                <span>Download CV</span>
              </a>
            </div>
          </div>

          {/* Right Column - Circular Portrait Layout */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative group">
              
              {/* Pulsing Backing Halo Glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 via-teal-400 to-blue-600 rounded-full blur-2xl opacity-40 group-hover:opacity-75 transition duration-700 animate-pulse"></div>

              {/* Orbiting Decorative Tech Ring */}
              <div className="absolute -inset-3 rounded-full border border-cyan-500/30 group-hover:border-cyan-400/60 transition-colors pointer-events-none"></div>
              <div className="absolute -inset-6 rounded-full border border-dashed border-cyan-500/20 pointer-events-none animate-spin" style={{ animationDuration: '30s' }}></div>

              {/* Circular Image Container */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full p-2 bg-slate-950 border-2 border-cyan-400/60 shadow-[0_0_40px_rgba(0,242,254,0.3)] overflow-hidden">
                <img
                  src={profileImg}
                  alt={profile.name}
                  className="w-full h-full rounded-full object-cover object-top transition duration-500 group-hover:scale-105"
                />
              </div>

              {/* Bottom Badge Floating Badge */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-slate-900/95 backdrop-blur-md border border-cyan-500/40 text-cyan-300 text-xs font-mono font-medium shadow-xl flex items-center gap-2 whitespace-nowrap">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Data Scientist & ML Engineer</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
