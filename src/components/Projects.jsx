import { useState } from "react";
import { FolderGit2, ExternalLink, ChevronRight, X, BarChart3, BrainCircuit, Database, CheckCircle } from "lucide-react";

function IconGithub({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export default function Projects({ projects }) {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="py-20 bg-[#070712] border-y border-cyan-500/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 font-mono text-xs mb-3">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>PRACTICAL IMPLEMENTATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Outfit'] tracking-tight">
            Featured <span className="text-cyan-400">Projects</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mt-3 font-light">
            Real-world Data Analytics pipelines and Deep Learning classification systems.
          </p>
          <div className="w-16 h-1 bg-cyan-500 rounded-full mt-4"></div>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project) => {
            const isEstate = project.id === "estate-miner";

            return (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="bg-slate-900/80 border border-cyan-500/25 hover:border-cyan-400 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,242,254,0.2)] flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  {/* Card Banner / Visual Element - Dark Tech Chart / Neural Vector */}
                  <div className="relative h-48 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/40 p-6 flex flex-col justify-between border-b border-cyan-500/20 overflow-hidden">
                    
                    {/* Background Visual Element */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none flex items-center justify-center">
                      {isEstate ? (
                        <div className="w-full h-full p-4 flex items-end justify-between gap-2">
                          <div className="w-full bg-cyan-500/30 h-[40%] rounded-t"></div>
                          <div className="w-full bg-cyan-500/50 h-[70%] rounded-t"></div>
                          <div className="w-full bg-cyan-400 h-[90%] rounded-t"></div>
                          <div className="w-full bg-cyan-500/40 h-[60%] rounded-t"></div>
                        </div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <BrainCircuit className="w-36 h-36 text-cyan-400 animate-pulse" />
                        </div>
                      )}
                    </div>

                    {/* Top Badges Row */}
                    <div className="relative z-10 flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 text-xs font-mono font-medium">
                        {project.category}
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        {project.period}
                      </span>
                    </div>

                    {/* Banner Title */}
                    <div className="relative z-10">
                      <div className="text-xs font-mono text-cyan-400 mb-1">
                        {project.associatedWith}
                      </div>
                      <h3 className="text-2xl font-bold text-white font-['Outfit'] group-hover:text-cyan-300 transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-slate-300 text-xs font-light line-clamp-1">
                        {project.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-6 space-y-4">
                    <p className="text-slate-300 text-sm font-light leading-relaxed line-clamp-3">
                      {project.description}
                    </p>

                    {/* Key Highlights */}
                    <div className="space-y-2 pt-2">
                      <div className="text-xs font-mono text-cyan-400 tracking-wider uppercase">
                        Key Highlights
                      </div>
                      <ul className="space-y-1.5">
                        {project.highlights?.slice(0, 3).map((hl, idx) => (
                          <li key={idx} className="text-slate-300 text-xs flex items-start gap-2">
                            <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                            <span>{hl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies Tag Cloud */}
                    <div className="pt-3 flex flex-wrap gap-1.5">
                      {project.technologies?.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded bg-slate-950 border border-cyan-500/20 text-cyan-300 text-[11px] font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer CTA */}
                <div className="px-6 py-4 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs font-mono text-cyan-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Click to view full architecture & results <ChevronRight className="w-4 h-4" />
                  </span>

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-cyan-300 hover:bg-slate-800 border border-slate-700 transition-colors"
                    title="View GitHub Repository"
                  >
                    <IconGithub className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Modal Drawer */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
            <div className="relative w-full max-w-3xl max-h-[90vh] bg-slate-950 border border-cyan-500/40 rounded-2xl shadow-2xl overflow-y-auto p-6 sm:p-8 space-y-6">
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div>
                <div className="inline-block px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-2">
                  {selectedProject.category}
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit']">
                  {selectedProject.name}
                </h3>
                <p className="text-cyan-400 text-sm font-mono mt-1">
                  {selectedProject.subtitle} • {selectedProject.associatedWith}
                </p>
              </div>

              {/* Project Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                  Project Overview & Approach
                </h4>
                <p className="text-slate-300 text-sm font-light leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              {/* Key Concepts / Highlights */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                  {selectedProject.keyConcepts ? "Key Machine Learning Concepts" : "Key Data Engineering Areas"}
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(selectedProject.keyConcepts || selectedProject.keyAreas)?.map((item, idx) => (
                    <li key={idx} className="p-2.5 rounded-lg bg-slate-900 border border-cyan-500/20 text-xs text-slate-200 font-mono flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Detailed Highlights */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                  Technical Accomplishments
                </h4>
                <div className="space-y-2">
                  {selectedProject.highlights?.map((hl, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-300 leading-relaxed flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-mono text-[10px] shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                  Technologies & Frameworks
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies?.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-lg bg-slate-900 border border-cyan-500/30 text-cyan-300 text-xs font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links Footer */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-slate-900 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500 hover:text-black transition-all text-xs font-mono font-semibold flex items-center gap-2"
                >
                  <IconGithub className="w-4 h-4" />
                  <span>View Repository on GitHub</span>
                </a>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white transition-colors text-xs font-mono"
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
