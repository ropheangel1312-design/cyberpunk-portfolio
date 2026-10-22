import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ResearchSection } from './components/ResearchSection';
import { WipSection } from './components/WipSection';
import { ExperienceSection } from './components/ExperienceSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AudioHUD } from './components/AudioHUD';
import { SystemBreachIntro } from './components/SystemBreachIntro';
import { RainCanvas } from './components/RainCanvas';
import { DossierModal } from './components/DossierModal';
import { TerminalModal } from './components/TerminalModal';
import { ResumePreviewModal } from './components/ResumePreviewModal';
import { ProjectDossier, ResearchPaper } from './data/portfolioData';
import { useZoneProgression } from './utils/useZoneProgression';

export default function App() {
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    return sessionStorage.getItem('rophe_intro_seen') !== 'true';
  });
  const [triggerAudioAutoPlay, setTriggerAudioAutoPlay] = useState<boolean>(false);
  const [activeDossier, setActiveDossier] = useState<ProjectDossier | ResearchPaper | null>(null);
  const [isTerminalOpen, setIsTerminalOpen] = useState<boolean>(false);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);

  // Reduced motion query
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Coordinated Zone Progression & Instability
  const { scrollPercent, currentZone, isGlitching } = useZoneProgression();

  const handleIntroComplete = () => {
    setShowIntro(false);
    sessionStorage.setItem('rophe_intro_seen', 'true');
    setTriggerAudioAutoPlay(true);
  };

  const handleReplayIntro = () => {
    setShowIntro(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateSection = (sectionId: string) => {
    setIsTerminalOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className={`min-h-screen bg-[#050508] text-slate-100 relative selection:bg-[#FCEE0A] selection:text-black ${
        isGlitching ? 'animate-glitch' : ''
      }`}
    >
      {/* 3–5 Second Skippable Cyberpunk Title Sequence Breach Intro */}
      {showIntro && (
        <SystemBreachIntro
          onComplete={handleIntroComplete}
          onTriggerAudio={() => setTriggerAudioAutoPlay(true)}
        />
      )}

      {/* Atmospheric Night City Rain Canvas */}
      <RainCanvas />

      {/* Persistent Evolving HUD Top Bar */}
      <Navbar
        currentZone={currentZone}
        scrollPercent={scrollPercent}
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Main Page Flow with 3D Parallax and Zone Progression */}
      <main className="relative z-10">
        <HeroSection
          currentZone={currentZone}
          isReducedMotion={isReducedMotion}
          onOpenTerminal={() => setIsTerminalOpen(true)}
          onExploreProjects={() => handleNavigateSection('projects')}
        />

        <ProjectsSection
          onSelectProject={(project) => setActiveDossier(project)}
          isReducedMotion={isReducedMotion}
        />

        <ResearchSection
          onSelectPaper={(paper) => setActiveDossier(paper)}
          isReducedMotion={isReducedMotion}
        />

        <WipSection isReducedMotion={isReducedMotion} />

        <ExperienceSection isReducedMotion={isReducedMotion} />

        <AboutSection isReducedMotion={isReducedMotion} />

        <SkillsSection isReducedMotion={isReducedMotion} />

        <ContactSection
          onOpenResume={() => setIsResumeOpen(true)}
          isReducedMotion={isReducedMotion}
        />
      </main>

      {/* Footer */}
      <Footer onReplayIntro={handleReplayIntro} />

      {/* Persistent Compact Audio HUD with "I Really Want to Stay at Your House" */}
      <AudioHUD autoPlayTrigger={triggerAudioAutoPlay} />

      {/* Interactive Dossier Modal */}
      <DossierModal
        item={activeDossier}
        onClose={() => setActiveDossier(null)}
      />

      {/* Interactive Cyber Terminal Console */}
      <TerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onNavigateSection={handleNavigateSection}
      />

      {/* Verified Résumé PDF Preview Modal */}
      <ResumePreviewModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
