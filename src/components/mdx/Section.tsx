"use client";

import { ReactNode } from "react";

interface SectionProps {
  title: string;
  children: ReactNode;
}

export default function Section({ title, children }: SectionProps) {
  return (
    <section className="mb-16 animate-fade-in-up">
      <h2 className="text-2xl md:text-3xl font-semibold text-text-primary mb-6 pb-4 border-b border-border">
        {title}
      </h2>
      <div className="prose-custom text-text-secondary">
        {children}
      </div>
    </section>
  );
}
