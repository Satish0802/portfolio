"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Send } from "lucide-react";
import Btn from "./Btn";

type Status = "idle" | "drafted";
type Errors = Partial<Record<"name" | "email" | "message", string>>;

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();

    const next: Errors = {};
    if (!name) next.name = "Enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Enter a valid email address.";
    if (message.length < 5) next.message = "Write a short message.";
    setErrors(next);
    if (Object.keys(next).length) return;

    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    setStatus("drafted");
    window.location.href = `mailto:satish020820@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === "drafted" ? (
        <motion.div
          key="sent"
          role="status"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-[1.6rem] p-8"
          style={{ background: "color-mix(in srgb, var(--fg) 6%, transparent)" }}
        >
          <span className="mb-5 grid h-12 w-12 place-items-center rounded-full" style={{ background: "var(--accent)", color: "var(--on-accent)" }}>
            <Check size={22} strokeWidth={2} />
          </span>
          <p className="display" style={{ fontSize: "1.9rem", lineHeight: 0.95 }}>Email draft prepared</p>
          <p className="muted mt-3">Your email app should open with the message. Send it there to finish.</p>
          <button onClick={() => setStatus("idle")} className="pill pill--link mt-6">Edit message</button>
        </motion.div>
      ) : (
        <motion.form key="form" onSubmit={handleSubmit} noValidate className="flex w-full flex-col gap-3" exit={{ opacity: 0 }}>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="field">
              <span>Name</span>
              <input name="name" autoComplete="name" placeholder="Your name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "err-name" : undefined} />
              {errors.name && <p id="err-name" className="field-error">{errors.name}</p>}
            </label>
            <label className="field">
              <span>Email</span>
              <input name="email" type="email" autoComplete="email" placeholder="you@company.com" aria-invalid={!!errors.email} aria-describedby={errors.email ? "err-email" : undefined} />
              {errors.email && <p id="err-email" className="field-error">{errors.email}</p>}
            </label>
          </div>
          <label className="field">
            <span>What are we building?</span>
            <textarea name="message" rows={4} placeholder="A role, a project, or an interesting problem…" aria-invalid={!!errors.message} aria-describedby={errors.message ? "err-message" : undefined} />
            {errors.message && <p id="err-message" className="field-error">{errors.message}</p>}
          </label>
          <div className="mt-2 flex flex-wrap items-center gap-4">
            <Btn type="submit" icon={<Send size={16} strokeWidth={1.75} />}>
              Send message
            </Btn>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
