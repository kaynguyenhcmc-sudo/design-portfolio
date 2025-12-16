"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";

interface TimelineNode {
  year: string;
  title: string;
  description: string;
  image?: string;
  tag?: string;
  details?: {
    focus?: string;
    designed?: string[];
    analysis?: string;
    design?: string;
    research_plan?: string;
    impact?: string | string[];
    problem?: string;
  };
}

interface TimelineInfographicProps {
  nodes: TimelineNode[];
}

export default function TimelineInfographic({ nodes }: TimelineInfographicProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalImage(null);
    };
    if (modalImage) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEsc);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleEsc);
      };
    }
  }, [modalImage]);

  const getNodeStyle = (index: number) => {
    if (hoveredIndex === null) return {};
    if (hoveredIndex === index) {
      return { transform: "scale(1.02)", zIndex: 10 };
    }
    return { opacity: 0.5, filter: "brightness(0.7)" };
  };

  const renderImpactContent = (impact: string | string[]) => {
    if (Array.isArray(impact)) {
      return (
        <div className="space-y-4">
          {impact.map((item, i) => {
            const parts = item.split(":");
            const hasLabel = parts.length > 1;
            return (
              <p key={i} className="text-text-secondary text-base leading-relaxed">
                {hasLabel ? (
                  <>
                    <strong className="text-white">{parts[0]}:</strong>
                    <span> {parts.slice(1).join(":").trim()}</span>
                  </>
                ) : (
                  item
                )}
              </p>
            );
          })}
        </div>
      );
    }
    return <p className="text-text-secondary text-base leading-relaxed">{impact}</p>;
  };

  return (
    <>
      <div className="my-12 animate-fade-in">
        {/* Desktop Layout - Unified Left/Right */}
        <div className="hidden md:block relative">
          {/* Continuous Vertical Line - Centered */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent/10 via-accent/40 to-accent/10" />

          {/* Nodes */}
          <div className="space-y-0">
            {nodes.map((node, index) => {
              const isLast = index === nodes.length - 1;

              return (
                <div
                  key={index}
                  className="relative group"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{
                    ...getNodeStyle(index),
                    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  <div className="grid grid-cols-2 gap-x-16 py-8">

                    {/* LEFT COLUMN: Main Content */}
                    <div
                      className="flex flex-col items-end text-right pt-0 transition-all duration-500 ease-out"
                      style={hoveredIndex === index ? { transform: "translateX(-4px)" } : {}}
                    >
                      {/* Header Info */}
                      <div className="flex items-center justify-end gap-3 mb-6">
                        {node.tag && (
                          <span className="px-2 py-0.5 text-xs uppercase tracking-wider font-bold bg-accent text-black rounded-full shadow-[0_0_10px_rgba(254,198,46,0.3)] animate-pulse-slow">
                            {node.tag}
                          </span>
                        )}
                        <span className="text-xl font-bold text-accent tracking-normal">{node.year}</span>
                      </div>

                      <h3 className="text-2xl font-bold text-text-primary mb-3">{node.title}</h3>
                      <p className="text-text-secondary text-base leading-relaxed max-w-md">{node.description}</p>

                      {/* Image */}
                      {node.image && (
                        <div
                          className="relative w-full max-w-lg aspect-video rounded-lg overflow-hidden bg-surface-elevated border border-border cursor-pointer group/image mt-6 shadow-xl"
                          onClick={() => setModalImage(node.image!)}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={node.image}
                            alt={node.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/image:scale-110"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/20 transition-colors flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-all duration-300 transform translate-y-4 group-hover/image:translate-y-0">
                              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* CENTER: Node Indicator */}
                    <div className="absolute left-1/2 top-14 -translate-x-1/2 flex justify-center z-20">
                      <div
                        className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${hoveredIndex === index
                          ? "bg-accent border-accent scale-150 shadow-lg shadow-accent/50"
                          : "bg-surface-elevated border-accent/40"
                          }`}
                      >
                        <div
                          className={`absolute inset-0.5 rounded-full transition-colors ${hoveredIndex === index ? "bg-white" : "bg-transparent"
                            }`}
                        />
                      </div>
                    </div>

                    {/* RIGHT COLUMN: Details */}
                    <div
                      className="flex flex-col items-start text-left pt-1 transition-all duration-500 ease-out"
                      style={hoveredIndex === index ? { transform: "translateX(4px)" } : {}}
                    >
                      {node.details && (
                        <div className="w-full">
                          {/* Focus Points Header - Only show if any of the new fields exist */}
                          {(node.details.problem || node.details.analysis || node.details.design || node.details.research_plan || node.details.focus || node.details.designed) && (
                            <div className="mb-6">
                              <h4 className="text-sm font-bold text-accent uppercase tracking-widest mb-4 border-b border-accent/20 pb-2">FOCUS POINTS:</h4>
                            </div>
                          )}

                          {/* Problem */}
                          {node.details.problem && (
                            <div className="mb-6">
                              <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-1">Goal</h4>
                              <p className="text-text-secondary text-base leading-relaxed">{node.details.problem}</p>
                            </div>
                          )}

                          {/* Analysis */}
                          {node.details.analysis && (
                            <div className="mb-6">
                              <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-1">Analysis</h4>
                              <p className="text-text-secondary text-base leading-relaxed">{node.details.analysis}</p>
                            </div>
                          )}

                          {/* Design */}
                          {node.details.design && (
                            <div className="mb-6">
                              <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-1">Design</h4>
                              <p className="text-text-secondary text-base leading-relaxed">{node.details.design}</p>
                            </div>
                          )}

                          {/* Research Plan */}
                          {node.details.research_plan && (
                            <div className="mb-6">
                              <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-1">Research Plan</h4>
                              <p className="text-text-secondary text-base leading-relaxed">{node.details.research_plan}</p>
                            </div>
                          )}

                          {/* Result */}
                          {node.details.impact && (
                            <div className="mb-6">
                              <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-1">Result</h4>
                              {renderImpactContent(node.details.impact)}
                            </div>
                          )}

                          {/* Focus (Legacy support) */}
                          {node.details.focus && (
                            <div className="mb-8">
                              <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-1">Focus</h4>
                              <p className="text-text-secondary text-base font-medium leading-relaxed">{node.details.focus}</p>
                            </div>
                          )}

                          {/* Designed (Legacy support) */}
                          {node.details.designed && (
                            <div className="mb-10">
                              <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-1">What I Designed</h4>
                              <ul className="space-y-3">
                                {node.details.designed.map((item, i) => (
                                  <li key={i} className="text-text-secondary text-base leading-relaxed">
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                  </div>

                  {/* Section Separator (Divider) */}
                  {!isLast && (
                    <div className="absolute bottom-0 left-0 right-0 flex justify-center opacity-20">
                      <div className="w-1/3 border-b border-dashed border-white/50" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Layout - Vertical (unchanged mostly, just minor tweaks) */}
        <div className="md:hidden relative mt-16">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent/20 via-accent/60 to-accent/20" />

          <div className="space-y-12">
            {nodes.map((node, index) => (
              <div
                key={index}
                className="relative pl-12"
                style={{
                  ...getNodeStyle(index),
                  transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div
                  className={`absolute left-4 w-4 h-4 rounded-full border-2 transition-all duration-300 -translate-x-1/2 mt-1 ${hoveredIndex === index
                    ? "bg-accent border-accent scale-150 shadow-lg shadow-accent/50"
                    : "bg-surface-elevated border-accent/60"
                    }`}
                >
                  <div
                    className={`absolute inset-1 rounded-full transition-colors ${hoveredIndex === index ? "bg-white" : "bg-accent/60"
                      }`}
                  />
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-semibold text-accent">{node.year}</span>
                    {node.tag && (
                      <span className="px-2 py-0.5 text-xs uppercase tracking-wider font-bold bg-accent text-black rounded-full shadow-[0_0_10px_rgba(254,198,46,0.3)]">
                        {node.tag}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-2">
                    {node.title}
                  </h3>
                  <p className="text-text-secondary text-base leading-relaxed mb-4">
                    {node.description}
                  </p>

                  {node.image && (
                    <div
                      className="relative w-full aspect-video rounded-lg overflow-hidden bg-surface-elevated border border-border cursor-pointer group mb-4"
                      onClick={() => setModalImage(node.image!)}
                    >
                      <Image
                        src={node.image}
                        alt={node.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />
                    </div>
                  )}

                  {/* Mobile Details */}
                  {node.details && (
                    <div className="bg-surface-elevated/50 p-4 rounded-lg border border-white/5 space-y-4">
                      {/* Focus Points Header for Mobile */}
                      {(node.details.problem || node.details.analysis || node.details.design || node.details.research_plan || node.details.focus || node.details.designed) && (
                        <div className="mb-2 border-b border-white/10 pb-2">
                          <h4 className="text-xs font-bold text-accent uppercase tracking-widest">FOCUS POINTS:</h4>
                        </div>
                      )}

                      {node.details.problem && (
                        <div>
                          <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-1 opacity-100">Goal</h4>
                          <p className="text-text-primary text-sm font-medium">{node.details.problem}</p>
                        </div>
                      )}
                      {node.details.analysis && (
                        <div>
                          <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-1 opacity-100">Analysis</h4>
                          <p className="text-text-primary text-sm font-medium">{node.details.analysis}</p>
                        </div>
                      )}
                      {node.details.design && (
                        <div>
                          <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-1 opacity-100">Design</h4>
                          <p className="text-text-primary text-sm font-medium">{node.details.design}</p>
                        </div>
                      )}
                      {node.details.research_plan && (
                        <div>
                          <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-1 opacity-100">Research Plan</h4>
                          <p className="text-text-primary text-sm font-medium">{node.details.research_plan}</p>
                        </div>
                      )}
                      {node.details.impact && (
                        <div className="">
                          <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-1">Result</h4>
                          {Array.isArray(node.details.impact) ? (
                            <div className="space-y-4">
                              {node.details.impact.map((item, i) => {
                                const parts = item.split(":");
                                const hasLabel = parts.length > 1;
                                return (
                                  <p key={i} className="text-white text-sm font-medium leading-relaxed">
                                    {hasLabel ? (
                                      <>
                                        <strong className="text-accent">{parts[0]}:</strong>
                                        <span className="text-white/80"> {parts.slice(1).join(":").trim()}</span>
                                      </>
                                    ) : (
                                      item
                                    )}
                                  </p>
                                );
                              })}
                            </div>
                          ) : (
                            <p className="text-white text-sm font-medium">{node.details.impact}</p>
                          )}
                        </div>
                      )}

                      {node.details.focus && (
                        <div>
                          <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-1">Focus</h4>
                          <p className="text-text-primary text-sm font-medium">{node.details.focus}</p>
                        </div>
                      )}
                      {node.details.designed && (
                        <div>
                          <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-1">What I Designed</h4>
                          <ul className="space-y-1">
                            {node.details.designed.map((item, i) => (
                              <li key={i} className="text-text-secondary text-sm">
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Image Modal - Rendered via Portal to escape parent transforms */}
      {mounted && modalImage && createPortal(
        <div
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setModalImage(null)}
        >
          <button
            className="absolute top-4 right-4 md:top-6 md:right-6 text-white/60 hover:text-white transition-colors z-10 p-2"
            onClick={() => setModalImage(null)}
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="absolute top-6 left-6 text-white/40 text-sm hidden md:block">
            Press <kbd className="px-2 py-1 bg-white/10 rounded text-xs ml-1">ESC</kbd> to close
          </div>

          <div
            className="relative w-full h-full flex items-center justify-center outline-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={modalImage}
              alt="Full size preview"
              className="max-w-[95vw] max-h-[95vh] object-contain rounded-xl shadow-2xl"
            />
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
