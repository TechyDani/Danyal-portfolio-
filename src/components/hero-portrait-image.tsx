"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function HeroPortraitImage() {
  const [hydrated, setHydrated] = useState(false);
  const [shouldPlay, setShouldPlay] = useState(false);
  const [videoState, setVideoState] = useState<
    "loading" | "playing" | "finished" | "failed"
  >("loading");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setHydrated(true);
    setShouldPlay(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (!shouldPlay || !videoRef.current) return;

    const video = videoRef.current;
    let active = true;

    // Muting before play also enables inline autoplay on iOS.
    video.muted = true;
    video.play().catch(() => {
      if (active) setVideoState("failed");
    });

    return () => {
      active = false;
    };
  }, [shouldPlay]);

  // Image extensions can insert overlay siblings before React hydrates.
  // Mount the image afterward so the initial server and client trees match.
  if (!hydrated) return null;

  // Keep the decoded final frame on screen after playback. Swapping layers at
  // the end can subtly change color or transparency, even with the same image.
  const showVideo = videoState === "playing" || videoState === "finished";

  return (
    <>
      <Image
        src="/images/danyal-hero-last-frame.webp"
        alt="Danyal Khan, creative director and multidisciplinary creative"
        width={1000}
        height={1000}
        unoptimized
        preload
        sizes="(max-width: 700px) 100vw, 48vw"
        className={`portrait-image portrait-still${showVideo ? " is-hidden" : ""}`}
      />
      {shouldPlay && (
        <video
          ref={videoRef}
          className={`portrait-image portrait-video${showVideo ? " is-visible" : ""}`}
          width={1000}
          height={1000}
          autoPlay
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          onPlaying={() => setVideoState("playing")}
          onEnded={() => setVideoState("finished")}
          onError={() => setVideoState("failed")}
        >
          {/* Safari uses HEVC with alpha; Chrome and Firefox use WebM with alpha. */}
          <source
            src="/videos/danyal-hero.mov"
            type='video/quicktime; codecs="hvc1"'
          />
          <source
            src="/videos/danyal-hero.webm"
            type='video/webm; codecs="vp9"'
          />
        </video>
      )}
    </>
  );
}
