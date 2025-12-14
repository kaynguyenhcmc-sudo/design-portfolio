import type { MDXComponents } from 'mdx/types';
import HeroImage from '@/components/mdx/HeroImage';
import Section from '@/components/mdx/Section';
import KPIGroup from '@/components/mdx/KPIGroup';
import KPI from '@/components/mdx/KPI';
import MockupImage from '@/components/mdx/MockupImage';
import QuoteCarousel from '@/components/mdx/QuoteCarousel';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Custom components
    HeroImage,
    Section,
    KPIGroup,
    KPI,
    MockupImage,
    QuoteCarousel,
    // Override default elements
    h1: ({ children }) => (
      <h1 className="text-4xl md:text-5xl font-semibold text-text-primary mb-6 leading-tight">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl md:text-3xl font-semibold text-text-primary mb-4 mt-12">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold text-text-primary mb-3 mt-8">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-text-secondary text-lg leading-relaxed mb-6">
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-outside ml-6 mb-6 space-y-2 text-text-secondary text-lg">
        {children}
      </ul>
    ),
    li: ({ children }) => (
      <li className="leading-relaxed">{children}</li>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-text-primary">{children}</strong>
    ),
    ...components,
  };
}
