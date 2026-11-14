import { websites } from "@/lib/websites";
import { SectionLabel } from "./ui";
import { WebsiteCard } from "./website-card";

export function WebsiteShowcase({ sectionNumber = "03" }: { sectionNumber?: string }) {
  return (
    <section
      id="websites"
      className="websites-section container section-space"
      aria-labelledby="websites-heading"
      data-reveal
    >
      <SectionLabel>{sectionNumber} / Websites I’ve built</SectionLabel>
      <div className="section-heading">
        <h2 id="websites-heading">
          Ideas, brought online.
          <br />
          <span className="muted">Built for the real world.</span>
        </h2>
        <p>Websites I’ve developed for brands and businesses.</p>
      </div>
      <div className="websites-grid">
        {websites.map((website) => (
          <WebsiteCard website={website} key={website.url} />
        ))}
      </div>
    </section>
  );
}
