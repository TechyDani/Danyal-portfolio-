import Image from "next/image";
import { BookOpen, Download, Files } from "lucide-react";
import { catalogs } from "@/lib/catalogs";
import styles from "./catalog-showcase.module.css";

export function CatalogShowcase() {
  return (
    <section id="catalogs" className={`${styles.section} container`} aria-labelledby="catalog-heading">
      <div className={styles.topline}>
        <p><span /> CATALOGS / SELECTED PUBLICATIONS</p>
        <span><Files size={15} strokeWidth={1.5} aria-hidden="true" /> {catalogs.length} catalogs. A closer look.</span>
      </div>
      <div className={styles.heading}>
        <h2 id="catalog-heading">A story in every detail.<br /><span>A reason to turn the page.</span></h2>
        <p>Product collections, thoughtfully put together.<br />A selection of catalog and publication design.</p>
      </div>
      <div className={styles.grid}>
        {catalogs.map((catalog) => (
          <article className={styles.card} key={catalog.slug} data-tone={catalog.tone} aria-labelledby={`${catalog.slug}-title`}>
            <a className={styles.preview} href={`/catalogs/${catalog.slug}.pdf`} target="_blank" rel="noopener noreferrer"
              aria-label={`View ${catalog.title} ${catalog.edition} (${catalog.pages} pages, PDF, opens in a new tab)`}>
              <div className={styles.stage}>
                <span className={styles.category}>{catalog.category}</span>
                <span className={styles.pagePeek} aria-hidden="true"><Image src={`/images/catalogs/${catalog.slug}-detail.webp`} alt="" fill sizes="(max-width: 700px) 45vw, 18vw" /></span>
                <span className={styles.book}><Image src={`/images/catalogs/${catalog.slug}-cover.webp`} alt={`${catalog.title} ${catalog.edition} cover`} fill sizes="(max-width: 700px) 55vw, (max-width: 1000px) 30vw, 20vw" /><span className={styles.bookSpine} aria-hidden="true" /></span>
                <span className={styles.previewLabel}><BookOpen size={15} strokeWidth={1.5} aria-hidden="true" /> Explore the catalog</span>
              </div>
            </a>
            <div className={styles.info}>
              <div className={styles.titleRow}><h3 id={`${catalog.slug}-title`}>{catalog.title}</h3><span>{catalog.pages} pages</span></div>
              <p className={styles.edition}>{catalog.edition}</p>
              <p className={styles.description}>{catalog.description}</p>
            </div>
            <div className={styles.actions}>
              <a href={`/catalogs/${catalog.slug}.pdf`} target="_blank" rel="noopener noreferrer" className={styles.viewLink}
                aria-label={`View ${catalog.title} catalog PDF (opens in a new tab)`}><BookOpen size={15} aria-hidden="true" /> View catalog</a>
              <a href={`/catalogs/${catalog.slug}.pdf`} download={`${catalog.slug}.pdf`} className={styles.downloadLink}
                aria-label={`Download ${catalog.title} catalog PDF`}><Download size={15} aria-hidden="true" /><span>Download PDF</span></a>
            </div>
          </article>
        ))}
      </div>
      <div className={styles.footer}><span>Layout, hierarchy, and the details that bring a collection together.</span><span>Available to browse & download.</span></div>
    </section>
  );
}
