import React, { useState } from 'react';
import { ExternalLink, Github, Eye, AlertTriangle } from 'lucide-react';
import { PORTFOLIO_DATA, ProjectDossier } from '../data/portfolioData';
import { Card3D } from './Card3D';

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectDossier) => void;
  isReducedMotion?: boolean;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject, isReducedMotion = false }) => {
  const [filter, setFilter] = useState<string>('all');
  const projects = PORTFOLIO_DATA.projects;

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.stage.toLowerCase().includes(filter.toLowerCase()));

  return (
    <section id="projects" className="py-20 lg:py-28 relative border-b border-slate-900 bg-[#06080d]">
      {/* Background cyber grid */}
      <div className="absolute inset-0 cyber-dots opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-cyber text-[#FCEE0A] mb-2">
              <span className="uppercase tracking-widest font-bold">ZONE 02</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-400 font-rajdhani uppercase font-semibold">GIG BOARD // ACTIVE MISSIONS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-orbitron font-black text-white tracking-tight uppercase">
              PROJECTS — <span className="text-[#FCEE0A]">GIG DOSSIERS</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl font-sans">
              Each mission represents a real engineering exploration. Click any dossier card to inspect technical architecture, authentication flows, and high-resolution screenshots.
            </p>
          </div>

          {/* Interactive Filter Tabs in Acid Yellow */}
          <div className="flex items-center p-1 bg-[#090b10] border border-slate-800 rounded-lg shrink-0 overflow-x-auto max-w-full">
            <button
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 text-xs font-mono-cyber font-bold rounded-md transition-all whitespace-nowrap shrink-0 ${
                filter === 'all'
                  ? 'bg-[#FCEE0A] text-black shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ALL GIGS ({projects.length})
            </button>
            <button
              onClick={() => setFilter('Civic Tech')}
              className={`px-3.5 py-1.5 text-xs font-mono-cyber font-bold rounded-md transition-all whitespace-nowrap shrink-0 ${
                filter === 'Civic Tech'
                  ? 'bg-[#FCEE0A] text-black shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              CIVIC TECH
            </button>
            <button
              onClick={() => setFilter('Hackathon')}
              className={`px-3.5 py-1.5 text-xs font-mono-cyber font-bold rounded-md transition-all whitespace-nowrap shrink-0 ${
                filter === 'Hackathon'
                  ? 'bg-[#FCEE0A] text-black shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              HACKATHON
            </button>
            <button
              onClick={() => setFilter('Personal Experiment')}
              className={`px-3.5 py-1.5 text-xs font-mono-cyber font-bold rounded-md transition-all whitespace-nowrap shrink-0 ${
                filter === 'Personal Experiment'
                  ? 'bg-[#FCEE0A] text-black shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              EXPERIMENTS
            </button>
          </div>
        </div>

        {/* 2-Column Responsive Grid of 3D Interactive Dossier Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => {
            const primaryScreenshot = project.screenshots[0];

            return (
              <Card3D
                key={project.id}
                maxTilt={4.5}
                depth={12}
                glareColor="rgba(252, 238, 10, 0.16)"
                isReducedMotion={isReducedMotion}
                className="bg-[#090c14] border border-slate-800 hover:border-[#FCEE0A]/70 transition-colors cyber-chamfer p-6 flex flex-col justify-between shadow-[0_4px_30px_rgba(0,0,0,0.7)] group"
              >
                <div>
                  {/* Dossier Code & Stage Metadata (Zero-pill text) */}
                  <div className="flex items-center justify-between text-xs font-mono-cyber mb-3 pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="text-[#FCEE0A] font-bold font-orbitron">{project.code}</span>
                      <span aria-hidden="true" className="text-slate-600">/</span>
                      <span className="text-slate-400 font-rajdhani font-semibold tracking-wider uppercase">{project.category}</span>
                    </div>
                    <span className="text-[#FCEE0A] text-[11px] font-bold font-mono-cyber uppercase tracking-wider bg-[#10141f] px-2 py-0.5 rounded-xs border border-slate-800">
                      {project.status}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-orbitron font-black text-white group-hover:text-[#FCEE0A] transition-colors tracking-tight">
                        {project.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 font-rajdhani font-semibold tracking-wider mt-0.5 uppercase">
                        {project.subtitle}
                      </p>
                    </div>

                    <button
                      onClick={() => onSelectProject(project)}
                      className="p-2 rounded bg-[#101420] hover:bg-[#182030] text-slate-400 hover:text-[#FCEE0A] border border-slate-700 transition-colors shrink-0"
                      title="Inspect Full Mission Dossier"
                      aria-label={`Inspect ${project.title} dossier`}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Project Primary Screenshot Preview */}
                  {primaryScreenshot && (
                    <div
                      onClick={() => onSelectProject(project)}
                      className="relative w-full aspect-[16/9] mb-4 bg-[#06080e] border border-slate-800 rounded overflow-hidden cursor-pointer group/img"
                    >
                      <img
                        src={primaryScreenshot.localUrl}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = primaryScreenshot.url;
                        }}
                        alt={primaryScreenshot.caption}
                        className="w-full h-full object-cover object-top filter brightness-90 group-hover/img:brightness-100 group-hover/img:scale-102 transition-all duration-300"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#090c14] via-transparent to-transparent opacity-60" />
                      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] font-mono-cyber text-slate-300 bg-black/75 backdrop-blur-sm px-2 py-1 rounded">
                        <span className="truncate">{primaryScreenshot.caption}</span>
                        <span className="text-[#FCEE0A] font-bold shrink-0 ml-2">Click to inspect</span>
                      </div>
                    </div>
                  )}

                  {/* Overview Text */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4 font-sans line-clamp-3">
                    {project.overview}
                  </p>

                  {/* Technical Highlights */}
                  <ul className="space-y-1.5 text-xs text-slate-400 font-sans mb-4">
                    {project.details.slice(0, 2).map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#FCEE0A] font-mono-cyber select-none mt-0.5">›</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Honest Disclosure / Disclaimer */}
                  {project.disclaimer && (
                    <div className="p-2.5 bg-[#0e121a] border border-[#FCEE0A]/20 rounded text-[11px] font-mono-cyber text-amber-200/90 mb-4 flex items-start gap-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-[#FCEE0A] shrink-0 mt-0.5" />
                      <span>{project.disclaimer}</span>
                    </div>
                  )}
                </div>

                {/* Footer: Tech Stack & Functional Links */}
                <div className="pt-4 border-t border-slate-800">
                  {/* Clean unboxed tech list */}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-mono-cyber text-slate-400 mb-4">
                    {project.techStack.map((tech, i) => (
                      <React.Fragment key={tech}>
                        <span className="hover:text-white">{tech}</span>
                        {i < project.techStack.length - 1 && <span className="text-slate-600">·</span>}
                      </React.Fragment>
                    ))}
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    {/* External links */}
                    <div className="flex items-center gap-3">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs font-mono-cyber text-slate-300 hover:text-[#FCEE0A] transition-colors"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>Code Repository</span>
                        </a>
                      )}
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs font-mono-cyber text-[#FCEE0A] hover:underline transition-colors font-bold"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Live Space / Demo</span>
                        </a>
                      )}
                      {!project.githubUrl && !project.demoUrl && (
                        <span className="text-[11px] font-mono-cyber text-slate-500 italic">
                          Local preview only · Private repository
                        </span>
                      )}
                    </div>

                    {/* Inspect Dossier Action */}
                    <button
                      onClick={() => onSelectProject(project)}
                      className="cyber-chamfer-sm px-4 py-1.5 bg-[#121622] hover:bg-[#1a2233] border border-slate-700 hover:border-[#FCEE0A] text-xs font-orbitron font-bold text-white group-hover:text-[#FCEE0A] transition-all whitespace-nowrap"
                    >
                      DOSSIER DETAILS →
                    </button>
                  </div>
                </div>
              </Card3D>
            );
          })}
        </div>
      </div>
    </section>
  );
};
