import type { Metadata } from "next";
import { WorkGrid } from "@/components/work-grid";
import { WorkHero } from "@/components/work-hero";
import { ContactCTA } from "@/components/footer";
import { ClientCollaborations } from "@/components/client-collaborations";
import { GitHubRepositories } from "@/components/github-repositories";
import { SocialPostGallery } from "@/components/social-post-gallery";
import { AnimationShowcase } from "@/components/animation-showcase";
import { WebsiteShowcase } from "@/components/website-showcase";
import { CatalogShowcase } from "@/components/catalog-showcase";

export const metadata: Metadata = {
  title: "Selected Work",
  description:
    "Explore Danyal Khan’s projects across branding, catalog design, creative direction, motion, marketing, and visual design.",
};

export default async function Work({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  return (
    <>
      <WorkHero />
      <section id="work-projects" className="container archive-section" aria-label="Selected projects">
        <WorkGrid key={category} initialCategory={category} />
      </section>
      <CatalogShowcase />
      <SocialPostGallery />
      <AnimationShowcase sectionNumber="02" />
      <GitHubRepositories sectionNumber="03" />
      <WebsiteShowcase sectionNumber="04" />
      <ClientCollaborations sectionNumber="05" />
      <ContactCTA />
    </>
  );
}
