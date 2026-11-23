import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Asterisk, Braces, CheckCheck, Clapperboard, Code2, Download,
  Focus, GraduationCap, Layers3, MapPin, MessageCircle,
  Palette, Target,
} from "lucide-react";
import { AboutMotion } from "@/components/about-motion";
import { AboutHero } from "@/components/about-hero";
import { experience } from "@/lib/content";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Danyal Khan, multidisciplinary creative director, designer, and founder of RevBoost. Design, motion, strategy, and technology. Based in Islamabad, creating across borders.",
};

const principles = [
  { title: "Purpose before pixels.", text: "Understand the business, the audience, and the idea. Give every creative decision a reason to exist.", detail: "STRATEGY / INTENTION", icon: Target },
  { title: "See the whole picture.", text: "Connect identity, campaigns, motion, and digital experiences into one clear visual language.", detail: "DIRECTION / SYSTEMS", icon: Layers3 },
  { title: "Make the details count.", text: "The type, the spacing, the timing. Small decisions are what turn a good idea into considered work.", detail: "CRAFT / PRECISION", icon: Focus },
  { title: "Carry it through.", text: "Stay close to the work, from the first conversation to the final execution. An idea deserves to be made well.", detail: "EXECUTION / CARE", icon: CheckCheck },
];
const expertise = [
  { title: "Design with a reason.", category: "BRANDING & VISUAL DESIGN", description: "Identities, campaigns, and everyday brand touchpoints. A visual language that feels considered wherever it shows up.", icon: Palette, tools: [{ name: "Illustrator", icon: "illustrator" }, { name: "Photoshop", icon: "photoshop" }, { name: "Figma", icon: "figma" }, { name: "Canva", icon: "canva" }] },
  { title: "Stories with movement.", category: "MOTION & VIDEO", description: "Considered movement, edits, and visual stories. Bringing an idea to life, from the first frame to the final detail.", icon: Clapperboard, tools: [{ name: "After Effects", icon: "aftereffects" }, { name: "Premiere Pro", icon: "premierepro" }, { name: "CapCut", icon: "capcut" }] },
  { title: "Ideas that work.", category: "WEB & DEVELOPMENT", description: "Interfaces, websites, and applications. Connecting visual thinking with the technical work that makes an experience useful.", icon: Code2, tools: [{ name: "Next.js", icon: "nextjs" }, { name: "Flutter", icon: "flutter" }, { name: "WordPress", icon: "wordpress" }] },
];
export default function About() {
  return (
    <AboutMotion>
      <AboutHero />

      <section id="story" className={`${styles.story} container`} aria-labelledby="story-heading">
        <div className={styles.storyHeading} data-animate><p className={styles.sectionLabel}><span /> A LITTLE ABOUT ME</p><h2 id="story-heading">More than<br />one discipline.<br /><span>One way of thinking.</span></h2><Asterisk className={styles.storyMark} size={62} strokeWidth={1} aria-hidden="true" /></div>
        <div className={styles.storyCopy}>
          <p className={styles.storyStatement} data-animate>I’m drawn to the space where <span>creative thinking</span> meets <span>thoughtful execution.</span></p>
          <div className={styles.storyBody} data-animate><p>I’m Danyal, a multidisciplinary creative based in Islamabad. My work spans graphic design, creative direction, branding, web development, UI design, motion, and digital marketing.</p><p>I enjoy the whole process: asking the right questions, finding the idea, shaping its visual language, and getting every detail into place. I care about what the work communicates as much as how it looks.</p><p>For me, the best work connects the bigger picture with the smallest details. Different mediums, the same curiosity, and a commitment to making something that serves a purpose.</p></div>
          <div className={styles.storyFacts} data-animate><div><span>BASED IN</span><p>Islamabad, Pakistan</p></div><div><span>WORKING ACROSS</span><p>Design, motion & digital</p></div><div><span>BRINGING TOGETHER</span><p>Ideas & execution</p></div></div>
        </div>
      </section>

      <section id="expertise" className={`${styles.expertise} container`} aria-labelledby="expertise-heading">
        <div className={styles.sectionHeading} data-animate><div><p className={styles.sectionLabel}><span /> DIFFERENT WAYS TO CREATE</p><h2 id="expertise-heading">A versatile toolkit.<br /><span>A considered approach.</span></h2></div><p>From a brand’s first impression<br />to the experience that follows.</p></div>
        <div className={styles.expertiseGrid}>{expertise.map((item) => { const Icon = item.icon; return <article className={styles.expertiseCard} key={item.title} data-animate><span className={styles.expertiseIcon}><Icon size={25} strokeWidth={1.3} aria-hidden="true" /></span><p className={styles.expertiseCategory}>{item.category}</p><h3>{item.title}</h3><p className={styles.expertiseDescription}>{item.description}</p><div className={styles.tools}><span>A FEW TOOLS IN THE MIX</span><ul aria-label={`${item.category} tools`}>{item.tools.map((tool) => <li key={tool.icon}><Image src={`/icons/skills/${tool.icon}.svg`} alt="" width={22} height={22} /><span>{tool.name}</span></li>)}</ul></div></article>; })}</div>
      </section>

      <section id="revboost" className={`${styles.founder} container`} aria-labelledby="founder-heading">
        <div className={styles.founderPanel}>
          <div className={styles.agencyCard} data-animate><div className={styles.agencyTopline}><Asterisk size={22} strokeWidth={1.2} aria-hidden="true" /><span>OWNER & FOUNDER</span></div><div className={styles.agencyWordmark}>REV<span>BOOST</span></div><p className={styles.agencyDescriptor}>MARKETING AGENCY</p><div className={styles.agencyDivider} /><dl className={styles.agencyFacts}><div><dt>BASED IN</dt><dd>Islamabad, Pakistan</dd></div><div><dt>WORKING WITH</dt><dd>Businesses worldwide</dd></div><div><dt>FOCUSED ON</dt><dd>Growth & customer acquisition</dd></div></dl><span className={styles.agencySignature}>INDIVIDUAL SERVICES. ONE CONNECTED STRATEGY.</span></div>
          <div className={styles.founderCopy} data-animate><p className={styles.sectionLabel}><span /> BUILDING SOMETHING OF MY OWN</p><h2 id="founder-heading">Creative thinking.<br /><span>Business ambition.</span></h2><p>I’m the owner and founder of RevBoost Marketing Agency. From Islamabad, I help businesses around the world grow and acquire customers through creative strategy and digital marketing.</p><p>It’s another way to bring the pieces together: a clear direction, thoughtful creative, and practical digital experiences built around a business.</p><div className={styles.founderActions}><Link href="/services" className={styles.lightButton}><Layers3 size={16} aria-hidden="true" /> Explore RevBoost services</Link><a href="/downloads/RevBoost_Company_Profile.pdf" download="RevBoost_Company_Profile.pdf"><Download size={15} aria-hidden="true" /> Company profile</a></div></div>
        </div>
      </section>

      <section id="approach" className={`${styles.approach} container`} aria-labelledby="approach-heading">
        <div className={styles.sectionHeading} data-animate><div><p className={styles.sectionLabel}><span /> THE WAY I THINK</p><h2 id="approach-heading">A point of view.<br /><span>In every detail.</span></h2></div><p>A few principles that travel with me,<br />whatever the medium or the brief.</p></div>
        <div className={styles.principleGrid}>{principles.map((principle) => { const Icon = principle.icon; return <article className={styles.principle} key={principle.title} data-animate><div className={styles.principleTop}><Icon size={23} strokeWidth={1.3} aria-hidden="true" /><span>{principle.detail}</span></div><h3>{principle.title}</h3><p>{principle.text}</p></article>; })}</div>
      </section>

      <section id="experience" className={`${styles.career} container`} aria-labelledby="experience-heading">
        <div className={styles.careerIntro}><div className={styles.stickyHeading} data-animate><p className={styles.sectionLabel}><span /> EXPERIENCE / THE JOURNEY SO FAR</p><h2 id="experience-heading">Every role.<br /><span>Another perspective.</span></h2><p>From hands-on design and development to creative direction and building my own agency. Always learning. Always making.</p><Link href="/work" className={styles.textLink}>See the work behind the experience</Link></div></div>
        <ol className={styles.timeline}>{experience.map((job) => <li className={styles.careerItem} key={job.company} data-animate><div className={styles.careerMeta}><span>{job.period}</span>{job.logo && <Image src={job.logo} alt="" width={34} height={34} className={styles.careerLogo} />}</div><h3>{job.role}</h3>{job.companyUrl ? <a className={styles.companyLink} href={job.companyUrl} target="_blank" rel="noopener noreferrer" aria-label={`${job.company} on LinkedIn (opens in a new tab)`}>{job.company}</a> : <p className={styles.companyName}>{job.company}</p>}{job.description && <p className={styles.careerDescription}>{job.description}</p>}{job.location && <span className={styles.careerLocation}><MapPin size={14} aria-hidden="true" />{job.location}</span>}</li>)}</ol>
      </section>

      <section id="education" className={`${styles.education} container`} aria-labelledby="education-heading">
        <div className={styles.educationIntro} data-animate><p className={styles.sectionLabel}><span /> THE FOUNDATION</p><h2 id="education-heading">Logic meets<br /><span>imagination.</span></h2><p>A foundation in computer science, a practice in creativity. Bringing technical understanding to the way I design and build.</p></div>
        <article className={styles.degree} data-animate><div className={styles.degreeArt} aria-hidden="true"><Braces size={34} strokeWidth={1.2} /><span>CS<span>.</span></span><span>LOGIC + IMAGINATION</span></div><div className={styles.degreeInfo}><span className={styles.degreeLabel}><GraduationCap size={17} strokeWidth={1.4} aria-hidden="true" /> BACHELOR OF SCIENCE</span><h3>BS in Computer Science</h3><p>Islamia College Peshawar</p><span className={styles.degreeLocation}><MapPin size={14} aria-hidden="true" />Peshawar, Pakistan</span></div></article>
      </section>

      <section className={`${styles.closing} container`} aria-labelledby="about-contact-heading"><div className={styles.closingPanel}><div data-animate><p className={styles.sectionLabel}><span /> STILL CURIOUS. READY FOR WHAT’S NEXT.</p><h2 id="about-contact-heading">Got something<br /><span>on your mind?</span></h2><p>A brief. A question. An idea worth exploring.<br />I’d love to hear what you’re thinking.</p><div className={styles.closingActions}><Link href="/contact" className={styles.primaryButton}><MessageCircle size={17} strokeWidth={1.5} aria-hidden="true" /> Start a conversation</Link><Link href="/work" className={styles.textLink}>Explore my work</Link></div></div><Asterisk className={styles.closingMark} strokeWidth={0.9} aria-hidden="true" /></div></section>
    </AboutMotion>
  );
}
