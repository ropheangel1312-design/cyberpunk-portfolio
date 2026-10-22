import React, { useEffect } from 'react';
import { X, Download, FileText, ExternalLink } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface ResumePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumePreviewModal: React.FC<ResumePreviewModalProps> = ({ isOpen, onClose }) => {
  const { resume } = PORTFOLIO_DATA;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label="Résumé Preview Modal"
    >
      <div className="relative w-full max-w-4xl bg-[#080b12] border-2 border-[#FCEE0A] shadow-[0_0_60px_rgba(252,238,10,0.25)] cyber-chamfer flex flex-col h-[90vh] max-h-[850px]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-[#06080e] shrink-0">
          <div className="flex items-center gap-2.5">
            <FileText className="w-4 h-4 text-[#FCEE0A]" />
            <span className="text-xs font-orbitron font-bold text-white tracking-wider">
              RÉSUMÉ DOSSIER // {resume.filename}
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-[11px] font-mono-cyber font-bold text-[#FCEE0A] bg-[#141a26] px-2 py-0.5 rounded-xs border border-slate-700">
              PDF (~131 KB)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={resume.downloadPath}
              download={resume.filename}
              className="cyber-chamfer-sm flex items-center gap-1.5 px-4 py-1.5 bg-[#FCEE0A] hover:bg-white text-black text-xs font-orbitron font-extrabold transition-all shadow-[0_0_15px_rgba(252,238,10,0.3)]"
            >
              <Download className="w-3.5 h-3.5" />
              <span>DOWNLOAD</span>
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded bg-[#101420] hover:bg-[#1a2030] text-slate-400 hover:text-[#FCEE0A] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Embedded PDF iframe / viewer */}
        <div className="flex-1 bg-[#0d101a] p-1 overflow-hidden relative">
          <iframe
            src={`${resume.downloadPath}#toolbar=0&navpanes=0`}
            className="w-full h-full border-0 rounded bg-white"
            title="Rophe Angel Resume Preview"
          />
        </div>

        {/* Footer info */}
        <div className="p-3 bg-[#06080e] border-t border-slate-800 flex items-center justify-between text-xs font-mono-cyber text-slate-400 shrink-0">
          <span>Candidate: Rophe Angel · B.E. Computer Science & Engineering</span>
          <a
            href={resume.downloadPath}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FCEE0A] hover:underline flex items-center gap-1 font-bold"
          >
            <span>Open in new tab</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
