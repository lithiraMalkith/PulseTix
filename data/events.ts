export type EventItem = {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  category: string;
  price: number;
  image: string;
  description: string;
  lineup: string[];
};

export const events: EventItem[] = [
  {
    id: "neon-pulse",
    title: "Neon Pulse Festival",
    date: "Jun 14, 2026",
    time: "21:00",
    venue: "Skyline Arena",
    city: "Berlin",
    category: "Electronic",
    price: 79,
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=80",
    description:
      "A night of pulsating beats, neon lights, and immersive visuals featuring top international DJs and producers.",
    lineup: ["Aurora Synth", "Kx9", "Nova Drift", "Pulsewave"],
  },
  {
    id: "midnight-jazz",
    title: "Midnight Jazz Sessions",
    date: "Jul 02, 2026",
    time: "20:30",
    venue: "Velvet Hall",
    city: "Paris",
    category: "Jazz",
    price: 55,
    image:
      "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?auto=format&fit=crop&w=1600&q=80",
    description:
      "An intimate evening of contemporary jazz with smoky vocals, brass solos, and improvisational magic.",
    lineup: ["The Marlow Trio", "Ines Carré", "Blue Room Quartet"],
  },
  {
    id: "indie-horizons",
    title: "Indie Horizons",
    date: "Aug 18, 2026",
    time: "18:00",
    venue: "Riverside Park",
    city: "Amsterdam",
    category: "Indie",
    price: 45,
    image:
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1600&q=80",
    description:
      "Open-air indie festival celebrating emerging artists across guitar-driven, dream pop, and folk genres.",
    lineup: ["Halcyon Daze", "Pale Atlas", "Foxglove", "Mira & The Tides"],
  },
  {
    id: "techno-vault",
    title: "Techno Vault",
    date: "Sep 09, 2026",
    time: "23:00",
    venue: "Underground 7",
    city: "Detroit",
    category: "Techno",
    price: 65,
    image:
      "https://images.unsplash.com/photo-1714589334427-fb015b709c51?auto=format&fit=crop&w=1600&q=80",
    description:
      "Raw, industrial techno deep in the city's iconic underground vault. Strict no-phone policy on the floor.",
    lineup: ["Ferrum", "Subgrid", "Nine Volts"],
  },
  {
    id: "sunset-soul",
    title: "Sunset Soul",
    date: "Oct 05, 2026",
    time: "17:30",
    venue: "Coastal Pavilion",
    city: "Lisbon",
    category: "Soul",
    price: 50,
    image:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1600&q=80",
    description:
      "Golden-hour soul and R&B by the sea — silky vocals, live brass, and a sunset you won't forget.",
    lineup: ["Liana Reyes", "Brass Theory", "Otis Vale"],
  },
  {
    id: "orchestral-cinema",
    title: "Orchestral Cinema",
    date: "Nov 22, 2026",
    time: "19:30",
    venue: "Grand Theatre",
    city: "Vienna",
    category: "Classical",
    price: 90,
    image:
      "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1600&q=80",
    description:
      "A 60-piece orchestra performs the most iconic film scores of the last 50 years in a candlelit theatre.",
    lineup: ["Vienna Film Symphonia", "Conductor: H. Weiss"],
  },
];
