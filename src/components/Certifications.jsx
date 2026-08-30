import { useState } from "react";
import { Award, Calendar, CheckCircle2, ExternalLink, ShieldCheck, X } from "lucide-react";

export default function Certifications({ certifications }) {
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <section id="certifications" className="py-20 bg-[#030014] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 font-mono text-xs mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>VERIFIED CREDENTIALS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Outfit'] tracking-tight">
            Professional <span className="text-cyan-400">Certifications</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mt-3 font-light">
            Technical certifications validating skills in cloud computing, data engineering, and AI.
          </p>
          <div className="w-16 h-1 bg-cyan-500 rounded-full mt-4"></div>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {certifications.map((cert, idx) => (
            <div
              key={cert.id || idx}
              className="bg-slate-900/80 border border-cyan-500/25 hover:border-cyan-400 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-xl transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,242,254,0.15)] flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-950 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(0,242,254,0.3)] transition-all shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-slate-400 font-mono text-xs flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-cyan-400" />
                    {cert.period || `${cert.issueMonth || ""} ${cert.issueYear || ""}`}
                  </span>
                </div>

                <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
                  {cert.issuer}
                </div>
                <h3 className="text-xl font-bold text-white font-['Outfit'] group-hover:text-cyan-300 transition-colors">
                  {cert.name}
                </h3>

                <p className="text-slate-300 text-xs font-light leading-relaxed mt-3 border-t border-slate-800 pt-3">
                  {cert.description || "Verified technical credential covering cloud computing infrastructure, security, data management, and AI services."}
                </p>
              </div>

              {/* View Certificate Image Modal Trigger */}
              {cert.image && (
                <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold cursor-pointer"
                  >
                    <span>View Certificate</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Certificate Image Modal */}
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
            <div className="relative bg-slate-950 border border-cyan-500/40 rounded-2xl p-4 sm:p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto space-y-4">
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-white font-bold font-['Outfit'] text-lg">
                {selectedCert.name} - {selectedCert.issuer}
              </div>

              <div className="rounded-xl overflow-hidden border border-cyan-500/20 bg-black flex items-center justify-center">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.name}
                  className="w-full max-h-[70vh] object-contain"
                />
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
