import Image from "next/image";
import { ArrowUpRight, Globe2 } from "lucide-react";
import type { websites } from "@/lib/websites";
import styles from "./development-showcase.module.css";

export function WebsiteCard({
  website,
  sizes = "(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw",
  showcase = false,
}: {
  website: (typeof websites)[number];
  sizes?: string;
  showcase?: boolean;
}) {
  if (showcase) {
    return (
      <a className={styles.siteCard} href={website.url} target="_blank" rel="noopener noreferrer"
        aria-label={`Visit ${website.name} website (opens in a new tab)`}>
        <div className={styles.sitePreview}>
          <div className={styles.browserChrome} aria-hidden="true">
            <span className={styles.browserDots}><i /><i /><i /></span>
            <span>{website.domain}</span><Globe2 size={13} />
          </div>
          <div className={styles.siteScreenshot}>
            <Image src={website.image} alt={`${website.name} homepage screenshot`} fill sizes={sizes} />
          </div>
          <span className={styles.visitOverlay} aria-hidden="true"><Globe2 size={15} /> Visit website</span>
        </div>
        <div className={styles.siteInfo}>
          <div><h3>{website.name}</h3><span>{website.domain}</span></div>
          <span className={styles.siteCategory}>{website.category}</span>
        </div>
      </a>
    );
  }

  return (
    <a
      className="website-card"
      href={website.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${website.name} website (opens in a new tab)`}
    >
      <div className="website-preview">
        <div className="website-browser-bar" aria-hidden="true">
          <span className="website-browser-dots">
            <i />
            <i />
            <i />
          </span>
          <span className="website-browser-domain">{website.domain}</span>
        </div>
        <div className="website-screenshot">
          <Image
            src={website.image}
            alt={`${website.name} homepage screenshot`}
            fill
            sizes={sizes}
          />
        </div>
      </div>
      <div className="website-card-info">
        <div>
          <span className="project-category">Web development</span>
          <h3>{website.name}</h3>
        </div>
        <span className="website-visit" aria-hidden="true">
          <ArrowUpRight size={18} />
        </span>
      </div>
    </a>
  );
}
