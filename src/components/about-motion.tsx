"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "@/app/about/about.module.css";

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export function AboutMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const page = root.current;
    if (!page) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let cleanUpMotion = () => {};

    function configureMotion() {
      cleanUpMotion();
      if (!page || preference.matches) return;

      const reveals = Array.from(page.querySelectorAll<HTMLElement>("[data-animate]"));
      const parallax = Array.from(page.querySelectorAll<HTMLElement>("[data-parallax]"));
      const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.visible = "true";
            observer.unobserve(entry.target);
          }
        }
      }, { threshold: 0.08, rootMargin: "0px 0px -16px 0px" });

      let frame = 0;
      function updateScroll() {
        frame = 0;
        if (!page) return;
        const viewport = window.innerHeight;
        const bounds = page.getBoundingClientRect();
        const progress = clamp(-bounds.top / Math.max(1, bounds.height - viewport), 0, 1);
        const offsets = parallax.map((element) => {
          const top = element.parentElement?.getBoundingClientRect().top ?? 0;
          return window.innerWidth > 900 ? clamp((viewport / 2 - top) * Number(element.dataset.parallax), -14, 14) : 0;
        });
        page.style.setProperty("--about-progress", String(progress));
        parallax.forEach((element, index) => element.style.setProperty("--parallax-y", `${offsets[index]}px`));
      }
      function requestUpdate() {
        if (!frame) frame = window.requestAnimationFrame(updateScroll);
      }

      page.dataset.motion = "ready";
      reveals.forEach((element) => observer.observe(element));
      window.addEventListener("scroll", requestUpdate, { passive: true });
      window.addEventListener("resize", requestUpdate);
      updateScroll();

      cleanUpMotion = () => {
        observer.disconnect();
        window.cancelAnimationFrame(frame);
        window.removeEventListener("scroll", requestUpdate);
        window.removeEventListener("resize", requestUpdate);
        delete page.dataset.motion;
        page.style.removeProperty("--about-progress");
        parallax.forEach((element) => element.style.removeProperty("--parallax-y"));
      };
    }

    configureMotion();
    preference.addEventListener("change", configureMotion);
    return () => {
      cleanUpMotion();
      preference.removeEventListener("change", configureMotion);
    };
  }, []);

  return <div className={styles.page} ref={root}>{children}</div>;
}
