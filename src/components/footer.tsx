import Link from "next/link";
import { ArrowUpRight, Asterisk, Globe2, Mail, MessageCircle } from "lucide-react";
import { site } from "@/lib/content";
import { navigationLinks } from "@/lib/navigation";
import { SectionLabel } from "./ui";
import styles from "./site-chrome.module.css";

export function ContactCTA() {
  return (
    <section className="contact-cta container">
      <div className="contact-cta-inner">
        <div>
          <SectionLabel light>Have a project in mind?</SectionLabel>
          <h2>
            Let’s make
            <br />
            something <span>matter.</span>
          </h2>
          <p>
            An idea, a challenge, or a new possibility.
            <br />
            I’d love to hear what you’re thinking.
          </p>
        </div>
        <Link
          href="/contact"
          className="big-circle-link"
          aria-label="Start a conversation"
        >
          <ArrowUpRight strokeWidth={1.3} />
          <span>Start a conversation</span>
        </Link>
        <span className="cta-watermark" aria-hidden="true">
          ↗
        </span>
      </div>
    </section>
  );
}

export function Footer() {
  const socials = [
    { label: "Behance", href: site.behance },
    { label: "GitHub", href: site.github },
    { label: "Instagram", href: site.instagram },
    { label: "Facebook", href: site.facebook },
  ];

  return (
    <footer className={`${styles.footer} container`}>
      <div className={styles.footerPanel}>
        <div className={styles.footerTopline}><span><Asterisk size={18} strokeWidth={1.2} aria-hidden="true" /> CREATIVE THINKING. CONSIDERED EXECUTION.</span><span><Globe2 size={15} aria-hidden="true" /> Based in Islamabad. Creating across borders.</span></div>
        <div className={styles.footerGrid}>
          <div className={styles.footerIntro}>
            <h2>Good things start<br /><span>with a hello.</span></h2>
            <a className={styles.emailLink} href={`mailto:${site.email}`}><Mail size={18} strokeWidth={1.5} aria-hidden="true" /><span>{site.email}</span></a>
            <Link className={styles.footerCta} href="/contact#project-enquiry"><MessageCircle size={16} strokeWidth={1.5} aria-hidden="true" /> Start a conversation</Link>
          </div>
          <nav className={styles.footerLinks} aria-label="Footer navigation"><p>Explore</p>{navigationLinks.map((link) => <Link href={link.href} key={link.href}>{link.label}</Link>)}</nav>
          <nav className={styles.footerLinks} aria-label="Social profiles"><p>Elsewhere</p>{socials.map((social) => <a href={social.href} key={social.label} target="_blank" rel="noopener noreferrer" aria-label={`${social.label} (opens in a new tab)`}>{social.label}</a>)}</nav>
        </div>
        <div className={styles.signatureTopline}><span>INDEPENDENT MIND. MULTIPLE DISCIPLINES.</span><span>DESIGN / MOTION / STRATEGY / DEVELOPMENT</span></div>
        <Link href="/" className={styles.signature} aria-label="Danyal Khan home"><span>DANYAL KHAN</span><sup>®</sup></Link>
        <div className={styles.footerBottom}>
          <span>© {new Date().getFullYear()} Danyal Khan</span>
          <span>Thoughtfully designed. Purposefully built.</span>
          <a href="#top">Back to top<span aria-hidden="true">TOP</span></a>
        </div>
      </div>
    </footer>
  );
}
