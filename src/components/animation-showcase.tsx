"use client";

import { Pause, Play, Volume2, VolumeX } from "lucide-react";
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

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  return (
    <section
      id="animation-work"
      className="animation-showcase section-space"
      aria-labelledby="animation-heading"
      data-paused={paused || activeCard !== null}
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
          <button
            type="button"
            className="animation-motion-toggle"
            aria-pressed={paused}
            onClick={() => {
              setPaused((value) => !value);
              setActiveCard(null);
            }}
          >
            {paused ? <Play size={14} /> : <Pause size={14} />}
            {paused ? "Resume reel" : "Pause reel"}
          </button>
        </div>
      </div>
      <div className="animation-viewport">
        <div className="animation-track">
          {[0, 1].map((copy) => (
            <div className="animation-group" key={copy} aria-hidden={copy === 1 || undefined}>
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
        <p>Hover to pause the reel & hear the video. Tap sound to listen.</p>
      </div>
    </section>
  );
}
