"use client";

import { ArrowUpRight, ChevronLeft, ChevronRight, MoveHorizontal, Pause, Play, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { PointerEvent } from "react";
import Link from "next/link";
import { animations } from "@/lib/animations";
import { SectionLabel } from "./ui";

type MotionProject = (typeof animations)[number];
const PITCH = 196;
const CYCLE = animations.length * PITCH;
const wrap = (value: number, size: number) => ((value % size) + size) % size;
const reelScale = (width: number, height: number) => width <= 820 ? Math.min(width / 640, height / 420) : width / 1440;

// Round each corner of the quad while letting its two edges grow independently.
function cardGeometry(offset: number, halfWidth: number, scale: number) {
  const distance = Math.min(Math.abs(offset) / halfWidth, 1.5);
  const center = offset * (1 + 0.083 * (offset / halfWidth) ** 2);
  const width = 170 + 48 * distance ** 2;
  const edgeHeight = (edge: number) => 280 + 92 * Math.min(Math.abs(edge) / halfWidth, 1.6) ** 2.6;
  const leftHeight = edgeHeight(center - width / 2) * scale;
  const rightHeight = edgeHeight(center + width / 2) * scale;
  const height = Math.max(leftHeight, rightHeight);
  const w = width * scale;
  const r = 15 * scale;
  const tl = (height - leftHeight) / 2;
  const tr = (height - rightHeight) / 2;
  const bl = tl + leftHeight;
  const br = tr + rightHeight;
  const path = `M ${r} ${tl} L ${w - r} ${tr} Q ${w} ${tr} ${w} ${tr + r} L ${w} ${br - r} Q ${w} ${br} ${w - r} ${br} L ${r} ${bl} Q 0 ${bl} 0 ${bl - r} L 0 ${tl + r} Q 0 ${tl} ${r} ${tl} Z`;
  return { center, width: w, height, distance, path };
}

function MotionCard({ project, index, playing, onOpen }: {
  project: MotionProject;
  index: number;
  playing: boolean;
  onOpen: () => void;
}) {
  const card = useRef<HTMLButtonElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.01 });
    if (card.current) observer.observe(card.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (playing && visible) setLoaded(true);
    const player = video.current;
    if (!player) return;
    if (playing && visible && loaded) void player.play().catch(() => {});
    else player.pause();
  }, [loaded, playing, visible]);

  return (
    <button ref={card} type="button" className="animation-card" onClick={onOpen}
      aria-label={`Watch ${project.title}: ${project.subtitle}`}>
      <span className="animation-video-frame" style={{ backgroundImage: `url(/images/animations/${project.file}.jpg)` }}>
        <video ref={video} src={loaded ? `/videos/animations/${project.file}.mp4` : undefined}
          muted loop playsInline preload={loaded ? "metadata" : "none"} aria-hidden="true"
          data-ready={ready} onLoadedData={() => setReady(true)} />
        <span className="animation-card-index">{String(index + 1).padStart(2, "0")} / MOTION</span>
        <span className="animation-card-caption">
          <span className="animation-card-play"><Play size={14} fill="currentColor" aria-hidden="true" /></span>
          <span><strong>{project.title}</strong><span>{project.subtitle}</span></span>
        </span>
      </span>
    </button>
  );
}

export function AnimationShowcase({ sectionNumber = "03" }: { sectionNumber?: string }) {
  const section = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const offset = useRef(0);
  const velocity = useRef(0);
  const draw = useRef<() => void>(() => {});
  const drag = useRef({ active: false, moved: false, id: -1, x: 0, time: 0, startX: 0 });
  const [paused, setPaused] = useState(false);
  // Default to stills until the user's motion preference is known.
  const [reducedMotion, setReducedMotion] = useState(true);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [keyboardFocus, setKeyboardFocus] = useState(false);
  const [selected, setSelected] = useState<MotionProject | null>(null);
  const playing = !paused && !reducedMotion && inView && pageVisible && !selected && !keyboardFocus;

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(preference.matches);
    const visibility = () => setPageVisible(!document.hidden);
    update();
    visibility();
    preference.addEventListener("change", update);
    document.addEventListener("visibilitychange", visibility);
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.05 });
    if (section.current) observer.observe(section.current);
    return () => {
      preference.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", visibility);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const stage = viewport.current;
    if (!stage) return;
    const cards = Array.from(stage.querySelectorAll<HTMLButtonElement>(".animation-card"));
    let width = stage.clientWidth;
    let height = stage.clientHeight;
    draw.current = () => {
      const scale = reelScale(width, height);
      const halfWidth = width / scale / 2 - 14;
      cards.forEach((card, index) => {
        const position = wrap(index * PITCH + offset.current + CYCLE / 2, CYCLE) - CYCLE / 2;
        const geometry = cardGeometry(position, halfWidth, scale);
        const x = width / 2 + geometry.center * scale - geometry.width / 2;
        const y = height / 2 - 12 * geometry.distance ** 2 * scale - geometry.height / 2;
        const onscreen = x + geometry.width > 0 && x < width;
        card.style.width = `${geometry.width}px`;
        card.style.height = `${geometry.height}px`;
        card.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        card.style.clipPath = `path("${geometry.path}")`;
        card.style.visibility = onscreen ? "visible" : "hidden";
        card.tabIndex = onscreen ? 0 : -1;
      });
      stage.dataset.ready = "true";
    };
    const resize = new ResizeObserver(() => {
      width = stage.clientWidth;
      height = stage.clientHeight;
      draw.current();
    });
    resize.observe(stage);
    draw.current();
    return () => { resize.disconnect(); draw.current = () => {}; };
  }, []);

  useEffect(() => {
    if (!playing) return;
    // A long-running WAAPI clock keeps drift independent of display refresh rate.
    const clock = document.documentElement.animate([], { duration: 1e9 });
    let previous = 0;
    let frame = 0;
    const advance = () => {
      const time = Number(clock.currentTime ?? 0);
      const elapsed = previous ? Math.min((time - previous) / 1000, 0.05) : 0;
      previous = time;
      if (!drag.current.active) {
        offset.current = wrap(offset.current + (velocity.current - 50) * elapsed, CYCLE);
        velocity.current *= Math.exp(-3.2 * elapsed);
        if (Math.abs(velocity.current) < 0.5) velocity.current = 0;
        draw.current();
      }
      frame = requestAnimationFrame(advance);
    };
    frame = requestAnimationFrame(advance);
    return () => { cancelAnimationFrame(frame); clock.cancel(); };
  }, [playing]);

  useEffect(() => {
    const root = section.current;
    if (!root || !inView || reducedMotion || root.dataset.entered) return;
    root.dataset.entered = "true";
    const entrances = Array.from(root.querySelectorAll<HTMLElement>("[data-motion-enter]")).map((element, index) =>
      element.animate([
        { opacity: 0, transform: "translateY(22px)", filter: "blur(5px)" },
        { opacity: 1, transform: "translateY(0)", filter: "blur(0)" },
      ], { duration: 700, delay: index * 90, easing: "cubic-bezier(.2,.7,.2,1)", fill: "backwards" }),
    );
    const strokes = Array.from(root.querySelectorAll<SVGPathElement>(".animation-doodle path")).map((path) =>
      path.animate([{ strokeDasharray: "1", strokeDashoffset: 1 }, { strokeDasharray: "1", strokeDashoffset: 0 }],
        { duration: 1100, delay: 500, easing: "ease-out", fill: "backwards" }),
    );
    return () => { entrances.forEach((animation) => animation.cancel()); strokes.forEach((animation) => animation.cancel()); };
  }, [inView, reducedMotion]);

  useEffect(() => {
    if (!selected) return;
    const modal = dialog.current;
    const previousOverflow = document.body.style.overflow;
    modal?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      modal?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [selected]);

  function move(direction: -1 | 1) {
    velocity.current = 0;
    offset.current += direction * PITCH;
    draw.current();
  }

  function startDrag(event: PointerEvent<HTMLDivElement>) {
    if (!event.isPrimary || event.button !== 0) return;
    drag.current = { active: true, moved: false, id: event.pointerId, x: event.clientX, startX: event.clientX, time: event.timeStamp };
    velocity.current = 0;
  }

  function updateDrag(event: PointerEvent<HTMLDivElement>) {
    const pointer = drag.current;
    if (!pointer.active || pointer.id !== event.pointerId) return;
    const scale = reelScale(event.currentTarget.clientWidth, event.currentTarget.clientHeight);
    const delta = (event.clientX - pointer.x) / scale;
    if (!pointer.moved && Math.abs(event.clientX - pointer.startX) > 5) {
      pointer.moved = true;
      event.currentTarget.setPointerCapture(event.pointerId);
      event.currentTarget.dataset.dragging = "true";
    }
    if (pointer.moved) {
      offset.current += delta;
      const elapsed = Math.max(event.timeStamp - pointer.time, 8) / 1000;
      velocity.current = Math.max(-1600, Math.min(1600, delta / elapsed));
      draw.current();
    }
    pointer.x = event.clientX;
    pointer.time = event.timeStamp;
  }

  function endDrag(event: PointerEvent<HTMLDivElement>) {
    if (drag.current.id !== event.pointerId) return;
    drag.current.active = false;
    if (event.type === "pointercancel" || event.timeStamp - drag.current.time > 100) velocity.current = 0;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    event.currentTarget.dataset.dragging = "false";
  }

  return (
    <section ref={section} id="animation-work" className="animation-showcase section-space" aria-labelledby="animation-heading">
      <div className="animation-topline container">
        <SectionLabel>{sectionNumber} / Animation & motion</SectionLabel>
        <span>STORIES THAT DON’T STAND STILL.</span>
      </div>
      <div className="animation-intro container">
        <div className="animation-badge" data-motion-enter><span /> A LITTLE MOTION. A LASTING IMPRESSION.</div>
        <h2 id="animation-heading" data-motion-enter>Ideas, set in motion.<br /><span>Made to move you.</span></h2>
        <p data-motion-enter>Brand stories, animated worlds, and a little personality.<br className="animation-copy-break" /> Thoughtfully crafted. Impossible to scroll past.</p>
        <svg className="animation-doodle animation-spark" viewBox="0 0 50 54" fill="none" aria-hidden="true">
          <path pathLength="1" d="M12 38 24 7M24 45 40 19M5 20 10 8" />
        </svg>
        <div className="animation-side-note" aria-hidden="true">
          <span>Good ideas.<br />Better in motion.</span>
          <svg className="animation-doodle" viewBox="0 0 144 126" fill="none">
            <path pathLength="1" d="M40 8c60 7 91 54 58 78-16 12-35-2-21-14 18-16 45 7 26 43M91 101l11 16 19-10" />
          </svg>
        </div>
      </div>
      <div ref={viewport} id="animation-reel" className="animation-viewport" role="region" aria-roledescription="carousel"
        aria-label="Selected animation projects" aria-describedby="animation-reel-hint" tabIndex={0}
        onPointerDown={startDrag} onPointerMove={updateDrag} onPointerUp={endDrag} onPointerCancel={endDrag}
        onLostPointerCapture={() => { drag.current.active = false; if (viewport.current) viewport.current.dataset.dragging = "false"; }}
        onClickCapture={(event) => {
          if (drag.current.moved && event.detail > 0) {
            event.preventDefault();
            event.stopPropagation();
            drag.current.moved = false;
          }
        }}
        onFocusCapture={(event) => { if (event.target.matches(":focus-visible")) setKeyboardFocus(true); }}
        onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setKeyboardFocus(false); }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            move(event.key === "ArrowLeft" ? 1 : -1);
          }
        }}>
        {animations.map((project, index) => (
          <MotionCard key={project.file} project={project} index={index} playing={playing} onOpen={() => setSelected(project)} />
        ))}
      </div>
      <div className="animation-bottom container">
        <div className="animation-cta-wrap" data-motion-enter>
          <Link href="/contact" className="animation-cta">Let’s make it move <ArrowUpRight size={17} aria-hidden="true" /></Link>
          <div className="animation-cta-note" aria-hidden="true">
            <svg className="animation-doodle" viewBox="0 0 70 44" fill="none"><path pathLength="1" d="M64 30C44 42 24 32 10 9M8 23 8 7l17 4" /></svg>
            <span>Your next story?</span>
          </div>
        </div>
        <div className="animation-footnote">
          <span>{String(animations.length).padStart(2, "0")} PROJECTS / ENDLESS POSSIBILITIES</span>
          <p id="animation-reel-hint"><MoveHorizontal size={14} aria-hidden="true" /> Drag to explore. Click to watch.</p>
          <div className="animation-controls" role="group" aria-label="Animation reel controls">
            <button type="button" className="animation-nav" aria-label="Previous animation" aria-controls="animation-reel" onClick={() => move(1)}><ChevronLeft size={16} aria-hidden="true" /></button>
            <button type="button" className="animation-motion-toggle" aria-pressed={paused} onClick={() => setPaused((value) => !value)}>
              {paused ? <Play size={12} aria-hidden="true" /> : <Pause size={12} aria-hidden="true" />}{paused ? "Resume reel" : "Pause reel"}
            </button>
            <button type="button" className="animation-nav" aria-label="Next animation" aria-controls="animation-reel" onClick={() => move(-1)}><ChevronRight size={16} aria-hidden="true" /></button>
          </div>
        </div>
      </div>
      {selected && (
        <dialog ref={dialog} className="animation-dialog" aria-labelledby="animation-player-title" onClose={() => setSelected(null)}
          onClick={(event) => { if (event.target === event.currentTarget) setSelected(null); }}>
          <div className="animation-player">
            <div className="animation-player-heading"><div><h3 id="animation-player-title">{selected.title}</h3><p>{selected.subtitle}</p></div>
              <button type="button" className="animation-player-close" aria-label="Close video" autoFocus onClick={() => setSelected(null)}><X size={21} /></button>
            </div>
            <video src={`/videos/animations/${selected.file}.mp4`} poster={`/images/animations/${selected.file}.jpg`} autoPlay controls playsInline preload="metadata" />
          </div>
        </dialog>
      )}
    </section>
  );
}
