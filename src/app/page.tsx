import Link from "next/link";
import Image from "next/image";
import { getAllProjects } from "@/lib/projects";

export const revalidate = 0;

export default async function HomePage() {
  const projects = await getAllProjects();

  const redactionProject = projects.find(p => p.slug === 'redaction-studio') || projects[0];
  const otherProjects = projects.filter(p => p.slug !== 'redaction-studio');

  return (
    <main className="min-h-screen bg-background text-text-primary selection:bg-accent/30">
      {/* Header */}
      <header className="px-6 md:px-12 lg:px-20 pt-8 pb-8 md:pt-12">
        <nav className="max-w-7xl mx-auto flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-lg font-medium tracking-tight hover:text-accent transition-colors">Portfolio</Link>
            <Link href="/cv" className="text-lg font-medium tracking-tight text-text-secondary hover:text-accent transition-colors">CV</Link>
          </div>
          <a
            href="mailto:hello@example.com"
            className="text-text-secondary hover:text-accent transition-colors"
          >
            Contact
          </a>
        </nav>
      </header>

      {/* Intro Section */}
      <section className="px-6 md:px-12 lg:px-20 pt-6 pb-8 md:pt-16 md:pb-12 lg:pt-20 lg:pb-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8 animate-fade-in-up">

            <div className="text-lg md:text-xl text-text-secondary leading-relaxed w-full mb-12 space-y-6">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
                Designing Trust for <span className="text-accent">Mission-Critical Systems.</span>
              </h1>

              <p>
                As a <strong className="text-white">Product Designer</strong> at <strong className="text-white">Axon</strong>, I design end-to-end experiences for Digital Evidence Management Systems (DEMS), specializing in AI-assisted workflows including Performance optimization, Auto-Tagging, and Redaction—the masking of sensitive information in evidence.
              </p>

              <p>
                Often navigating ambiguous, high-scale problem spaces, I led the experience redesign for <strong className="text-white">'Redaction 2.0'</strong>—reimagining a critical workflow to eliminate user friction and churn. By focusing on intuitive interaction, I streamlined how users process video, image, and audio with greater precision.
              </p>

              <p>
                My design philosophy centers on <strong className="text-white">Human-AI collaboration</strong>; I build transparent, trustworthy interfaces that maintain user control while leveraging automation. Previously, I shaped digital wallet products at <strong className="text-white">helloPay</strong> (acquired by Ant Financial), designing scalable and user-friendly payment flows across diverse markets.
              </p>

              <p>
                I enjoy simplifying complexity, aligning cross-functional teams, vibe coding high-fidelity prototypes. It’s the workflow I use to build live sites—like this one—and functional products for clients.
              </p>

              <div className="border-l-4 border-accent pl-6 py-2 mt-8">
                <p className="text-xl md:text-2xl font-serif italic text-white/90">
                  "Give me a one-page spec, and I’ll deliver a production-ready solution."
                </p>
              </div>
            </div>



            <Link
              href="#work"
              className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-8 text-sm font-medium text-black transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ring-offset-background"
            >
              View Work
            </Link>
          </div>

          {/* Portrait */}
          <div className="lg:col-span-4 lg:mt-20 animate-fade-in-up stagger-1">
            <div className="relative aspect-[3/4] w-full max-w-sm mx-auto lg:ml-auto rounded-2xl overflow-hidden bg-surface-elevated border border-white/10 shadow-2xl">
              <Image
                src="/me.png"
                alt="Portrait of Product Designer"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority
              />
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-accent/20 rounded-full blur-[100px]" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Case Study - Redaction 2.0 */}
      <section id="work" className="px-6 md:px-12 lg:px-20 py-10 md:py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-sm font-bold text-accent uppercase tracking-widest mb-12 opacity-80 animate-fade-in">Featured Work</h2>

          {redactionProject && (
            <Link href={`/project/${redactionProject.slug}`} className="group relative block w-full rounded-2xl overflow-hidden bg-surface-elevated border border-white/10 hover:border-accent/50 transition-all duration-500 shadow-2xl animate-fade-in-up">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:h-[600px]">

                {/* Text Info */}
                <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center order-2 md:order-1 relative z-10 bg-surface-elevated/90 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none transition-transform duration-500 md:group-hover:translate-x-2">
                  <div className="mb-6">
                    <span className="inline-block px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-wider mb-4">
                      Case Study
                    </span>
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                      Redaction Studio
                    </h3>
                    <p className="text-lg text-text-secondary leading-relaxed mb-8 max-w-md">
                      Redaction 2.0 — An AI-powered rebuild that solved legacy issues and improved speed by 70%.
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-3 text-white font-medium group-hover:text-accent transition-colors">
                    <span>View Case Study</span>
                    <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>

                {/* Image Banner */}
                <div className="relative order-1 md:order-2 h-64 md:h-full overflow-hidden">
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-black/80 via-transparent to-transparent z-10" />

                  {/* Fallback image if project thumbnail isn't ideal or we want specifically the one from MDX */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://www.dropbox.com/scl/fi/xmn41hrnadjwp8mgp3s9u/Redaction-2.0.png?rlkey=n62jr0fqkezbzj960yfwgj647&raw=1"
                    alt="Redaction Studio Interface"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

              </div>
            </Link>
          )}
        </div>
      </section>

      {/* More Work (Optional / Secondary) */}
      {
        otherProjects.length > 0 && (
          <section className="px-6 md:px-12 lg:px-20 py-16 border-t border-white/5">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-sm font-bold text-text-muted uppercase tracking-widest mb-10">More Work</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {otherProjects.map((project) => (
                  <Link
                    key={project.slug}
                    href={`/project/${project.slug}`}
                    className="group block rounded-xl overflow-hidden bg-surface border border-white/5 hover:border-accent/50 transition-all hover:-translate-y-1"
                  >
                    <div className="aspect-video bg-surface-elevated relative overflow-hidden">
                      {project.thumbnail ? (
                        <Image
                          src={project.thumbnail}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-white/5 flex items-center justify-center">
                          <span className="text-text-muted text-xs uppercase">Preview</span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors">{project.title}</h3>
                      <p className="text-text-secondary text-sm line-clamp-2">{project.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )
      }

      {/* Footer */}
      <footer className="px-6 md:px-12 lg:px-20 py-10 border-t border-white/10 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-sm">
            © {new Date().getFullYear()} All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <Link href="/cv" className="text-text-secondary hover:text-white transition-colors text-sm font-medium">
              CV
            </Link>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-white transition-colors text-sm font-medium">
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </main >
  );
}
