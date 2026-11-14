import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Asterisk, Globe2, MoveUpRight } from "lucide-react";
import { Button, SectionLabel, ScrollHint } from "@/components/ui";
import { ProjectCard } from "@/components/project-card";
import { ClientCollaborations } from "@/components/client-collaborations";
import { ExpertiseList } from "@/components/expertise-list";
import { Process } from "@/components/process";
import { ContactCTA } from "@/components/footer";
import { RevealObserver } from "@/components/reveal";
import { TypingText } from "@/components/typing-text";
import { SocialPostGallery } from "@/components/social-post-gallery";
import { HeroPortraitImage } from "@/components/hero-portrait-image";
import { SkillsAndTools } from "@/components/skills-and-tools";
import { WebsiteShowcase } from "@/components/website-showcase";
import { GitHubRepositories } from "@/components/github-repositories";
import { AnimationShowcase } from "@/components/animation-showcase";
import { experience, projects, site } from "@/lib/content";

export default function Home() {
  return (
    <>
      <section className="hero container" aria-labelledby="hero-heading">
        <div className="hero-topline">
          <p>CREATIVE DIRECTOR & MULTIDISCIPLINARY CREATIVE</p>
          <span>
            <span className="status-dot" />
            Open to meaningful collaborations
          </span>
        </div>
        <div className="hero-name" aria-hidden="true">
          <TypingText text="DANYAL KHAN" delay={180} interval={85} />
          <span className="hero-registration">®</span>
        </div>
        <div className="hero-composition">
          <div className="hero-left">
            <span className="eyebrow">A CURIOUS MIND. A CREATIVE SOUL.</span>
            <h1 id="hero-heading" aria-label="I think. I design. I bring ideas to life.">
              <TypingText text="I think." delay={500} />
              <br />
              <TypingText text="I design." delay={950} />
              <br />
              <span className="hero-headline-accent">
                <TypingText text="I bring ideas" delay={1450} />
                <br />
                <TypingText text="to life." delay={2100} />
              </span>
              <Asterisk className="hero-asterisk" strokeWidth={1.5} aria-hidden="true" />
            </h1>
            <Button href="/work">Explore my work</Button>
            <Link href="/about" className="hero-about-link">
              A little more about me <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="hero-portrait">
            <div className="portrait-halo" />
            <span className="portrait-cross cross-one" aria-hidden="true">
              +
            </span>
            <span className="portrait-cross cross-two" aria-hidden="true">
              +
            </span>
            <HeroPortraitImage />
            <div className="portrait-caption">
              <span className="caption-dot" />
              Worked with more then
              <br />
              <span className="caption-second">100+ Brands</span>
              <MoveUpRight size={16} />
            </div>
          </div>
          <div className="hero-right">
            <span className="tiny-orbit" aria-hidden="true">
              <Asterisk size={31} strokeWidth={1.1} />
            </span>
            <h2>
              Good ideas deserve
              <br />
              great <span>execution.</span>
            </h2>
            <p>
              I connect design, motion, strategy, and technology to build
              experiences that look good, work beautifully, and serve a purpose.
            </p>
            <div className="hero-location">
              <Globe2 size={17} />
              <span>
                Based in Islamabad, Pakistan
                <br />
                <strong>Working across borders.</strong>
              </span>
            </div>
            <a
              href={site.behance}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              Find me on Behance
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
        <div className="hero-bottom">
          <ScrollHint />
          <span>STRATEGY MEETS CREATIVITY. IDEAS BECOME EXPERIENCES.</span>
          <span className="hero-index">[ PORTFOLIO / 2026 ]</span>
        </div>
      </section>

      <div className="discipline-strip">
        <div className="discipline-track">
          {[0, 1].map((copy) => (
            <div
              className="discipline-group"
              key={copy}
              aria-hidden={copy === 1 ? true : undefined}
            >
              {[
                "Creative Direction",
                "Branding & Design",
                "Motion & Video",
                "Digital Strategy",
                "Web & Development",
              ].map((discipline) => (
                <div className="discipline-item" key={discipline}>
                  <span>{discipline}</span>
                  <Asterisk aria-hidden="true" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section
        id="selected-work"
        className="selected-work container section-space"
        data-reveal
      >
        <SectionLabel>01 / Selected work</SectionLabel>
        <div className="section-heading">
          <h2>
            A little bit of everything.
            <br />
            <span className="muted">A lot of thought behind it.</span>
          </h2>
          <Button href="/work" secondary>
            All projects <span className="button-count">06</span>
          </Button>
        </div>
        <div className="projects-grid">
          {projects.slice(0, 4).map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        <div className="work-section-foot">
          <p>Different mediums. One considered approach.</p>
          <a
            href={site.behance}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            See the full picture on Behance
            <ArrowUpRight size={15} />
          </a>
        </div>
      </section>

      <SocialPostGallery />

      <section
        id="behind-the-work"
        className="about-section container section-space"
        aria-labelledby="behind-heading"
        data-reveal
      >
        <div className="behind-section-heading">
          <SectionLabel>02 / Behind the work</SectionLabel>
          <span>THE PERSON. THE PROCESS. THE POSSIBILITIES.</span>
        </div>
        <div className="behind-layout">
          <figure className="behind-profile">
            <div className="behind-portrait">
              <span className="behind-portrait-label">A CREATIVE AT HEART.</span>
              <Asterisk className="behind-portrait-mark" strokeWidth={1} aria-hidden="true" />
              <Image
                src="/images/danyal-khan.png"
                alt="Danyal Khan, creative director and multidisciplinary creative"
                width={600}
                height={600}
                sizes="(max-width: 760px) 90vw, 38vw"
              />
              <div className="behind-brand-note">
                <strong>100<span>+</span></strong>
                <span>Brands worked with.<br />Every brief, a new perspective.</span>
              </div>
            </div>
            <figcaption className="behind-profile-caption">
              <span>
                <strong>Danyal Khan</strong>
                <span>Creative Director & Multidisciplinary Creative</span>
              </span>
              <span className="behind-profile-location">
                <Globe2 size={14} aria-hidden="true" /> Islamabad, PK
              </span>
            </figcaption>
          </figure>
          <div className="behind-copy">
            <p className="behind-introduction">A CURIOUS MIND. A HANDS-ON APPROACH.</p>
            <h2 id="behind-heading">
              More than one discipline.
              <br />
              <span>One way of thinking.</span>
            </h2>
            <p className="behind-lead">
              I’m Danyal, a multidisciplinary creative connecting design,
              motion, strategy, and technology.
            </p>
            <p className="behind-description">
              I see the bigger picture, then bring every detail together.
              From the first idea to the final experience, I care about how
              things look, what they communicate, and how they work.
            </p>
            <ul className="behind-disciplines" aria-label="Creative disciplines">
              <li>Design</li>
              <li>Motion</li>
              <li>Strategy</li>
              <li>Development</li>
            </ul>
            <div className="behind-actions">
              <Button href="/about">Get to know me</Button>
              <span>Based in Islamabad.<br />Creating across borders.</span>
            </div>
          </div>
        </div>
        <div className="behind-toolkit">
          <div className="behind-toolkit-heading">
            <p>The tools behind the thinking.</p>
            <span>A versatile toolkit. One considered approach.</span>
          </div>
          <SkillsAndTools />
        </div>
      </section>

      <AnimationShowcase />

      <GitHubRepositories sectionNumber="04" />

      <WebsiteShowcase sectionNumber="05" />

      <ClientCollaborations sectionNumber="06" />

      <section
        className="expertise-section container section-space"
        data-reveal
      >
        <div className="expertise-intro">
          <SectionLabel>07 / What I do</SectionLabel>
          <h2>
            Different disciplines.
            <br />
            <span className="muted">Connected thinking.</span>
          </h2>
          <p>
            From defining the direction to producing the final experience.
            Creative and technical capabilities, working together.
          </p>
          <Link href="/services" className="text-link">
            Explore our services
            <ArrowUpRight size={16} />
          </Link>
          <Asterisk className="expertise-asterisk" strokeWidth={0.8} />
        </div>
        <ExpertiseList />
      </section>

      <Process sectionNumber="08" />

      <section
        className="experience-section container section-space"
        data-reveal
      >
        <div>
          <SectionLabel>09 / Experience</SectionLabel>
          <h2>
            Always curious.
            <br />
            <span className="muted">Always creating.</span>
          </h2>
          <p>
            A journey through design,
            <br />
            digital, and creative work.
          </p>
        </div>
        <div className="experience-list">
          {experience.slice(0, 3).map((job) => (
            <div className="experience-row" key={job.company}>
              <span className="experience-period">{job.period}</span>
              <div className="experience-job">
                {job.logo && (
                  <Image
                    src={job.logo}
                    alt=""
                    width={40}
                    height={40}
                    className="experience-logo"
                  />
                )}
                <div>
                  <h3>
                    {job.companyUrl ? (
                      <a href={job.companyUrl} target="_blank" rel="noopener noreferrer">
                        {job.company}
                      </a>
                    ) : job.company}
                  </h3>
                  <p>{job.role}</p>
                </div>
              </div>
              <ArrowUpRight size={18} />
            </div>
          ))}
          <Link href="/about#experience" className="text-link">
            The full journey
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </section>
      <ContactCTA />
      <RevealObserver />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Danyal Khan",
            jobTitle: "Creative Director & Multidisciplinary Creative",
            email: site.email,
            image: "/images/danyal-khan.png",
            sameAs: [site.behance, site.github, site.instagram, site.facebook],
            address: {
              "@type": "PostalAddress",
              addressLocality: "Islamabad",
              addressCountry: "PK",
            },
          }).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
