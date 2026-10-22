import React, { useState } from 'react';
import { Cpu, Code2, GitBranch } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Card3D } from './Card3D';

interface SkillsSectionProps {
  isReducedMotion?: boolean;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ isReducedMotion = false }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const skillCategories = PORTFOLIO_DATA.skills;

  return (
    <section id="skills" className="py-20 lg:py-24 relative border-b border-slate-900 bg-[#040508]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-cyber text-[#FCEE0A] mb-2">
              <span className="uppercase tracking-widest font-bold">CAPABILITIES</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-400 font-rajdhani uppercase font-semibold">ENGINEERING MATRIX</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-orbitron font-black text-white tracking-tight uppercase">
              SKILL MATRIX — <span className="text-[#FCEE0A]">SYSTEM COMPETENCIES</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl font-sans">
              Practical languages, frameworks, AI workflows, and development disciplines used across projects and research.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center p-1 bg-[#090b10] border border-slate-800 rounded-lg shrink-0 overflow-x-auto">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-1.5 text-xs font-mono-cyber font-bold rounded-md transition-all whitespace-nowrap ${
                activeCategory === 'all'
                  ? 'bg-[#FCEE0A] text-black shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ALL CAPABILITIES
            </button>
            {skillCategories.map((cat) => (
              <button
                key={cat.category}
                onClick={() => setActiveCategory(cat.category)}
                className={`px-3.5 py-1.5 text-xs font-mono-cyber font-bold rounded-md transition-all whitespace-nowrap ${
                  activeCategory === cat.category
                    ? 'bg-[#FCEE0A] text-black shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat.category.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Categorized Interactive Grid with 3D Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skillCategories.map((group) => {
            const isVisible = activeCategory === 'all' || activeCategory === group.category;
            if (!isVisible) return null;

            return (
              <Card3D
                key={group.category}
                maxTilt={4}
                depth={10}
                glareColor="rgba(252, 238, 10, 0.15)"
                isReducedMotion={isReducedMotion}
                className="bg-[#090c14] border border-slate-800 hover:border-[#FCEE0A]/60 transition-colors cyber-chamfer p-6 flex flex-col justify-between shadow-[0_4px_25px_rgba(0,0,0,0.7)] group"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono-cyber text-[#FCEE0A] mb-4 pb-3 border-b border-slate-800">
                    {group.category === 'Languages' && <Code2 className="w-4 h-4 text-[#FCEE0A]" />}
                    {group.category === 'Core Disciplines' && <Cpu className="w-4 h-4 text-white" />}
                    {group.category === 'Engineering & Workflow' && <GitBranch className="w-4 h-4 text-[#FCEE0A]" />}
                    <span className="font-orbitron font-bold uppercase tracking-wider">{group.category}</span>
                  </div>

                  {/* Clean unboxed interactive skill tags with context */}
                  <div className="space-y-3">
                    {group.skills.map((skill) => (
                      <div
                        key={skill}
                        className="p-3 bg-[#0c101a] hover:bg-[#141b2a] border border-slate-800 hover:border-[#FCEE0A]/40 rounded-sm transition-all duration-200 group/skill"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-rajdhani font-bold text-white group-hover/skill:text-[#FCEE0A] transition-colors uppercase tracking-wider">
                            {skill}
                          </span>
                          <span className="text-[10px] font-mono-cyber text-[#FCEE0A] font-bold">
                            ACTIVE
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800 text-[11px] font-mono-cyber text-slate-500">
                  <span>{group.skills.length} core competencies configured</span>
                </div>
              </Card3D>
            );
          })}
        </div>
      </div>
    </section>
  );
};
