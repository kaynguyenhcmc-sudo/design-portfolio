import Link from "next/link";
import Image from "next/image";
import { getAllProjects } from "@/lib/projects";

export const revalidate = 0;

export default async function HomePage() {
  const projects = await getAllProjects();

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="px-6 md:px-12 lg:px-20 pt-8 pb-20 md:pt-12 md:pb-32">
        <nav className="flex items-center justify-between mb-20 md:mb-28 animate-fade-in">
          <div className="text-lg font-medium tracking-tight">Portfolio</div>
          <a 
            href="mailto:hello@example.com" 
            className="text-text-secondary hover:text-accent transition-colors"
          >
            Contact
          </a>
        </nav>

        <div className="max-w-3xl animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-text-primary leading-[1.1] mb-6">
            Product Designer
          </h1>
          <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
            Designing AI-powered tools and enterprise software that help teams work smarter. 
            Currently focused on digital evidence and public safety.
          </p>
        </div>
      </header>

      {/* Projects */}
      <section className="px-6 md:px-12 lg:px-20 pb-20 md:pb-32">
        <div className="flex items-center gap-4 mb-10 animate-fade-in stagger-2">
          <h2 className="text-sm font-medium text-text-muted uppercase tracking-wider">
            Selected Work
          </h2>
          <div className="flex-1 h-px bg-border" />
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-20 animate-fade-in stagger-3">
            <p className="text-text-secondary mb-2">No projects yet</p>
            <p className="text-text-muted text-sm">
              Add projects in <code className="bg-surface-elevated px-2 py-1 rounded text-xs">src/content/projects/</code>
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {projects.map((project, index) => (
              <Link
                key={project.slug}
                href={`/project/${project.slug}`}
                className="project-card group block rounded-2xl overflow-hidden bg-surface border border-border hover:border-border-hover animate-fade-in-up"
                style={{ animationDelay: `${0.1 * (index + 2)}s` }}
              >
                <div className="flex flex-col md:flex-row">
                  {/* Thumbnail */}
                  <div className="relative w-full md:w-2/5 aspect-[16/10] md:aspect-auto overflow-hidden bg-surface-elevated">
                    <div className="thumbnail-wrapper w-full h-full min-h-[200px] md:min-h-[280px]">
                      {project.thumbnail ? (
                        project.thumbnail.endsWith('.svg') ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            src={project.thumbnail}
                            alt={project.title}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        ) : (
                          <Image
                            src={project.thumbnail}
                            alt={project.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 40vw"
                          />
                        )
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-surface-elevated to-surface">
                          <span className="text-text-muted text-sm">Preview</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6 md:p-8 lg:p-10 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="tag">{project.role}</span>
                      <span className="text-text-muted text-sm">{project.timeline}</span>
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-semibold text-text-primary mb-3 group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-text-secondary leading-relaxed mb-6 line-clamp-2">
                      {project.description}
                    </p>
                    
                    <div className="flex items-center gap-2 text-sm text-text-muted group-hover:text-accent transition-colors">
                      <span>View case study</span>
                      <svg 
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-12 lg:px-20 py-10 border-t border-border">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-sm">
            © {new Date().getFullYear()} All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="mailto:hello@example.com" className="text-text-secondary hover:text-accent transition-colors text-sm">
              Email
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent transition-colors text-sm">
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
