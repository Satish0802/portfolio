import Image from "next/image";
import FluidHover from "./FluidHover";
import type { Project } from "../lib/projects";

/**
 * Cover art for a project. Uses real screenshots when the project has them;
 * otherwise a designed placeholder. Everything is sized in container units
 * (cqw) so the same cover scales from a card to the full-width detail hero.
 */
export default function ProjectCover({ project, priority = false }: { project: Project; priority?: boolean }) {
  if (project.images && project.images.length > 0) return <ScreensCover project={project} priority={priority} />;
  if (project.slug === "chatwave") return <ChatCover />;
  return <RouteCover />;
}

function ScreensCover({ project, priority }: { project: Project; priority: boolean }) {
  const [main, side, third] = project.images ?? [];
  return (
    <FluidHover className="cover cover--screens cover-zoom" lensSrc={main}>
      {main && (
        <div className="screen screen--main">
          <Image src={main} alt={`${project.name} screenshot 1`} width={1600} height={900} sizes="(min-width: 1024px) 45vw, 90vw" priority={priority} />
        </div>
      )}
      {side && (
        <div className="screen screen--side">
          <Image src={side} alt={`${project.name} screenshot 2`} width={1400} height={900} sizes="(min-width: 1024px) 30vw, 60vw" />
        </div>
      )}
      {third && (
        <div className="screen screen--third">
          <Image src={third} alt={`${project.name} screenshot 3`} width={1200} height={900} sizes="(min-width: 1024px) 20vw, 40vw" />
        </div>
      )}
    </FluidHover>
  );
}

function ChatCover() {
  return (
    <FluidHover className="cover cover--chat cover-zoom" role="img" aria-label="Illustration of a chat window with read receipts and a typing indicator">
      <div className="chat">
        <div className="chat__head">
          <span className="chat__ava" /><span className="chat__ava chat__ava--b" />
          <span>#design-crit</span>
          <small>3 online</small>
        </div>
        <span className="chat__msg chat__msg--in">Did the read receipts land?</span>
        <span className="chat__msg chat__msg--out">Yes — acks come back over the socket.</span>
        <span className="chat__seen">Seen ✓✓</span>
        <span className="chat__typing"><i /><i /><i /></span>
      </div>
      <span className="chat-chip chat-chip--a">DMs + channels</span>
      <span className="chat-chip chat-chip--b">Search history</span>
    </FluidHover>
  );
}

function RouteCover() {
  return (
    <FluidHover className="cover cover--route cover-zoom" role="img" aria-label="Illustration of a three-day trip itinerary connected by a route line">
      <svg className="route-svg" viewBox="0 0 100 62.5" preserveAspectRatio="none" aria-hidden="true">
        <path className="route-line" d="M 12 52 C 26 52, 30 30, 46 34 S 68 54, 80 30 S 88 14, 92 12" />
        <path className="route-solid" pathLength="1" d="M 12 52 C 26 52, 30 30, 46 34 S 68 54, 80 30 S 88 14, 92 12" />
      </svg>
      <p className="route-title">Plan<span>the trip</span></p>
      <span className="route-stop" style={{ left: "9cqw", bottom: "8cqw" }}><b>1</b>Day one <small>arrive</small></span>
      <span className="route-stop" style={{ left: "38cqw", top: "27cqw" }}><b>2</b>Day two <small>explore</small></span>
      <span className="route-stop" style={{ right: "6cqw", top: "15cqw" }}><b>3</b>Day three <small>depart</small></span>
    </FluidHover>
  );
}
