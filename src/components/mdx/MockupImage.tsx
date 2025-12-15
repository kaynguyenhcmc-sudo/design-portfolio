"use client";

import { useState, useEffect } from "react";

interface MockupImageProps {
  src: string;
  alt: string;
  caption?: string;
}

export default function MockupImage({ src, alt, caption }: MockupImageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Convert relative paths to absolute paths for public folder
  const imageSrc = src.startsWith("./")
    ? src.replace("./", "/projects/redaction-studio/")
    : src;

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };
    if (isModalOpen) {
      window.addEventListener("keydown", handleEsc);
      return () => window.removeEventListener("keydown", handleEsc);
    }
  }, [isModalOpen]);

  return (
    <>
      <figure className="mb-8 animate-fade-in">
        <div
          className="mockup-container relative rounded-xl overflow-hidden bg-surface border border-border cursor-zoom-in"
          onClick={() => setIsModalOpen(true)}
        >
          <div className="relative aspect-video">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageSrc}
              alt={alt}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
        {caption && (
          <figcaption className="mt-3 text-sm text-text-muted text-center">
            {caption}
          </figcaption>
        )}
      </figure>

      {/* Fullscreen Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 video-modal-backdrop flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setIsModalOpen(false)}
        >
          <button
            className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors z-10"
            onClick={() => setIsModalOpen(false)}
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="relative max-w-7xl w-full max-h-[90vh] overflow-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageSrc}
              alt={alt}
              className="w-full h-auto rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
}
