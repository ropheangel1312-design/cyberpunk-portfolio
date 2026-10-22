import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, Terminal, Activity, ShieldAlert } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { ZoneInfo } from '../utils/useZoneProgression';

interface NavbarProps {
  currentZone: ZoneInfo;
  scrollPercent: number;
  onOpenTerminal?: () => void;
  onOpenResume?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentZone,
  scrollPercent,
  onOpenTerminal,
  onOpenResume
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Gigs', href: '#projects' },
    { label: 'Archive', href: '#research' },
    { label: 'Operations', href: '#wips' },
    { label: 'Tactical', href: '#experience' },
    { label: 'Identity', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#050508]/95 backdrop-blur-md border-b border-slate-800 shadow-[0_4px_30px_rgba(0,0,0,0.85)] py-2.5'
          : 'bg-transparent border-b border-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6">
          {/* Zone 1: Brand Wordmark & Active Zone HUD Flag */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#"
              className="flex items-center gap-2 text-base sm:text-lg font-orbitron font-extrabold tracking-widest text-white uppercase group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FCEE0A]"
            >
              <span className="w-2.5 h-2.5 bg-[#FCEE0A] rotate-45 shadow-[0_0_10px_#FCEE0A] group-hover:scale-125 transition-transform" />
              <span>ROPHE<span className="text-[#FCEE0A]">.SYS</span></span>
            </a>

            {/* Persistent Evolving HUD Zone Indicator */}
            <div className="hidden lg:flex items-center gap-2 pl-3 border-l border-slate-800 text-[11px] font-mono-cyber">
              <span className="text-[#FCEE0A] font-bold">
                {currentZone.code}
              </span>
              <span className="text-slate-600">/</span>
              <span className="text-slate-300 uppercase tracking-wider font-rajdhani font-semibold">
                {currentZone.name}
              </span>
              <span className="text-slate-600">·</span>
              <span
                className="text-[10px] px-1.5 py-0.2 rounded-xs font-bold"
                style={{
                  backgroundColor: currentZone.status === 'CRITICAL' ? '#FF1744' : '#161d2a',
                  color: currentZone.status === 'CRITICAL' ? '#FFFFFF' : '#FCEE0A',
                  border: `1px solid ${currentZone.alertColor}`
                }}
              >
                {scrollPercent}% INSTABILITY
              </span>
            </div>
          </div>

          {/* Zone 2: Concise Nav Links (Single-line, unboxed, hover acid yellow underline) */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-tech font-bold uppercase tracking-widest text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="whitespace-nowrap shrink-0 hover:text-[#FCEE0A] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#FCEE0A] hover:after:w-full after:transition-all after:duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 Primary Action + Terminal Utility */}
          <div className="flex items-center gap-3 shrink-0">
            {onOpenTerminal && (
              <button
                onClick={onOpenTerminal}
                className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono-cyber text-slate-300 hover:text-[#FCEE0A] bg-[#0c101a] hover:bg-[#141b2a] border border-slate-700/80 rounded transition-colors whitespace-nowrap shrink-0 shadow-sm"
                title="Toggle Cyber Terminal (Ctrl+`)"
                aria-label="Open Net Terminal"
              >
                <Terminal className="w-3.5 h-3.5 text-[#FCEE0A]" />
                <span className="font-semibold">TERMINAL</span>
              </button>
            )}

            {/* Primary Action Button: Résumé PDF */}
            <a
              href={PORTFOLIO_DATA.resume.downloadPath}
              download="Rophe_Angel_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                if (onOpenResume) {
                  e.preventDefault();
                  onOpenResume();
                }
              }}
              className="cyber-chamfer-sm flex items-center gap-1.5 px-4 py-2 text-xs font-orbitron font-extrabold text-black bg-[#FCEE0A] hover:bg-white transition-all whitespace-nowrap shrink-0 shadow-[0_0_20px_rgba(252,238,10,0.35)] hover:shadow-[0_0_25px_rgba(252,238,10,0.6)] focus:outline-none focus:ring-2 focus:ring-[#FCEE0A]"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>RÉSUMÉ PDF</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-[#FCEE0A] hover:bg-slate-900 rounded focus:outline-none focus:ring-2 focus:ring-[#FCEE0A]"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#FCEE0A]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#090b12] border-b border-slate-800 px-4 pt-3 pb-5 space-y-2 font-mono-cyber text-sm">
          <div className="p-2 mb-2 bg-[#05060a] border border-[#FCEE0A]/30 rounded text-xs text-[#FCEE0A] flex items-center justify-between">
            <span>{currentZone.code}: {currentZone.name}</span>
            <span>{scrollPercent}%</span>
          </div>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-slate-300 hover:text-[#FCEE0A] hover:bg-slate-900 rounded transition-colors whitespace-nowrap font-rajdhani font-bold text-base"
            >
              {link.label}
            </a>
          ))}
          {onOpenTerminal && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTerminal();
              }}
              className="w-full text-left flex items-center gap-2 px-3 py-2 text-[#FCEE0A] hover:bg-slate-900 rounded text-xs font-mono-cyber"
            >
              <Terminal className="w-4 h-4" />
              <span>Launch Terminal Console</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
};
