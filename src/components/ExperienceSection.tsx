import React from 'react';
import { Briefcase, ShoppingBag, ExternalLink, Instagram, Linkedin, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Card3D } from './Card3D';

interface ExperienceSectionProps {
  isReducedMotion?: boolean;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ isReducedMotion = false }) => {
  const experiences = PORTFOLIO_DATA.experience;

  return (
    <section id="experience" className="py-20 lg:py-28 relative border-b border-slate-900 bg-[#040508]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 text-xs font-mono-cyber text-[#FCEE0A] mb-2">
            <span className="uppercase tracking-widest font-bold">TACTICAL</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400 font-rajdhani uppercase font-semibold">VENTURE & COMMERCIAL OPERATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-orbitron font-black text-white tracking-tight uppercase">
            EXPERIENCE — <span className="text-[#FCEE0A]">TACTICAL DEPLOYMENTS</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-3xl font-sans">
            Early entrepreneurial initiative and real-world commercial retail operations. Documented with realistic scope, without exaggerated metrics or inflated claims.
          </p>
        </div>

        {/* Experience Cards Grid with 3D Tilt */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {experiences.map((exp) => {
            const isVenture = exp.type === 'Venture';

            return (
              <Card3D
                key={exp.id}
                maxTilt={4}
                depth={12}
                glareColor="rgba(252, 238, 10, 0.14)"
                isReducedMotion={isReducedMotion}
                className="bg-[#090c14] border border-slate-800 hover:border-[#FCEE0A]/60 transition-colors cyber-chamfer p-6 sm:p-8 flex flex-col justify-between group shadow-[0_4px_30px_rgba(0,0,0,0.7)]"
              >
                <div>
                  {/* Top Bar Metadata */}
                  <div className="flex items-center justify-between text-xs font-mono-cyber pb-3 mb-4 border-b border-slate-800">
                    <span className="text-slate-300 flex items-center gap-1.5 font-bold">
                      {isVenture ? (
                        <Briefcase className="w-3.5 h-3.5 text-[#FCEE0A]" />
                      ) : (
                        <ShoppingBag className="w-3.5 h-3.5 text-white" />
                      )}
                      <span className="font-orbitron">{exp.type.toUpperCase()}</span>
                    </span>
                    <span className="text-[#FCEE0A] font-bold font-mono-cyber">{exp.period}</span>
                  </div>

                  {/* Title & Organization */}
                  <div className="mb-4">
                    <h3 className="text-2xl sm:text-3xl font-orbitron font-extrabold text-white group-hover:text-[#FCEE0A] transition-colors">
                      {exp.organization}
                    </h3>
                    <p className="text-sm font-rajdhani font-bold text-[#FCEE0A] uppercase tracking-wider mt-0.5">
                      {exp.role} · {exp.location}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-300 leading-relaxed font-sans mb-5">
                    {exp.description}
                  </p>

                  {/* Highlights Bulleted List */}
                  <div className="space-y-2 mb-6">
                    <h4 className="text-xs font-orbitron uppercase tracking-wider text-slate-400">
                      Core Responsibilities & Focus Areas
                    </h4>
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-sans">
                      {exp.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#FCEE0A] shrink-0 mt-1" />
                          <span className="leading-relaxed">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Footer: Links & Tags */}
                <div className="pt-4 border-t border-slate-800">
                  {/* Verified External Links */}
                  {exp.links && exp.links.length > 0 && (
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      {exp.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs font-mono-cyber font-bold text-white hover:text-black bg-[#121622] hover:bg-[#FCEE0A] px-3.5 py-1.5 rounded-sm border border-slate-700 transition-all shadow-sm"
                        >
                          {link.label.includes('LinkedIn') ? (
                            <Linkedin className="w-3.5 h-3.5 text-[#FCEE0A]" />
                          ) : (
                            <Instagram className="w-3.5 h-3.5 text-[#FCEE0A]" />
                          )}
                          <span>{link.label}</span>
                          <ExternalLink className="w-3 h-3 ml-1 opacity-70" />
                        </a>
                      ))}
                    </div>
                  )}

                  {/* Unboxed Tags */}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono-cyber text-slate-400">
                    {exp.tags.map((tag, i) => (
                      <React.Fragment key={tag}>
                        <span>{tag}</span>
                        {i < exp.tags.length - 1 && <span className="text-slate-600">·</span>}
                      </React.Fragment>
                    ))}
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
