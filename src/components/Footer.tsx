import React from 'react';
import { ArrowUp, Github, Linkedin, Instagram, Mail } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface FooterProps {
  onReplayIntro?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onReplayIntro }) => {
  const { contact } = PORTFOLIO_DATA;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#030406] border-t border-slate-900 py-12 text-slate-400 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-900">
          {/* Brand Wordmark & Discipline */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-center sm:text-left">
            <span className="text-base font-orbitron font-black text-white tracking-widest">
              ROPHE<span className="text-[#FCEE0A]">.SYS</span>
            </span>
            <span className="hidden sm:inline text-slate-700">·</span>
            <span className="text-xs font-mono-cyber text-slate-400">
              Computer Science & Engineering Student · Night City Overdrive
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-xs font-rajdhani font-bold uppercase tracking-wider text-slate-300">
            <a href="#projects" className="hover:text-[#FCEE0A] transition-colors">Gigs</a>
            <a href="#research" className="hover:text-[#FCEE0A] transition-colors">Archive</a>
            <a href="#wips" className="hover:text-[#FCEE0A] transition-colors">Operations</a>
            <a href="#experience" className="hover:text-[#FCEE0A] transition-colors">Tactical</a>
            <a href="#about" className="hover:text-[#FCEE0A] transition-colors">Identity</a>
            <a href="#contact" className="hover:text-[#FCEE0A] transition-colors">Contact</a>
          </nav>

          {/* Social Icons & Back to top */}
          <div className="flex items-center gap-4">
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-[#FCEE0A] transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-[#FCEE0A] transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="text-slate-400 hover:text-[#FCEE0A] transition-colors"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              className="p-2 rounded bg-[#0a0d16] hover:bg-[#121826] text-slate-400 hover:text-[#FCEE0A] border border-slate-800 transition-colors ml-2"
              title="Return to top of page"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quiet Copyright Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono-cyber text-slate-500 gap-3">
          <p>
            © {new Date().getFullYear()} Rophe Angel. Built with TypeScript, React, and Tailwind CSS.
          </p>

          <div className="flex items-center gap-3">
            {onReplayIntro && (
              <button
                onClick={onReplayIntro}
                className="hover:text-[#FCEE0A] underline transition-colors"
              >
                Replay System Breach Intro
              </button>
            )}
            <span>·</span>
            <span className="text-slate-400">All credentials & project records authenticated</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
