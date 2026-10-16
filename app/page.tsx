import Hero from "./components/Hero";
import Work from "./components/Work";
import About from "./components/About";
import Skills from "./components/Skills";
import Journey from "./components/Journey";

export default function Home() {
  return (
    <main id="main" tabIndex={-1} style={{ outline: "none" }}>
      <Hero />
      <Work />
      <About />
      <Skills />
      <Journey />
    </main>
  );
}
