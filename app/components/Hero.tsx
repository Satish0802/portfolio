"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (

    
    <section className="flex min-h-[80vh] flex-col justify-center gap-4 px-6">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="font-mono text-sm text-accent"
      >
        Hi, I&apos;m
      </motion.p>

      <Image
  src="/profile.jpg"
  alt="Satish Shrestha"
  width={120}
  height={120}
  className="rounded-full border border-muted/30"
  priority
/>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="font-display text-4xl text-foreground sm:text-6xl"
      >
        Satoki
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="max-w-md text-base text-muted"
      >
        Full-stack developer building with the MERN stack — real-time apps,
        secure APIs, and dashboards that make data make sense.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="mt-2 flex gap-4"
      >
        <a
          href="#projects"
          className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-background transition-transform active:scale-[0.97]"
        >
          View Work
        </a>
        <a
          href="#contact"
          className="rounded-md border border-muted/30 px-4 py-2 text-sm font-medium text-foreground transition-transform active:scale-[0.97]"
        >
          Contact
        </a>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="mt-6 font-mono text-xs text-muted"
      >
        2 shipped projects · 1 security audit
      </motion.p>
    </section>
  );
}