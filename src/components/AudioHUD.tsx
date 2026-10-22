import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, Disc3, AlertCircle } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface AudioHUDProps {
  autoPlayTrigger?: boolean;
}

export const AudioHUD: React.FC<AudioHUDProps> = ({ autoPlayTrigger }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.75);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [needsUserInteraction, setNeedsUserInteraction] = useState<boolean>(false);

  const audioConfig = PORTFOLIO_DATA.hero.audio;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
      setHasError(false);
    };
    const handleEnded = () => {
      audio.currentTime = 0;
      audio.play().catch(() => setIsPlaying(false));
    };
    const handleError = () => {
      // Try local fallback if remote failed
      if (audio.src !== window.location.origin + audioConfig.localFallback) {
        audio.src = audioConfig.localFallback;
        audio.load();
      } else {
        setHasError(true);
        setIsPlaying(false);
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [audioConfig.localFallback, volume]);

  useEffect(() => {
    if (autoPlayTrigger && audioRef.current && !isPlaying && !hasError) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setNeedsUserInteraction(false);
        })
        .catch(() => {
          setNeedsUserInteraction(true);
          setIsPlaying(false);
        });
    }
  }, [autoPlayTrigger, hasError, isPlaying]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play()
        .then(() => {
          setIsPlaying(true);
          setNeedsUserInteraction(false);
          setHasError(false);
        })
        .catch((err) => {
          console.warn('Playback blocked by browser policy:', err);
          setNeedsUserInteraction(true);
        });
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
      if (val === 0) setIsMuted(true);
      else if (isMuted) {
        setIsMuted(false);
        audioRef.current.muted = false;
      }
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds === 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={audioConfig.url}
        preload="metadata"
        loop
      />

      <div className="fixed bottom-4 right-4 z-40 max-w-sm">
        <div className="cyber-chamfer-sm bg-[#090b12]/95 border border-[#FCEE0A]/40 shadow-[0_0_25px_rgba(252,238,10,0.18)] backdrop-blur-md p-3 transition-all duration-300">
          <div className="flex items-center gap-2.5">
            {/* Spinning vinyl / disc icon */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="relative p-1.5 rounded bg-[#101420] border border-slate-700 hover:border-[#FCEE0A] text-[#FCEE0A] transition-colors shrink-0"
              title={isExpanded ? 'Collapse audio HUD' : 'Expand audio details'}
              aria-label="Toggle audio HUD expansion"
            >
              <Disc3
                className={`w-4 h-4 ${isPlaying && !isMuted ? 'animate-spin' : ''}`}
                style={{ animationDuration: '4s' }}
              />
              {isPlaying && !isMuted && (
                <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-[#FCEE0A] rounded-full shadow-[0_0_6px_#FCEE0A]" />
              )}
            </button>

            {/* Track Info */}
            <div className="min-w-0 flex-1 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono-cyber uppercase tracking-wider text-[#FCEE0A] font-bold">
                  AUDIO HUD
                </span>
                <span className="text-[10px] text-slate-500">·</span>
                <span className="text-[10px] font-mono-cyber text-slate-300 truncate">
                  {hasError ? 'OFFLINE' : isPlaying ? 'TRANSMITTING' : 'STANDBY'}
                </span>
              </div>
              <p className="text-xs font-rajdhani font-bold text-white truncate leading-tight uppercase tracking-wide">
                {audioConfig.title}
              </p>
            </div>

            {/* Equalizer Waveform bars in Acid Yellow */}
            <div className="hidden sm:flex items-end gap-0.5 h-4 px-1" aria-hidden="true">
              {[35, 90, 60, 100, 75, 45].map((height, i) => (
                <span
                  key={i}
                  className="w-0.5 bg-[#FCEE0A] transition-all duration-150"
                  style={{
                    height: isPlaying && !isMuted ? `${height}%` : '20%',
                    opacity: isPlaying && !isMuted ? 0.95 : 0.3
                  }}
                />
              ))}
            </div>

            {/* Primary Action Buttons */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={togglePlay}
                className="w-7 h-7 flex items-center justify-center rounded bg-[#FCEE0A] hover:bg-white text-black transition-all shadow-sm font-bold"
                title={isPlaying ? 'Pause music' : 'Play music'}
                aria-label={isPlaying ? 'Pause track' : 'Play track'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 fill-black" /> : <Play className="w-3.5 h-3.5 ml-0.5 fill-black" />}
              </button>

              <button
                onClick={toggleMute}
                className="w-7 h-7 flex items-center justify-center rounded bg-[#121622] hover:bg-[#1a2030] border border-slate-700 text-slate-300 hover:text-white transition-all"
                title={isMuted ? 'Unmute' : 'Mute'}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5 text-[#FF1744]" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Expanded controls & scrub details */}
          {isExpanded && (
            <div className="mt-2.5 pt-2.5 border-t border-slate-800 text-[11px] font-mono-cyber space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-[#FCEE0A] font-bold">{formatTime(currentTime)}</span>
                <span className="text-slate-400 font-rajdhani font-semibold">Cyberpunk: Edgerunners OST</span>
                <span>{formatTime(duration)}</span>
              </div>

              {/* Progress bar in Acid Yellow to Chrome */}
              <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="bg-gradient-to-r from-[#FCEE0A] via-[#FFEE55] to-white h-full transition-all duration-100"
                  style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                />
              </div>

              {/* Volume Slider */}
              <div className="flex items-center gap-2 pt-1 text-slate-400">
                <span className="text-[10px] text-[#FCEE0A] font-bold">VOL</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#FCEE0A]"
                  aria-label="Volume level"
                />
                <span className="text-[10px] w-7 text-right tabular-nums text-slate-300">{Math.round(volume * 100)}%</span>
              </div>

              {hasError && (
                <div className="flex items-center gap-1.5 text-[#FF1744] text-[10px] pt-1">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>Audio stream blocked by policy. Local audio fallback loaded.</span>
                </div>
              )}
            </div>
          )}

          {/* Autoplay prompt toast if browser blocked audio initially */}
          {needsUserInteraction && !isPlaying && (
            <div className="mt-2 p-1.5 bg-[#FCEE0A]/10 border border-[#FCEE0A]/40 rounded text-[10px] font-mono-cyber text-[#FCEE0A] flex items-center justify-between gap-2">
              <span>Click to engage Edgerunners BGM.</span>
              <button
                onClick={togglePlay}
                className="px-2 py-0.5 bg-[#FCEE0A] text-black font-bold rounded text-[10px] hover:bg-white transition-colors"
              >
                INITIALIZE
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
