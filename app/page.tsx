import Hero from "./components/Hero";
import ProjectCard from "./components/ProjectCard";
import Education from "./components/Education";
import { projects } from "./lib/projects";

export default function Home() {
  return (
    <>
      <Hero />

      <section id="projects" className="grid gap-5 px-6 py-16 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </section>

      <section id="about" className="mx-auto max-w-2xl px-6 py-16">
        <h2 className="font-display text-2xl text-foreground">About</h2>
        <p className="mt-4 text-sm text-muted">
          Full-stack developer working across the MERN stack. Recent BCA graduate,
          currently building and shipping full projects to get interview-ready.
        </p>

        <h3 className="mt-10 font-display text-lg text-foreground">Education</h3>
        <Education />
      </section>
    </>
  );
}