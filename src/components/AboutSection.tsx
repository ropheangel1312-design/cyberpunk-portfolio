import React from 'react';
import { GraduationCap, Award, CheckCircle, Terminal, MapPin } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Card3D } from './Card3D';

interface AboutSectionProps {
  isReducedMotion?: boolean;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ isReducedMotion = false }) => {
  const { about, education } = PORTFOLIO_DATA;

  return (
    <section id="about" className="py-20 lg:py-28 relative border-b border-slate-900 bg-[#05060b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 text-xs font-mono-cyber text-[#FCEE0A] mb-2">
            <span className="uppercase tracking-widest font-bold">ZONE 01</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400 font-rajdhani uppercase font-semibold">IDENTITY & ACADEMIC DOSSIER</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-orbitron font-black text-white tracking-tight uppercase">
            ABOUT — <span className="text-[#FCEE0A]">IDENTITY FILE</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl font-sans">
            Undergraduate background, learning trajectory, and verified academic credentials.
          </p>
        </div>

        {/* 2-Column Split: Profile & Bio on Left, Education & Accolades on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Portrait & Grounded Philosophy with 3D Tilt */}
          <div className="lg:col-span-5 space-y-6">
            <Card3D
              maxTilt={4}
              depth={10}
              isReducedMotion={isReducedMotion}
              className="bg-[#090c14] border-2 border-slate-800 hover:border-[#FCEE0A]/60 transition-colors cyber-chamfer p-4 shadow-[0_4px_30px_rgba(0,0,0,0.7)] group"
            >
              <div className="relative w-full aspect-square bg-[#06080e] cyber-chamfer-sm overflow-hidden mb-4 border border-slate-800">
                <img
                  src={about.photo.localUrl}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = about.photo.url;
                  }}
                  alt={about.photo.alt}
                  className="w-full h-full object-cover object-center filter brightness-95 contrast-105 group-hover:scale-103 transition-transform duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent opacity-60" />
                <div className="absolute top-2 left-2 text-[10px] font-mono-cyber text-black bg-[#FCEE0A] px-2 py-0.5 rounded-xs font-bold font-orbitron">
                  ID: ROPHE_ANGEL
                </div>
              </div>

              <div className="flex items-center justify-between text-xs font-mono-cyber text-slate-300">
                <span className="flex items-center gap-1.5 font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-[#FCEE0A]" />
                  Chennai, Tamil Nadu
                </span>
                <span className="text-[#FCEE0A] font-bold font-orbitron">CSE UNDERGRAD</span>
              </div>
            </Card3D>

            {/* Grounded Bio Narrative */}
            <div className="bg-[#090c14] border border-slate-800 p-6 cyber-chamfer-sm space-y-3 font-sans text-sm text-slate-300 leading-relaxed shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
              <div className="flex items-center gap-2 text-xs font-orbitron text-[#FCEE0A] uppercase tracking-wider font-bold">
                <Terminal className="w-3.5 h-3.5" />
                <span>ENGINEERING PHILOSOPHY</span>
              </div>
              {about.bio.map((paragraph, idx) => (
                <p key={idx} className="text-slate-300 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Right Column: Academic Milestones & Verified Accolades */}
          <div className="lg:col-span-7 space-y-8">
            {/* Education Timeline */}
            <div className="bg-[#090c14] border border-slate-800 p-6 sm:p-8 cyber-chamfer shadow-[0_4px_30px_rgba(0,0,0,0.7)]">
              <div className="flex items-center gap-2.5 text-xs font-orbitron text-[#FCEE0A] mb-6 pb-3 border-b border-slate-800">
                <GraduationCap className="w-4 h-4 text-[#FCEE0A]" />
                <span className="uppercase tracking-widest font-black">EDUCATION RECORD</span>
              </div>

              <div className="space-y-6">
                {education.map((item, idx) => (
                  <div key={idx} className="relative pl-6 border-l border-slate-800 group">
                    <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-xs bg-[#FCEE0A] ring-4 ring-[#090c14]" />

                    <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                      <h4 className="text-base sm:text-lg font-orbitron font-bold text-white group-hover:text-[#FCEE0A] transition-colors">
                        {item.degree}
                      </h4>
                      <span className="text-xs font-mono-cyber font-bold text-[#FCEE0A] tabular-nums">
                        {item.period}
                      </span>
                    </div>

                    <p className="text-sm font-sans text-slate-300 mb-1">
                      {item.institution}
                    </p>

                    <div className="flex items-center gap-3 text-xs font-mono-cyber text-slate-400">
                      {item.score && (
                        <>
                          <span className="text-white font-bold bg-[#141a26] px-1.5 py-0.2 rounded-xs border border-slate-700">
                            Score: {item.score}
                          </span>
                          <span className="text-slate-600">·</span>
                        </>
                      )}
                      <span>{item.details}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Verified Credentials & Accolades */}
            <div className="bg-[#090c14] border border-slate-800 p-6 sm:p-8 cyber-chamfer shadow-[0_4px_30px_rgba(0,0,0,0.7)]">
              <div className="flex items-center gap-2.5 text-xs font-orbitron text-[#FCEE0A] mb-6 pb-3 border-b border-slate-800">
                <Award className="w-4 h-4 text-[#FCEE0A]" />
                <span className="uppercase tracking-widest font-black">VERIFIED ACCOLADES & CERTIFICATIONS</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {about.accolades.map((acc, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-[#0c101a] border border-slate-800 rounded flex flex-col justify-between hover:border-[#FCEE0A]/40 transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono-cyber mb-2">
                        <span className="text-[#FCEE0A] font-bold font-orbitron">{acc.badge}</span>
                        <CheckCircle className="w-3.5 h-3.5 text-[#FCEE0A]" />
                      </div>
                      <h5 className="text-sm font-orbitron font-bold text-white mb-1.5">
                        {acc.title}
                      </h5>
                      <p className="text-xs text-slate-300 font-sans leading-relaxed">
                        {acc.note}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
