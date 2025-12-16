"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";

interface ComparisonPair {
    before: string;
    after: string;
    title?: string;
    description?: string;
    details?: string[];
    rationale?: string;
    group?: string;
    videoUrl?: string; // Optional video demo URL (Dropbox/MP4)
}

interface BeforeAfterCarouselProps {
    pairs: ComparisonPair[];
    intervalMs?: number;
}

export default function BeforeAfterCarousel({
    pairs,
    intervalMs = 6000
}: BeforeAfterCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Convert Dropbox share link to raw/direct link
    const getDirectVideoUrl = (url: string): string => {
        if (url.includes('dropbox.com')) {
            return url.replace(/dl=0/, 'raw=1').replace(/&st=[^&]+/, '');
        }
        return url;
    };

    // Handle Escape key and body scroll lock
    useEffect(() => {
        if (isFullscreen || isVideoModalOpen) {
            // Lock scroll
            document.body.style.overflow = "hidden";

            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === "Escape") {
                    setIsFullscreen(false);
                    setIsVideoModalOpen(false);
                }
            };

            window.addEventListener("keydown", handleKeyDown);

            return () => {
                // Unlock scroll
                document.body.style.overflow = "";
                window.removeEventListener("keydown", handleKeyDown);
            };
        }
    }, [isFullscreen, isVideoModalOpen]);

    // Auto-advance (pause when fullscreen or video modal is open)
    useEffect(() => {
        if (isPaused || isFullscreen || isVideoModalOpen) return;

        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % pairs.length);
        }, intervalMs);

        return () => clearInterval(timer);
    }, [pairs.length, intervalMs, isPaused, isFullscreen, isVideoModalOpen]);

    // Handlers
    const handleNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % pairs.length);
    }, [pairs.length]);

    const handlePrev = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + pairs.length) % pairs.length);
    }, [pairs.length]);

    const currentPair = pairs[currentIndex];

    // Determine target container for portal
    const portalTarget = typeof document !== "undefined" ? document.body : null;

    return (
        <>
            <div
                className="relative w-[100vw] left-[50%] -translate-x-[50%] my-12 group"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                {/* Main Display Area */}
                <div className="relative bg-surface overflow-hidden shadow-2xl">
                    <button
                        onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/50 hover:bg-black/80 flex items-center justify-center text-white backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 border border-white/10"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                    </button>

                    <button
                        onClick={(e) => { e.stopPropagation(); handleNext(); }}
                        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/50 hover:bg-black/80 flex items-center justify-center text-white backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 border border-white/10"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </button>

                    <div key={currentIndex} className="animate-fade-in flex flex-col">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5 bg-black w-full">
                            <div
                                className="relative aspect-video w-full group/item cursor-zoom-in"
                                onClick={() => setIsFullscreen(true)}
                            >
                                <div className="absolute top-4 left-4 z-20 px-3 py-1.5 bg-black/70 backdrop-blur-md rounded-lg border border-white/10 text-xs font-bold uppercase tracking-widest text-text-muted shadow-lg pointer-events-none">
                                    Before
                                </div>
                                <Image
                                    src={currentPair.before}
                                    alt={`Before - ${currentPair.title || 'Case'}`}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover/item:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover/item:bg-transparent transition-colors duration-500" />
                            </div>

                            <div
                                className="relative aspect-video w-full group/item cursor-zoom-in"
                                onClick={() => setIsFullscreen(true)}
                            >
                                <div className="absolute top-4 left-4 z-20 px-3 py-1.5 bg-accent text-black backdrop-blur-md rounded-lg font-bold text-xs uppercase tracking-widest shadow-lg shadow-accent/20 pointer-events-none">
                                    After
                                </div>
                                <Image
                                    src={currentPair.after}
                                    alt={`After - ${currentPair.title || 'Case'}`}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover/item:scale-105"
                                />
                            </div>
                        </div>

                        {(currentPair.title || currentPair.description) && (
                            <div className="bg-surface-elevated border-t border-white/5 relative z-10 w-full">
                                <div className="max-w-5xl mx-auto p-6 md:p-8 text-center">
                                    {currentPair.title && (
                                        <h3 className="text-xl font-bold text-white mb-2 inline-flex items-center justify-center gap-3">
                                            {currentPair.title}
                                            {currentPair.group && pairs.filter(p => p.group === currentPair.group).length > 1 && (
                                                <span className="text-accent text-xs font-bold uppercase tracking-widest px-2 py-0.5 border border-accent/20 rounded bg-accent/5">
                                                    Part {pairs.filter(p => p.group === currentPair.group).indexOf(currentPair) + 1}
                                                    /{pairs.filter(p => p.group === currentPair.group).length}
                                                </span>
                                            )}
                                        </h3>
                                    )}
                                    {currentPair.description && <p className="text-text-secondary max-w-2xl mx-auto">{currentPair.description}</p>}

                                    <div className="mt-4 flex justify-center gap-3 flex-wrap">
                                        {currentPair.videoUrl && (
                                            <button 
                                                className="inline-flex items-center gap-2 text-xs font-medium text-black bg-accent hover:bg-accent-hover uppercase tracking-widest rounded-full px-4 py-1.5 cursor-pointer transition-colors shadow-lg shadow-accent/20"
                                                onClick={(e) => { e.stopPropagation(); setIsVideoModalOpen(true); }}
                                            >
                                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M8 5v14l11-7z" />
                                                </svg>
                                                Play Video Demo
                                            </button>
                                        )}
                                        <span className="text-xs font-medium text-accent uppercase tracking-widest border border-accent/30 rounded-full px-3 py-1.5 cursor-pointer hover:bg-accent/10 transition-colors" onClick={() => setIsFullscreen(true)}>
                                            Click for explanation
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-center gap-2 mt-6">
                    {pairs.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? "w-8 bg-accent" : "w-2 bg-white/20 hover:bg-white/40"
                                }`}
                            aria-label={`Go to case ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>

            {mounted && isFullscreen && portalTarget && createPortal(
                <div
                    className="fixed inset-0 z-[9999] bg-black/98 backdrop-blur-md flex flex-col items-center justify-center animate-fade-in cursor-pointer"
                    onClick={handleNext}
                >
                    <button
                        className="fixed top-4 right-4 z-[10000] p-3 text-white/70 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md"
                        onClick={(e) => { e.stopPropagation(); setIsFullscreen(false); }}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>

                    {/* Top Area: Images (Maximized) */}
                    <div
                        className="w-full h-[60vh] flex flex-row gap-2 md:gap-4 p-2 md:p-4 my-auto"
                    >
                        {/* Before Fullscreen */}
                        <div className="relative flex-1 rounded-lg overflow-hidden border border-white/10 bg-black/50">
                            <div className="absolute top-4 left-4 z-20 px-3 py-1.5 bg-black/70 backdrop-blur-md rounded-lg border border-white/10 text-xs font-bold uppercase tracking-widest text-text-muted shadow-lg">
                                Before
                            </div>
                            <Image
                                src={currentPair.before}
                                alt="Before view fullscreen"
                                fill
                                className="object-contain"
                                quality={100}
                                priority
                            />
                        </div>

                        {/* After Fullscreen */}
                        <div className="relative flex-1 rounded-lg overflow-hidden border border-accent/20 ring-1 ring-accent/10 bg-black/50">
                            <div className="absolute top-4 left-4 z-20 px-3 py-1.5 bg-accent text-black backdrop-blur-md rounded-lg font-bold text-xs uppercase tracking-widest shadow-lg shadow-accent/20">
                                After
                            </div>
                            <Image
                                src={currentPair.after}
                                alt="After view fullscreen"
                                fill
                                className="object-contain"
                                quality={100}
                                priority
                            />
                        </div>
                    </div>

                    {/* Bottom Sidebar: Text Content */}
                    <div
                        className="w-full h-[35vh] overflow-y-auto bg-surface-elevated border-t border-white/5 p-6 md:p-8 flex flex-col cursor-auto relative z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="max-w-7xl mx-auto w-full">
                            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-4">
                                {currentPair.title && (
                                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-0 mr-4 inline-flex items-center gap-3">
                                        {currentPair.title}
                                        {currentPair.group && pairs.filter(p => p.group === currentPair.group).length > 1 && (
                                            <span className="text-accent text-xs font-bold uppercase tracking-widest px-2 py-0.5 border border-accent/20 rounded bg-accent/5 align-middle">
                                                Part {pairs.filter(p => p.group === currentPair.group).indexOf(currentPair) + 1}
                                                /{pairs.filter(p => p.group === currentPair.group).length}
                                            </span>
                                        )}
                                    </h3>
                                )}
                                <div className="text-sm text-text-muted italic flex items-center">
                                    <span className="mr-2">💡</span> Click on the image area to next slide
                                </div>
                            </div>

                            {currentPair.rationale && (
                                <div className="mb-6">
                                    <h4 className="text-accent text-xs font-bold uppercase tracking-widest mb-2">
                                        Design Rationale
                                    </h4>
                                    <p className="text-text-secondary text-base md:text-lg">
                                        {currentPair.rationale}
                                    </p>
                                </div>
                            )}

                            {currentPair.details && (
                                <div>
                                    <h4 className="text-accent text-xs font-bold uppercase tracking-widest mb-4 border-b border-white/10 pb-2 inline-block">
                                        Design Rationale
                                    </h4>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                        {currentPair.details.map((item, idx) => {
                                            const hasSeparator = item.includes(':');
                                            const title = hasSeparator ? item.split(':')[0] : item;
                                            const content = hasSeparator ? item.split(':').slice(1).join(':') : '';

                                            return (
                                                <li key={idx} className="flex items-start text-text-secondary text-sm md:text-base leading-relaxed">
                                                    <span className="text-accent mr-3 mt-1.5 shrink-0">•</span>
                                                    <span>
                                                        <strong className="text-white font-semibold block md:inline mb-1 md:mb-0 mr-1">
                                                            {title}{hasSeparator ? ':' : ''}
                                                        </strong>
                                                        {content}
                                                    </span>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>,
                portalTarget
            )}

            {/* Video Demo Modal */}
            {mounted && isVideoModalOpen && currentPair.videoUrl && portalTarget && createPortal(
                <div
                    className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4 animate-fade-in"
                    onClick={() => setIsVideoModalOpen(false)}
                >
                    {/* Close button */}
                    <button
                        className="absolute top-4 right-4 md:top-6 md:right-6 text-white/60 hover:text-white transition-colors z-10 p-2"
                        onClick={() => setIsVideoModalOpen(false)}
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

                    {/* Video element */}
                    <div
                        className="relative w-full max-w-6xl aspect-video rounded-xl overflow-hidden bg-black shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <video
                            src={getDirectVideoUrl(currentPair.videoUrl)}
                            className="absolute inset-0 w-full h-full"
                            controls
                            autoPlay
                        />
                    </div>
                </div>,
                portalTarget
            )}
        </>
    );
}
