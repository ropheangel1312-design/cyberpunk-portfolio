import { useState, useEffect } from 'react';

export interface ZoneInfo {
  id: string;
  code: string;
  name: string;
  instability: number; // 0 to 100
  status: 'STABLE' | 'MONITORED' | 'ELEVATED' | 'COMPROMISED' | 'CRITICAL' | 'OVERDRIVE';
  alertColor: string;
}

export function useZoneProgression(): {
  scrollPercent: number;
  currentZone: ZoneInfo;
  isGlitching: boolean;
} {
  const [scrollPercent, setScrollPercent] = useState<number>(0);
  const [isGlitching, setIsGlitching] = useState<boolean>(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const docEl = document.documentElement;
          const totalHeight = docEl.scrollHeight - docEl.clientHeight;
          const currentScroll = window.scrollY;
          const pct = totalHeight > 0 ? Math.min(100, Math.max(0, Math.round((currentScroll / totalHeight) * 100))) : 0;
          setScrollPercent(pct);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Occasional brief purposeful micro-glitch (200ms every 14-20 seconds)
    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 220);
    }, 16000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(glitchInterval);
    };
  }, []);

  const getZone = (pct: number): ZoneInfo => {
    if (pct < 15) {
      return {
        id: '00',
        code: 'ZONE 00',
        name: 'THE BREACH',
        instability: pct,
        status: 'STABLE',
        alertColor: '#FCEE0A'
      };
    } else if (pct < 35) {
      return {
        id: '01',
        code: 'ZONE 01',
        name: 'IDENTITY FILE',
        instability: pct,
        status: 'MONITORED',
        alertColor: '#FCEE0A'
      };
    } else if (pct < 60) {
      return {
        id: '02',
        code: 'ZONE 02',
        name: 'GIG BOARD',
        instability: pct,
        status: 'ELEVATED',
        alertColor: '#FCEE0A'
      };
    } else if (pct < 85) {
      return {
        id: '03',
        code: 'ZONE 03',
        name: 'RESTRICTED ARCHIVE',
        instability: pct,
        status: 'COMPROMISED',
        alertColor: '#FFAA00'
      };
    } else if (pct < 95) {
      return {
        id: '04',
        code: 'ZONE 04',
        name: 'CONTAINMENT FAILURE',
        instability: pct,
        status: 'CRITICAL',
        alertColor: '#FF1744'
      };
    } else {
      return {
        id: 'FINAL',
        code: 'FINAL ZONE',
        name: 'THE LAST TRANSMISSION',
        instability: 100,
        status: 'OVERDRIVE',
        alertColor: '#FCEE0A'
      };
    }
  };

  return {
    scrollPercent,
    currentZone: getZone(scrollPercent),
    isGlitching
  };
}
