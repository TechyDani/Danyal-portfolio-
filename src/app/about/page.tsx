import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Asterisk, GraduationCap, MapPin } from "lucide-react";
import { AboutMotion } from "@/components/about-motion";
import { ContactCTA } from "@/components/footer";
import { experience } from "@/lib/content";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Danyal Khan, graphic designer, creative director, and founder of RevBoost Marketing Agency in Islamabad. Creative thinking for brands, digital experiences, and business growth worldwide.",
};

const principles = [
  { title: "Purpose before pixels.", text: "Understand the business, the audience, and the idea. Give every creative decision a reason to exist.", detail: "STRATEGY / INTENTION" },
  { title: "See the whole picture.", text: "Connect identity, campaigns, motion, and digital experiences into one clear visual language.", detail: "DIRECTION / SYSTEMS" },
  { title: "Make the details count.", text: "The type, the spacing, the timing. Small decisions are what turn a good idea into considered work.", detail: "CRAFT / PRECISION" },
  { title: "Carry it through.", text: "Stay close to the work, from the first conversation to the final execution. An idea deserves to be made well.", detail: "EXECUTION / CARE" },
];
const statement = "I connect design, strategy, and technology to turn a business challenge into something people can see, feel, and connect with.";

export default function About() {
  return (
    <AboutMotion>
      <section className={`${styles.hero} container`} aria-labelledby="about-heading">
        <div className={styles.topline} data-animate>
          <span>ABOUT / THE PERSON BEHIND THE WORK</span>
          <span>DESIGNER. DIRECTOR. FOUNDER.</span>
        </div>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow} data-animate>HELLO, I’M DANYAL KHAN.</p>
            <h1 id="about-heading" className={styles.heroTitle} data-animate>
              <span>Creative mind.</span>
              <span className={styles.blueLine}>Strategic eye.</span>
              <span className={styles.outlineLine}>Human first.</span>
            </h1>
            <div className={styles.heroIntro} data-animate>
              <span className={styles.smallCross} aria-hidden="true">+</span>
              <p>A graphic designer and creative director connecting bold ideas with thoughtful execution.</p>
            </div>
            <div className={styles.heroActions} data-animate>
              <Link href="/work" className={styles.darkButton}>Explore my work <ArrowUpRight size={17} /></Link>
              <a href="#story" className={styles.storyLink}>A little about me <ArrowDown size={14} /></a>
            </div>
          </div>
          <figure className={styles.portraitComposition} data-animate>
            <div className={styles.portraitFrame} data-parallax="0.055">
              <span className={styles.portraitGrid} aria-hidden="true" />
              <span className={styles.portraitInitials} aria-hidden="true">DK</span>
              <Asterisk className={styles.portraitStar} strokeWidth={1.1} aria-hidden="true" />
              <span className={styles.frameCorner} aria-hidden="true" />
              <span className={styles.frameCornerEnd} aria-hidden="true" />
              <span className={styles.portraitLabel}>A WORK IN PROGRESS. ALWAYS.</span>
              <Image src="/images/danyal-khan.png" alt="Danyal Khan, graphic designer and creative director in Islamabad" width={850} height={850} preload sizes="(max-width: 900px) 85vw, 40vw" className={styles.portraitImage} />
              <div className={styles.portraitBadge}>
                <ArrowUpRight size={24} strokeWidth={1.4} aria-hidden="true" />
                <span>Creative<br />at heart.</span>
              </div>
            </div>
            <figcaption className={styles.portraitCaption}>
              <span>DANYAL KHAN <span>©</span></span>
              <span>IDEAS INTO EXPERIENCES.</span>
            </figcaption>
          </figure>
        </div>
        <div className={styles.heroFoot} data-animate>
          <span><span className={styles.locationDot} /> ISLAMABAD, PAKISTAN / WORKING WORLDWIDE</span>
          <a href="#story">SCROLL TO GET TO KNOW ME <ArrowDown size={13} /></a>
        </div>
      </section>
      <div className={styles.disciplineBand} aria-hidden="true">
        <div className={styles.disciplineTrack} data-drift="0.11">
          {[0, 1, 2].map((copy) => (
            <span key={copy}>CREATIVE DIRECTION <Asterisk strokeWidth={1.2} /> GRAPHIC DESIGN <Asterisk strokeWidth={1.2} /> MOTION & DIGITAL <Asterisk strokeWidth={1.2} /></span>
          ))}
        </div>
      </div>
      <section id="story" className={`${styles.story} container`} aria-labelledby="story-heading">
        <div className={styles.sectionTop} data-animate>
          <p className={styles.sectionLabel}><span /> 01 / A LITTLE ABOUT ME</p>
          <span className={styles.marginNote}>ONE CURIOUS MIND. MANY WAYS TO CREATE.</span>
        </div>
        <h2 id="story-heading" className={styles.storyStatement} data-reading>
          {statement.split(" ").map((word, index) => <span key={index} data-word>{word} </span>)}
        </h2>
        <div className={styles.storyDetails}>
          <div className={styles.storySignature} data-animate>
            <Asterisk size={52} strokeWidth={1} aria-hidden="true" />
            <span>Different disciplines.<br />One considered approach.</span>
          </div>
          <div className={styles.storyBody} data-animate>
            <p>I’m Danyal, a multidisciplinary creative based in Islamabad. My work spans graphic design, creative direction, branding, web development, UI design, motion, and digital marketing.</p>
            <p>I’m drawn to the whole process: asking the right questions, finding the idea, shaping its visual language, and getting every detail into place. I care about what the work communicates as much as how it looks.</p>
            <div className={styles.disciplineTags} aria-label="Creative disciplines"><span>Design</span><span>Direction</span><span>Motion</span><span>Strategy</span></div>
          </div>
        </div>
      </section>
      <section className={styles.founder} aria-labelledby="founder-heading">
        <div className={`${styles.founderInner} container`}>
          <div className={styles.founderIntro} data-animate>
            <p className={styles.sectionLabel}><span /> 02 / BUILDING SOMETHING OF MY OWN</p>
            <h2 id="founder-heading">Creative thinking.<br /><span>Business ambition.</span></h2>
            <p className={styles.founderDescription}>I’m the owner and founder of RevBoost Marketing Agency. From Islamabad, I help businesses around the world grow and acquire customers through creative strategy and digital marketing.</p>
            <Link href="/contact" className={styles.lightLink}>Let’s talk about your business <ArrowUpRight size={17} /></Link>
          </div>
          <div className={styles.agencyPanel} data-animate>
            <div className={styles.agencyTopline}><span className={styles.agencyStatus}>OWNER & FOUNDER</span><ArrowUpRight size={35} strokeWidth={1.2} aria-hidden="true" /></div>
            <div className={styles.agencyWordmark}>RevBoost<span>↗</span></div>
            <span className={styles.agencyDescriptor}>MARKETING AGENCY</span>
            <dl className={styles.agencyFacts}>
              <div><dt>BASED IN</dt><dd>Islamabad, Pakistan</dd></div>
              <div><dt>WORKING WITH</dt><dd>Businesses worldwide</dd></div>
              <div><dt>FOCUSED ON</dt><dd>Growth & customer acquisition</dd></div>
            </dl>
          </div>
        </div>
      </section>
      <section className={`${styles.approach} container`} aria-labelledby="approach-heading">
        <div className={styles.approachHeading} data-animate>
          <div><p className={styles.sectionLabel}><span /> 03 / THE WAY I THINK</p><h2 id="approach-heading">A point of view.<br /><span className={styles.soft}>In every detail.</span></h2></div>
          <p>A few principles that travel with me,<br />whatever the medium or the brief.</p>
        </div>
        <div className={styles.principleGrid}>
          {principles.map((principle, index) => (
            <article className={styles.principle} key={principle.title} data-animate style={{ transitionDelay: `${index * 70}ms` }}>
              <div className={styles.principleTop}><span>0{index + 1}</span><ArrowUpRight size={19} strokeWidth={1.3} aria-hidden="true" /></div>
              <h3>{principle.title}</h3><p>{principle.text}</p><span className={styles.principleDetail}>{principle.detail}</span>
            </article>
          ))}
        </div>
      </section>
      <section id="experience" className={`${styles.career} container`} aria-labelledby="experience-heading">
        <div className={styles.careerIntro}>
          <div className={styles.stickyHeading} data-animate>
            <p className={styles.sectionLabel}><span /> 04 / EXPERIENCE</p>
            <h2 id="experience-heading">Always learning.<br /><span className={styles.soft}>Always making.</span></h2>
            <p>From hands-on design and development to creative direction and building my own agency. Every role has added another perspective.</p>
            <Asterisk className={styles.careerStar} size={100} strokeWidth={0.8} aria-hidden="true" />
          </div>
        </div>
        <ol className={styles.timeline}>
          {experience.map((job, index) => (
            <li className={styles.careerItem} key={job.company} data-animate>
              <span className={styles.careerPeriod}>{job.period}</span>
              <div className={styles.careerRole}>
                <span className={styles.careerNumber}>/ 0{index + 1}</span>
                <h3>{job.companyUrl ? <a href={job.companyUrl} target="_blank" rel="noopener noreferrer">{job.company} <ArrowUpRight size={17} /></a> : job.company}</h3>
                <p>{job.role}</p>
                {job.location && <span className={styles.careerLocation}><MapPin size={12} aria-hidden="true" />{job.location}</span>}
              </div>
              {job.logo && <Image src={job.logo} alt="" width={38} height={38} className={styles.careerLogo} />}
            </li>
          ))}
        </ol>
      </section>
      <section id="education" className={`${styles.education} container`} aria-labelledby="education-heading">
        <div className={styles.educationIntro} data-animate>
          <p className={styles.sectionLabel}><span /> 05 / EDUCATION</p>
          <h2 id="education-heading">Logic meets<br /><span className={styles.soft}>imagination.</span></h2>
          <p>A foundation in computer science, a practice in creativity. Bringing technical understanding to the way I design and build.</p>
        </div>
        <article className={styles.degree} data-animate>
          <div className={styles.degreeArt} aria-hidden="true"><GraduationCap size={32} strokeWidth={1.2} /><span>CS<span>.</span></span><span>BACHELOR OF SCIENCE</span></div>
          <div className={styles.degreeInfo}>
            <span className={styles.degreeLabel}>THE TECHNICAL FOUNDATION</span><h3>BS in Computer Science</h3><p>Islamia College Peshawar</p>
            <span className={styles.degreeLocation}><MapPin size={13} aria-hidden="true" />Peshawar, Pakistan</span>
          </div>
        </article>
      </section>
      <div className={styles.closingNote} data-animate><Asterisk size={20} aria-hidden="true" /><p>Still curious. Still creating. Ready for what’s next.</p></div>
      <ContactCTA />
    </AboutMotion>
  );
}
