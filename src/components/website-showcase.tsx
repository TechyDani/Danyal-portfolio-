"use client";

import { useState } from "react";
import Link from "next/link";
import { Asterisk, Globe2 } from "lucide-react";
import { websites } from "@/lib/websites";
import { SectionLabel } from "./ui";
import { WebsiteCard } from "./website-card";
import styles from "./development-showcase.module.css";

const filters = ["All websites", "Business", "Services", "Healthcare"] as const;

export function WebsiteShowcase({ sectionNumber = "05" }: { sectionNumber?: string }) {
  const [active, setActive] = useState<(typeof filters)[number]>("All websites");
  const filtered = websites.filter((website) => active === "All websites" || website.category === active);

  return (
    <section id="websites" className={`${styles.websites} container section-space`}
      aria-labelledby="websites-heading" data-reveal>
      <div className={styles.sectionTopline}>
        <SectionLabel>{sectionNumber} / Websites I’ve built</SectionLabel>
        <span className={styles.toplineNote}><Globe2 size={15} aria-hidden="true" /> Designed to be explored</span>
      </div>
      <div className={styles.heading}>
        <h2 id="websites-heading">Ideas, brought online.<br /><span>Made for the real world.</span></h2>
        <p>A collection of websites built for businesses,<br className={styles.desktopBreak} /> brands, and the people behind them.</p>
      </div>
      <div className={styles.toolbar}>
        <div className={styles.filters} role="group" aria-label="Filter websites">
          {filters.map((filter) => (
            <button key={filter} type="button" aria-pressed={active === filter} onClick={() => setActive(filter)}>
              {filter}{filter === "All websites" && <span>{websites.length}</span>}
            </button>
          ))}
        </div>
        <p className={styles.resultCount} role="status">{filtered.length} {filtered.length === 1 ? "website" : "websites"}</p>
      </div>
      <div className={styles.websiteGrid} data-filtered={active !== "All websites"}>
        {filtered.map((website, index) => (
          <WebsiteCard website={website} key={website.url} showcase
            sizes={active === "All websites" && index > 1
              ? "(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 33vw"
              : "(max-width: 700px) 100vw, 50vw"} />
        ))}
        <Link href="/contact" className={styles.nextWebsite}>
          <Asterisk size={35} strokeWidth={1.2} aria-hidden="true" />
          <div><span>Your next chapter</span><h3>Something great<br />could start here.</h3></div>
          <span className={styles.contactLink}>Let’s build your website</span>
        </Link>
      </div>
      <div className={styles.galleryFooter}><span>Different industries. The same attention to detail.</span><span>Design & development by Danyal Khan</span></div>
    </section>
  );
}
