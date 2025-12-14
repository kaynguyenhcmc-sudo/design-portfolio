"use client";

import { useState, useEffect } from "react";

interface HeroVideoProps {
  url: string;
  title?: string;
  caption?: string;
  overlayOpacity?: number; // 0-100, default 60
}

// Extract video ID from various URL formats
function getVimeoId(url: string): string | null {
  const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return match ? match[1] : null;
}

function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

export default function HeroVideo({ 
  url, 
  title, 
  caption,
  overlayOpacity = 60 
}: HeroVideoProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const vimeoId = getVimeoId(url);
  const youtubeId = getYouTubeId(url);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEsc);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleEsc);
      };
    }
  }, [isModalOpen]);

  // Background video URL (muted, autoplay, loop)
  const backgroundVideoUrl = vimeoId
    ? `https://player.vimeo.com/video/${vimeoId}?background=1&autoplay=1&muted=1&loop=1&quality=1080p`
    : youtubeId
    ? `https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&playlist=${youtubeId}`
    : null;

  // Modal video URL (with sound, starts from beginning)
  const modalVideoUrl = vimeoId
    ? `https://player.vimeo.com/video/${vimeoId}?autoplay=1&title=0&byline=0&portrait=0`
    : youtubeId
    ? `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`
    : null;

  if (!backgroundVideoUrl) {
    return (
      <div className="mb-12 p-8 bg-surface-elevated border border-border rounded-2xl text-center">
        <p className="text-text-muted">Unsupported video URL format</p>
      </div>
    );
  }

  return (
    <>
      {/* Hero Video Container - Full Width */}
      <div className="relative w-screen left-1/2 -translate-x-1/2 aspect-[16/9] md:aspect-[21/9] overflow-hidden mb-12 animate-fade-in">
        {/* Background Video (muted, autoplay, loop) */}
        <div className="absolute inset-0">
          <iframe
            src={backgroundVideoUrl}
            className={`absolute inset-0 w-full h-full scale-[1.2] transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            style={{ 
              pointerEvents: "none",
              border: "none",
            }}
            allow="autoplay; fullscreen"
            onLoad={() => setIsLoaded(true)}
            title="Background video"
          />
          
          {/* Fallback gradient while loading */}
          <div 
            className={`absolute inset-0 bg-gradient-to-br from-surface-elevated to-surface transition-opacity duration-1000 ${isLoaded ? 'opacity-0' : 'opacity-100'}`}
          />
        </div>

        {/* Dark Overlay */}
        <div 
          className="absolute inset-0 bg-black transition-opacity duration-300"
          style={{ opacity: overlayOpacity / 100 }}
        />

        {/* Content Layer */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 md:p-10">
          {/* Play Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="group relative"
            aria-label="Play video"
          >
            {/* Pulse ring animation */}
            <div className="absolute inset-0 rounded-full bg-white/20 animate-ping" style={{ animationDuration: '2s' }} />
            
            {/* Button */}
            <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/90 hover:bg-white hover:scale-110 transition-all duration-300 flex items-center justify-center shadow-2xl">
              <svg
                className="w-8 h-8 md:w-10 md:h-10 text-gray-900 ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </button>

          {/* Watch prompt */}
          <p className="mt-6 text-sm text-white/60 tracking-wide">
            Click to watch
          </p>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && modalVideoUrl && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 md:top-6 md:right-6 text-white/60 hover:text-white transition-colors z-10 p-2"
            onClick={() => setIsModalOpen(false)}
            aria-label="Close video"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* ESC hint */}
          <div className="absolute top-6 left-6 text-white/40 text-sm hidden md:block">
            Press <kbd className="px-2 py-1 bg-white/10 rounded text-xs ml-1">ESC</kbd> to close
          </div>

          {/* Video iframe */}
          <div
            className="relative w-full max-w-6xl aspect-video rounded-xl overflow-hidden bg-black shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={modalVideoUrl}
              title={title || "Video"}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}

