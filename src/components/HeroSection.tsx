import React from 'react';
import { ArrowUpRight, ShieldCheck, Terminal, Compass, Zap } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { ParallaxHero3D } from './ParallaxHero3D';
import { ZoneInfo } from '../utils/useZoneProgression';

interface HeroSectionProps {
  currentZone: ZoneInfo;
  isReducedMotion?: boolean;
  onOpenTerminal?: () => void;
  onExploreProjects?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentZone,
  isReducedMotion = false,
  onOpenTerminal,
  onExploreProjects
}) => {
  const heroData = PORTFOLIO_DATA.hero;

  return (
    <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden border-b border-slate-900 bg-[#050508]">
      {/* Background Night City Acid Yellow Ambient Light */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#FCEE0A]/6 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-[#E2E8F0]/4 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Split Screen 2-Column Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Zone Tag & Metadata (Anti-slop zero-pill text) */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono-cyber text-[#FCEE0A] mb-4">
              <span className="uppercase tracking-widest font-bold">
                {currentZone.code} // {currentZone.name}
              </span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-300 font-rajdhani uppercase tracking-wider font-semibold">
                CSE UNDERGRADUATE
              </span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-white bg-[#0f1420] px-1.5 py-0.5 border border-slate-700 text-[10px] rounded-xs">
                NETLINK SECURED
              </span>
            </div>

            {/* Display Headline with Cyberpunk Title Art Direction */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-orbitron font-black tracking-tight text-white leading-[1.08] mb-6 [text-wrap:balance]">
              BUILDING SOFTWARE, TESTING AI WORKFLOWS &{' '}
              <span className="text-[#FCEE0A] drop-shadow-[0_0_20px_rgba(252,238,10,0.4)]">
                BREACHING NIGHT CITY.
              </span>
            </h1>

            {/* Lead Narrative */}
            <p className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed mb-6 max-w-2xl">
              I am <strong className="text-white font-orbitron">{heroData.name}</strong>, a Computer Science & Engineering student at {heroData.institution}. Figuring things out by actually writing the code, deploying applied AI pipelines, and probing experimental architectures.
            </p>

            <p className="text-sm sm:text-base text-slate-400 font-sans leading-relaxed mb-8 max-w-2xl">
              From client-side Spotify audio engines and civic MPLAD irregular spending detectors to classified research in automated tender document extraction.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 mb-8">
              <a
                href="#projects"
                onClick={(e) => {
                  if (onExploreProjects) {
                    e.preventDefault();
                    onExploreProjects();
                  }
                }}
                className="cyber-chamfer-sm px-7 py-3.5 bg-[#FCEE0A] hover:bg-white text-black font-orbitron font-black text-xs uppercase tracking-widest transition-all shadow-[0_0_25px_rgba(252,238,10,0.4)] hover:shadow-[0_0_35px_rgba(252,238,10,0.7)] flex items-center gap-2 group whitespace-nowrap active:scale-95"
              >
                <span>EXPLORE GIG DOSSIERS</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href="#research"
                className="cyber-chamfer-sm px-6 py-3.5 bg-[#0e121a] hover:bg-[#161c28] border border-slate-700 hover:border-[#FCEE0A] text-slate-200 hover:text-white font-orbitron font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap"
              >
                <span>CLASSIFIED ARCHIVE</span>
                <ShieldCheck className="w-4 h-4 text-[#FCEE0A]" />
              </a>

              {onOpenTerminal && (
                <button
                  onClick={onOpenTerminal}
                  className="cyber-chamfer-sm px-4 py-3.5 bg-[#090b10] hover:bg-[#121622] border border-slate-800 text-slate-400 hover:text-[#FCEE0A] font-mono-cyber text-xs transition-colors flex items-center gap-1.5 whitespace-nowrap"
                  title="Open Diagnostic Terminal"
                >
                  <Terminal className="w-4 h-4 text-[#FCEE0A]" />
                  <span className="hidden sm:inline">TERMINAL</span>
                </button>
              )}
            </div>

            {/* Quick System Diagnostics */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono-cyber text-slate-400 pt-4 border-t border-slate-800/80">
              <span className="flex items-center gap-1.5 text-slate-300">
                <Compass className="w-3.5 h-3.5 text-[#FCEE0A]" />
                Location: Chennai, IN
              </span>
              <span>·</span>
              <span>Degree: B.E. CSE (2025–2029)</span>
              <span>·</span>
              <span className="text-[#FCEE0A] font-bold">ICE: Bypassed</span>
            </div>
          </div>

          {/* Right Column: 3D Cursor-Reactive Multi-Layer Parallax Engine */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <ParallaxHero3D isReducedMotion={isReducedMotion} />
          </div>
        </div>

        {/* Full-Width 4-Column KPI / Metrics Strip in Acid Yellow & Gunmetal Chrome */}
        <div className="mt-14 pt-8 border-t border-slate-800/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-orbitron font-black text-white tracking-tight tabular-nums">
                04
              </div>
              <div className="text-xs font-mono-cyber text-[#FCEE0A] uppercase tracking-wider font-bold">
                Mission Projects
              </div>
              <p className="text-[11px] text-slate-400 font-sans">
                Spotify Web audio client, civic fund monitoring, hackathon build & grievance prototype.
              </p>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-orbitron font-black text-white tracking-tight tabular-nums">
                03
              </div>
              <div className="text-xs font-mono-cyber text-[#FCEE0A] uppercase tracking-wider font-bold">
                Research Papers
              </div>
              <p className="text-[11px] text-slate-400 font-sans">
                Unpublished conceptual architectures: ASSURE, Jana Nayagan & Samay Saakshi.
              </p>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-orbitron font-black text-white tracking-tight tabular-nums">
                02
              </div>
              <div className="text-xs font-mono-cyber text-[#FCEE0A] uppercase tracking-wider font-bold">
                Active Operations (WIP)
              </div>
              <p className="text-[11px] text-slate-400 font-sans">
                ASTA-NOVARA concept scoping & LOCK IN MVP architecture roadmap.
              </p>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-orbitron font-black text-white tracking-tight tabular-nums">
                2025–2029
              </div>
              <div className="text-xs font-mono-cyber text-[#FCEE0A] uppercase tracking-wider font-bold">
                B.E. CSE Degree
              </div>
              <p className="text-[11px] text-slate-400 font-sans">
                St. Joseph's Institute of Technology · NPTEL Certified · Hackathon Honoree.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
