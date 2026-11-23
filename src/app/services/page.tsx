import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Asterisk, Check, Code2, Download, Globe2, Mail, Megaphone,
  MessageCircle, MousePointer2, Plus, Search, ShoppingBag,
} from "lucide-react";
import { RevealObserver } from "@/components/reveal";
import { ServicesExplorer } from "@/components/services-explorer";
import { site } from "@/lib/content";
import { websites } from "@/lib/websites";
import { GrowthArt } from "./growth-art";
import styles from "./services.module.css";

export const metadata: Metadata = {
  title: "Our Services | RevBoost",
  description:
    "Strategy, creative, and technology for your next stage of growth. Explore RevBoost’s marketing, websites, apps, SEO/AEO, and commerce services. Islamabad, working worldwide.",
  alternates: { canonical: "/services" },
};

const capabilities = [
  { title: "Find your audience.", detail: "Marketing & visibility", href: "#marketing-services", icon: Megaphone },
  { title: "Build your experience.", detail: "Websites & applications", href: "#development-services", icon: Code2 },
  { title: "Simplify your business.", detail: "Commerce & operations", href: "#commerce-services", icon: ShoppingBag },
];
const steps = [
  { title: "Understand.", description: "Your business, your audience, your ambition. We listen first and get clear on what matters.", output: "A shared starting point" },
  { title: "Find the direction.", description: "Connect the right channels, messages, and creative around a focused plan for your business.", output: "A considered plan" },
  { title: "Make it happen.", description: "Design, build, and launch. Bring the idea to life with care for the details and the bigger picture.", output: "Work out in the world" },
  { title: "Keep moving.", description: "Review the response, learn what works, and use those insights to shape the next move.", output: "A clearer next step" },
];
const questions = [
  { question: "Can we start with just one service?", answer: "Absolutely. We can start with the service your business needs most and build from there. The goal is a focused plan that fits your stage of growth, whether that means one project or several connected services." },
  { question: "What if I’m not sure what my business needs?", answer: "Start with a conversation. Tell us about your business, the challenges you’re facing, and where you want to go. We’ll help you work out which creative, marketing, or development support makes sense." },
  { question: "Do you work with businesses outside Pakistan?", answer: "Yes. RevBoost is based in Islamabad, Pakistan, and works with businesses around the world. We can collaborate remotely throughout planning, creation, and launch." },
  { question: "How do we get started?", answer: "Share a few details through the contact page. We’ll discuss your goals, the scope of the work, and the next steps before a project begins. You don’t need a perfect brief to start." },
];
const selectedWebsites = [websites[0], websites[3], websites[5]];

export default function Services() {
  return (
    <div className={styles.page}>
      <section className={`${styles.hero} container`} aria-labelledby="services-heading">
        <div className={styles.heroPanel}>
          <div className={styles.heroTopline}>
            <span className={styles.wordmark}>REV<span>BOOST</span><Asterisk size={18} strokeWidth={1.4} aria-hidden="true" /></span>
            <span className={styles.toplineNote}>INDEPENDENT THINKING. CONNECTED EXECUTION.</span>
          </div>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>A CREATIVE & DIGITAL GROWTH PARTNER</p>
              <h1 id="services-heading">Your next<br /><span>big move.</span></h1>
              <p className={styles.heroLead}>Strategy, creative, and technology.<br />Everything your next chapter needs, connected.</p>
              <div className={styles.heroActions}>
                <Link href="/contact" className={styles.primaryButton}><MessageCircle size={17} aria-hidden="true" /> Let’s talk about your project</Link>
                <a href="#our-services" className={styles.heroExplore}>Explore our services</a>
              </div>
              <Link href="/about" className={styles.founderLink}>
                <span className={styles.founderPortrait}><Image src="/images/danyal-khan.png" alt="" width={46} height={46} sizes="46px" /></span>
                <span><strong>Founded & led by Danyal Khan</strong><span>Creative thinking. Hands-on execution.</span></span>
              </Link>
            </div>
            <GrowthArt />
          </div>
          <div className={styles.heroFoot}>
            <span><Globe2 size={15} aria-hidden="true" /> Islamabad, Pakistan · Working worldwide</span>
            <a href="/downloads/RevBoost_Company_Profile.pdf" download="RevBoost_Company_Profile.pdf"><Download size={15} aria-hidden="true" /> Download company profile <span>PDF</span></a>
          </div>
        </div>
        <nav className={styles.capabilities} aria-label="Explore our capabilities">
          {capabilities.map((capability) => {
            const Icon = capability.icon;
            return <a key={capability.title} href={capability.href}><Icon size={24} strokeWidth={1.4} aria-hidden="true" /><span><strong>{capability.title}</strong><span>{capability.detail}</span></span><Plus size={16} aria-hidden="true" /></a>;
          })}
        </nav>
      </section>

      <ServicesExplorer />

      <section className={`${styles.connected} container`} aria-labelledby="connected-heading">
        <div className={styles.connectedPanel}>
          <div className={styles.connectedCopy} data-reveal>
            <p className={styles.sectionLabel}><span /> THE BIGGER PICTURE</p>
            <h2 id="connected-heading">Every part.<br /><span>Pulling together.</span></h2>
            <p>Great creative gets attention. A thoughtful experience builds confidence. The right tools help your business deliver. We connect the pieces around what you want to achieve.</p>
            <Link href="/contact" className={styles.outlineButton}><MessageCircle size={16} aria-hidden="true" /> Find your direction</Link>
          </div>
          <div className={styles.connectionMap} aria-label="Discover, connect, and deliver: three parts of a connected customer experience">
            <div className={styles.mapHeading}><Asterisk size={18} aria-hidden="true" /><span>THE REVBOOST APPROACH</span></div>
            <div className={styles.connectionNode} data-reveal><span className={styles.nodeIcon}><Search size={24} strokeWidth={1.4} aria-hidden="true" /></span><div><h3>Be discovered.</h3><p>Social, search, and campaigns that introduce your business.</p><span>MARKETING & VISIBILITY</span></div></div>
            <div className={styles.connectionNode} data-reveal><span className={styles.nodeIcon}><MousePointer2 size={24} strokeWidth={1.4} aria-hidden="true" /></span><div><h3>Make a connection.</h3><p>Websites and apps that turn interest into a next step.</p><span>DIGITAL EXPERIENCES</span></div></div>
            <div className={styles.connectionNode} data-reveal><span className={styles.nodeIcon}><ShoppingBag size={24} strokeWidth={1.4} aria-hidden="true" /></span><div><h3>Keep things moving.</h3><p>Commerce and business tools that support what comes next.</p><span>COMMERCE & OPERATIONS</span></div></div>
            <div className={styles.mapFoot}><Check size={14} aria-hidden="true" /> One business. A connected approach.</div>
          </div>
        </div>
      </section>

      <section className={`${styles.workSection} container`} aria-labelledby="services-work-heading">
        <div className={styles.sectionHeading} data-reveal>
          <div><p className={styles.sectionLabel}><span /> IDEAS OUT IN THE WORLD</p><h2 id="services-work-heading">From the thinking<br /><span>to the doing.</span></h2></div>
          <div className={styles.headingAside}><p>A few digital experiences brought to life for real businesses.</p><Link href="/work?category=Web%20%26%20Digital" className={styles.textLink}>Explore our web work</Link></div>
        </div>
        <div className={styles.workGrid}>
          {selectedWebsites.map((website) => (
            <a key={website.url} href={website.url} className={styles.workCard} target="_blank" rel="noopener noreferrer" data-reveal aria-label={`Visit ${website.name} (opens in a new tab)`}>
              <div className={styles.workPreview}><div className={styles.previewBar} aria-hidden="true"><span><i /><i /><i /></span><span>{website.domain}</span><Globe2 size={12} /></div><div className={styles.workImage}><Image src={website.image} alt={`${website.name} homepage`} fill sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 33vw" /></div><span className={styles.workVisit}><Globe2 size={14} aria-hidden="true" /> Visit website</span></div>
              <div className={styles.workInfo}><h3>{website.name}</h3><span>Website development</span></div>
            </a>
          ))}
        </div>
      </section>

      <section className={`${styles.processSection} container`} aria-labelledby="process-heading">
        <div className={styles.sectionHeading} data-reveal>
          <div><p className={styles.sectionLabel}><span /> HOW WE WORK</p><h2 id="process-heading">A clear direction.<br /><span>A close collaboration.</span></h2></div>
          <p>You’re part of the process.<br />From the first conversation to what comes next.</p>
        </div>
        <ol className={styles.processGrid}>
          {steps.map((step) => <li key={step.title} data-reveal><span className={styles.processMark} aria-hidden="true"><Asterisk size={25} strokeWidth={1.1} /></span><h3>{step.title}</h3><p>{step.description}</p><span className={styles.processOutput}>{step.output}</span></li>)}
        </ol>
        <div className={styles.processFoot}><span>Thoughtful strategy. Considered execution.</span><a href="/downloads/RevBoost_Company_Profile.pdf" download="RevBoost_Company_Profile.pdf"><Download size={14} aria-hidden="true" /> Get to know RevBoost</a></div>
      </section>

      <section className={`${styles.faqSection} container`} aria-labelledby="faq-heading">
        <div className={styles.faqIntro} data-reveal><p className={styles.sectionLabel}><span /> BEFORE WE BEGIN</p><h2 id="faq-heading">A little more<br /><span>clarity.</span></h2><p>Good questions make<br />a great starting point.</p><Link href="/contact" className={styles.textLink}>Ask us something else</Link></div>
        <div className={styles.faqList} data-reveal>
          {questions.map((item, index) => <details key={item.question} name="revboost-faq" open={index === 0}><summary>{item.question}<span><Plus size={18} aria-hidden="true" /></span></summary><p>{item.answer}</p></details>)}
        </div>
      </section>

      <section className={`${styles.ctaSection} container`} aria-labelledby="services-cta-heading">
        <div className={styles.cta}>
          <div className={styles.ctaTopline}><p className={styles.sectionLabel}><span /> SOMETHING GOOD STARTS HERE</p><span>LET’S MAKE THE NEXT MOVE COUNT.</span></div>
          <div className={styles.ctaContent} data-reveal><h2 id="services-cta-heading">Ready for<br /><span>what’s next?</span></h2><Asterisk className={styles.ctaMark} strokeWidth={0.8} aria-hidden="true" /></div>
          <div className={styles.ctaActions} data-reveal><div><p>A new idea. A business to grow. A better way forward.<br />Tell us what you have in mind.</p><Link href="/contact" className={styles.primaryButton}><MessageCircle size={17} aria-hidden="true" /> Tell us about your project</Link></div><a className={styles.ctaEmail} href={`mailto:${site.email}`}><span>OR SAY HELLO DIRECTLY</span><span><Mail size={18} aria-hidden="true" />{site.email}</span></a></div>
          <div className={styles.ctaFoot}><span className={styles.wordmark}>REV<span>BOOST</span></span><span><Globe2 size={14} aria-hidden="true" /> Islamabad, Pakistan · Working worldwide</span></div>
        </div>
      </section>
      <RevealObserver />
    </div>
  );
}
