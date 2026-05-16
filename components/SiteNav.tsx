"use client";

import Link from "next/link";

export function SiteNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/40 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight">
          <span
            style={{
              backgroundImage: "var(--gradient-hero)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
            }}
          >
            PULSE
          </span>
          <span className="text-foreground">/tix</span>
        </Link>
        <div className="flex items-center gap-8 text-sm">
          <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
            Home
          </Link>
          <Link href="/events" className="text-muted-foreground hover:text-foreground transition-colors">
            Events
          </Link>
          <button className="px-4 py-2 rounded-full bg-[var(--gradient-hero)] text-white text-xs font-semibold hover:opacity-90 transition-opacity">
            Sign in
          </button>
        </div>
      </div>
    </nav>
  );
}
