import { GraduationCap, Calendar, MapPin, BookOpen, CheckCircle } from "lucide-react";

export default function Education({ education }) {
  return (
    <section id="education" className="py-20 bg-[#070712] border-y border-cyan-500/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 font-mono text-xs mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>ACADEMIC FOUNDATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Outfit'] tracking-tight">
            Education <span className="text-cyan-400">& Credentials</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mt-3 font-light">
            Formal Computer Science and Information Systems degree program.
          </p>
          <div className="w-16 h-1 bg-cyan-500 rounded-full mt-4"></div>
        </div>

        {/* Education Card */}
        <div className="max-w-3xl mx-auto">
          {education.map((edu, idx) => (
            <div
              key={idx}
              className="bg-slate-900/80 border border-cyan-500/30 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden group hover:border-cyan-400 transition-all duration-300"
            >
              {/* Cyan Accent Bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-teal-400 to-sky-500" />

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <span className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono">
                    Bachelor's Degree
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-['Outfit'] mt-2 group-hover:text-cyan-300 transition-colors">
                    {edu.degree}
                  </h3>
                  <div className="text-cyan-400 font-mono text-sm font-medium mt-1">
                    {edu.school}
                  </div>
                </div>

                <div className="flex flex-col md:items-end gap-1 font-mono text-xs text-slate-400 shrink-0">
                  <span className="flex items-center gap-1.5 text-cyan-300">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    {edu.period}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    {edu.location || "Giza, Egypt"}
                  </span>
                </div>
              </div>

              {/* Note / Coursework */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="text-xs font-mono text-cyan-400 flex items-center gap-1.5 uppercase tracking-wider">
                  <BookOpen className="w-4 h-4" />
                  <span>Academic Specialization & Core Focus</span>
                </div>
                <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed">
                  {edu.note}
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {["Data Structures", "Algorithms", "Software Engineering", "Database Systems", "Machine Learning"].map((subject) => (
                    <span key={subject} className="px-2.5 py-1 rounded bg-slate-900 border border-cyan-500/20 text-cyan-300 text-xs font-mono flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-cyan-400" />
                      {subject}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
