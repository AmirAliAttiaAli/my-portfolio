import { useState } from "react";
import { Briefcase, Calendar, MapPin, ChevronDown, ChevronUp, Sparkles, Building2 } from "lucide-react";

export default function Experience({ experience }) {
  // Keep first 3 high-priority roles expanded by default
  const [expandedIds, setExpandedIds] = useState(() => {
    return new Set(experience.slice(0, 3).map((e) => e.id));
  });

  const toggleExpand = (id) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <section id="experience" className="py-20 bg-[#030014] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 font-mono text-xs mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>PROFESSIONAL TIMELINE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Outfit'] tracking-tight">
            Work Experience & <span className="text-cyan-400">Internships</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mt-3 font-light">
            Hands-on roles across machine learning initiatives, data analytics programs, and technical teaching.
          </p>
          <div className="w-16 h-1 bg-cyan-500 rounded-full mt-4"></div>
        </div>

        {/* Timeline Container */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {experience.map((exp, idx) => {
            const isExpanded = expandedIds.has(exp.id);
            const isSecondary = exp.priority === "secondary";

            return (
              <div
                key={exp.id || idx}
                className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
                  isSecondary
                    ? "bg-slate-950/50 border-slate-800 opacity-80 hover:opacity-100"
                    : "bg-slate-900/70 border-cyan-500/25 hover:border-cyan-400 shadow-lg"
                }`}
              >
                {/* Collapsed Header Bar */}
                <div
                  onClick={() => toggleExpand(exp.id)}
                  className="p-5 sm:p-6 flex items-start justify-between gap-4 cursor-pointer select-none group"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Priority Highlight Badge */}
                      {!isSecondary && (
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                      )}
                      <span
                        className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-medium ${
                          exp.type === "Internship"
                            ? "bg-cyan-950 border border-cyan-500/40 text-cyan-300"
                            : exp.type === "Full-time"
                            ? "bg-emerald-950 border border-emerald-500/40 text-emerald-300"
                            : "bg-slate-800 text-slate-300"
                        }`}
                      >
                        {exp.type}
                      </span>
                      <span className="text-slate-500 font-mono text-xs">•</span>
                      <span className="text-slate-400 font-mono text-xs flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-cyan-400" />
                        {exp.period}
                      </span>
                    </div>

                    {/* Role & Org */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                      <h3 className="text-lg sm:text-xl font-bold text-white font-['Outfit'] group-hover:text-cyan-300 transition-colors">
                        {exp.role}
                      </h3>
                      <span className="hidden sm:inline text-slate-600">|</span>
                      <div className="text-cyan-400 text-sm font-medium font-mono flex items-center gap-1.5">
                        <Building2 className="w-4 h-4 text-cyan-500" />
                        <span>{exp.org}</span>
                      </div>
                    </div>

                    {exp.location && (
                      <div className="text-slate-400 text-xs font-light flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        <span>{exp.location}</span>
                      </div>
                    )}
                  </div>

                  {/* Expand Toggle Button */}
                  <div className="p-2 rounded-lg bg-slate-950 border border-cyan-500/20 text-cyan-400 group-hover:border-cyan-400 transition-all shrink-0">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>

                {/* Expanded Details Body */}
                {isExpanded && (
                  <div className="px-5 pb-6 sm:px-6 border-t border-slate-800/80 pt-4 space-y-4 animate-fadeIn">
                    {/* Bullets List */}
                    <div className="space-y-2">
                      <div className="text-xs font-mono text-cyan-400 tracking-wider uppercase">
                        Key Responsibilities & Focus
                      </div>
                      <ul className="space-y-2">
                        {exp.bullets?.map((bullet, bIdx) => (
                          <li key={bIdx} className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0"></span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Relevant Skills */}
                    {exp.skills && exp.skills.length > 0 && (
                      <div className="pt-2">
                        <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
                          Relevant Skills & Technologies
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {exp.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-2.5 py-1 rounded bg-slate-950 border border-cyan-500/20 text-cyan-300 text-xs font-mono"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
