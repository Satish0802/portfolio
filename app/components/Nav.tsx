"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const sections = links
      .map((l) => document.querySelector(l.href))
      .filter((el): el is Element => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between bg-background/80 px-6 py-4 backdrop-blur">
      <a href="#" className="font-display text-base text-foreground">
        Satish Shrestha
      </a>

      <div className="hidden gap-6 sm:flex">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`group relative text-sm ${
              active === link.href ? "text-accent" : "text-foreground"
            }`}
          >
            {link.label}
            <span
              className={`absolute -bottom-1 left-0 h-[1.5px] bg-accent transition-all duration-200 ${
                active === link.href ? "w-full" : "w-0 group-hover:w-full"
              }`}
            />
          </a>
        ))}
        <a href="/resume.pdf" download className="text-sm text-accent hover:underline">
          Resume
        </a>
      </div>

      <button onClick={() => setOpen(!open)} className="sm:hidden" aria-label="Toggle menu">
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full flex w-full flex-col gap-4 bg-surface px-6 py-4 sm:hidden"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm text-foreground"
              >
                {link.label}
              </a>
            ))}
            <a href="/resume.pdf" download className="text-sm text-accent">
              Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}