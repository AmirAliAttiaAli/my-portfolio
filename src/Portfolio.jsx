import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Projects from "./components/Projects.jsx";
import Experience from "./components/Experience.jsx";
import Education from "./components/Education.jsx";
import Certifications from "./components/Certifications.jsx";
import Contact from "./components/Contact.jsx";

export default function Portfolio({ portfolioData, onGoToAdmin }) {
  const profile = portfolioData?.profile || {};
  const stats = portfolioData?.stats || [];
  const experience = portfolioData?.experience || [];
  const projects = portfolioData?.projects || [];
  const education = portfolioData?.education || [];
  const certifications = portfolioData?.certifications || [];

  return (
    <div className="min-h-screen bg-[#030014] text-slate-100 font-sans selection:bg-cyan-500 selection:text-black">
      {/* Sticky Glass Navbar */}
      <Navbar profile={profile} />

      {/* Main Single-Page Sections in exact required order */}
      <main>
        {/* 1. Hero */}
        <Hero profile={profile} />

        {/* 2. About Me */}
        <About profile={profile} stats={stats} />

        {/* 3. Skills */}
        <Skills skills={portfolioData?.skills} skillsCategorized={portfolioData?.skillsCategorized} />

        {/* 4. Projects */}
        <Projects projects={projects} />

        {/* 5. Experience */}
        <Experience experience={experience} />

        {/* 6. Education */}
        <Education education={education} />

        {/* 7. Certifications */}
        <Certifications certifications={certifications} />

        {/* 8. Contact */}
        <Contact profile={profile} />
      </main>

      {/* Secret Admin Panel Trigger Button (Subtle in footer corner for owner) */}
      {onGoToAdmin && (
        <button
          onClick={onGoToAdmin}
          className="fixed bottom-3 right-3 p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-600 hover:text-cyan-400 hover:border-cyan-500/40 text-[10px] font-mono transition-all opacity-40 hover:opacity-100 z-40"
          title="Manage Content"
        >
          [Admin]
        </button>
      )}
    </div>
  );
}
