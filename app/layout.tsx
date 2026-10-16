import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "@fontsource-variable/archivo/wdth.css";
import "@fontsource-variable/manrope";
import "./globals.css";
import Providers from "./components/Providers";
import Stage from "./components/Stage";
import SmoothScroll from "./components/SmoothScroll";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import CursorLabel from "./components/CursorLabel";

export const metadata: Metadata = {
  title: { default: "Satish Shrestha — Full-stack developer", template: "%s — Satish Shrestha" },
  description:
    "Full-stack developer in Kathmandu working across the MERN stack and Django. Selected projects, stack and contact.",
};

export const viewport: Viewport = { themeColor: "#a3a4a8" };

// Runs before paint so the saved (or system) theme never flashes.
const themeInit = `try{var t=localStorage.getItem("theme");if(t!=="dark"&&t!=="light"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="light"}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Script id="theme-init" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: themeInit }} />
        <a href="#main" className="skip-link">Skip to content</a>
        <Providers>
          <Stage />
          <SmoothScroll />
          <Nav />
          <div style={{ position: "relative", zIndex: "var(--z-content)" }}>{children}</div>
          <Footer />
          <CursorLabel />
        </Providers>
      </body>
    </html>
  );
}
