import { useState } from "react";
import { Mail, Phone, MapPin, Download, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

function IconGithub({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function IconLinkedin({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function Contact({ profile }) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // { type: 'success' | 'error', text: '' }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status) setStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus({ type: "success", text: "Thank you! Your message has been sent successfully." });
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus({ type: "error", text: data.error || "Failed to send message. Please try again." });
      }
    } catch (err) {
      console.error("Contact Form Error:", err);
      setStatus({ type: "error", text: "Network error occurred. Please try emailing directly." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-[#070712] border-t border-cyan-500/10 relative overflow-hidden">
      {/* Radial Background Accent Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 font-mono text-xs mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>LET'S CONNECT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Outfit'] tracking-tight">
            Get in <span className="text-cyan-400">Touch</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mt-3 font-light">
            Open to Machine Learning Engineering, Data Science roles, research collaborations, and internships.
          </p>
          <div className="w-16 h-1 bg-cyan-500 rounded-full mt-4"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Contact Cards Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900/70 border border-cyan-500/20 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-xl space-y-6">
              <h3 className="text-xl font-bold text-white font-['Outfit'] border-b border-slate-800 pb-4">
                Direct Contact Information
              </h3>

              {/* Email Card */}
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(0,242,254,0.15)] transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-lg bg-cyan-950 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 transition-all shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-mono text-slate-400 uppercase">Email Address</div>
                  <div className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors truncate">
                    {profile.email}
                  </div>
                </div>
              </a>

              {/* Phone Card */}
              <a
                href={`tel:${profile.phone}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(0,242,254,0.15)] transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-lg bg-cyan-950 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 transition-all shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400 uppercase">Phone / WhatsApp</div>
                  <div className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                    {profile.phone}
                  </div>
                </div>
              </a>

              {/* Location Card */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="w-10 h-10 rounded-lg bg-cyan-950 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400 uppercase">Base Location</div>
                  <div className="text-sm font-semibold text-white">
                    {profile.location}
                  </div>
                </div>
              </div>

              {/* Social Profiles Grid */}
              <div className="pt-4 border-t border-slate-800 space-y-3">
                <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                  Social & Code Repositories
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-slate-950 border border-cyan-500/20 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 font-mono text-xs flex items-center gap-2 transition-all duration-200"
                  >
                    <IconGithub className="w-4 h-4 text-cyan-400" />
                    <span>GitHub Profile</span>
                  </a>

                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-slate-950 border border-cyan-500/20 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 font-mono text-xs flex items-center gap-2 transition-all duration-200"
                  >
                    <IconLinkedin className="w-4 h-4 text-cyan-400" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>

              {/* Download CV Banner */}
              <div className="pt-2">
                <a
                  href={profile.cv}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold font-['Outfit'] text-sm hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-[0_0_20px_rgba(0,242,254,0.3)]"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Complete CV (Google Drive)</span>
                </a>
              </div>

            </div>
          </div>

          {/* Right Contact Form Column */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="bg-slate-900/70 border border-cyan-500/20 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-xl space-y-6"
            >
              <h3 className="text-xl font-bold text-white font-['Outfit'] border-b border-slate-800 pb-4">
                Send a Message
              </h3>

              {status && (
                <div
                  className={`p-4 rounded-xl text-xs font-mono flex items-center gap-3 border ${
                    status.type === "success"
                      ? "bg-emerald-950/80 border-emerald-500/40 text-emerald-300"
                      : "bg-rose-950/80 border-rose-500/40 text-rose-300"
                  }`}
                >
                  {status.type === "success" ? (
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 shrink-0" />
                  )}
                  <span>{status.text}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-300 uppercase">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm font-mono transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-300 uppercase">Your Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="s.jenkins@techcorp.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm font-mono transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-300 uppercase">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Hi Amir, we saw your Machine Learning & Data Science portfolio and would love to discuss a role..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm font-mono transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-cyan-500 text-black font-extrabold font-['Outfit'] text-sm tracking-wider hover:bg-cyan-400 transition-all duration-300 shadow-[0_0_20px_rgba(0,242,254,0.3)] flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Transmitting Message...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

        {/* Footer Copyright */}
        <div className="mt-20 pt-8 border-t border-slate-800/80 text-center text-xs font-mono text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} <span className="text-cyan-400 font-semibold">{profile.name}</span>. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a href="#hero" className="hover:text-cyan-400 transition-colors">Back to Top ↑</a>
          </div>
        </div>

      </div>
    </section>
  );
}
