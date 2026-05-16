"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useState } from "react";
import { SiteNav } from "@/components/SiteNav";
import { events } from "@/data/events";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";

const TIERS = [
  { id: "ga", name: "General Admission", multiplier: 1, perk: "Standing access" },
  { id: "vip", name: "VIP", multiplier: 1.8, perk: "Front section + lounge" },
  { id: "backstage", name: "Backstage", multiplier: 3, perk: "Meet & greet + merch" },
] as const;

export default function EventDetail() {
  const params = useParams<{ eventId: string }>();
  const event = events.find((e) => e.id === params.eventId);
  if (!event) notFound();

  const [qty, setQty] = useState(1);
  const [tierId, setTierId] = useState<(typeof TIERS)[number]["id"]>("ga");
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmed, setConfirmed] = useState<null | { ref: string }>(null);

  const tier = TIERS.find((t) => t.id === tierId)!;
  const unitPrice = Math.round(event!.price * tier.multiplier);
  const total = unitPrice * qty;

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    const ref =
      "PLS-" +
      Math.random().toString(36).slice(2, 7).toUpperCase() +
      "-" +
      Date.now().toString(36).slice(-4).toUpperCase();
    setConfirmed({ ref });
  };

  const resetBooking = () => {
    setOpen(false);
    setTimeout(() => {
      setConfirmed(null);
      setName("");
      setEmail("");
    }, 200);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      <div className="relative h-[60vh] w-full overflow-hidden">
        <img src={event!.image} alt={event!.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/40 to-background" />
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-6 pb-12">
          <Link href="/events" className="text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground">
            ← All events
          </Link>
          <p className="mt-4 text-xs uppercase tracking-[0.4em] text-muted-foreground">{event!.category}</p>
          <h1 className="mt-2 text-5xl md:text-7xl font-bold leading-tight">{event!.title}</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {event!.venue} · {event!.city} · {event!.date} · {event!.time}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">About the event</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">{event!.description}</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Lineup</h2>
            <ul className="space-y-2">
              {event!.lineup.map((act: string) => (
                <li key={act} className="flex items-center gap-3 py-3 border-b border-white/5">
                  <span className="w-2 h-2 rounded-full bg-[var(--gradient-hero)]" />
                  <span className="text-lg">{act}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="md:sticky md:top-28 h-fit rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">From</p>
          <p className="mt-1 text-4xl font-bold">${unitPrice}</p>

          <div className="mt-6 space-y-2">
            <Label className="text-sm text-muted-foreground">Ticket tier</Label>
            <div className="grid gap-2">
              {TIERS.map((t) => {
                const active = t.id === tierId;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTierId(t.id)}
                    className={`text-left p-3 rounded-xl border transition-all ${
                      active ? "border-white/40 bg-white/[0.06]" : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm">{t.name}</span>
                      <span className="text-sm">${Math.round(event!.price * t.multiplier)}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{t.perk}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6">
            <Label className="text-sm text-muted-foreground">Quantity</Label>
            <div className="mt-2 flex items-center gap-3">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 rounded-full border border-white/15 hover:bg-white/5">−</button>
              <span className="w-10 text-center text-lg font-semibold">{qty}</span>
              <button onClick={() => setQty(Math.min(8, qty + 1))} className="w-10 h-10 rounded-full border border-white/15 hover:bg-white/5">+</button>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between text-sm border-t border-white/10 pt-4">
            <span className="text-muted-foreground">Total</span>
            <span className="text-xl font-bold">${total}</span>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="mt-6 w-full py-4 rounded-full bg-[var(--gradient-hero)] text-white font-semibold shadow-[var(--shadow-glow)] hover:scale-[1.02] transition-transform"
          >
            Book tickets
          </button>
          <p className="mt-3 text-xs text-muted-foreground text-center">Demo only — no payment processed</p>
        </aside>
      </div>

      <Dialog open={open} onOpenChange={(o) => (o ? setOpen(true) : resetBooking())}>
        <DialogContent className="bg-background border-white/10">
          {!confirmed ? (
            <form onSubmit={handleConfirm}>
              <DialogHeader>
                <DialogTitle>Checkout</DialogTitle>
                <DialogDescription>
                  {qty} × {tier.name} for {event!.title}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Ada Lovelace" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ada@example.com" />
                </div>

                <div className="rounded-xl border border-white/10 p-4 text-sm space-y-2">
                  <div className="flex justify-between"><span className="text-muted-foreground">Tier</span><span>{tier.name}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Quantity</span><span>{qty}</span></div>
                  <div className="flex justify-between border-t border-white/10 pt-2 font-semibold"><span>Total</span><span>${total}</span></div>
                </div>
              </div>

              <DialogFooter>
                <button type="submit" className="w-full py-3 rounded-full bg-[var(--gradient-hero)] text-white font-semibold shadow-[var(--shadow-glow)] hover:scale-[1.02] transition-transform">
                  Confirm booking
                </button>
              </DialogFooter>
            </form>
          ) : (
            <div className="text-center py-4">
              <div className="mx-auto w-14 h-14 rounded-full bg-[var(--gradient-hero)] flex items-center justify-center shadow-[var(--shadow-glow)]">
                <Check className="w-7 h-7 text-white" />
              </div>
              <DialogHeader className="mt-4">
                <DialogTitle className="text-center">Booking confirmed</DialogTitle>
                <DialogDescription className="text-center">
                  We sent {qty} ticket{qty > 1 ? "s" : ""} to {email}.
                </DialogDescription>
              </DialogHeader>
              <div className="mt-6 rounded-xl border border-dashed border-white/20 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Reference</p>
                <p className="mt-1 font-mono text-lg">{confirmed.ref}</p>
              </div>
              <button onClick={resetBooking} className="mt-6 w-full py-3 rounded-full border border-white/15 hover:bg-white/5">Done</button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
