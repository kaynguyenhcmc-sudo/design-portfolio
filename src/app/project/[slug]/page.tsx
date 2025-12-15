import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/projects";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";

// Import MDX components
import HeroImage from "@/components/mdx/HeroImage";
import HeroVideo from "@/components/mdx/HeroVideo";
import Section from "@/components/mdx/Section";
import KPIGroup from "@/components/mdx/KPIGroup";
import KPI from "@/components/mdx/KPI";
import MockupImage from "@/components/mdx/MockupImage";
import QuoteCarousel from "@/components/mdx/QuoteCarousel";
import VideoEmbed from "@/components/mdx/VideoEmbed";
import TimelineInfographic from "@/components/mdx/TimelineInfographic";
import BeforeAfterCarousel from "@/components/mdx/BeforeAfterCarousel";

export const revalidate = 0;

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

// MDX components mapping
const components = {
  HeroImage,
  HeroVideo,
  Section,
  KPIGroup,
  KPI,
  MockupImage,
  QuoteCarousel,
  VideoEmbed,
  TimelineInfographic,
  BeforeAfterCarousel,
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-4xl md:text-5xl font-semibold text-text-primary mb-6 leading-tight">
      {children}
    </h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-2xl md:text-3xl font-semibold text-text-primary mb-4 mt-12">
      {children}
    </h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-xl font-semibold text-text-primary mb-3 mt-8">
      {children}
    </h3>
  ),
  p: ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
    <p className="text-text-secondary text-lg leading-relaxed mb-6" style={style}>
      {children}
    </p>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="list-disc list-outside ml-6 mb-6 space-y-2 text-text-secondary text-lg">
      {children}
    </ul>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <li className="leading-relaxed">{children}</li>
  ),
  strong: ({ children }: { children: React.ReactNode }) => (
    <strong className="font-semibold text-text-primary">{children}</strong>
  ),
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="border-l-4 border-accent pl-6 my-6 italic text-text-secondary">
      {children}
    </blockquote>
  ),
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // Read the MDX file
  const mdxPath = path.join(process.cwd(), "src", "content", "projects", slug, "index.mdx");
  const fileContent = fs.readFileSync(mdxPath, "utf-8");
  const { content, data } = matter(fileContent);

  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-md">
        <div className="px-6 md:px-12 lg:px-20 py-4">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <Link href="/" className="back-button flex items-center gap-2 text-text-secondary">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              <span>Back</span>
            </Link>
            <div className="text-sm text-text-muted">{project.timeline}</div>
          </div>
        </div>
        {/* Gradient border */}
        <div className="h-1 bg-gradient-to-r from-accent/20 via-accent/60 to-accent/20" />
      </nav>

      {/* Header */}
      <header className="px-6 md:px-12 lg:px-20 pt-12 pb-10 md:pt-16 md:pb-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center gap-3 mb-4 animate-fade-in">
            <span className="tag">{project.role}</span>
            <span className="text-text-muted">•</span>
            <span className="text-text-muted text-sm">{project.timeline}</span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-text-primary leading-tight mb-4 animate-fade-in-up">
            {data.title || project.title}
          </h1>

          <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-3xl animate-fade-in-up stagger-1">
            {data.description || project.description}
          </p>
        </div>
      </header>

      {/* MDX Content */}
      <article className="px-6 md:px-12 lg:px-20 pb-20">
        <div className="max-w-5xl mx-auto">
          <MDXRemote
            source={content}
            components={components}
          />
        </div>
      </article>

      {/* CTA Section */}
      <section className="px-6 md:px-12 lg:px-20 py-16 md:py-20 bg-surface border-t border-border">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-text-primary mb-4">
            Interested in working together?
          </h2>
          <p className="text-text-secondary mb-8">
            I&apos;m always open to discussing new projects and opportunities.
          </p>
          <a
            href="mailto:hello@example.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-gray-900 font-medium rounded-lg transition-all hover:scale-105"
          >
            <span>Get in touch</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-12 lg:px-20 py-8 border-t border-border">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-text-secondary hover:text-accent transition-colors text-sm">
            ← Back to all projects
          </Link>
          <p className="text-text-muted text-sm">
            © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </main>
  );
}
