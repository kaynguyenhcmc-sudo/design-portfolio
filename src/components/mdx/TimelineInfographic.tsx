"use client";

import { useState, useEffect } from "react";

interface TimelineNode {
  year: string;
  title: string;
  description: string;
  image?: string;
}

interface TimelineInfographicProps {
  nodes: TimelineNode[];
}

export default function TimelineInfographic({ nodes }: TimelineInfographicProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [modalImage, setModalImage] = useState<string | null>(null);

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
      return { transform: "scale(1.05)", zIndex: 10 };
    }
    return { opacity: 0.4, filter: "brightness(0.6)" };
  };

  return (
    <>
      <div className="my-12 animate-fade-in">
        {/* Desktop Layout - Centered alternating */}
        <div className="hidden md:block relative">
          {/* Center Timeline Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent/20 via-accent/60 to-accent/20" />

          {/* Nodes */}
          <div className="space-y-16">
            {nodes.map((node, index) => {
              const isLeft = index % 2 === 0; // 0, 2 = left; 1, 3 = right

              return (
                <div key={index} className="relative">
                  {/* Node Circle - Center */}
                  <div
                    className={`absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-2 transition-all duration-300 z-10 ${
                      hoveredIndex === index
                        ? "bg-accent border-accent scale-150 shadow-lg shadow-accent/50"
                        : "bg-surface-elevated border-accent/60"
                    }`}
                  >
                    <div
                      className={`absolute inset-1 rounded-full transition-colors ${
                        hoveredIndex === index ? "bg-white" : "bg-accent/60"
                      }`}
                    />
                  </div>

                  {/* Content - Alternating sides */}
                  <div
                    className={`flex items-start ${isLeft ? "justify-end pr-[calc(50%+2rem)]" : "justify-start pl-[calc(50%+2rem)]"}`}
                    style={{
                      ...getNodeStyle(index),
                      transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <div className={`max-w-xl ${isLeft ? "text-right" : "text-left"}`}>
                      {/* Image */}
                      {node.image && (
                        <div
                          className={`relative w-[512px] aspect-video rounded-lg overflow-hidden bg-surface-elevated border border-border cursor-pointer group mb-3 ${
                            isLeft ? "ml-auto" : "mr-auto"
                          }`}
                          onClick={() => setModalImage(node.image!)}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={node.image}
                            alt={node.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          {/* Hover overlay */}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                                <svg
                                  className="w-4 h-4 text-gray-900"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                                  />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Text Content */}
                      <div>
                        <span className="text-sm font-semibold text-accent">{node.year}</span>
                        <h3 className="text-lg font-semibold text-text-primary mt-1 mb-1">
                          {node.title}
                        </h3>
                        <p className="text-text-secondary text-sm leading-relaxed">
                          {node.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Horizontal connector line */}
                  <div
                    className={`absolute top-2 h-0.5 bg-gradient-to-r ${
                      isLeft
                        ? "from-transparent to-accent/60 right-1/2 w-8 mr-2"
                        : "from-accent/60 to-transparent left-1/2 w-8 ml-2"
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Layout - Vertical */}
        <div className="md:hidden relative">
          {/* Timeline Line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent/20 via-accent/60 to-accent/20" />

          {/* Nodes */}
          <div className="space-y-8">
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
                {/* Node Circle */}
                <div
                  className={`absolute left-4 w-4 h-4 rounded-full border-2 transition-all duration-300 -translate-x-1/2 mt-1 ${
                    hoveredIndex === index
                      ? "bg-accent border-accent scale-150 shadow-lg shadow-accent/50"
                      : "bg-surface-elevated border-accent/60"
                  }`}
                >
                  <div
                    className={`absolute inset-1 rounded-full transition-colors ${
                      hoveredIndex === index ? "bg-white" : "bg-accent/60"
                    }`}
                  />
                </div>

                {/* Content */}
                <div>
                  {/* Image */}
                  {node.image && (
                    <div
                      className="relative w-full aspect-video rounded-lg overflow-hidden bg-surface-elevated border border-border cursor-pointer group mb-3"
                      onClick={() => setModalImage(node.image!)}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={node.image}
                        alt={node.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />
                    </div>
                  )}

                  <span className="text-sm font-semibold text-accent">{node.year}</span>
                  <h3 className="text-base font-semibold text-text-primary mt-1 mb-1">
                    {node.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {node.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {modalImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 animate-fade-in"
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
            className="relative max-w-6xl w-full max-h-[90vh] overflow-auto rounded-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={modalImage}
              alt="Full size preview"
              className="w-full h-auto rounded-xl"
            />
          </div>
        </div>
      )}
    </>
  );
}
