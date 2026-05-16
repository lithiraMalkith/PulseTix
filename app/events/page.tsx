"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { SiteNav } from "@/components/SiteNav";
import { events } from "@/data/events";

export default function EventsPage() {
  const [filter, setFilter] = useState<string>("All");
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(events.map((e) => e.category)))],
    []
  );
  const filtered = filter === "All" ? events : events.filter((e) => e.category === filter);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <header className="max-w-7xl mx-auto px-6 pt-32 pb-12">
        <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground mb-3">
          {filtered.length} upcoming
        </p>
        <h1 className="text-5xl md:text-6xl font-bold">All events</h1>

        <div className="mt-10 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-4 py-2 rounded-full text-sm border transition-all ${
                filter === c
                  ? "bg-[var(--gradient-hero)] text-white border-transparent"
                  : "border-white/10 text-muted-foreground hover:text-foreground hover:border-white/30"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((e) => (
            <Link
              key={e.id}
              href={`/events/${e.id}`}
              className="group rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02] hover:border-white/30 transition-all"
            >
              <div className="aspect-video overflow-hidden">
                <img src={e.image} alt={e.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-2 uppercase tracking-wider">
                  <span>{e.category}</span>
                  <span>{e.date}</span>
                </div>
                <h3 className="text-xl font-bold mb-1">{e.title}</h3>
                <p className="text-sm text-muted-foreground">{e.venue} · {e.city}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-semibold">${e.price}</span>
                  <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">Book →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
