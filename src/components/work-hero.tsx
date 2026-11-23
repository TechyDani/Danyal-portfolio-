"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Asterisk, BookOpen, Clapperboard, Globe2, LayoutGrid, Pause, Play } from "lucide-react";
import styles from "./work-hero.module.css";

const shortcuts = [
  { label: "Selected projects", href: "#work-projects", icon: LayoutGrid },
  { label: "Catalogs", href: "#catalogs", icon: BookOpen },
  { label: "Motion", href: "#animation-work", icon: Clapperboard },
  { label: "Websites", href: "#websites", icon: Globe2 },
];
const artwork = [
  { kind: "brand", href: "/work/brand-kit", image: "/images/brand-kit-1.webp", label: "An identity, brought to life.", category: "Branding & design", alt: "Choti Cheez brand guidelines cover", accessibleName: "Explore the Brand Kit project" },
  { kind: "campaign", href: "/work/fast-food-creatives", image: "/images/fast-food-2.webp", label: "Made to catch your eye.", category: "Campaign creative", alt: "Crunchies food campaign artwork", accessibleName: "Explore Fast Food Creatives and Animation" },
  { kind: "catalog", href: "#catalogs", image: "/images/catalogs/pioneer-houseware-cover.webp", label: "A story in every detail.", category: "Catalog design", alt: "Pioneer Plastic Houseware catalog cover", accessibleName: "Explore the catalog design collection" },
  { kind: "web", href: "#websites", image: "/images/websites/bannucci-screenshot.webp", label: "Ideas, brought online.", category: "Web development", alt: "Bannucci LLC website homepage", accessibleName: "Explore websites I have built" },
] as const;

export function WorkHero() {
  const [paused, setPaused] = useState(false);

  return (
    <section className={`${styles.hero} container`} aria-labelledby="work-hero-heading" data-paused={paused}>
      <div className={styles.topline}><p><span /> PORTFOLIO / SELECTED WORK</p><span>A LITTLE CURIOSITY GOES A LONG WAY.</span></div>
      <div className={styles.composition}>
        <div className={styles.copy}>
          <span className={styles.kicker}>THINK IT. MAKE IT. PUT IT OUT THERE.</span>
          <h1 id="work-hero-heading">Ideas, out<br /><span>in the wild.</span></h1>
          <p>Design, motion, and digital experiences.<br />Different mediums. One considered point of view.</p>
          <div className={styles.actions}>
            <a href="#work-projects" className={styles.exploreButton}><LayoutGrid size={17} strokeWidth={1.5} aria-hidden="true" /> Explore selected work</a>
            <Link href="/contact" className={styles.contactLink}>Have a project in mind?</Link>
          </div>
          <div className={styles.signatureNote}><Asterisk size={27} strokeWidth={1.2} aria-hidden="true" /><span>Some bold. Some unexpected.<br />Every detail, intentional.</span></div>
        </div>
        <div className={styles.board} aria-label="A selection of branding, campaign, catalog, and website work">
          <div className={styles.boardSurface} aria-hidden="true" />
          <Asterisk className={styles.boardMark} strokeWidth={0.75} aria-hidden="true" />
          <span className={styles.boardLabel}>FROM THE STUDIO, OUT INTO THE WORLD.</span>
          {artwork.map((item) => (
            <div className={styles.tileMotion} data-kind={item.kind} key={item.kind}>
              <Link className={styles.tile} href={item.href} aria-label={item.accessibleName}>
                {item.kind === "web" && <span className={styles.browserBar} aria-hidden="true"><span><i /><i /><i /></span><span>bannuccillc.com</span><Globe2 size={11} /></span>}
                <span className={styles.tileImage}><Image src={item.image} alt={item.alt} fill
                  sizes={item.kind === "web" ? "(max-width: 700px) 56vw, 24vw" : "(max-width: 700px) 38vw, 20vw"}
                  preload={item.kind === "brand"} loading={item.kind === "brand" ? undefined : "eager"} /></span>
                <span className={styles.tileCaption}><span>{item.category}</span><span>{item.label}</span></span>
              </Link>
            </div>
          ))}
          <span className={styles.studioTag}><Asterisk size={14} strokeWidth={1.2} aria-hidden="true" /> A FEW THINGS I’VE MADE.</span>
          <button type="button" className={styles.motionControl} aria-pressed={paused}
            aria-label={paused ? "Resume hero artwork motion" : "Pause hero artwork motion"} onClick={() => setPaused(!paused)}>
            {paused ? <Play size={12} aria-hidden="true" /> : <Pause size={12} aria-hidden="true" />} {paused ? "Resume motion" : "Pause motion"}
          </button>
        </div>
      </div>
      <div className={styles.heroFooter}><p>A few different ways<br /><span>to make an idea matter.</span></p><nav aria-label="Jump to a work collection">{shortcuts.map((shortcut) => {
        const Icon = shortcut.icon;
        return <a href={shortcut.href} key={shortcut.href}><Icon size={16} strokeWidth={1.5} aria-hidden="true" />{shortcut.label}</a>;
      })}</nav></div>
    </section>
  );
}
