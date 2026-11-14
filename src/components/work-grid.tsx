"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { categories, projects, site, type Category } from "@/lib/content";
import { ProjectCard } from "./project-card";
import { WebsiteCard } from "./website-card";
import { websites } from "@/lib/websites";

const archiveImageSizes = "(max-width: 480px) 100vw, (max-width: 760px) 50vw, (max-width: 1100px) 33vw, 25vw";

export function WorkGrid({
  initialCategory = "All",
}: {
  initialCategory?: string;
}) {
  const router = useRouter();
  const [active, setActive] = useState<Category>(
    categories.includes(initialCategory as Category)
      ? (initialCategory as Category)
      : "All",
  );
  function selectCategory(category: Category) {
    setActive(category);
    router.replace(
      category === "All"
        ? "/work"
        : `/work?category=${encodeURIComponent(category)}`,
      { scroll: false },
    );
  }
  const filtered = projects.filter(
    (project) => active === "All" || project.disciplines.includes(active),
  );
  const filteredWebsites = active === "All" || active === "Web & Digital" ? websites : [];
  const filteredCount = filtered.length + filteredWebsites.length;
  return (
    <>
      <div className="work-filters" aria-label="Filter projects">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => selectCategory(category)}
            aria-pressed={active === category}
            className={active === category ? "active" : ""}
          >
            {category}
            {category === "All" && (
              <sup>{(projects.length + websites.length).toString().padStart(2, "0")}</sup>
            )}
          </button>
        ))}
      </div>
      <div aria-live="polite" className="filter-count">
        {filteredCount} {filteredCount === 1 ? "project" : "projects"}
        {active !== "All" ? ` / ${active}` : " / Selected work"}
      </div>
      {filteredCount ? (
        <div className="projects-grid work-archive">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} sizes={archiveImageSizes} />
          ))}
          {filteredWebsites.map((website) => (
            <WebsiteCard key={website.url} website={website} sizes={archiveImageSizes} />
          ))}
        </div>
      ) : (
        <div className="empty-work">
          <h2>
            The next digital experience
            <br />
            could be yours.
          </h2>
          <p>
            There aren’t any published web projects in this selection yet. Let’s
            talk about what you have in mind.
          </p>
          <a href="/contact" className="text-link">
            Start a conversation
            <ArrowUpRight size={18} />
          </a>
        </div>
      )}
      <a
        href={site.behance}
        target="_blank"
        rel="noopener noreferrer"
        className="archive-behance text-link"
      >
        Explore more on Behance
        <ArrowUpRight size={17} />
      </a>
    </>
  );
}
