"use client";

import { useState } from "react";

interface EducationEntry {
  degree: string;
  institution: string;
  period: string;
  url: string;
  note?: string;
}

const educationData: EducationEntry[] = [
  {
    degree: "Bachelor of Computer Application",
    institution: "Your College Name",
    period: "2022 – 2026",
    url: "https://your-college-official-site.edu",
    note: "BCA · MERN focus",
  },
  // add more entries here
];

function EducationRow({ entry }: { entry: EducationEntry }) {
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col gap-1 py-3">
      <span className="text-sm text-muted font-mono">{entry.period}</span>
      <span className="text-base text-foreground">{entry.degree}</span>

      <span
        className="relative inline-block w-fit cursor-pointer border-b border-dotted border-muted text-accent"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
        tabIndex={0}
      >
        {entry.institution}

        <div
          className={`absolute left-0 top-full z-10 mt-2 w-max max-w-[240px] rounded-md bg-surface px-3 py-2 text-xs text-foreground shadow-lg transition-opacity duration-150 ${
            show ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          {entry.note && <p className="mb-1 text-muted">{entry.note}</p>}
          <a
            href={entry.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            visit site ↗
          </a>
        </div>
      </span>
    </div>
  );
}

export default function Education() {
  return (
    <section className="flex flex-col divide-y divide-muted/20">
      {educationData.map((entry) => (
        <EducationRow key={entry.institution} entry={entry} />
      ))}
    </section>
  );
}