import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VIGÍA — Cuida tu casa, aunque tú no estés.",
  description:
    "Seguridad inteligente para el hogar. Cámaras, timbres y sistemas DIY que controlas desde una sola app, desde cualquier país.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Lets fixed elements (e.g. the WhatsApp button) account for notches / the
  // home-indicator area via env(safe-area-inset-*) instead of sitting under them.
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-DO">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${plexMono.variable} font-body antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
