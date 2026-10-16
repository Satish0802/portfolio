import { ArrowUpRight } from "lucide-react";
import { projects } from "../lib/projects";
import ProjectCard from "./ProjectCard";
import SectionTitle from "./SectionTitle";
import Reveal from "./Reveal";
import { GithubIcon } from "./Icons";

export default function Work() {
  const [a, b, c] = projects;
  return (
    <section id="work" aria-label="Selected work" className="sheet sheet-b">
      <div className="sheet__pad">
        <div className="wrap">
          <SectionTitle ghost="Portfolio" label="selected work" note={`${projects.length} builds · 2026`} />

          <div className="grid gap-x-8 gap-y-20 lg:grid-cols-12">
            {a && <ProjectCard project={a} index={0} className="lg:col-span-7" />}
            {b && <ProjectCard project={b} index={1} className="lg:col-span-5 lg:mt-36" />}
            {c && <ProjectCard project={c} index={2} className="lg:col-span-5 lg:col-start-2 lg:-mt-10" />}
            <Reveal className="min-w-0 lg:col-span-5 lg:col-start-8 lg:mt-24">
              <a
                href="https://github.com/Satish0802"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="Open"
                className="more-tile"
                style={{ aspectRatio: "16 / 11" }}
              >
                <span className="more-tile__glyph" aria-hidden="true"><GithubIcon size={600} /></span>
                <span className="more-tile__title">More on<br />GitHub</span>
                <span className="more-tile__arrow" aria-hidden="true"><ArrowUpRight size={22} strokeWidth={1.75} /></span>
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
