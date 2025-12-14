"use client";

interface HeroImageProps {
  src: string;
  alt: string;
  tagline?: string;
}

export default function HeroImage({ src, alt, tagline }: HeroImageProps) {
  // Convert relative paths to absolute paths for public folder
  const imageSrc = src.startsWith("./") 
    ? src.replace("./", "/projects/redaction-studio/")
    : src;

  return (
    <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden mb-16 animate-fade-in">
      {/* Image - using img tag for better SVG support */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageSrc}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Gradient overlay */}
      <div className="hero-gradient absolute inset-0" />
      
      {/* Tagline */}
      {tagline && (
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <p className="text-lg md:text-xl text-text-secondary max-w-3xl leading-relaxed">
            {tagline}
          </p>
        </div>
      )}
    </div>
  );
}
