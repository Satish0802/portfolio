"use client";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Layout, Server, Database, Wrench, Plus } from "lucide-react";

const categories = [
  {
    key: "Frontend",
    icon: Layout,
    blurb: "Interfaces that stay fast and readable as they grow.",
    items: ["React.js", "Next.js", "Tailwind CSS", "TypeScript"],
  },
  {
    key: "Backend",
    icon: Server,
    blurb: "APIs and auth flows built to hold up under real use.",
    items: ["Node.js", "Express.js", "Python", "Django", "REST APIs", "JWT"],
  },
  {
    key: "Database",
    icon: Database,
    blurb: "Modeling data so queries stay simple later, not just now.",
    items: ["MongoDB", "Mongoose", "PostgreSQL", "SQLite"],
  },
  {
    key: "Tools",
    icon: Wrench,
    blurb: "The everyday kit that keeps a project shippable.",
    items: ["Git", "GitHub", "ESLint", "dotenv"],
  },
];

export default function Stack() {
  const reduce = useReducedMotion();
  const [openKey, setOpenKey] = useState(categories[0].key);

  return (
    <div className="flex flex-col">
      {categories.map((cat, i) => {
        const isOpen = openKey === cat.key;
        const Icon = cat.icon;
        return (
          <div key={cat.key} className={i > 0 ? "border-t border-[var(--line)]" : ""}>
            <button
              onClick={() => setOpenKey(isOpen ? "" : cat.key)}
              className="focus-ring flex w-full items-center justify-between gap-4 py-6 text-left"
              aria-expanded={isOpen}
            >
              <span className="flex items-center gap-4">
                <span
                  className={
                    "grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-colors " +
                    (isOpen ? "border-accent bg-accent text-[var(--accent-ink)]" : "border-[var(--line)] text-muted")
                  }
                >
                  <Icon size={17} />
                </span>
                <span className="text-2xl font-semibold tracking-tight sm:text-4xl">{cat.key}</span>
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--line)] text-muted"
              >
                <Plus size={16} />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="rounded-[20px] bg-[color-mix(in_srgb,var(--foreground)_5%,transparent)] p-5 sm:p-6">
                    <p className="max-w-md text-sm leading-6 text-muted">{cat.blurb}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {cat.items.map((item) => (
                        <span key={item} className="tag-pill bg-surface">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
