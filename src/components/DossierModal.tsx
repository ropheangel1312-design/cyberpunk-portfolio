import React, { useEffect, useState } from 'react';
import { X, ExternalLink, Github, ChevronLeft, ChevronRight, AlertTriangle, FileSearch } from 'lucide-react';
import { ProjectDossier, ResearchPaper } from '../data/portfolioData';

interface DossierModalProps {
  item: ProjectDossier | ResearchPaper | null;
  onClose: () => void;
}

export const DossierModal: React.FC<DossierModalProps> = ({ item, onClose }) => {
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);

  useEffect(() => {
    setActiveImageIdx(0);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, onClose]);

  if (!item) return null;

  const isProject = 'screenshots' in item;
  const project = isProject ? (item as ProjectDossier) : null;
  const paper = !isProject ? (item as ResearchPaper) : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={`Dossier for ${item.title}`}
    >
      <div className="relative w-full max-w-4xl bg-[#090b12] border-2 border-[#FCEE0A] shadow-[0_0_60px_rgba(252,238,10,0.25)] cyber-chamfer my-auto max-h-[92vh] flex flex-col">
        {/* Header HUD Bar */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-800 bg-[#07090e] shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-orbitron font-bold text-[#FCEE0A] uppercase tracking-wider">
              {item.code} // DOSSIER INSPECTION
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-[11px] font-mono-cyber font-bold text-white bg-[#141a26] px-2 py-0.5 rounded-xs border border-slate-700">
              {isProject ? project?.stage : paper?.status}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded bg-[#101420] hover:bg-[#182030] text-slate-300 hover:text-[#FCEE0A] border border-slate-700 transition-colors"
            title="Close Dossier (ESC)"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-slate-200">
          {/* Title Area */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-orbitron font-black text-white uppercase tracking-tight">
              {item.title}
            </h2>
            <p className="text-sm font-rajdhani font-semibold text-[#FCEE0A] uppercase tracking-wider mt-1">
              {item.subtitle}
            </p>
          </div>

          {/* Project Screenshot Carousel */}
          {project && project.screenshots.length > 0 && (
            <div className="space-y-3">
              <div className="relative aspect-[16/9] w-full bg-[#05070c] border border-slate-800 rounded overflow-hidden">
                <img
                  src={project.screenshots[activeImageIdx].localUrl}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = project.screenshots[activeImageIdx].url;
                  }}
                  alt={project.screenshots[activeImageIdx].caption}
                  className="w-full h-full object-contain filter brightness-95"
                  referrerPolicy="no-referrer"
                />

                {project.screenshots.length > 1 && (
                  <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between pointer-events-none">
                    <button
                      onClick={() =>
                        setActiveImageIdx((prev) =>
                          prev === 0 ? project.screenshots.length - 1 : prev - 1
                        )
                      }
                      className="pointer-events-auto p-2 rounded-full bg-black/80 hover:bg-[#FCEE0A] text-white hover:text-black border border-slate-700 transition-colors"
                      aria-label="Previous screenshot"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() =>
                        setActiveImageIdx((prev) =>
                          prev === project.screenshots.length - 1 ? 0 : prev + 1
                        )
                      }
                      className="pointer-events-auto p-2 rounded-full bg-black/80 hover:bg-[#FCEE0A] text-white hover:text-black border border-slate-700 transition-colors"
                      aria-label="Next screenshot"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between text-xs font-mono-cyber text-slate-400">
                <p className="truncate max-w-[80%]">
                  {project.screenshots[activeImageIdx].caption}
                </p>
                <span className="text-[#FCEE0A] font-bold">
                  {activeImageIdx + 1} / {project.screenshots.length}
                </span>
              </div>
            </div>
          )}

          {/* Paper Abstract & Crest */}
          {paper && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-[#0d101a] border border-slate-800 rounded">
                <div className="w-16 h-16 rounded bg-[#090b12] border border-slate-700 p-2 shrink-0 flex items-center justify-center">
                  <img
                    src={paper.logo}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = paper.logoFallback;
                    }}
                    alt={`${paper.code} Crest`}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <div className="text-xs font-mono-cyber text-[#FCEE0A] font-bold">
                    AUTHORS: {paper.authors.join(', ')}
                  </div>
                  <div className="text-xs font-mono-cyber text-white font-semibold mt-0.5">
                    ROLE: {paper.role}
                  </div>
                  <div className="text-[11px] font-mono-cyber text-slate-400 mt-1">
                    STATUS: {paper.status} (Unpublished research)
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-orbitron uppercase tracking-wider text-slate-400 mb-2">
                  FULL ABSTRACT
                </h4>
                <p className="text-sm font-sans text-slate-300 leading-relaxed bg-[#05070d] p-4 rounded border border-slate-800">
                  {paper.abstract}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 bg-[#0d101a] border border-slate-800 rounded">
                  <span className="text-xs font-orbitron font-bold text-[#FCEE0A] block mb-1">
                    PROPOSED FRAMEWORK
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {paper.proposedFramework}
                  </p>
                </div>
                <div className="p-3 bg-[#0d101a] border border-slate-800 rounded">
                  <span className="text-xs font-orbitron font-bold text-white block mb-1">
                    ACTUAL IMPLEMENTATION REALITY
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {paper.actualImplementation}
                  </p>
                </div>
              </div>

              {paper.notes && (
                <div className="p-3 bg-[#121622] border border-[#FCEE0A]/40 rounded text-xs font-mono-cyber text-[#FCEE0A] flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-[#FCEE0A]" />
                  <span>{paper.notes}</span>
                </div>
              )}
            </div>
          )}

          {/* Project Details */}
          {project && (
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-orbitron uppercase tracking-wider text-slate-400 mb-2">
                  MISSION OVERVIEW
                </h4>
                <p className="text-sm font-sans text-slate-300 leading-relaxed">
                  {project.overview}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-orbitron uppercase tracking-wider text-slate-400 mb-2">
                  TECHNICAL EXECUTION & ARCHITECTURE
                </h4>
                <ul className="space-y-2 text-sm text-slate-300 font-sans">
                  {project.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-[#FCEE0A] font-mono-cyber mt-0.5 font-bold">›</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {project.metrics && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  {project.metrics.map((m) => (
                    <div key={m.label} className="p-3 bg-[#0c101a] border border-slate-800 rounded">
                      <div className="text-[10px] font-mono-cyber text-slate-400">{m.label}</div>
                      <div className="text-xs font-mono-cyber font-bold text-[#FCEE0A] mt-0.5 truncate">
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {project.disclaimer && (
                <div className="p-3 bg-[#0e121a] border border-[#FCEE0A]/30 rounded text-xs font-mono-cyber text-amber-200/90 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-[#FCEE0A] shrink-0 mt-0.5" />
                  <span>{project.disclaimer}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 sm:p-6 border-t border-slate-800 bg-[#07090e] flex flex-wrap items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            {project?.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cyber-chamfer-sm px-4 py-2 bg-[#101420] hover:bg-[#182030] border border-slate-700 text-xs font-orbitron font-bold text-slate-200 hover:text-white flex items-center gap-2 transition-colors"
              >
                <Github className="w-3.5 h-3.5 text-[#FCEE0A]" />
                <span>GITHUB REPOSITORY</span>
              </a>
            )}
            {project?.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cyber-chamfer-sm px-4 py-2 bg-[#FCEE0A] hover:bg-white text-xs font-orbitron font-extrabold text-black flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(252,238,10,0.35)]"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>LAUNCH LIVE DEMO</span>
              </a>
            )}
            {paper?.githubUrl && (
              <a
                href={paper.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cyber-chamfer-sm px-4 py-2 bg-[#101420] hover:bg-[#182030] border border-slate-700 text-xs font-orbitron font-bold text-slate-200 hover:text-white flex items-center gap-2 transition-colors"
              >
                <Github className="w-3.5 h-3.5 text-[#FCEE0A]" />
                <span>RESEARCH REPOSITORY</span>
              </a>
            )}
            {!project?.githubUrl && !project?.demoUrl && !paper?.githubUrl && (
              <span className="text-xs font-mono-cyber text-slate-400 italic">
                Notice: Private research experiment. No external link published.
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-mono-cyber text-slate-400 hover:text-[#FCEE0A] transition-colors font-bold"
          >
            CLOSE DOSSIER [ESC]
          </button>
        </div>
      </div>
    </div>
  );
};
