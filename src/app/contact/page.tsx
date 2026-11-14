import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Asterisk, Globe2, Mail, MapPin } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { RevealObserver } from "@/components/reveal";
import { site } from "@/lib/content";
import { services } from "@/lib/services";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Let’s Talk",
  description:
    "Start a conversation with Danyal Khan, creative director and founder of RevBoost. Share your brief for design, marketing, websites, apps, and business growth. Islamabad, working worldwide.",
};
export const dynamic = "force-dynamic";

const nextSteps = [
  { title: "Share the idea.", text: "A clear brief or an early thought. Tell me what you have in mind and where you’d like to go." },
  { title: "Find the direction.", text: "We’ll discuss your goals, the priorities, and the kind of creative or technical support you need." },
  { title: "Plan the next move.", text: "Bring the scope, approach, and next steps into focus before the work begins." },
];

export default async function Contact({ searchParams }: {
  searchParams: Promise<{ service?: string | string[] }>;
}) {
  const { service } = await searchParams;
  const requestedService = Array.isArray(service) ? service[0] : service;
  const initialService = services.find((item) => item.title === requestedService)?.title ?? "";
  const configured = Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_FROM_EMAIL);
  const socials = [
    { title: "Behance", href: site.behance },
    { title: "Instagram", href: site.instagram },
    { title: "Facebook", href: site.facebook },
    { title: "GitHub", href: site.github },
  ];

  return (
    <div className={styles.page}>
      <section className={`${styles.hero} container`} aria-labelledby="contact-heading">
        <div className={styles.topline} data-reveal><span>CONTACT / LET’S START SOMETHING</span><span>GOOD WORK STARTS WITH A GOOD CONVERSATION.</span></div>
        <div className={styles.heroGrid}>
          <div data-reveal>
            <h1 id="contact-heading">It starts with<br /><span>a conversation.</span></h1>
            <div className={styles.heroLinks}>
              <a href="#project-enquiry">Start your brief <ArrowDown size={15} /></a>
              <a href={`mailto:${site.email}`}>Or email me directly <ArrowUpRight size={14} /></a>
            </div>
          </div>
          <div className={styles.heroNote} data-reveal>
            <Asterisk className={styles.heroMark} size={68} strokeWidth={1} aria-hidden="true" />
            <p>A brand to build.<br />A business to grow.<br />An idea to bring to life.</p>
            <span>Tell me what you’re thinking.<br />Let’s find the way forward.</span>
          </div>
        </div>
      </section>

      <div className={`${styles.contactGrid} container`}>
        <section id="project-enquiry" className={styles.formPanel} aria-labelledby="enquiry-heading">
          <div className={styles.formHeading}>
            <div><p className={styles.sectionLabel}><span /> YOUR NEXT CHAPTER</p><h2 id="enquiry-heading">Tell me about<br /><span>your project.</span></h2></div>
            <ArrowUpRight size={36} strokeWidth={1.2} aria-hidden="true" />
          </div>
          <p className={styles.formIntro}>A few details are all it takes to get started. <span>Fields marked * are required.</span></p>
          <ContactForm key={initialService} configured={configured} initialService={initialService} />
        </section>

        <aside className={styles.contactSidebar} aria-labelledby="direct-contact-heading">
          <div className={styles.contactCard} data-reveal>
            <div className={styles.cardTopline}><span>A DIRECT LINE / A FRESH PERSPECTIVE</span><ArrowUpRight size={18} aria-hidden="true" /></div>
            <div className={styles.identity}>
              <span className={styles.portrait}><Image src="/images/danyal-khan.png" alt="Danyal Khan" width={100} height={100} sizes="70px" /></span>
              <div><h2 id="direct-contact-heading">Danyal Khan</h2><p>Creative Director<br /><span>Owner & Founder, RevBoost</span></p></div>
            </div>
            <p className={styles.cardNote}>For creative collaborations, digital experiences, and the next stage of your business.</p>
            <a className={styles.emailLink} href={`mailto:${site.email}`}><span className={styles.emailLabel}><Mail size={13} aria-hidden="true" /> SAY HELLO</span><span>{site.email}<ArrowUpRight size={20} aria-hidden="true" /></span></a>
            <div className={styles.location}><MapPin size={17} strokeWidth={1.5} aria-hidden="true" /><div><p>Islamabad, Pakistan</p><span>Working with businesses worldwide.</span></div></div>
            <div className={styles.socialSection}><p>ELSEWHERE ON THE INTERNET</p><div className={styles.socialLinks}>{socials.map((social) => <a href={social.href} key={social.title} target="_blank" rel="noopener noreferrer" aria-label={`${social.title} (opens in a new tab)`}>{social.title}<ArrowUpRight size={13} aria-hidden="true" /></a>)}</div></div>
            <div className={styles.cardSignature}><span>CREATIVE THINKING. CONSIDERED EXECUTION.</span><Asterisk size={24} strokeWidth={1.2} aria-hidden="true" /></div>
          </div>
          <div className={styles.sidebarNote}><Globe2 size={16} strokeWidth={1.5} aria-hidden="true" /><p>Good ideas travel.<br /><span>Yours can start right here.</span></p></div>
        </aside>
      </div>

      <section className={`${styles.nextSection} container`} aria-labelledby="next-heading">
        <div className={styles.nextHeading} data-reveal><div><p className={styles.sectionLabel}><span /> FROM HELLO TO WHAT’S NEXT</p><h2 id="next-heading">A simple start.<br /><span>A clear way forward.</span></h2></div><p>No perfect brief needed.<br />Just a place to begin.</p></div>
        <ol className={styles.nextGrid}>{nextSteps.map((step, index) => <li key={step.title} data-reveal><div><span>0{index + 1}</span><ArrowUpRight size={18} strokeWidth={1.4} aria-hidden="true" /></div><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol>
      </section>
      <div className={`${styles.servicesNote} container`}><p>Still exploring what your business needs?</p><Link href="/services">Discover our services <ArrowUpRight size={15} /></Link></div>
      <RevealObserver />
    </div>
  );
}
