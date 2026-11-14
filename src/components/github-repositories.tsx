import { ArrowUpRight, FolderGit2, Github } from "lucide-react";
import { site } from "@/lib/content";
import { repositories } from "@/lib/repositories";
import { Button, SectionLabel } from "./ui";

export function GitHubRepositories({
  sectionNumber = "03",
}: {
  sectionNumber?: string;
}) {
  return (
    <section
      id="github-repositories"
      className="github-section container section-space"
      aria-labelledby="github-heading"
      data-reveal
    >
      <SectionLabel>{sectionNumber} / On GitHub</SectionLabel>
      <div className="section-heading github-heading">
        <div>
          <h2 id="github-heading">
            The code behind the ideas.
            <br />
            <span className="muted">Built. Explored. Shared.</span>
          </h2>
          <p>Selected repositories, from web tools to mobile experiences.</p>
        </div>
        <Button href={site.github} secondary external>
          <span className="github-profile-link">
            <Github size={15} aria-hidden="true" />
            View my GitHub
          </span>
        </Button>
      </div>
      <div className="repository-grid">
        {repositories.map((repository) => (
          <a
            key={repository.name}
            href={`${site.github}/${repository.name}`}
            className="repository-card"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${repository.title} on GitHub (opens in a new tab)`}
          >
            <div className="repository-card-top" aria-hidden="true">
              <FolderGit2 size={23} strokeWidth={1.5} />
              <span>Public repository</span>
            </div>
            <h3>{repository.title}</h3>
            <span className="repository-name">TechyDani/{repository.name}</span>
            <p>{repository.description}</p>
            <ul className="repository-technologies" aria-label="Technologies">
              {repository.technologies.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
            <span className="repository-card-link" aria-hidden="true">
              Explore repository
              <ArrowUpRight size={17} />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
