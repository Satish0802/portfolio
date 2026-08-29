"use client";

import { useState } from "react";
import { Mail, Phone, Check, Copy } from "lucide-react";

const EMAIL = "satish020820@gmail.com";
    const PHONE = "+977 9861282976"; 

function GithubIcon({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-1.94c-3.2.7-3.87-1.54-3.87-1.54-.53-1.33-1.29-1.69-1.29-1.69-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .3.21.66.79.55A11.5 11.5 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5Z" />
    </svg>
  );
}

function LinkedinIcon({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.59 0 4.25 2.36 4.25 5.44v6.3ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

export default function Footer() {
  const [copied, setCopied] = useState<"email" | "phone" | null>(null);

  const copyValue = async (value: string, field: "email" | "phone") => {
    await navigator.clipboard.writeText(value);
    setCopied(field);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <footer
      id="contact"
      className="flex flex-col items-center gap-4 border-t border-muted/20 px-6 py-10"
    >
      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={() => copyValue(EMAIL, "email")}
          className="flex items-center gap-2 rounded-md border border-muted/30 px-4 py-2 text-sm text-foreground transition-transform active:scale-[0.97]"
        >
          {copied === "email" ? <Check size={14} className="text-accent" /> : <Copy size={14} />}
          {copied === "email" ? "Copied" : EMAIL}
        </button>

        <button
          onClick={() => copyValue(PHONE, "phone")}
          className="flex items-center gap-2 rounded-md border border-muted/30 px-4 py-2 text-sm text-foreground transition-transform active:scale-[0.97]"
        >
          {copied === "phone" ? <Check size={14} className="text-accent" /> : <Copy size={14} />}
          {copied === "phone" ? "Copied" : PHONE}
        </button>
      </div>

      <div className="flex gap-5">
        <a href="https://github.com/Satish0802" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <GithubIcon size={18} className="text-muted hover:text-accent" />
        </a>
        <a href="https://www.linkedin.com/in/satish-shrestha-513582340/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <LinkedinIcon size={18} className="text-muted hover:text-accent" />
        </a>
        <a href={`mailto:${EMAIL}`} aria-label="Email">
          <Mail size={18} className="text-muted hover:text-accent" />
        </a>
        <a href={`tel:${PHONE.replace(/\s/g, "")}`} aria-label="Phone">
          <Phone size={18} className="text-muted hover:text-accent" />
        </a>
      </div>

      <p className="font-mono text-[11px] text-muted">built with Next.js · deployed on Vercel</p>
    </footer>
  );
}