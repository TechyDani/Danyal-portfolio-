import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { websites } from "@/lib/websites";

export function WebsiteCard({
  website,
  sizes = "(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw",
}: {
  website: (typeof websites)[number];
  sizes?: string;
}) {
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
