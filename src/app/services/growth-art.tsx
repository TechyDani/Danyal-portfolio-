"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";
import styles from "./services.module.css";

export function GrowthArt() {
  const [paused, setPaused] = useState(false);

  return (
    <div className={styles.art} data-paused={paused}>
      <div className={styles.artGlow} aria-hidden="true" />
      <svg className={styles.sculpture} viewBox="0 0 600 600" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="revboost-metal" x1="155" y1="110" x2="440" y2="465" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1b3b91" />
            <stop offset="0.19" stopColor="#347ef7" />
            <stop offset="0.37" stopColor="#c2e0ff" />
            <stop offset="0.48" stopColor="#628ff0" />
            <stop offset="0.68" stopColor="#2146a4" />
            <stop offset="0.86" stopColor="#75afff" />
            <stop offset="1" stopColor="#163a84" />
          </linearGradient>
          <linearGradient id="revboost-metal-alt" x1="433" y1="170" x2="170" y2="440" gradientUnits="userSpaceOnUse">
            <stop stopColor="#c3dfff" />
            <stop offset="0.25" stopColor="#518ff6" />
            <stop offset="0.5" stopColor="#1d4096" />
            <stop offset="0.72" stopColor="#739ce1" />
            <stop offset="1" stopColor="#19356d" />
          </linearGradient>
          <linearGradient id="revboost-edge" x1="140" y1="100" x2="470" y2="470" gradientUnits="userSpaceOnUse">
            <stop stopColor="#e7f3ff" stopOpacity="0.7" />
            <stop offset="0.6" stopColor="#8bb9ff" stopOpacity="0" />
            <stop offset="1" stopColor="#a4c9ff" stopOpacity="0.5" />
          </linearGradient>
          <filter id="revboost-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="8" dy="22" stdDeviation="14" floodColor="#030c25" floodOpacity="0.7" />
          </filter>
          <radialGradient id="revboost-floor">
            <stop stopColor="#4386fb" stopOpacity="0.32" />
            <stop offset="1" stopColor="#4386fb" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="305" cy="500" rx="190" ry="30" fill="url(#revboost-floor)" />
        <g className={styles.sculptureObject} filter="url(#revboost-shadow)">
          <ellipse cx="300" cy="285" rx="190" ry="83" transform="rotate(-40 300 285)" stroke="url(#revboost-metal)" strokeWidth="49" />
          <ellipse cx="300" cy="285" rx="190" ry="83" transform="rotate(-40 300 285)" stroke="url(#revboost-edge)" strokeWidth="1.5" />
          <ellipse cx="300" cy="285" rx="93" ry="193" transform="rotate(-28 300 285)" stroke="url(#revboost-metal-alt)" strokeWidth="47" />
          <ellipse cx="300" cy="285" rx="93" ry="193" transform="rotate(-28 300 285)" stroke="url(#revboost-edge)" strokeWidth="1.5" />
          <path d="M 161 401 C 93 359 156 249 257 176 C 358 103 465 99 476 159" stroke="url(#revboost-metal)" strokeWidth="49" strokeLinecap="round" />
          <path d="M 161 401 C 93 359 156 249 257 176 C 358 103 465 99 476 159" stroke="url(#revboost-edge)" strokeWidth="1.5" strokeLinecap="round" />
        </g>
        <circle cx="112" cy="166" r="3" fill="#8fbaff" fillOpacity="0.7" />
        <circle cx="482" cy="384" r="3" fill="#8fbaff" fillOpacity="0.7" />
        <path d="M 95 165 H 62 M 483 384 H 531" stroke="#779ad1" strokeOpacity="0.3" />
      </svg>
      <span className={styles.artLabel}>A CONNECTED WAY FORWARD</span>
      <div className={styles.artCaption}><span>Strategy</span><span>Creative</span><span>Technology</span></div>
      <button type="button" className={styles.motionControl} onClick={() => setPaused(!paused)}
        aria-pressed={paused} aria-label={paused ? "Resume decorative motion" : "Pause decorative motion"}>
        {paused ? <Play size={12} aria-hidden="true" /> : <Pause size={12} aria-hidden="true" />}
        <span>{paused ? "Play motion" : "Pause motion"}</span>
      </button>
    </div>
  );
}
