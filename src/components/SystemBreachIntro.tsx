import React, { useState, useEffect } from 'react';
import { FastForward, ShieldAlert, Cpu, Terminal, Zap } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface SystemBreachIntroProps {
  onComplete: () => void;
  onTriggerAudio?: () => void;
}

export const SystemBreachIntro: React.FC<SystemBreachIntroProps> = ({ onComplete, onTriggerAudio }) => {
  const [phase, setPhase] = useState<number>(0);
  const [progress, setProgress] = useState<number>(14);
  const [logLines, setLogLines] = useState<string[]>([
    'TERMINAL_STARTUP: Initializing Night City Subnet // Node: SANTO DOMINGO...',
    'PING: Arasaka ICE Relays [DETECTED]'
  ]);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const [hasFlash, setHasFlash] = useState<boolean>(false);

  useEffect(() => {
    // Check reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      onComplete();
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onComplete]);

  useEffect(() => {
    // Stage 1: Terminal startup & subject target (0 - 1000ms)
    const t1 = setTimeout(() => {
      setPhase(1);
      setProgress(42);
      setLogLines(prev => [
        ...prev,
        'SUBJECT: ROPHE // CLASSIFICATION: ANOMALY',
        'BIOMETRIC FEED: Synced · CSE Core Online'
      ]);
    }, 900);

    // Stage 2: Signal interruption & sharp acid-yellow flash (1800ms)
    const tFlash = setTimeout(() => {
      setHasFlash(true);
      setTimeout(() => setHasFlash(false), 120);
    }, 1800);

    // Stage 3: Layered 3D breach reveal (1800 - 3200ms)
    const t2 = setTimeout(() => {
      setPhase(2);
      setProgress(79);
      setLogLines(prev => [
        ...prev,
        'BREACH PROTOCOL ENGAGED: ICE Barrier Nullified...',
        'NETWORK: ROPHE.SYS OVERDRIVE INITIALIZED'
      ]);
    }, 2000);

    // Stage 4: System Unlocked / Title Sequence (3200 - 4200ms)
    const t3 = setTimeout(() => {
      setPhase(3);
      setProgress(100);
      setLogLines(prev => [
        ...prev,
        'ACCESS AUTHORIZED: Entering Night City Network.'
      ]);
      if (onTriggerAudio) {
        onTriggerAudio();
      }
    }, 3400);

    // Final seamless transition into portfolio (4400ms)
    const t4 = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        onComplete();
      }, 450);
    }, 4400);

    return () => {
      clearTimeout(t1);
      clearTimeout(tFlash);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete, onTriggerAudio]);

  const handleSkip = () => {
    setIsFadingOut(true);
    if (onTriggerAudio) onTriggerAudio();
    setTimeout(() => {
      onComplete();
    }, 200);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#050508] text-slate-100 transition-opacity duration-500 overflow-hidden ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="System Breach Introductory Sequence"
    >
      {/* Background Cyber Grid & Vignette */}
      <div className="absolute inset-0 cyber-grid opacity-35" />
      <div className="absolute inset-0 bg-radial from-transparent via-[#050508]/80 to-[#050508]" />
      <div className="absolute inset-0 scanlines opacity-30 pointer-events-none" />

      {/* Acid Yellow Breach Flash Screen */}
      {hasFlash && (
        <div className="absolute inset-0 bg-[#FCEE0A] z-40 opacity-80 pointer-events-none transition-opacity duration-150" />
      )}

      {/* Skip Button Top Right (Always visible, prominent, functional) */}
      <div className="absolute top-6 right-6 z-30">
        <button
          onClick={handleSkip}
          className="cyber-chamfer-sm flex items-center gap-2 px-4 py-2 bg-[#0c101a] hover:bg-[#162035] border border-[#FCEE0A] text-[#FCEE0A] hover:text-white text-xs font-mono-cyber font-bold tracking-wider transition-all duration-200 shadow-[0_0_20px_rgba(252,238,10,0.3)] focus:outline-none focus:ring-2 focus:ring-[#FCEE0A]"
        >
          <span>SKIP BREACH</span>
          <span className="text-[10px] text-black bg-[#FCEE0A] px-1.5 py-0.5 rounded-xs font-bold">ESC</span>
          <FastForward className="w-3.5 h-3.5 ml-0.5" />
        </button>
      </div>

      {/* Main Breach Modal Container */}
      <div className="relative z-10 w-full max-w-4xl mx-4 sm:mx-6 p-6 sm:p-8 bg-[#090b12]/95 border-2 border-[#FCEE0A] shadow-[0_0_60px_rgba(252,238,10,0.25)] cyber-chamfer">
        {/* Header HUD Bar */}
        <div className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 text-xs font-mono-cyber">
          <div className="flex items-center gap-2 text-[#FCEE0A]">
            <Terminal className="w-4 h-4 animate-pulse" />
            <span className="font-orbitron font-bold tracking-widest">ROPHE.SYS // SYSTEM BREACH</span>
          </div>
          <div className="flex items-center gap-3 text-slate-400">
            <span className="text-white font-rajdhani font-semibold">SUBJECT: ROPHE</span>
            <span className="text-slate-600">|</span>
            <span className="text-[#FCEE0A] font-bold">CLASSIFICATION: ANOMALY</span>
          </div>
        </div>

        {/* Content Split: Character Art & Terminal Telemetry */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Character Art Preview with 3D Depth Zoom */}
          <div className="md:col-span-5 flex justify-center">
            <div
              className={`relative w-56 sm:w-64 aspect-[3/4] bg-[#0c101a] border-2 border-[#FCEE0A] overflow-hidden cyber-chamfer-sm group shadow-[0_0_30px_rgba(252,238,10,0.3)] transition-transform duration-700 ${
                phase >= 2 ? 'scale-100 rotate-0' : 'scale-95 -rotate-1'
              }`}
            >
              {/* Character Image */}
              <img
                src={PORTFOLIO_DATA.hero.characterImage.localUrl}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = PORTFOLIO_DATA.hero.characterImage.url;
                }}
                alt="Rophe Angel - Neon Mercenary"
                className={`w-full h-full object-cover object-top transition-all duration-700 ${
                  phase >= 1 ? 'filter-none' : 'filter brightness-40 contrast-150 blur-[1px]'
                }`}
              />

              {/* Scanning Laser Line */}
              <div
                className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#FCEE0A] to-transparent animate-bounce opacity-90 shadow-[0_0_10px_#FCEE0A]"
                style={{ animationDuration: '1.8s' }}
              />

              {/* Corner HUD Reticles */}
              <div className="absolute top-2 left-2 text-[9px] font-mono-cyber text-[#FCEE0A] bg-black/80 px-1.5 py-0.5 border border-[#FCEE0A]/40 font-bold">
                ICE: BYPASS_ACTIVE
              </div>
              <div className="absolute bottom-2 right-2 text-[9px] font-mono-cyber text-white bg-black/80 px-1.5 py-0.5 border border-slate-700">
                SUBJECT: ROPHE
              </div>
            </div>
          </div>

          {/* Terminal Readout & Title Presentation */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-mono-cyber text-[#FCEE0A] font-bold tracking-widest flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#FCEE0A]" />
                  HOSTILE NETWORK PENETRATION // SANTO DOMINGO
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-orbitron font-black text-white tracking-tight">
                ROPHE<span className="text-[#FCEE0A]">.SYS</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 font-rajdhani font-semibold tracking-wider uppercase">
                Computer Science & Engineering Undergrad · Applied AI · Builder
              </p>
            </div>

            {/* Diagnostic Log Lines */}
            <div className="bg-[#05070c] border border-slate-800 p-3.5 rounded font-mono-cyber text-[11px] space-y-1 h-32 overflow-y-auto text-slate-300">
              {logLines.map((line, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-[#FCEE0A] select-none font-bold">&gt;</span>
                  <span className={line.includes('AUTHORIZED') || line.includes('ROPHE.SYS') ? 'text-[#FCEE0A] font-bold' : line.includes('ANOMALY') ? 'text-white font-semibold' : 'text-slate-300'}>
                    {line}
                  </span>
                </div>
              ))}
            </div>

            {/* Breach Progress Bar */}
            <div className="space-y-1.5 font-mono-cyber">
              <div className="flex justify-between text-xs font-rajdhani tracking-wider">
                <span className="text-slate-400">BREACH SYNCHRONIZATION // ICE STATUS</span>
                <span className="text-[#FCEE0A] font-bold font-mono-cyber">{progress}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-900 border border-slate-700 rounded-xs overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#FCEE0A] via-[#FFEE55] to-white transition-all duration-300 ease-out shadow-[0_0_15px_#FCEE0A]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Manual Enter Button */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={handleSkip}
                className="w-full sm:w-auto px-6 py-3 bg-[#FCEE0A] hover:bg-white text-black font-orbitron font-extrabold text-xs uppercase tracking-widest cyber-chamfer-sm transition-all shadow-[0_0_25px_rgba(252,238,10,0.5)] active:scale-95"
              >
                ENTER NIGHT CITY OVERDRIVE →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
