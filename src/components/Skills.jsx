import { useState } from "react";
import { Cpu, Database, Brain, Wrench, CheckCircle2, Layers } from "lucide-react";

export default function Skills({ skills = [], skillsCategorized = {} }) {
  const dsSkills = skillsCategorized?.dataScience || skills.slice(0, 10);
  const mlSkills = skillsCategorized?.machineLearning || skills.slice(10, 16);
  const dlSkills = skillsCategorized?.deepLearningAI || skills.slice(16, 23);
  const toolsSkills = skillsCategorized?.toolsDeployment || skills.slice(23);

  const categories = [
    {
      id: "ds",
      title: "DATA SCIENCE",
      icon: Database,
      badge: "Analytics & Exploration",
      skills: dsSkills.length > 0 ? dsSkills : skills,
      description: "Data manipulation, statistical analysis, data cleaning, and exploratory visualization.",
    },
    {
      id: "ml",
      title: "MACHINE LEARNING",
      icon: Cpu,
      badge: "Predictive Modeling",
      skills: mlSkills,
      description: "Supervised and unsupervised algorithms, feature engineering, and model evaluation.",
    },
    {
      id: "dl",
      title: "DEEP LEARNING & AI",
      icon: Brain,
      badge: "Neural Nets & GenAI",
      skills: dlSkills,
      description: "Convolutional neural networks, transfer learning, computer vision, and LLM architectures.",
    },
    {
      id: "tools",
      title: "TOOLS & DEPLOYMENT",
      icon: Wrench,
      badge: "MLOps & Engineering",
      skills: toolsSkills,
      description: "Version control, automated web scraping, Streamlit deployment, and MLOps tools.",
    },
  ];

  return (
    <section id="skills" className="py-20 bg-[#030014] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 font-mono text-xs mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>TECHNICAL CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Outfit'] tracking-tight">
            Skills & <span className="text-cyan-400">Specializations</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mt-3 font-light">
            Structured expertise bridging Data Science analytics and Machine Learning engineering.
          </p>
          <div className="w-16 h-1 bg-cyan-500 rounded-full mt-4"></div>
        </div>

        {/* Dual Identity Focus Banner */}
        <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-cyan-500/30 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 text-cyan-500/10 group-hover:text-cyan-500/20 transition-colors">
              <Database className="w-24 h-24" />
            </div>
            <div className="relative z-10 space-y-2">
              <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase">CORE IDENTITY I</span>
              <h3 className="text-2xl font-bold text-white font-['Outfit']">Data Science Practitioner</h3>
              <p className="text-slate-400 text-xs sm:text-sm font-light">
                Extracting high-value insights, conducting robust EDA, constructing data pipelines, and transforming raw datasets into decision-ready analytics.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-cyan-500/30 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 text-cyan-500/10 group-hover:text-cyan-500/20 transition-colors">
              <Cpu className="w-24 h-24" />
            </div>
            <div className="relative z-10 space-y-2">
              <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase">CORE IDENTITY II</span>
              <h3 className="text-2xl font-bold text-white font-['Outfit']">Machine Learning Engineer</h3>
              <p className="text-slate-400 text-xs sm:text-sm font-light">
                Engineering predictive models, training deep learning neural networks, fine-tuning pretrained CNNs, and deploying live Streamlit web apps.
              </p>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat) => {
            const Icon = cat.icon;
            if (!cat.skills || cat.skills.length === 0) return null;

            return (
              <div
                key={cat.id}
                className="bg-slate-900/70 border border-cyan-500/20 hover:border-cyan-400/60 rounded-2xl p-6 sm:p-8 backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,242,254,0.15)] flex flex-col justify-between group"
              >
                <div>
                  {/* Category Card Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(0,242,254,0.3)] transition-all">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white font-['Outfit'] tracking-wide">
                          {cat.title}
                        </h3>
                        <span className="text-xs font-mono text-cyan-400/80">{cat.badge}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-400 text-xs font-light mb-6 border-b border-slate-800 pb-4">
                    {cat.description}
                  </p>

                  {/* Skill Badges Pills */}
                  <div className="flex flex-wrap gap-2.5">
                    {cat.skills.map((skill) => (
                      <div
                        key={skill}
                        className="px-3.5 py-2 rounded-xl bg-slate-950 border border-cyan-500/20 text-slate-200 text-xs font-mono font-medium hover:border-cyan-400 hover:text-cyan-300 hover:shadow-[0_0_12px_rgba(0,242,254,0.2)] transition-all duration-200 flex items-center gap-2"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="w-full h-1 bg-gradient-to-r from-cyan-500/20 via-cyan-400/50 to-transparent rounded-full mt-6 opacity-40 group-hover:opacity-100 transition-opacity" />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
