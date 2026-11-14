import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/content";
import { SectionLabel } from "./ui";

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
  return (
    <footer className="site-footer container">
      <div className="footer-top">
        <Link href="/" className="footer-wordmark">
          Danyal Khan<span>®</span>
          <small>Ideas into experiences.</small>
        </Link>
        <div className="footer-link-group">
          <span>Explore</span>
          <Link href="/work">Work</Link>
          <Link href="/about">About</Link>
          <Link href="/services">Our Services</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div className="footer-link-group">
          <span>Find me elsewhere</span>
          <a href={site.behance} target="_blank" rel="noopener noreferrer">
            Behance <ArrowUpRight size={13} />
          </a>
          <a href={site.github} target="_blank" rel="noopener noreferrer">
            GitHub <ArrowUpRight size={13} />
          </a>
          <a href={site.instagram} target="_blank" rel="noopener noreferrer">
            Instagram <ArrowUpRight size={13} />
          </a>
          <a href={site.facebook} target="_blank" rel="noopener noreferrer">
            Facebook <ArrowUpRight size={13} />
          </a>
        </div>
        <div className="footer-contact">
          <span>Good things start with a hello.</span>
          <a href={`mailto:${site.email}`}>
            {site.email}
            <ArrowUpRight size={16} />
          </a>
          <p>Islamabad, Pakistan · Working across borders</p>
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} Danyal Khan. All rights reserved.
        </span>
        <span>Thoughtfully designed. Purposefully built.</span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
