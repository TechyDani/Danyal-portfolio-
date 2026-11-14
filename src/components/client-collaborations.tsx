import Image from "next/image";
import { clients } from "@/lib/content";
import { SectionLabel } from "./ui";

export function ClientCollaborations({ sectionNumber = "03" }: { sectionNumber?: string }) {
  return (
    <section
      className="collaborations-section container section-space"
      data-reveal
    >
      <div className="collaboration-heading">
        <SectionLabel>{sectionNumber} / Clients & collaborations</SectionLabel>
        <h2>
          Different brands. Different challenges.
          <br />
          <span className="muted">Shared ambition.</span>
        </h2>
        <p>A selection of brands I’ve contributed creative work to.</p>
      </div>
      <div className="client-grid">
        {clients.map((client) => (
          <figure className="client-logo-card" key={client.name}>
            <div className="client-logo-frame">
              <Image
                src={client.logo}
                alt=""
                fill
                sizes="(max-width: 700px) 40vw, 18vw"
                className="client-logo"
              />
            </div>
            <figcaption>{client.name}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
