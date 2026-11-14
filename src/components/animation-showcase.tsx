"use client";

import { ChevronLeft, ChevronRight, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { animations } from "@/lib/animations";
import { SectionLabel } from "./ui";

function AnimationCard({
  animation,
  active,
  paused,
  duplicate,
  onActivate,
  onDeactivate,
}: {
  animation: (typeof animations)[number];
  active: boolean;
  paused: boolean;
  duplicate: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}) {
  const card = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(false);
  const [audible, setAudible] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
      if (entry.isIntersecting) setLoaded(true);
    }, { threshold: 0.05 });
    if (card.current) observer.observe(card.current);
    const onVisibilityChange = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const player = video.current;
    if (!player || !loaded) return;
    player.muted = !active || !visible || !pageVisible;
    if (!visible || !pageVisible || (paused && !active)) {
      player.pause();
      return;
    }
    // Some browsers require a click before allowing audio on hover.
    void player.play().catch(() => {
      player.muted = true;
      void player.play().catch(() => {});
    });
    return () => { player.muted = true; };
  }, [active, loaded, pageVisible, paused, visible]);

  function toggleSound() {
    const player = video.current;
    if (!player) return;
    if (audible) {
      player.muted = true;
      onDeactivate();
    } else {
      onActivate();
      player.muted = false;
      // Run directly in the click handler to retain the browser's user gesture.
      void player.play().catch(() => {
        player.muted = true;
        void player.play().catch(() => {});
      });
    }
  }

  return (
    <div
      ref={card}
      className="animation-card"
      style={{ width: `calc(var(--animation-height) * ${animation.aspectRatio})` }}
      data-active={active}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") onActivate();
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") onDeactivate();
      }}
      onFocus={(event) => {
        if (event.target.matches(":focus-visible")) onActivate();
      }}
      onBlur={onDeactivate}
    >
      <div className="animation-video-frame">
        <video
          ref={video}
          src={loaded ? `/videos/animations/${animation.file}.mp4` : undefined}
          muted
          loop
          playsInline
          preload={loaded ? "metadata" : "none"}
          aria-label={`${animation.title} — ${animation.subtitle}`}
          onVolumeChange={() => setAudible(video.current ? !video.current.muted : false)}
        >
          Your browser does not support embedded videos.
        </video>
        <span className="animation-card-tag">MOTION / SELECTED WORK</span>
        <button
          type="button"
          className="animation-sound-toggle"
          tabIndex={duplicate ? -1 : 0}
          aria-label={`${audible ? "Mute" : "Play with sound"}: ${animation.title} ${animation.subtitle}`}
          aria-pressed={audible}
          onClick={toggleSound}
        >
          {audible ? <Volume2 size={16} /> : <VolumeX size={16} />}
          <span>{audible ? "Sound on" : "Sound off"}</span>
        </button>
      </div>
      <div className="animation-card-caption">
        <h3>{animation.title}</h3>
        <span>{animation.subtitle}</span>
      </div>
    </div>
  );
}

export function AnimationShowcase({ sectionNumber = "03" }: { sectionNumber?: string }) {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [keyboardFocus, setKeyboardFocus] = useState(false);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const viewport = useRef<HTMLDivElement>(null);
  const originalGroup = useRef<HTMLDivElement>(null);
  const cycleWidth = useRef(0);
  const expectedScroll = useRef(0);
  const automaticPosition = useRef(0);
  const resumeAfter = useRef(0);
  const pointerDown = useRef(false);
  const touchDown = useRef(false);
  const motionPaused = paused || reducedMotion || hovered || keyboardFocus || activeCard !== null;

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const scroller = viewport.current;
    const group = originalGroup.current;
    if (!scroller || !group) return;
    let initialized = false;
    const measure = () => {
      const previousWidth = cycleWidth.current;
      const width = group.getBoundingClientRect().width;
      cycleWidth.current = width;
      if (!initialized) {
        // Starting at the repeated set lets the videos travel left to right.
        scroller.scrollLeft = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : width;
        initialized = true;
      } else if (previousWidth && previousWidth !== width) {
        scroller.scrollLeft = scroller.scrollLeft / previousWidth * width;
      }
      expectedScroll.current = scroller.scrollLeft;
      automaticPosition.current = scroller.scrollLeft;
    };
    const resize = new ResizeObserver(measure);
    resize.observe(group);
    resize.observe(scroller);
    const visibility = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.05 });
    visibility.observe(scroller);
    const onPageVisibility = () => setPageVisible(!document.hidden);
    const releasePointer = () => {
      if (!pointerDown.current) return;
      pointerDown.current = false;
      resumeAfter.current = performance.now() + 1800;
    };
    const releaseTouch = (event: TouchEvent) => {
      if (!touchDown.current || event.touches.length > 0) return;
      touchDown.current = false;
      resumeAfter.current = performance.now() + 1800;
    };
    document.addEventListener("visibilitychange", onPageVisibility);
    window.addEventListener("pointerup", releasePointer);
    window.addEventListener("pointercancel", releasePointer);
    window.addEventListener("touchend", releaseTouch, { passive: true });
    window.addEventListener("touchcancel", releaseTouch, { passive: true });
    onPageVisibility();
    measure();
    return () => {
      resize.disconnect();
      visibility.disconnect();
      document.removeEventListener("visibilitychange", onPageVisibility);
      window.removeEventListener("pointerup", releasePointer);
      window.removeEventListener("pointercancel", releasePointer);
      window.removeEventListener("touchend", releaseTouch);
      window.removeEventListener("touchcancel", releaseTouch);
    };
  }, []);

  useEffect(() => {
    const scroller = viewport.current;
    if (!scroller || motionPaused || !inView || !pageVisible) return;
    let frame = 0;
    let previousTime = 0;
    function advance(time: number) {
      if (!scroller) return;
      const elapsed = previousTime ? Math.min(time - previousTime, 64) : 0;
      previousTime = time;
      if (!pointerDown.current && !touchDown.current && time >= resumeAfter.current && cycleWidth.current > 0) {
        // Keep subpixel progress even when a browser rounds scrollLeft.
        let next = automaticPosition.current - elapsed / 1000 * (cycleWidth.current / 110);
        if (next <= 0) next += cycleWidth.current;
        automaticPosition.current = next;
        scroller.scrollLeft = next;
        expectedScroll.current = scroller.scrollLeft;
      }
      frame = window.requestAnimationFrame(advance);
    }
    frame = window.requestAnimationFrame(advance);
    return () => window.cancelAnimationFrame(frame);
  }, [motionPaused, inView, pageVisible]);

  function holdAutomaticMotion() {
    resumeAfter.current = performance.now() + 1800;
  }

  function scrollReel(direction: -1 | 1) {
    const scroller = viewport.current;
    if (!scroller) return;
    holdAutomaticMotion();
    setActiveCard(null);
    const maximum = scroller.scrollWidth - scroller.clientWidth;
    if (direction < 0 && scroller.scrollLeft <= 1) {
      scroller.scrollLeft = reducedMotion ? maximum : cycleWidth.current;
      if (reducedMotion) return;
    } else if (direction > 0 && scroller.scrollLeft >= maximum - 1) {
      scroller.scrollLeft = reducedMotion ? 0 : scroller.scrollLeft - cycleWidth.current;
      if (reducedMotion) return;
    }
    scroller.scrollBy({ left: direction * scroller.clientWidth * 0.75, behavior: reducedMotion ? "auto" : "smooth" });
  }

  return (
    <section
      id="animation-work"
      className="animation-showcase section-space"
      aria-labelledby="animation-heading"
      data-paused={motionPaused}
      onFocusCapture={(event) => {
        if (!event.target.matches(":focus-visible")) return;
        setKeyboardFocus(true);
        const scroller = viewport.current;
        if (scroller && event.target === scroller && scroller.scrollLeft >= cycleWidth.current) {
          scroller.scrollLeft -= cycleWidth.current;
          expectedScroll.current = scroller.scrollLeft;
          automaticPosition.current = scroller.scrollLeft;
        }
      }}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setKeyboardFocus(false);
      }}
    >
      <div className="container">
        <SectionLabel>{sectionNumber} / Animation & motion</SectionLabel>
        <div className="section-heading animation-heading">
          <div>
            <h2 id="animation-heading">
              Ideas, set in motion.
              <br />
              <span className="muted">Made to move you.</span>
            </h2>
            <p>Brand stories, animated worlds, and a little personality.</p>
          </div>
          <div className="animation-controls" role="group" aria-label="Animation reel controls">
          <button type="button" className="animation-nav" aria-label="Scroll animations left" aria-controls="animation-reel" onClick={() => scrollReel(-1)}><ChevronLeft size={18} aria-hidden="true" /></button>
          <button type="button" className="animation-nav" aria-label="Scroll animations right" aria-controls="animation-reel" onClick={() => scrollReel(1)}><ChevronRight size={18} aria-hidden="true" /></button>
          <button
            type="button"
            className="animation-motion-toggle"
            aria-pressed={paused}
            onClick={() => {
              setPaused((value) => !value);
              setActiveCard(null);
              setKeyboardFocus(false);
              resumeAfter.current = 0;
            }}
          >
            {paused ? <Play size={14} /> : <Pause size={14} />}
            {paused ? "Resume reel" : "Pause reel"}
          </button>
          </div>
        </div>
      </div>
      <div
        id="animation-reel"
        ref={viewport}
        className="animation-viewport"
        role="region"
        aria-label="Animation videos"
        aria-describedby="animation-reel-hint"
        tabIndex={0}
        onPointerEnter={(event) => { if (event.pointerType === "mouse") setHovered(true); }}
        onPointerLeave={(event) => { if (event.pointerType === "mouse") setHovered(false); }}
        onPointerDownCapture={() => { pointerDown.current = true; holdAutomaticMotion(); }}
        onTouchStartCapture={() => { touchDown.current = true; holdAutomaticMotion(); }}
        onTouchMoveCapture={holdAutomaticMotion}
        onTouchEndCapture={(event) => {
          if (event.touches.length === 0) {
            touchDown.current = false;
            holdAutomaticMotion();
          }
        }}
        onTouchCancelCapture={() => { touchDown.current = false; holdAutomaticMotion(); }}
        onWheel={holdAutomaticMotion}
        onScroll={(event) => {
          const position = event.currentTarget.scrollLeft;
          if (Math.abs(position - expectedScroll.current) > 0.01) {
            holdAutomaticMotion();
            setActiveCard(null);
            automaticPosition.current = position;
          }
          expectedScroll.current = position;
        }}
      >
        <div className="animation-track">
          {[0, 1].map((copy) => (
            <div ref={copy === 0 ? originalGroup : undefined} className="animation-group" key={copy} aria-hidden={copy === 1 || undefined}>
              {animations.map((animation) => {
                const id = `${copy}-${animation.file}`;
                return (
                  <AnimationCard
                    key={id}
                    animation={animation}
                    duplicate={copy === 1}
                    active={activeCard === id}
                    paused={paused || reducedMotion}
                    onActivate={() => setActiveCard(id)}
                    onDeactivate={() => setActiveCard((current) => current === id ? null : current)}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <div className="animation-footnote container">
        <span>08 PROJECTS / ENDLESS POSSIBILITIES</span>
        <p id="animation-reel-hint"><span className="animation-desktop-hint">Scroll to explore. Hover to pause & hear a video. Tap sound to listen.</span><span className="animation-touch-hint">Swipe left or right to explore. Tap sound to listen.</span></p>
      </div>
    </section>
  );
}
