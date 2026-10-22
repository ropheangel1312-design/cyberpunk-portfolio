import React, { useState, useEffect, useRef } from 'react';
import { X, Terminal as TerminalIcon, CornerDownLeft } from 'lucide-react';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateSection?: (sectionId: string) => void;
}

export const TerminalModal: React.FC<TerminalModalProps> = ({
  isOpen,
  onClose,
  onNavigateSection
}) => {
  const [input, setInput] = useState<string>('');
  const [history, setHistory] = useState<string[]>([
    'ROPHE.SYS TERMINAL // OVERDRIVE KERNEL V2.4',
    'HOST: ARASAKA NETLINK // RELAY: SANTO DOMINGO',
    'TYPE "help" TO DISPLAY DIRECTIVE PARAMETERS.'
  ]);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        onClose();
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCommand = (cmdText: string) => {
    const trimmed = cmdText.trim().toLowerCase();
    if (!trimmed) return;

    const newHistory = [...history, `ROPHE.SYS > ${cmdText}`];

    if (trimmed === 'help') {
      newHistory.push(
        'AVAILABLE COMMAND DIRECTIVES:',
        '  help              - Display this directive index',
        '  ls                - Query all mission nodes and classified archives',
        '  goto <sector>     - Navigate: projects, research, wips, experience, about, contact',
        '  cat resume        - Inspect verified curriculum vitae overview & download',
        '  clear             - Flush terminal buffer',
        '  status            - Probe system integrity and breach state',
        '  exit              - Disengage terminal console'
      );
    } else if (trimmed === 'ls') {
      newHistory.push(
        'MISSION DOSSIERS [ZONE 02]:',
        '  [GIG-01] HUSH          - Spotify web audio engine (Local experiment)',
        '  [GIG-02] THADAM        - Civic fund anomaly audit (HuggingFace Space)',
        '  [GIG-03] ICHNOVA       - Collaborative hackathon deployment (Render)',
        '  [GIG-04] JANA NAYAGAN  - Civic complaint routing UI prototype',
        'CLASSIFIED PAPERS [ZONE 03]:',
        '  [ARCHIVE-01] ASSURE          - Tender simplification framework',
        '  [ARCHIVE-02] JANA NAYAGAN    - Municipal grievance triage system',
        '  [ARCHIVE-03] SAMAY & SAAKSHI - MSME proof engine architecture'
      );
    } else if (trimmed.startsWith('goto ')) {
      const target = trimmed.replace('goto ', '').trim();
      const validTargets = ['projects', 'research', 'wips', 'experience', 'about', 'contact'];
      if (validTargets.includes(target)) {
        newHistory.push(`NAVIGATING TO SECTOR: #${target.toUpperCase()}...`);
        if (onNavigateSection) {
          onNavigateSection(target);
        } else {
          const el = document.getElementById(target);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        newHistory.push(`ERR: Unknown sector "${target}". Valid sectors: ${validTargets.join(', ')}`);
      }
    } else if (trimmed === 'cat resume' || trimmed === 'resume') {
      newHistory.push(
        'AUTHENTICATED DOCUMENT: Rophe_Angel_Resume.pdf (~131 KB)',
        'STUDENT: Rophe Angel · B.E. Computer Science & Engineering (2025–2029)',
        'INSTITUTION: St. Joseph\'s Institute of Technology',
        'CREDENTIALS: NPTEL Data Science (68%), VIT V-Vortex Hackathon (Honorable Mention)',
        'ACCESS URL: /Rophe_Angel_Resume.pdf'
      );
    } else if (trimmed === 'status') {
      newHistory.push(
        'SYSTEM: ROPHE.SYS // STATUS: OVERDRIVE',
        'SUBJECT: ROPHE ANGEL',
        'ACTIVE GIGS: 4 Missions | 3 Classified Archives | 2 Operations',
        'ICE STATUS: FULLY DECRYPTED // BYPASSED'
      );
    } else if (trimmed === 'clear') {
      setHistory(['TERMINAL BUFFER FLUSHED. READY.']);
      setInput('');
      return;
    } else if (trimmed === 'exit') {
      onClose();
      return;
    } else {
      newHistory.push(`ERR: Directive "${trimmed}" not recognized. Type "help" for options.`);
    }

    setHistory(newHistory);
    setInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Cyber Terminal Console"
    >
      <div className="relative w-full max-w-3xl bg-[#06080d] border-2 border-[#FCEE0A] shadow-[0_0_60px_rgba(252,238,10,0.3)] cyber-chamfer flex flex-col h-[650px] max-h-[90vh]">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0a0d14] border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2 text-xs font-orbitron font-bold text-[#FCEE0A]">
            <TerminalIcon className="w-4 h-4 text-[#FCEE0A]" />
            <span className="tracking-widest">ROPHE.SYS // TERMINAL_CONSOLE</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono-cyber text-slate-400 hidden sm:inline">
              ESC TO EXIT
            </span>
            <button
              onClick={onClose}
              className="p-1 rounded bg-[#101420] hover:bg-[#1a2030] text-slate-400 hover:text-[#FCEE0A] transition-colors"
              aria-label="Close terminal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Output Log */}
        <div
          ref={scrollRef}
          className="flex-1 p-4 overflow-y-auto font-mono-cyber text-xs text-slate-200 space-y-1.5 selection:bg-[#FCEE0A] selection:text-black"
        >
          {history.map((line, idx) => (
            <div
              key={idx}
              className={`leading-relaxed ${
                line.startsWith('ROPHE.SYS >')
                  ? 'text-[#FCEE0A] font-bold'
                  : line.startsWith('ERR:')
                  ? 'text-[#FF1744] font-bold'
                  : line.startsWith('NAVIGATING')
                  ? 'text-[#FCEE0A]'
                  : 'text-slate-300'
              }`}
            >
              {line}
            </div>
          ))}
        </div>

        {/* Quick Command Directives */}
        <div className="px-4 py-2 bg-[#080a10] border-t border-slate-800 flex flex-wrap items-center gap-1.5 shrink-0 text-[11px] font-mono-cyber">
          <span className="text-slate-400 mr-1 font-bold">DIRECTIVES:</span>
          {['help', 'ls', 'cat resume', 'goto projects', 'goto research', 'clear'].map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleCommand(cmd)}
              className="px-2.5 py-0.5 rounded-xs bg-[#101420] hover:bg-[#FCEE0A] text-[#FCEE0A] hover:text-black border border-slate-700 font-bold transition-all"
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 p-3 bg-[#0a0d14] border-t border-slate-800 shrink-0"
        >
          <span className="text-[#FCEE0A] font-mono-cyber font-bold pl-1">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type directive (e.g. ls, goto projects, cat resume, help)..."
            className="flex-1 bg-transparent text-white font-mono-cyber text-xs focus:outline-none placeholder-slate-600"
          />
          <button
            type="submit"
            className="px-3.5 py-1.5 bg-[#FCEE0A] hover:bg-white text-black font-orbitron text-xs font-black rounded-xs flex items-center gap-1 transition-colors"
          >
            <span>SEND</span>
            <CornerDownLeft className="w-3 h-3" />
          </button>
        </form>
      </div>
    </div>
  );
};
