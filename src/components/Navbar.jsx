import { useState, useEffect } from "react";
import { Download, Menu, X, Terminal } from "lucide-react";

export default function Navbar({ profile }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Education", href: "#education" },
    { name: "Certifications", href: "#certifications" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navLinks.map((l) => l.href.substring(1));
      sections.unshift("hero");

      for (const sectionId of sections.reverse()) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 180) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.substring(1);
    const el = document.getElementById(targetId);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#030014]/90 backdrop-blur-md border-b border-cyan-500/20 shadow-lg shadow-black/50 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={(e) => scrollToSection(e, "#hero")}
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 rounded-lg bg-slate-900 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(0,242,254,0.3)] transition-all">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-extrabold tracking-wider text-white font-['Outfit'] group-hover:text-cyan-400 transition-colors">
                AMIR<span className="text-cyan-400">.AI</span>
              </span>
              <span className="block text-[10px] text-cyan-400/80 font-mono tracking-widest -mt-1">
                DS & ML ENGINEER
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 bg-slate-900/60 p-1.5 rounded-full border border-cyan-500/10">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium font-mono tracking-wider transition-all duration-200 ${
                    isActive
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.2)]"
                      : "text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Resume CTA & Mobile Toggle */}
          <div className="flex items-center space-x-3">
            <a
              href={profile.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-cyan-300 bg-slate-900 border border-cyan-500/40 rounded-lg hover:bg-cyan-500 hover:text-black hover:border-cyan-400 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,242,254,0.4)]"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download CV</span>
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-cyan-400 hover:bg-slate-800 focus:outline-none border border-slate-800"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0a14] border-b border-cyan-500/20 px-4 pt-3 pb-6 space-y-2 shadow-2xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="block px-3 py-2 rounded-md text-sm font-mono text-slate-300 hover:text-cyan-300 hover:bg-cyan-500/10 border-l-2 border-transparent hover:border-cyan-400 transition-all"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2">
            <a
              href={profile.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-xs font-semibold text-black bg-cyan-400 rounded-lg hover:bg-cyan-300 transition-colors shadow-[0_0_15px_rgba(0,242,254,0.3)]"
            >
              <Download className="w-4 h-4" />
              <span>Download CV</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
