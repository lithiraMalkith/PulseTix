import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PULSE/tix — Live events, unforgettable nights",
  description:
    "Discover and book tickets for music festivals, concerts and immersive shows worldwide.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
