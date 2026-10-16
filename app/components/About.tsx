"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useReducedMotion } from "../lib/useSafeReducedMotion";
import SectionTitle from "./SectionTitle";
import Reveal from "./Reveal";

const STATEMENT = "Developer-minded, product-curious, and happiest when there is something real to ship.";

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return <motion.span className="w" style={{ opacity }}>{children}</motion.span>;
}

export default function About() {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.86", "end 0.52"] });
  const words = STATEMENT.split(" ");

  return (
    <section id="about" aria-label="About" className="sheet sheet-a">
      <div className="sheet__pad">
        <div className="wrap">
          <SectionTitle ghost="About" label="about" />

          <p ref={ref} className="statement">
            {words.map((w, i) =>
              reduce ? (
                <span key={i} className="w">{w}</span>
              ) : (
                <Word key={i} progress={scrollYProgress} range={[i / words.length, Math.min(1, (i + 1.4) / words.length)]}>{w}</Word>
              ),
            )}
          </p>

          <div className="about-cols">
            <Reveal>
              <p>
                I&apos;m a full-stack developer working across the MERN stack and Django, based in Kathmandu. I completed structured Full Stack Web Development (MERN Stack) training at Broadway Infosys and put it to work in Carbon Ledger — a carbon-tracking app with real authentication, a live dashboard, and a security audit that caught and fixed an IDOR vulnerability.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <p>
                Alongside personal work, I built Django projects during my BCA and contributed to a MERN group project. I&apos;m looking for internship or junior developer roles where I can keep turning ideas into shipped software.
              </p>
              <ul className="mt-8 flex flex-wrap gap-2">
                <li className="pill">Recent BCA graduate</li>
                <li className="pill">2 shipped personal builds</li>
                <li className="pill">1 security audit</li>
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
