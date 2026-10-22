import React, { useState } from 'react';
import { Mail, Linkedin, Github, Instagram, FileText, Check, Copy, ExternalLink, Send, Radio, Terminal } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Card3D } from './Card3D';

interface ContactSectionProps {
  onOpenResume?: () => void;
  isReducedMotion?: boolean;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenResume, isReducedMotion = false }) => {
  const { contact, resume } = PORTFOLIO_DATA;
  const [copied, setCopied] = useState<boolean>(false);
  const [subject, setSubject] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${contact.email}?subject=${encodeURIComponent(
      subject || 'Inquiry regarding Software & AI Projects'
    )}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section id="contact" className="py-20 lg:py-28 relative border-b border-slate-900 bg-[#030407]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 text-xs font-mono-cyber text-[#FCEE0A] mb-2">
            <span className="uppercase tracking-widest font-bold">FINAL ZONE // 100%</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400 font-rajdhani uppercase font-semibold">THE LAST TRANSMISSION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-orbitron font-black text-white tracking-tight uppercase">
            CONTACT — <span className="text-[#FCEE0A]">OPEN COMMS CHANNEL</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl font-sans">
            Direct communication frequency for collaborations, research discussion, software development, or student ventures.
          </p>
        </div>

        {/* 2-Column Split: Interactive Comms Dispatcher on Left, Verified Links & Résumé on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Comms Console Form with 3D Tilt */}
          <div className="lg:col-span-7">
            <Card3D
              maxTilt={3.5}
              depth={10}
              isReducedMotion={isReducedMotion}
              className="bg-[#090c14] border-2 border-slate-800 hover:border-[#FCEE0A]/60 transition-colors cyber-chamfer p-6 sm:p-8 shadow-[0_4px_35px_rgba(0,0,0,0.8)]"
            >
              <div className="flex items-center justify-between text-xs font-mono-cyber pb-3 mb-6 border-b border-slate-800 text-slate-400">
                <span className="flex items-center gap-2 text-[#FCEE0A] font-bold font-orbitron">
                  <Radio className="w-3.5 h-3.5 animate-pulse text-[#FCEE0A]" />
                  TRANSMISSION_TERMINAL // PORT_443
                </span>
                <span className="text-white font-mono-cyber text-[10px] bg-[#121622] px-2 py-0.5 rounded-xs border border-slate-700">
                  ENCRYPTION: AES_GCM
                </span>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-orbitron uppercase tracking-wider text-slate-300 mb-2">
                    TRANSMISSION RECIPIENT
                  </label>
                  <div className="flex items-center justify-between p-3 bg-[#05070d] border border-slate-800 rounded font-mono-cyber text-xs text-slate-200">
                    <span className="truncate">{contact.email}</span>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="flex items-center gap-1 text-[#FCEE0A] hover:text-white transition-colors shrink-0 ml-2 font-bold font-mono-cyber"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-[#FCEE0A]" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'COPIED' : 'COPY'}</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="msg-subject" className="block text-xs font-orbitron uppercase tracking-wider text-slate-300 mb-2">
                    MESSAGE SUBJECT / QUERY
                  </label>
                  <input
                    id="msg-subject"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Project inquiry, civic research, or hackathon collaboration"
                    className="w-full px-3.5 py-2.5 bg-[#05070d] border border-slate-800 focus:border-[#FCEE0A] rounded text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-[#FCEE0A] transition-all font-sans"
                  />
                </div>

                <div>
                  <label htmlFor="msg-body" className="block text-xs font-orbitron uppercase tracking-wider text-slate-300 mb-2">
                    DISPATCH CONTENT
                  </label>
                  <textarea
                    id="msg-body"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message here. Clicking dispatch will open your default email client with your message prepared..."
                    className="w-full px-3.5 py-2.5 bg-[#05070d] border border-slate-800 focus:border-[#FCEE0A] rounded text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-[#FCEE0A] transition-all font-sans"
                  />
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                  <span className="text-[11px] font-mono-cyber text-slate-400">
                    Standard mailto protocol transmitter
                  </span>

                  <button
                    type="submit"
                    className="cyber-chamfer-sm px-6 py-3 bg-[#FCEE0A] hover:bg-white text-black font-orbitron font-extrabold text-xs uppercase tracking-widest flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(252,238,10,0.35)] hover:shadow-[0_0_30px_rgba(252,238,10,0.6)] active:scale-95"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>TRANSMIT DISPATCH →</span>
                  </button>
                </div>
              </form>
            </Card3D>
          </div>

          {/* Right Column: Verified Channels & Résumé Dossier */}
          <div className="lg:col-span-5 space-y-6">
            {/* Verified Network Links */}
            <div className="bg-[#090c14] border border-slate-800 cyber-chamfer p-6 sm:p-7 shadow-[0_4px_25px_rgba(0,0,0,0.7)]">
              <h3 className="text-xs font-orbitron uppercase tracking-widest text-[#FCEE0A] mb-4 pb-3 border-b border-slate-800 font-bold">
                VERIFIED NETWORK CHANNELS
              </h3>

              <div className="space-y-3">
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center justify-between p-3 bg-[#0d101a] hover:bg-[#161c2a] border border-slate-800 hover:border-[#FCEE0A] rounded-sm transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#FCEE0A]" />
                    <div>
                      <div className="text-xs font-orbitron font-bold text-white group-hover:text-[#FCEE0A] transition-colors">
                        Email Channel
                      </div>
                      <div className="text-[11px] font-mono-cyber text-slate-400">{contact.email}</div>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#FCEE0A]" />
                </a>

                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-[#0d101a] hover:bg-[#161c2a] border border-slate-800 hover:border-[#FCEE0A] rounded-sm transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Linkedin className="w-4 h-4 text-[#FCEE0A]" />
                    <div>
                      <div className="text-xs font-orbitron font-bold text-white group-hover:text-[#FCEE0A] transition-colors">
                        LinkedIn Profile
                      </div>
                      <div className="text-[11px] font-mono-cyber text-slate-400">rophe-angel-b8a051370</div>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#FCEE0A]" />
                </a>

                <a
                  href={contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-[#0d101a] hover:bg-[#161c2a] border border-slate-800 hover:border-[#FCEE0A] rounded-sm transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Github className="w-4 h-4 text-[#FCEE0A]" />
                    <div>
                      <div className="text-xs font-orbitron font-bold text-white group-hover:text-[#FCEE0A] transition-colors">
                        GitHub Organization
                      </div>
                      <div className="text-[11px] font-mono-cyber text-slate-400">ropheangel1312-design</div>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#FCEE0A]" />
                </a>

                <a
                  href={contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-[#0d101a] hover:bg-[#161c2a] border border-slate-800 hover:border-[#FCEE0A] rounded-sm transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Instagram className="w-4 h-4 text-white" />
                    <div>
                      <div className="text-xs font-orbitron font-bold text-white group-hover:text-[#FCEE0A] transition-colors">
                        Instagram Transmission
                      </div>
                      <div className="text-[11px] font-mono-cyber text-slate-400">@rophe.sys</div>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#FCEE0A]" />
                </a>
              </div>
            </div>

            {/* Official Résumé Asset Box */}
            <div className="bg-[#090c14] border-2 border-[#FCEE0A]/40 cyber-chamfer p-6 shadow-[0_0_25px_rgba(252,238,10,0.15)]">
              <div className="flex items-center justify-between text-xs font-mono-cyber pb-2 mb-3 border-b border-slate-800 text-slate-300">
                <span className="text-[#FCEE0A] font-bold font-orbitron flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  AUTHENTICATED DOSSIER
                </span>
                <span className="text-white font-bold bg-[#121622] px-2 py-0.5 rounded-xs border border-slate-700">
                  PDF (~131 KB)
                </span>
              </div>

              <h4 className="text-lg font-orbitron font-bold text-white mb-2">
                Rophe Angel — Engineering Curriculum Vitae
              </h4>

              <p className="text-xs text-slate-300 leading-relaxed font-sans mb-4">
                Verified résumé file retrieved directly from the V1 portfolio repository. Contains complete educational coursework, project milestones, and technical competencies.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={resume.downloadPath}
                  download="Rophe_Angel_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cyber-chamfer-sm px-4 py-2.5 bg-[#FCEE0A] hover:bg-white text-black font-orbitron font-extrabold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-[0_0_20px_rgba(252,238,10,0.3)] active:scale-95"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>DOWNLOAD PDF</span>
                </a>

                {onOpenResume && (
                  <button
                    onClick={onOpenResume}
                    className="cyber-chamfer-sm px-4 py-2.5 bg-[#121622] hover:bg-[#1a2030] border border-slate-700 text-xs font-orbitron font-bold text-slate-200 hover:text-white transition-colors"
                  >
                    PREVIEW IN BROWSER
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
