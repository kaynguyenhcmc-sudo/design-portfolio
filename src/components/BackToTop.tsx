"use client";

export default function BackToTop() {
    return (
        <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-text-secondary hover:text-accent transition-colors text-sm"
        >
            ↑ Back on top
        </button>
    );
}
