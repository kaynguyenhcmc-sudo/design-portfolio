"use client";

import { useState, useEffect } from "react";

interface Quote {
  quote: string;
  source: string;
}

interface QuoteCarouselProps {
  quotes: Quote[];
  intervalMs?: number;
}

export default function QuoteCarousel({ quotes, intervalMs = 5500 }: QuoteCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % quotes.length);
        setIsAnimating(true);
      }, 100);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [quotes.length, intervalMs]);

  const currentQuote = quotes[currentIndex];

  return (
    <div className="bg-surface-elevated border border-border rounded-xl p-8 md:p-10 mb-8">
      {/* Quote */}
      <div 
        className={`transition-all duration-500 ${isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
      >
        <svg 
          className="w-10 h-10 text-accent/30 mb-4" 
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
        
        <blockquote className="text-lg md:text-xl text-text-primary leading-relaxed mb-4">
          &ldquo;{currentQuote.quote}&rdquo;
        </blockquote>
        
        <cite className="text-sm text-text-muted not-italic">
          — {currentQuote.source}
        </cite>
      </div>

      {/* Dots indicator */}
      <div className="flex items-center justify-center gap-2 mt-8">
        {quotes.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsAnimating(false);
              setTimeout(() => {
                setCurrentIndex(index);
                setIsAnimating(true);
              }, 100);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-accent w-6' 
                : 'bg-text-muted/30 hover:bg-text-muted/50'
            }`}
            aria-label={`Go to quote ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
