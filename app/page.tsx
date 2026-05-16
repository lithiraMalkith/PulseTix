"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SiteNav } from "@/components/SiteNav";
import { events } from "@/data/events";

const HeroScene = dynamic(() => import("@/components/HeroScene").then((m) => m.HeroScene), {
  ssr: false,
});

export default function Home() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const featRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(headlineRef.current?.querySelectorAll(".word") ?? [], {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.08,
      })
        .from(subRef.current, { y: 30, opacity: 0, duration: 0.8 }, "-=0.5")
        .from(ctaRef.current, { y: 20, opacity: 0, duration: 0.6 }, "-=0.4");

      // Featured cards animation using ScrollTrigger and "power2.inOut" ease (powerin) + blur filter
      gsap.from(featRef.current?.querySelectorAll(".feat-card") ?? [], {
        scrollTrigger: {
          trigger: featRef.current,
          start: "top 85%",
        },
        y: 60,
        opacity: 0,
        filter: "blur(10px)",
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
      });
    });
    return () => ctx.revert();
  }, []);

  const featured = events.slice(0, 3);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <SiteNav />

      <section className="relative h-screen w-full">
        <div className="absolute inset-0">
          <HeroScene />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background pointer-events-none" />

        <div className="relative z-10 h-full flex flex-col justify-center max-w-7xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground mb-6">
            Season 26 · Now booking
          </p>
          <h1 ref={headlineRef} className="text-6xl md:text-8xl font-bold leading-[0.95] tracking-tight max-w-4xl">
            <span className="word inline-block mr-4">Feel</span>
            <span className="word inline-block mr-4">the</span>
            <span
              className="word inline-block"
              style={{
                backgroundImage: "var(--gradient-hero)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
              }}
            >
              pulse
            </span>
            <br />
            <span className="word inline-block mr-4">of</span>
            <span className="word inline-block mr-4">every</span>
            <span className="word inline-block">night.</span>
          </h1>
          <p ref={subRef} className="mt-8 text-lg md:text-xl text-muted-foreground max-w-xl">
            Tickets to the world&apos;s most electric festivals, intimate jazz sessions and one-night-only spectacles.
          </p>
          <div ref={ctaRef} className="mt-10 flex gap-4">
            <Link
              href="/events"
              className="px-8 py-4 rounded-full bg-[var(--gradient-hero)] text-white font-semibold shadow-[var(--shadow-glow)] hover:scale-105 transition-transform"
            >
              Browse events
            </Link>
            <a
              href="#featured"
              className="px-8 py-4 rounded-full border border-white/15 text-foreground font-semibold hover:bg-white/5 transition-colors"
            >
              See what&apos;s on
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-muted-foreground animate-pulse">
          Scroll
        </div>
      </section>

      <section id="featured" className="relative max-w-7xl mx-auto px-6 py-32">
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground mb-3">Hand-picked</p>
            <h2 className="text-4xl md:text-5xl font-bold">Featured tonight</h2>
          </div>
          <Link href="/events" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            View all →
          </Link>
        </div>

        <div ref={featRef} className="grid md:grid-cols-3 gap-6">
          {featured.map((e) => (
            <Link
              key={e.id}
              href={`/events/${e.id}`}
              className="feat-card group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] hover:border-white/20 transition-colors"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img src={e.image} alt={e.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                  {e.category} · {e.city}
                </p>
                <h3 className="text-2xl font-bold mb-1">{e.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {e.date} · from ${e.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/5 py-10 text-center text-xs text-muted-foreground">
        © 2026 PULSE/tix — Demo prototype
      </footer>
    </div>
  );
}
