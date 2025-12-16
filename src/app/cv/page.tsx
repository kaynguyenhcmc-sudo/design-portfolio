import Link from "next/link";
import Image from "next/image";
import BackToTop from "@/components/BackToTop";

export const metadata = {
    title: "Resume | Khue Nguyen",
    description: "Product Designer Resume - Khue Nguyen",
};

export default function ResumePage() {
    return (
        <main className="min-h-screen bg-background text-text-primary selection:bg-accent/30 flex flex-col items-center py-20 px-6">

            {/* Navigation */}
            <div className="w-full max-w-4xl mb-8 flex justify-between items-center print:hidden">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-text-secondary hover:text-accent transition-colors group"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
                        <path d="M19 12H5" />
                        <path d="M12 19l-7-7 7-7" />
                    </svg>
                    Back to Portfolio
                </Link>

                <a
                    href="/KhueNguyen_CV.pdf"
                    download
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 text-sm font-medium text-white transition-all hover:bg-white/10 hover:border-accent/40"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Download CV
                </a>
            </div>

            <div className="w-full max-w-4xl bg-surface p-8 md:p-12 rounded-lg shadow-2xl border border-white/5 mx-auto print:shadow-none print:border-none print:bg-white print:text-black">

                {/* Header */}
                <header className="flex flex-col md:flex-row justify-between items-start mb-12 gap-8">
                    <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                        <div className="relative w-32 h-32 shrink-0 rounded-full overflow-hidden border-2 border-white/10 print:border-gray-300 shadow-xl">
                            <Image
                                src="/me.png"
                                alt="Khue Nguyen"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 print:text-black tracking-tight">Khue Nguyen</h1>
                            <p className="text-xl md:text-2xl text-accent font-medium mb-4 print:text-black">Product Designer</p>

                            <div className="space-y-1.5 text-text-secondary print:text-gray-700 text-base">
                                <p>bichkhue.nguyen@gmail.com</p>
                                <p>+84 903 477 106</p>
                                <div className="flex gap-4 justify-center md:justify-start pt-1">
                                    <Link href="/" className="hover:text-accent border-b border-transparent hover:border-accent transition-colors">portfolio.com</Link>
                                    <a href="#" className="hover:text-accent border-b border-transparent hover:border-accent transition-colors">linkedin</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-8 md:w-1/3 text-sm pt-1">
                        <div>
                            <h3 className="text-accent font-bold uppercase tracking-wider mb-3 print:text-black print:font-bold">Skills</h3>
                            <ul className="text-text-secondary space-y-1.5 print:text-gray-700 leading-relaxed">
                                <li>Product Design Interaction</li>
                                <li>Design UX Strategy</li>
                                <li>Systems Thinking</li>
                                <li>Prototyping</li>
                                <li>Dashboard & Data Visualization</li>
                                <li>AI-assisted UX</li>
                                <li>User Research & Usability Testing</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-accent font-bold uppercase tracking-wider mb-3 print:text-black print:font-bold">Tools</h3>
                            <p className="text-text-secondary print:text-gray-700 leading-relaxed">
                                Figma Design, Figma Make, Cursor, Adobe CS, Jira, Google Suite, Gemini 3, ChatGPT
                            </p>
                        </div>
                    </div>
                </header>

                {/* Summary */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4 print:text-black print:border-black">Summary</h2>
                    <p className="text-text-secondary leading-relaxed mb-4 text-lg print:text-gray-800">
                        Product Designer with 7+ years of experience designing complex, mission-critical, data-heavy systems at scale. Owns end-to-end UX across Redaction, Performance, Auto-Tagging, and Cases within the Axon Evidence platform. Strong systems thinker with deep experience in AI-assisted workflows, dashboard and data-driven design, and cross-functional leadership.
                    </p>
                    <p className="font-bold text-white text-lg print:text-black">
                        From one-page spec to production: I own complex problems end to end.
                    </p>
                </section>

                {/* Experience */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold text-white mb-8 border-b border-white/10 pb-4 print:text-black print:border-black">Work Experience</h2>

                    {/* Axon */}
                    <div className="mb-12">
                        <div className="flex flex-col md:flex-row justify-between mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-white print:text-black">Axon</h3>
                                <p className="text-text-secondary italic">Aug 2022 - Present</p>
                            </div>
                            <div className="md:text-right">
                                <h4 className="text-lg font-semibold text-accent print:text-black">Product Designer</h4>
                                <p className="text-sm text-text-secondary print:text-gray-600">Ho Chi Minh City, Vietnam</p>
                            </div>
                        </div>

                        <p className="text-text-secondary mb-6 text-sm">
                            Digital Evidence Extensions | Subdivision of Digital Evidence Management Systems pillar
                        </p>

                        <div className="space-y-8 pl-4 border-l border-white/10 print:border-gray-300">
                            {/* Redaction Studio */}
                            <div>
                                <h5 className="font-bold text-white mb-2 print:text-black">Axon Redaction Studio - Major platform redesign</h5>
                                <ul className="list-disc list-outside ml-4 text-text-secondary space-y-1 mb-3 print:text-gray-800 text-sm md:text-base">
                                    <li>Led end-to-end UX for Redaction 2.0, a full rebuild addressing customer churn and critical usability gaps.</li>
                                    <li>Partnered with product leadership to define vision, MVP scope, and rollout strategy.</li>
                                    <li>Designed an AI-powered redaction experience improving speed, accuracy, and review clarity across video, image, and audio evidence.</li>
                                    <li>Led discovery and usability validation of bulk-first and rapid-review workflows in collaboration with PM, Engineering, and AI/ML.</li>
                                </ul>
                                <div className="bg-surface-elevated/50 p-3 rounded text-sm print:bg-gray-100">
                                    <p className="font-semibold text-accent mb-1 print:text-black">Impact</p>
                                    <ul className="list-none space-y-0.5 text-text-secondary print:text-gray-700">
                                        <li>• +12% AI-assisted sessions, -12% non-AI sessions post-launch.</li>
                                        <li>• +10% agency adoption.</li>
                                        <li>• 17% of AI sessions initiated via bulk selection.</li>
                                        <li>• Designed to support ~70% reduction in total redaction time.</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Autotagging */}
                            <div>
                                <h5 className="font-bold text-white mb-2 print:text-black">Axon AI Auto-Tagging — Mobile & Desktop</h5>
                                <ul className="list-disc list-outside ml-4 text-text-secondary space-y-1 mb-3 print:text-gray-800 text-sm md:text-base">
                                    <li>Led UX for AI Auto-Tagging across mobile and desktop, enabling faster evidence triage through AI-generated metadata.</li>
                                    <li>Owned delivery from problem definition through research, prototyping, validation, and engineering handoff.</li>
                                    <li>Designed review workflows that communicate AI confidence and support easy acceptance, correction, or dismissal of tags.</li>
                                    <li>Partnered with Product, Engineering, and AI/ML to align UX with model behavior and rollout strategy.</li>
                                </ul>
                                <div className="bg-surface-elevated/50 p-3 rounded text-sm print:bg-gray-100">
                                    <p className="font-semibold text-accent mb-1 print:text-black">Impact</p>
                                    <ul className="list-none space-y-0.5 text-text-secondary print:text-gray-700">
                                        <li>• Delivered a unified Auto-Tagging experience across devices.</li>
                                        <li>• Improved clarity and trust in AI suggestions.</li>
                                        <li>• Established reusable AI-review patterns for future automation features.</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Performance */}
                            <div>
                                <h5 className="font-bold text-white mb-2 print:text-black">Axon Performance — AI Assisted Video Review, Sentiment & Dashboards</h5>
                                <ul className="list-disc list-outside ml-4 text-text-secondary space-y-1 mb-3 print:text-gray-800 text-sm md:text-base">
                                    <li>Owned UX for the Performance app, spanning AI-assisted video review, sentiment insights, and dashboards.</li>
                                    <li>Led discovery, prototyping, and validation shaping sentiment taxonomy, data models, and AI workflows.</li>
                                    <li>Delivered platform modernization and future-state concepts ahead of 2026 development.</li>
                                </ul>
                                <div className="bg-surface-elevated/50 p-3 rounded text-sm print:bg-gray-100">
                                    <p className="font-semibold text-accent mb-1 print:text-black">Impact (Foundational)</p>
                                    <ul className="list-none space-y-0.5 text-text-secondary print:text-gray-700">
                                        <li>• Established the UX and data-design foundation for AI-powered Performance features.</li>
                                        <li>• Reduced risk by validating sentiment categories and safeguards before model development.</li>
                                        <li>• Defined scalable dashboard and visualization patterns for future Performance initiatives.</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Cases */}
                            <div>
                                <h5 className="font-bold text-white mb-2 print:text-black">Axon Cases | Digital Evidence Management Systems pillar</h5>
                                <ul className="list-disc list-outside ml-4 text-text-secondary space-y-1 mb-3 print:text-gray-800 text-sm md:text-base">
                                    <li>Designed Case folders, evidence suggestions, case templates, and settings, improving structure and usability for investigative workflows.</li>
                                    <li>Established reusable patterns aligned across Axon Evidence and Axon Justice.</li>
                                </ul>
                            </div>

                            {/* Achievements */}
                            <div>
                                <h5 className="font-bold text-accent mb-2 print:text-black">Selected Achievements</h5>
                                <ul className="list-none space-y-1 text-text-secondary print:text-gray-800">
                                    <li>• AI Innovation Award | Top-voted idea</li>
                                    <li>• Axon Product Design AI Enablement Day</li>
                                </ul>
                            </div>

                        </div>
                    </div>

                    {/* HelloPay */}
                    <div>
                        <div className="flex flex-col md:flex-row justify-between mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-white print:text-black">helloPay <span className="text-text-secondary font-normal">(acquired by Ant Financial)</span></h3>
                                <p className="text-text-secondary italic">2015 - 2021</p>
                            </div>
                            <div className="md:text-right">
                                <h4 className="text-lg font-semibold text-accent print:text-black">UX Designer / Researcher</h4>
                                <p className="text-sm text-text-secondary print:text-gray-600">Ho Chi Minh City, Vietnam</p>
                            </div>
                        </div>
                        <ul className="list-disc list-outside ml-4 text-text-secondary space-y-1 mt-4 print:text-gray-800 text-sm md:text-base">
                            <li>Designed end-to-end checkout, payments, and wallet experiences across mobile apps, mobile web, and desktop platforms.</li>
                            <li>Led user research including stakeholder interviews, usability testing, and competitive analysis.</li>
                            <li>Worked cross-functionally with Product Management, Business Development, Engineering, and Customer Support.</li>
                            <li>Synthesized regional market insights across Southeast Asia into actionable product recommendations.</li>
                        </ul>
                    </div>
                </section>

                {/* Education */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4 print:text-black print:border-black">Education</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="text-white font-bold print:text-black">Wizeline UX Academy</h4>
                            <p className="text-text-secondary print:text-gray-700">UX Design Training</p>
                        </div>
                        <div>
                            <h4 className="text-white font-bold print:text-black">DPI Center</h4>
                            <p className="text-text-secondary print:text-gray-700">Graphic & Multimedia Design</p>
                        </div>
                        <div>
                            <h4 className="text-white font-bold print:text-black">Keyframe Training HCM</h4>
                            <p className="text-text-secondary print:text-gray-700">Motion Graphics</p>
                        </div>
                        <div>
                            <h4 className="text-white font-bold print:text-black">University of Dalat</h4>
                            <p className="text-text-secondary print:text-gray-700">English</p>
                        </div>
                    </div>
                </section>

                {/* Footer Actions */}
                <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/10 print:hidden">
                    <BackToTop />
                    <a
                        href="/KhueNguyen_CV.pdf"
                        download
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 text-sm font-medium text-white transition-all hover:bg-white/10 hover:border-accent/40"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        Download CV
                    </a>
                </div>

            </div>
        </main >
    );
}
