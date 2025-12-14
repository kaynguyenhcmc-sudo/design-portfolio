"use client";

import { useState, useEffect } from "react";

interface VideoEmbedProps {
  url: string;
  thumbnail?: string;
  title?: string;
  caption?: string;
}

// Extract video ID and platform from URL
function parseVideoUrl(url: string): { platform: string; videoId: string; embedUrl: string } | null {
  // YouTube
  const youtubeMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  if (youtubeMatch) {
    return {
      platform: "youtube",
      videoId: youtubeMatch[1],
      embedUrl: `https://www.youtube.com/embed/${youtubeMatch[1]}?autoplay=1`,
    };
  }

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) {
    return {
      platform: "vimeo",
      videoId: vimeoMatch[1],
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`,
    };
  }

  // Loom
  const loomMatch = url.match(/loom\.com\/share\/([a-zA-Z0-9]+)/);
  if (loomMatch) {
    return {
      platform: "loom",
      videoId: loomMatch[1],
      embedUrl: `https://www.loom.com/embed/${loomMatch[1]}?autoplay=1`,
    };
  }

  // Google Drive
  const driveMatch = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (driveMatch) {
    return {
      platform: "googledrive",
      videoId: driveMatch[1],
      embedUrl: `https://drive.google.com/file/d/${driveMatch[1]}/preview`,
    };
  }

  // Figma prototype
  const figmaMatch = url.match(/figma\.com\/(proto|file)\/([a-zA-Z0-9]+)/);
  if (figmaMatch) {
    return {
      platform: "figma",
      videoId: figmaMatch[2],
      embedUrl: `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(url)}`,
    };
  }

  return null;
}

// Get default thumbnail for platform
function getDefaultThumbnail(platform: string, videoId: string): string {
  switch (platform) {
    case "youtube":
      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    case "vimeo":
      return ""; // Vimeo requires API call for thumbnail
    default:
      return "";
  }
}

export default function VideoEmbed({ url, thumbnail, title, caption }: VideoEmbedProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const videoInfo = parseVideoUrl(url);

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

  if (!videoInfo) {
    return (
      <div className="mb-8 p-6 bg-surface-elevated border border-border rounded-xl text-center">
        <p className="text-text-muted">Unsupported video URL</p>
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline text-sm">
          Open link directly →
        </a>
      </div>
    );
  }

  const displayThumbnail = thumbnail || getDefaultThumbnail(videoInfo.platform, videoInfo.videoId);

  return (
    <>
      <figure className="mb-8 animate-fade-in">
        <div
          className="relative rounded-xl overflow-hidden bg-surface border border-border cursor-pointer group"
          onClick={() => setIsModalOpen(true)}
        >
          <div className="relative aspect-video">
            {/* Thumbnail */}
            {displayThumbnail ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={displayThumbnail}
                alt={title || "Video thumbnail"}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-surface-elevated to-surface flex items-center justify-center">
                <span className="text-text-muted">{videoInfo.platform}</span>
              </div>
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />

            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 group-hover:bg-white group-hover:scale-110 transition-all duration-300 flex items-center justify-center shadow-lg">
                <svg
                  className="w-6 h-6 md:w-8 md:h-8 text-gray-900 ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>

            {/* Platform badge */}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 text-xs font-medium bg-black/60 backdrop-blur-sm rounded-full text-white capitalize">
                {videoInfo.platform}
              </span>
            </div>

            {/* Title overlay */}
            {title && (
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white font-medium">{title}</p>
              </div>
            )}
          </div>
        </div>

        {caption && (
          <figcaption className="mt-3 text-sm text-text-muted text-center">
            {caption}
          </figcaption>
        )}
      </figure>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors z-10"
            onClick={() => setIsModalOpen(false)}
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Video iframe */}
          <div
            className="relative w-full max-w-5xl aspect-video rounded-lg overflow-hidden bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={videoInfo.embedUrl}
              title={title || "Video"}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}

