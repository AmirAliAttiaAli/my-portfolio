import { User, Sparkles, Target, BookOpen, Award, Check } from "lucide-react";

export default function About({ profile, stats }) {
  return (
    <section id="about" className="py-20 bg-[#070712] border-y border-cyan-500/10 relative overflow-hidden">
      {/* Background Accent Glow */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 font-mono text-xs mb-3">
            <User className="w-3.5 h-3.5" />
            <span>BACKGROUND & VISION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Outfit'] tracking-tight">
            About <span className="text-cyan-400">Me</span>
          </h2>
          <div className="w-16 h-1 bg-cyan-500 rounded-full mt-3"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Narrative Card */}
          <div className="lg:col-span-7 bg-slate-900/60 border border-cyan-500/20 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-xl space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold text-white font-['Outfit'] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span>Building Impactful AI Solutions</span>
            </h3>

            <p className="text-slate-300 text-base leading-relaxed font-light">
              Passionate about building AI solutions that solve real-world problems. I'm a Computer Science student, Machine Learning Engineer, and Data Science Instructor with hands-on experience in Machine Learning, Deep Learning, Data Analytics, and Generative AI. Through internships, technical programs, and teaching, I've developed practical experience in designing data-driven solutions, building predictive models, and mentoring aspiring data professionals.
            </p>

            <p className="text-slate-300 text-base leading-relaxed font-light">
              My journey includes experience with <span className="text-cyan-300 font-medium">DEPI</span>, <span className="text-cyan-300 font-medium">NTI</span>, <span className="text-cyan-300 font-medium">Orange Digital Center</span>, <span className="text-cyan-300 font-medium">ITI</span>, <span className="text-cyan-300 font-medium">GDG on Campus Al-Azhar</span>, and <span className="text-cyan-300 font-medium">iSchool</span>, where I've worked on real projects and collaborated with talented teams. I'm passionate about continuous learning, sharing knowledge, and applying AI to create measurable impact.
            </p>

            {/* Areas of Interest Grid */}
            <div className="pt-4 border-t border-slate-800">
              <div className="text-xs font-mono text-cyan-400 tracking-wider uppercase mb-3 flex items-center gap-2">
                <Target className="w-4 h-4" />
                <span>Areas of Interest</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.areasOfInterest?.map((area) => (
                  <span
                    key={area}
                    className="px-3 py-1.5 rounded-lg bg-slate-950 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-medium hover:border-cyan-400 hover:bg-cyan-950/40 transition-all duration-200 flex items-center gap-1.5 shadow-[0_0_10px_rgba(6,182,212,0.1)]"
                  >
                    <Check className="w-3 h-3 text-cyan-400" />
                    {area}
                  </span>
                ))}
              </div>
            </div>

            {/* Career Openness Footer */}
            <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-slate-300 text-xs sm:text-sm font-light">
              I'm always open to internships, collaborations, research opportunities, and full-time roles in AI and Machine Learning.
            </div>
          </div>

          {/* Right Metrics Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stats?.map((stat, idx) => (
              <div
                key={idx}
                className="bg-slate-900/80 border border-cyan-500/20 hover:border-cyan-400 rounded-xl p-6 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,242,254,0.15)] group flex flex-col justify-between"
              >
                <div className="text-cyan-400 text-xs font-mono mb-2 tracking-wider uppercase">
                  {stat.label}
                </div>
                <div className="text-xl sm:text-2xl font-black text-white font-['Outfit'] group-hover:text-cyan-300 transition-colors">
                  {stat.value}
                </div>
                <div className="w-8 h-0.5 bg-cyan-500/30 group-hover:w-full transition-all duration-300 mt-4" />
              </div>
            ))}
            
            {/* Highlight Banner */}
            <div className="sm:col-span-2 bg-gradient-to-br from-slate-900 to-slate-950 border border-cyan-500/30 rounded-xl p-6 relative overflow-hidden">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-base font-['Outfit']">Data Science Instructor</h4>
                  <p className="text-slate-400 text-xs font-light mt-1">
                    Teaching & mentoring aspiring data professionals across GDG Al-Azhar, DECI, & iSchool initiatives.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
