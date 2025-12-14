"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface VideoModalProps {
  thumbnail: string;
  videoUrl: string;
  caption?: string;
}

export default function VideoModal({ thumbnail, videoUrl, caption }: VideoModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Handle relative paths
  const thumbnailSrc = thumbnail.startsWith("./")
    ? thumbnail.replace("./", "/projects/redaction-studio/")
    : thumbnail;

  // Determine video type and get embed URL
  const getEmbedUrl = (url: string): string => {
    // YouTube
    const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    if (youtubeMatch) {
      return `https://www.youtube.com/embed/${youtubeMatch[1]}?autoplay=1`;
    }
    
    // Vimeo
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`;
    }
    
    // Loom
    const loomMatch = url.match(/loom\.com\/share\/([^?]+)/);
    if (loomMatch) {
      return `https://www.loom.com/embed/${loomMatch[1]}?autoplay=1`;
    }
    
    // Direct video URL
    return url;
  };

  const isDirectVideo = !videoUrl.includes("youtube") && 
                        !videoUrl.includes("vimeo") && 
                        !videoUrl.includes("loom");

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleClose]);

  return (
    <>
      {/* Thumbnail with play button */}
      <figure className="mb-8 mt-6">
        <button
          onClick={() => setIsOpen(true)}
          className="relative w-full rounded-xl overflow-hidden bg-surface-elevated border border-border group cursor-pointer"
        >
          {/* Thumbnail image */}
          <div className="relative aspect-video">
            <Image
              src={thumbnailSrc}
              alt={caption || "Video thumbnail"}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 1400px) 100vw, 1400px"
            />
            
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
            
            {/* Play button */}
            <div className="play-button absolute top-1/2 left-1/2 w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/90 group-hover:bg-white flex items-center justify-center transition-all duration-300">
              <svg 
                className="w-8 h-8 md:w-10 md:h-10 text-background ml-1" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </button>
        
        {/* Caption */}
        {caption && (
          <figcaption className="mt-4 text-text-muted text-sm text-center italic">
            {caption}
          </figcaption>
        )}
      </figure>

      {/* Modal */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 modal-backdrop animate-fade-in"
          onClick={handleClose}
        >
          {/* Modal content */}
          <div 
            className="relative w-full max-w-5xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute -top-12 right-0 text-text-secondary hover:text-text-primary transition-colors"
              aria-label="Close video"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Video container */}
            <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
              {isDirectVideo ? (
                <video
                  src={videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full"
                />
              ) : (
                <iframe
                  src={getEmbedUrl(videoUrl)}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>

            {/* Caption below video */}
            {caption && (
              <p className="mt-4 text-text-secondary text-center">
                {caption}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

