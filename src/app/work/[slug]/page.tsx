import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/content";
import { ProjectArtwork } from "@/components/project-card";
import { Button, SectionLabel } from "@/components/ui";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return {
    title: project?.title ?? "Project not found",
    description: project?.description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const project = projects[index];
  const nextProject = projects[(index + 1) % projects.length];
  return (
    <article className="container project-page">
      <Link href="/work" className="back-link">
        <ArrowLeft size={15} />
        All projects
      </Link>
      <div className="project-page-heading">
        <SectionLabel>Selected work / {project.number}</SectionLabel>
        <h1>{project.title}</h1>
        <div className="project-page-meta">
          <span>{project.category}</span>
          <span>Danyal Khan</span>
          <a href={project.url} target="_blank" rel="noopener noreferrer">
            Original project on Behance
            <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
      <div className="project-main-art">
        <ProjectArtwork project={project} priority />
      </div>
      <div className="project-story">
        <div>
          <SectionLabel>About the project</SectionLabel>
          <h2>{project.label}</h2>
        </div>
        <div>
          <p>{project.description}</p>
          <p>
            The complete published presentation is available on Behance,
            including the original visuals and creative pieces.
          </p>
          <Button href={project.url} external>
            Explore the full project
          </Button>
        </div>
      </div>
      {Boolean(project.gallery?.length) && (
        <section className="project-gallery">
          <SectionLabel>A closer look / Selected visuals</SectionLabel>
          <div className="project-gallery-grid">
            {project.gallery?.map((src, i) => (
              <figure key={src} className={i === 0 ? "gallery-featured" : ""}>
                <Image
                  src={src}
                  alt={`${project.title} — original creative, detail ${i + 1}`}
                  width={1400}
                  height={1600}
                  sizes={
                    i === 0
                      ? "(max-width: 700px) 90vw, 85vw"
                      : "(max-width: 700px) 90vw, 45vw"
                  }
                />
                <figcaption>
                  {project.title} / {String(i + 1).padStart(2, "0")}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}
      <div className="project-disciplines">
        <SectionLabel>Creative disciplines</SectionLabel>
        <div className="deliverable-tags">
          {project.disciplines.map((discipline) => (
            <Link
              key={discipline}
              href={`/work?category=${encodeURIComponent(discipline)}`}
            >
              {discipline}
              <ArrowUpRight size={13} />
            </Link>
          ))}
        </div>
      </div>
      <Link className="next-project" href={`/work/${nextProject.slug}`}>
        <div>
          <SectionLabel>Keep exploring / Next project</SectionLabel>
          <h2>{nextProject.title}</h2>
        </div>
        <ArrowUpRight size={45} strokeWidth={1.2} />
      </Link>
    </article>
  );
}
