"use client";

import { useEffect, useRef, useState, type FocusEvent, type PointerEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Asterisk, BookOpen, Clapperboard, Code2, Globe2, GraduationCap, Layers3, LayoutGrid, MessageCircle, Palette, Pause, Play } from "lucide-react";
import styles from "./about-hero.module.css";

const disciplines = [
  { id: "design", label: "Design", word: "DESIGN", line: "Giving ideas a visual language.", icon: Palette },
  { id: "motion", label: "Motion", word: "MOTION", line: "Making stories move, and ideas feel alive.", icon: Clapperboard },
  { id: "build", label: "Build", word: "BUILD", line: "Connecting thoughtful design with useful technology.", icon: Code2 },
] as const;
const chapters = [
  { label: "My story", href: "#story", icon: BookOpen },
  { label: "What I do", href: "#expertise", icon: Layers3 },
  { label: "Experience", href: "#experience", icon: LayoutGrid },
  { label: "Education", href: "#education", icon: GraduationCap },
];

export function AboutHero() {
  const panel = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const pointerFrame = useRef(0);
  const [active, setActive] = useState(0);
  const [manualMode, setManualMode] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [compactMedia, setCompactMedia] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [tileFocused, setTileFocused] = useState(false);
  const [modeFocused, setModeFocused] = useState(false);
  const [loadVideo, setLoadVideo] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const running = !paused && !reducedMotion && visible && pageVisible;
  const interacting = hovered || tileFocused;
  const cycling = running && !manualMode && !interacting && !modeFocused;
  const canPlayVideo = running && active === 1 && (!compactMedia || manualMode);
  const discipline = disciplines[active];

  function resetPointer() {
    window.cancelAnimationFrame(pointerFrame.current);
    pointerFrame.current = 0;
    const scene = stage.current;
    ["--pointer-x", "--pointer-y", "--light-x", "--light-y"].forEach((name) => scene?.style.removeProperty(name));
  }

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compact = window.matchMedia("(max-width: 650px), (pointer: coarse)");
    const updatePreference = () => setReducedMotion(preference.matches);
    const updateVisibility = () => setPageVisible(!document.hidden);
    const updateCompactMedia = () => {
      setCompactMedia(compact.matches);
      if (compact.matches) setHovered(false);
    };
    updatePreference();
    updateVisibility();
    updateCompactMedia();
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.1 });
    const observedScene = stage.current ?? panel.current;
    if (observedScene) observer.observe(observedScene);
    preference.addEventListener("change", updatePreference);
    compact.addEventListener("change", updateCompactMedia);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", updatePreference);
      compact.removeEventListener("change", updateCompactMedia);
      document.removeEventListener("visibilitychange", updateVisibility);
      window.cancelAnimationFrame(pointerFrame.current);
    };
  }, []);

  useEffect(() => {
    if (!cycling) return;
    const timeout = window.setTimeout(() => setActive((index) => (index + 1) % disciplines.length), 5500);
    return () => window.clearTimeout(timeout);
  }, [cycling, active]);

  useEffect(() => {
    if (!running || compactMedia) resetPointer();
  }, [running, compactMedia]);

  useEffect(() => {
    if (canPlayVideo) setLoadVideo(true);
  }, [canPlayVideo]);

  useEffect(() => {
    const player = video.current;
    if (!player || !loadVideo) return;
    if (canPlayVideo && !interacting) void player.play().catch(() => {});
    else player.pause();
  }, [canPlayVideo, loadVideo, interacting]);

  function movePointer(event: PointerEvent<HTMLDivElement>) {
    if (!running || compactMedia || event.pointerType !== "mouse" || pointerFrame.current) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width - 0.5) * 2));
    const y = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height - 0.5) * 2));
    pointerFrame.current = window.requestAnimationFrame(() => {
      pointerFrame.current = 0;
      stage.current?.style.setProperty("--pointer-x", String(x));
      stage.current?.style.setProperty("--pointer-y", String(y));
      stage.current?.style.setProperty("--light-x", `${50 + x * 18}%`);
      stage.current?.style.setProperty("--light-y", `${45 + y * 15}%`);
    });
  }

  function focusTile(event: FocusEvent<HTMLAnchorElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setTileFocused(false);
  }

  return (
    <section className={`${styles.hero} container`} aria-labelledby="about-heading">
      <div ref={panel} className={styles.panel} data-mode={discipline.id} data-running={running && !interacting}>
        <div className={styles.topline}><span><Asterisk size={17} strokeWidth={1.3} aria-hidden="true" /> INSIDE A CREATIVE MIND</span><button type="button" className={styles.motionControl} onClick={() => { if (paused) setManualMode(false); setPaused(!paused); }} aria-pressed={paused} aria-label={paused ? "Resume hero animation" : "Pause hero animation"}>{paused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}{paused ? "Play motion" : "Pause motion"}</button></div>
        <div ref={stage} className={styles.stage} onPointerMove={movePointer} onPointerLeave={resetPointer}>
          <div className={styles.scene}>
          <div className={styles.spotlight} aria-hidden="true" />
          <div className={styles.words} aria-hidden="true">{disciplines.map((item, index) => <span key={item.id} data-active={active === index}>{item.word}<span>.</span></span>)}</div>
          <svg className={styles.orbits} viewBox="0 0 1000 500" fill="none" aria-hidden="true">
            <ellipse cx="500" cy="250" rx="363" ry="177" className={styles.orbitLine} />
            <ellipse cx="500" cy="250" rx="290" ry="222" transform="rotate(-24 500 250)" className={styles.orbitLine} />
            <g className={styles.orbitSpin}><ellipse cx="500" cy="250" rx="335" ry="162" strokeDasharray="2 14" className={styles.orbitDashes} /><circle cx="835" cy="250" r="5" className={styles.orbitDot} /><circle cx="165" cy="250" r="3" className={styles.orbitDot} /></g>
          </svg>
          <div className={styles.portraitLayer}><div className={styles.portrait}><Image src="/images/danyal-khan.png" alt="Danyal Khan, creative director and founder of RevBoost" fill preload sizes="(max-width: 650px) calc(76vw - 32px), (max-width: 850px) calc(44vw - 32px), (min-width: 1440px) 520px, 39vw" className={styles.portraitImage} /></div></div>
          <div className={`${styles.satellite} ${styles.designSatellite}`} data-selected={active === 0}>
            <Link href="/work/brand-kit" className={styles.projectCard} onPointerEnter={(event) => { if (event.pointerType === "mouse") setHovered(true); }} onPointerLeave={(event) => { if (event.pointerType === "mouse") setHovered(false); }} onFocus={() => setTileFocused(true)} onBlur={focusTile} aria-label="Explore the Brand Kit project"><span className={styles.brandImage}><Image src="/images/brand-kit-1.webp" alt="Choti Cheez brand identity guidelines" fill sizes="(max-width: 650px) calc(24vw - 10px), (max-width: 850px) 19vw, 16vw" /></span><span className={styles.projectCaption}><Palette size={13} aria-hidden="true" /> Visual identities</span></Link>
          </div>
          <div className={`${styles.satellite} ${styles.motionSatellite}`} data-selected={active === 1}>
            <Link href="/work#animation-work" className={styles.projectCard} onPointerEnter={(event) => { if (event.pointerType === "mouse") setHovered(true); }} onPointerLeave={(event) => { if (event.pointerType === "mouse") setHovered(false); }} onFocus={() => setTileFocused(true)} onBlur={focusTile} aria-label="Explore my animation and motion work"><span className={styles.videoFrame}><Image src="/images/animations/instyle-dental.jpg" alt="Instyle Dental animation preview" fill sizes="(max-width: 650px) calc(21vw - 9px), (max-width: 850px) 16vw, 13vw" /><video ref={video} src={loadVideo ? "/videos/animations/instyle-dental.mp4" : undefined} muted loop playsInline preload="none" aria-hidden="true" data-ready={videoReady && active === 1} onLoadedData={() => setVideoReady(true)} /></span><span className={styles.projectCaption}><Clapperboard size={13} aria-hidden="true" /> Stories in motion</span><span className={styles.playMark} aria-hidden="true"><Play size={12} fill="currentColor" /></span></Link>
          </div>
          <div className={`${styles.satellite} ${styles.webSatellite}`} data-selected={active === 2}>
            <Link href="/work#websites" className={styles.projectCard} onPointerEnter={(event) => { if (event.pointerType === "mouse") setHovered(true); }} onPointerLeave={(event) => { if (event.pointerType === "mouse") setHovered(false); }} onFocus={() => setTileFocused(true)} onBlur={focusTile} aria-label="Explore the websites I have built"><span className={styles.browserBar} aria-hidden="true"><i /><i /><i /><span>bannuccillc.com</span></span><span className={styles.webImage}><Image src="/images/websites/bannucci-screenshot.webp" alt="Bannucci LLC website" fill sizes="(max-width: 650px) calc(31vw - 13px), (max-width: 850px) 25vw, 23vw" /></span><span className={styles.projectCaption}><Code2 size={13} aria-hidden="true" /> Digital experiences</span></Link>
          </div>
          <span className={styles.creativeNote} aria-hidden="true"><Asterisk size={23} strokeWidth={1.2} /><span>THINK WIDELY.<br />MAKE WITH INTENTION.</span></span>
          </div>
          <div className={styles.identity}><p>DESIGNER. DIRECTOR. BUILDER.</p><h1 id="about-heading">Danyal Khan<span>®</span></h1><span className={styles.identityLine} aria-hidden="true" key={discipline.id}>{discipline.line}</span></div>
        </div>
        <div className={styles.controls}><div className={styles.modeCopy}><span>ONE MIND. DIFFERENT MODES.</span><p>{compactMedia ? "Tap a mode to explore." : "Explore the way I create."}</p></div><div className={styles.modes} role="group" aria-label="Explore creative disciplines" onFocusCapture={() => setModeFocused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setModeFocused(false); }}>{disciplines.map((item, index) => { const Icon = item.icon; return <button type="button" key={item.id} aria-pressed={active === index} onClick={() => { setActive(index); setManualMode(true); }}><Icon size={16} strokeWidth={1.5} aria-hidden="true" />{item.label}<span className={styles.modeProgress} aria-hidden="true" data-cycling={cycling} key={`${item.id}-${active}`} /></button>; })}</div><span className={styles.modeHint}>Pick a mode. See a different side.</span></div>
        <div className={styles.introduction}><p>I’m a multidisciplinary creative connecting design, motion, strategy, and technology. <span>From Islamabad, out into the world.</span></p><div className={styles.actions}><Link href="/work" className={styles.workLink}><LayoutGrid size={16} aria-hidden="true" /> Explore my work</Link><Link href="/contact" className={styles.contactLink}><MessageCircle size={16} aria-hidden="true" /> Let’s talk</Link></div></div>
        <div className={styles.panelFoot}><span><Globe2 size={14} aria-hidden="true" /> Islamabad, Pakistan · Working worldwide</span><span>FOUNDER OF <Link href="#revboost">REVBOOST</Link></span></div>
      </div>
      <nav className={styles.chapterBar} aria-label="Explore the About page">{chapters.map((chapter) => { const Icon = chapter.icon; return <a href={chapter.href} key={chapter.href}><Icon size={16} strokeWidth={1.5} aria-hidden="true" />{chapter.label}</a>; })}</nav>
    </section>
  );
}
