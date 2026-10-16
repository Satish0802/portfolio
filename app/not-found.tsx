import Link from "next/link";
import Btn from "./components/Btn";

export default function NotFound() {
  return (
    <main id="main" className="sheet sheet-a" style={{ marginTop: "var(--gutter)", borderRadius: "var(--radius-sheet)", minHeight: "calc(100dvh - var(--gutter) * 2)", display: "grid", placeItems: "center", textAlign: "center", padding: "6rem 1.5rem" }}>
      <div>
        <p className="display outline-text" style={{ fontSize: "clamp(7rem, 26vw, 22rem)" }}>404</p>
        <p className="muted mt-6">That page drifted away.</p>
        <div className="mt-8 flex justify-center"><Btn href="/">Back home</Btn></div>
        <Link href="/" className="sr-only">Home</Link>
      </div>
    </main>
  );
}
