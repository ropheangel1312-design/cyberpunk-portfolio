import React from 'react';
import { Activity, Clock, ShieldAlert } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Card3D } from './Card3D';

interface WipSectionProps {
  isReducedMotion?: boolean;
}

export const WipSection: React.FC<WipSectionProps> = ({ isReducedMotion = false }) => {
  const wips = PORTFOLIO_DATA.wips;

  return (
    <section id="wips" className="py-20 lg:py-24 relative border-b border-slate-900 bg-[#05060a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-cyber text-[#FCEE0A] mb-2">
              <span className="uppercase tracking-widest font-bold">OPERATIONS</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-400 font-rajdhani uppercase font-semibold">STAGE 01 CONCEPT PIPELINES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-orbitron font-black text-white tracking-tight uppercase">
              WORKS IN PROGRESS — <span className="text-[#FCEE0A]">ACTIVE OPERATIONS</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl font-sans">
              Initiatives actively undergoing requirement scoping, system architecture drafting, and MVP planning. These are explicitly evolving concepts, not finished products.
            </p>
          </div>

          <div className="text-xs font-mono-cyber text-slate-300 flex items-center gap-2 bg-[#0a0d16] px-3.5 py-2 border border-slate-800 rounded">
            <Activity className="w-3.5 h-3.5 text-[#FCEE0A]" />
            <span className="font-rajdhani font-bold tracking-wider uppercase text-white">2 ACTIVE STAGING PIPELINES</span>
          </div>
        </div>

        {/* WIP Cards Grid with 3D Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {wips.map((wip) => (
            <Card3D
              key={wip.id}
              maxTilt={4}
              depth={12}
              glareColor="rgba(252, 238, 10, 0.16)"
              isReducedMotion={isReducedMotion}
              className="bg-[#090c14] border border-slate-800 hover:border-[#FCEE0A]/60 transition-colors cyber-chamfer p-6 sm:p-7 flex flex-col justify-between group shadow-[0_4px_25px_rgba(0,0,0,0.7)]"
            >
              <div>
                {/* Header Metadata */}
                <div className="flex items-center justify-between text-xs font-mono-cyber pb-3 mb-4 border-b border-slate-800">
                  <span className="text-[#FCEE0A] font-bold font-orbitron">{wip.code}</span>
                  <span className="text-white font-bold flex items-center gap-1.5 font-mono-cyber text-[11px] bg-[#121622] px-2 py-0.5 rounded-xs border border-slate-700">
                    <Clock className="w-3 h-3 text-[#FCEE0A] animate-spin" style={{ animationDuration: '6s' }} />
                    STAGE: {wip.stage.toUpperCase()}
                  </span>
                </div>

                {/* Identity & Emblem */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-lg bg-[#0e121c] border border-slate-700/80 p-2.5 flex items-center justify-center shrink-0">
                    <img
                      src={wip.logo}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = wip.logoFallback;
                      }}
                      alt={`${wip.title} Logo`}
                      className="w-full h-full object-contain filter brightness-110"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono-cyber text-[#FCEE0A] uppercase tracking-wider font-bold">
                      ACTIVE OPERATION
                    </span>
                    <h3 className="text-xl sm:text-2xl font-orbitron font-extrabold text-white group-hover:text-[#FCEE0A] transition-colors">
                      {wip.title}
                    </h3>
                  </div>
                </div>

                {/* Grounded Description */}
                <p className="text-sm text-slate-300 leading-relaxed font-sans mb-4">
                  {wip.description}
                </p>

                {/* Development Status Note */}
                <div className="p-3 bg-[#0c101a] border border-slate-800 rounded font-mono-cyber text-xs text-slate-400 mb-4 space-y-1">
                  <div className="flex items-center gap-1.5 text-white font-semibold text-[11px]">
                    <ShieldAlert className="w-3.5 h-3.5 text-[#FCEE0A]" />
                    <span className="font-orbitron text-[10px] tracking-wider text-[#FCEE0A]">STATUS REPORT</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-300">
                    {wip.statusNotes}
                  </p>
                </div>
              </div>

              {/* Tags footer */}
              <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono-cyber text-slate-400">
                {wip.tags.map((tag, i) => (
                  <React.Fragment key={tag}>
                    <span>{tag}</span>
                    {i < wip.tags.length - 1 && <span className="text-slate-600">·</span>}
                  </React.Fragment>
                ))}
              </div>
            </Card3D>
          ))}
        </div>
      </div>
    </section>
  );
};
