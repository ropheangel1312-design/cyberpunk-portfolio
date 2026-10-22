import React from 'react';
import { Lock, Github, Users, FileSearch, AlertCircle } from 'lucide-react';
import { PORTFOLIO_DATA, ResearchPaper } from '../data/portfolioData';
import { Card3D } from './Card3D';

interface ResearchSectionProps {
  onSelectPaper: (paper: ResearchPaper) => void;
  isReducedMotion?: boolean;
}

export const ResearchSection: React.FC<ResearchSectionProps> = ({ onSelectPaper, isReducedMotion = false }) => {
  const researchPapers = PORTFOLIO_DATA.research;

  return (
    <section id="research" className="py-20 lg:py-28 relative border-b border-slate-900 bg-[#040509]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 text-xs font-mono-cyber text-[#FCEE0A] mb-2">
            <span className="uppercase tracking-widest font-bold">ZONE 03</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400 font-rajdhani uppercase font-semibold">RESTRICTED TECHNICAL ARCHIVE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-orbitron font-black text-white tracking-tight uppercase">
            RESEARCH PAPERS — <span className="text-[#FCEE0A]">CLASSIFIED</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-3xl font-sans">
            Technical research inquiries, system design architectures, and prototype methodologies. All manuscripts below are currently <strong className="text-white font-semibold">unpublished conceptual research</strong>—transparently documented without fabricated citations, venues, or exaggerated validations.
          </p>
        </div>

        {/* 3-Column 3D Architectural Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {researchPapers.map((paper) => (
            <Card3D
              key={paper.id}
              maxTilt={4}
              depth={10}
              glareColor="rgba(252, 238, 10, 0.15)"
              isReducedMotion={isReducedMotion}
              className="bg-[#080b12] border border-slate-800 hover:border-[#FCEE0A]/60 transition-colors cyber-chamfer p-6 flex flex-col justify-between group shadow-[0_4px_25px_rgba(0,0,0,0.8)]"
            >
              <div>
                {/* Header Metadata */}
                <div className="flex items-center justify-between text-xs font-mono-cyber pb-3 mb-4 border-b border-slate-800">
                  <span className="text-[#FCEE0A] font-bold font-orbitron">{paper.code}</span>
                  <span className="text-white font-bold text-[11px] font-mono-cyber flex items-center gap-1 bg-[#141a26] px-2 py-0.5 rounded-xs border border-slate-700">
                    <Lock className="w-3 h-3 text-[#FCEE0A]" />
                    UNPUBLISHED
                  </span>
                </div>

                {/* Logo / Archive Crest */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded bg-[#0e121c] border border-slate-700/80 p-2 flex items-center justify-center shrink-0">
                    <img
                      src={paper.logo}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = paper.logoFallback;
                      }}
                      alt={`${paper.code} Crest`}
                      className="w-full h-full object-contain filter brightness-110"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono-cyber text-[#FCEE0A] tracking-wider uppercase font-bold">
                      {paper.status}
                    </span>
                    <h3 className="text-base sm:text-lg font-orbitron font-bold text-white group-hover:text-[#FCEE0A] transition-colors leading-snug">
                      {paper.subtitle}
                    </h3>
                  </div>
                </div>

                {/* Full Formal Title */}
                <p className="text-xs font-mono-cyber text-slate-300 bg-[#04060a] p-2.5 rounded border border-slate-800 mb-4 leading-relaxed">
                  "{paper.title}"
                </p>

                {/* Authorship & Role (Attribution Discipline) */}
                <div className="mb-4 text-xs font-mono-cyber space-y-1">
                  <div className="flex items-start gap-1.5 text-slate-300">
                    <Users className="w-3.5 h-3.5 text-[#FCEE0A] shrink-0 mt-0.5" />
                    <span>{paper.authors.join(', ')}</span>
                  </div>
                  <div className="text-[11px] text-[#FCEE0A] font-semibold pl-5">
                    Role: {paper.role}
                  </div>
                </div>

                {/* Abstract Text */}
                <p className="text-xs text-slate-300 leading-relaxed font-sans mb-4 line-clamp-4">
                  {paper.abstract}
                </p>

                {/* Theoretical Framework vs. Actual Implementation distinction */}
                <div className="space-y-2 mb-4 text-[11px] font-sans">
                  <div className="p-2.5 bg-[#0b0e17] border border-slate-800 rounded">
                    <span className="text-[#FCEE0A] font-mono-cyber font-bold block mb-0.5">
                      Proposed Framework:
                    </span>
                    <span className="text-slate-300 leading-normal">
                      {paper.proposedFramework}
                    </span>
                  </div>
                  <div className="p-2.5 bg-[#0f1422] border border-slate-800 rounded">
                    <span className="text-white font-mono-cyber font-bold block mb-0.5">
                      Actual Implementation Reality:
                    </span>
                    <span className="text-slate-300 leading-normal">
                      {paper.actualImplementation}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer: Repository & Inspection */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-2">
                {paper.githubUrl ? (
                  <a
                    href={paper.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-mono-cyber text-slate-300 hover:text-[#FCEE0A] transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Demo Repository</span>
                  </a>
                ) : (
                  <span className="text-[11px] font-mono-cyber text-slate-400 italic flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 text-slate-500" />
                    Manuscript unreleased
                  </span>
                )}

                <button
                  onClick={() => onSelectPaper(paper)}
                  className="cyber-chamfer-sm px-3.5 py-1.5 bg-[#121622] hover:bg-[#1b2234] border border-slate-700 text-xs font-orbitron font-bold text-white hover:text-[#FCEE0A] transition-all flex items-center gap-1 shrink-0"
                >
                  <FileSearch className="w-3 h-3" />
                  <span>ABSTRACT</span>
                </button>
              </div>
            </Card3D>
          ))}
        </div>
      </div>
    </section>
  );
};
