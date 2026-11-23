"use client";

import { useState } from "react";
import { Braces, Code2, GitBranch, Github } from "lucide-react";
import { site } from "@/lib/content";
import { repositories } from "@/lib/repositories";
import { SectionLabel } from "./ui";
import styles from "./development-showcase.module.css";

const filters = ["All projects", "Web", "Mobile"] as const;
type Filter = (typeof filters)[number];

function matchesFilter(repository: (typeof repositories)[number], filter: Filter) {
  const isMobile = repository.technologies.includes("Flutter");
  return filter === "All projects" || (filter === "Mobile" ? isMobile : !isMobile);
}

export function GitHubRepositories({ sectionNumber = "04" }: { sectionNumber?: string }) {
  const [active, setActive] = useState<Filter>("All projects");
  const filtered = repositories.filter((repository) => matchesFilter(repository, active));
  const [featured, ...others] = filtered;

  return (
    <section id="github-repositories" className={`${styles.github} container section-space`}
      aria-labelledby="github-heading" data-reveal>
      <div className={styles.lab}>
        <div className={styles.sectionTopline}>
          <SectionLabel>{sectionNumber} / On GitHub</SectionLabel>
          <span className={styles.toplineNote}><Code2 size={15} aria-hidden="true" /> A look under the hood</span>
        </div>
        <div className={styles.heading}>
          <div>
            <h2 id="github-heading">Good ideas.<br /><span>Even better in code.</span></h2>
            <p>Experiments, useful tools, and the builds behind the thinking.</p>
          </div>
          <a className={styles.profileLink} href={site.github} target="_blank" rel="noopener noreferrer"
            aria-label="Explore my GitHub profile (opens in a new tab)">
            <Github size={18} aria-hidden="true" /> Explore GitHub
          </a>
        </div>
        <div className={styles.toolbar}>
          <div className={styles.filters} role="group" aria-label="Filter repositories">
            {filters.map((filter) => (
              <button type="button" key={filter} aria-pressed={active === filter}
                onClick={() => setActive(filter)}>
                {filter}<span>{repositories.filter((repo) => matchesFilter(repo, filter)).length}</span>
              </button>
            ))}
          </div>
          <p className={styles.resultCount} role="status">{filtered.length} public repositories</p>
        </div>
        <div className={styles.repositoryLayout}>
          <a key={featured.name} className={styles.featuredRepo} href={`${site.github}/${featured.name}`}
            target="_blank" rel="noopener noreferrer"
            aria-label={`Explore ${featured.title} on GitHub (opens in a new tab)`}>
            <div className={styles.featuredTop}><span>In the spotlight</span><Github size={21} aria-hidden="true" /></div>
            <div className={styles.codeArtwork} aria-hidden="true">
              <div className={styles.codeOrbit}><Braces strokeWidth={1.1} /></div>
              <div className={styles.codeBranch} />
              <div className={styles.artworkStack}>
                {featured.technologies.map((technology) => <span key={technology}>{technology}</span>)}
              </div>
              <span className={styles.cloneCommand}><span>~/</span> TechyDani/{featured.name}</span>
            </div>
            <div className={styles.featuredCopy}>
              <span className={styles.repoPath}>TechyDani / {featured.name}</span>
              <h3>{featured.title}</h3>
              <p>{featured.description}</p>
              <span className={styles.repoAction}><Github size={16} aria-hidden="true" /> Explore repository</span>
            </div>
          </a>
          <div className={styles.repositoryList}>
            {others.map((repository) => (
              <a key={repository.name} href={`${site.github}/${repository.name}`} className={styles.repositoryRow}
                target="_blank" rel="noopener noreferrer"
                aria-label={`Explore ${repository.title} on GitHub (opens in a new tab)`}>
                <span className={styles.rowIcon}><GitBranch size={20} strokeWidth={1.5} aria-hidden="true" /></span>
                <div className={styles.rowCopy}>
                  <h3>{repository.title}</h3>
                  <p>{repository.description}</p>
                  <span className={styles.rowStack}>{repository.technologies.join(" / ")}</span>
                </div>
                <Github className={styles.rowGithub} size={18} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
        <div className={styles.labFooter}><GitBranch size={14} aria-hidden="true" /><span>From the first idea to the final commit.</span><span>Always building.</span></div>
      </div>
    </section>
  );
}
