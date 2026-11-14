import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/content";

export function ProjectArtwork({
  project,
  priority = false,
  sizes = "(max-width: 700px) 100vw, 50vw",
}: {
  project: Project;
  priority?: boolean;
  sizes?: string;
}) {
  if (project.image)
    return (
      <div className={`project-artwork artwork-${project.artwork}`}>
        <Image
          src={project.image}
          alt={`${project.title} — original project artwork by Danyal Khan`}
          fill
          sizes={sizes}
          priority={priority}
          className="project-image"
        />
      </div>
    );
  return (
    <div
      className={`project-artwork artwork-${project.artwork}`}
      aria-label={`${project.title}, editorial cover`}
    >
      <span className="artwork-kicker">DANYAL KHAN / SELECTED PROJECT</span>
      <span className="artwork-title">
        {project.artwork === "food" ? (
          <>
            GOOD
            <br />
            <i>MOOD.</i>
            <br />
            GOOD FOOD.
          </>
        ) : project.artwork === "brand" ? (
          <>
            An identity.
            <br />A language.
            <br />
            <i>A feeling.</i>
          </>
        ) : project.artwork === "product" ? (
          <>
            Made to
            <br />
            <i>stand out.</i>
          </>
        ) : project.artwork === "showcase" ? (
          <>
            Different
            <br />
            <i>by design.</i>
          </>
        ) : project.artwork === "client" ? (
          <>
            Ideas.
            <br />
            Made <i>real.</i>
          </>
        ) : (
          <>
            A creative
            <br />
            <i>point of view.</i>
          </>
        )}
      </span>
      <span className="artwork-shape" aria-hidden="true" />
      <span className="artwork-footer">
        {project.category}
        <span>↗</span>
      </span>
      <span className="cover-note">
        Editorial cover · Original work on Behance
      </span>
    </div>
  );
}

export function ProjectCard({
  project,
  priority = false,
  sizes,
}: {
  project: Project;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <Link href={`/work/${project.slug}`} className="project-card">
      <div className="project-image-wrap">
        <ProjectArtwork project={project} priority={priority} sizes={sizes} />
        <span className="project-hover-arrow">
          <ArrowUpRight size={23} />
        </span>
      </div>
      <div className="project-card-info">
        <div>
          <span className="project-category">{project.category}</span>
          <h3>{project.title}</h3>
        </div>
        <span className="project-number">/{project.number}</span>
      </div>
    </Link>
  );
}
