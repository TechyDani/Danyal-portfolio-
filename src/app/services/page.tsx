import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, Check,
  BookOpen, Braces, Code2, Download, Globe2, Infinity as InfinityIcon, Megaphone,
  MousePointer2, Plus, Receipt, Search, ShoppingBag, Smartphone, Target, TrendingUp,
} from "lucide-react";
import { RevealObserver } from "@/components/reveal";
import { services, serviceInquiryHref } from "@/lib/services";
import styles from "./services.module.css";

export const metadata: Metadata = {
  title: "Our Services | RevBoost",
  description:
    "Explore RevBoost’s services: social media marketing, Meta ads, SEO/AEO, website and app development, point of sale websites, product catalogs, Shopify, and custom websites.",
  alternates: { canonical: "/services" },
};

const serviceIcons = {
  social: Megaphone, ads: InfinityIcon, web: Code2, search: Search,
  app: Smartphone, pos: Receipt, catalog: BookOpen, shopify: ShoppingBag, custom: Braces,
};
const steps = [
  { title: "Understand", description: "Your business, your audience, your offer. We start by understanding what growth means for you." },
  { title: "Plan", description: "Set the direction. Connect the right channels, messages, and creative around your business goals." },
  { title: "Create & launch", description: "Bring the plan to life, with every ad, post, and page working toward a clear next step." },
  { title: "Review & refine", description: "Look at the response, learn what’s working, and use those insights to shape the next move." },
];
const journey = [
  { title: "Be discovered", detail: "SOCIAL + SEARCH", icon: Search },
  { title: "Spark interest", detail: "CONTENT + ADS", icon: Target },
  { title: "Build confidence", detail: "WEBSITES + APPS", icon: Code2 },
  { title: "Make a connection", detail: "SALES + ENQUIRIES", icon: MousePointer2 },
];
const questions = [
  { question: "Can we start with just one service?", answer: "We can start with the service your business needs most and build from there. The goal is a clear, connected plan that fits your stage of growth." },
  { question: "Do you work with businesses outside Pakistan?", answer: "Yes. RevBoost is based in Islamabad, Pakistan, and works with businesses around the world." },
  { question: "How do we get started?", answer: "Tell us about your business and what you want to achieve through the contact page. We’ll discuss your goals, your current challenges, and which services make sense for you." },
];

export default function Services() {
  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="services-heading">
        <div className="container">
          <div className={styles.heroTopline}>
            <span className={styles.wordmark}>REV<span>BOOST</span><ArrowUpRight size={18} aria-hidden="true" /></span>
            <span className={styles.toplineNote}>MARKETING AGENCY / OUR SERVICES</span>
          </div>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}><span /> STRATEGY FIRST. GROWTH IN FOCUS.</p>
              <h1 id="services-heading">Growth needs<br /><span>structure.</span></h1>
              <p className={styles.heroLead}>Marketing that connects. Websites, apps, and commerce solutions that make your business work better. All built around a clear strategy.</p>
              <div className={styles.heroActions}>
                <a href="/downloads/RevBoost_Company_Profile.pdf" download="RevBoost_Company_Profile.pdf" className={styles.primaryButton}>Download RevBoost Company Profile <Download size={17} aria-hidden="true" /></a>
                <a href="#our-services" className={styles.textLink}>Explore our services <ArrowDown size={15} /></a>
              </div>
              <Link href="/about" className={styles.founderLink}>
                <span className={styles.founderPortrait}><Image src="/images/danyal-khan.png" alt="" width={42} height={42} /></span>
                <span><strong>Founded & led by Danyal Khan</strong><span>Islamabad, Pakistan · Working worldwide</span></span>
                <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            </div>
            <aside className={styles.systemBoard} aria-label="The RevBoost approach to connected growth">
              <div className={styles.systemHeading}><span>THE REVBOOST APPROACH</span><span>01 → 03</span></div>
              <ol className={styles.systemSteps}>
                <li>
                  <span className={styles.systemIcon}><Megaphone size={26} strokeWidth={1.6} /></span>
                  <div><span className={styles.systemNumber}>01 / GET DISCOVERED</span><h2>Show up<br /><span>with purpose.</span></h2><p>Social media + SEO / AEO</p></div>
                  <ArrowDownRight className={styles.systemArrow} size={20} aria-hidden="true" />
                </li>
                <li>
                  <span className={styles.systemIcon}><Target size={26} strokeWidth={1.6} /></span>
                  <div><span className={styles.systemNumber}>02 / BUILD INTEREST</span><h2>Reach the<br /><span>right people.</span></h2><p>Meta ads + focused creative</p></div>
                  <ArrowDownRight className={styles.systemArrow} size={20} aria-hidden="true" />
                </li>
                <li>
                  <span className={styles.systemIcon}><MousePointer2 size={26} strokeWidth={1.6} /></span>
                  <div><span className={styles.systemNumber}>03 / CREATE A NEXT STEP</span><h2>Turn attention<br /><span>into action.</span></h2><p>Websites, apps & commerce</p></div>
                  <ArrowUpRight className={styles.systemArrow} size={20} aria-hidden="true" />
                </li>
              </ol>
              <div className={styles.systemFoot}><TrendingUp size={18} aria-hidden="true" /><span>INDIVIDUAL SERVICES. ONE CONNECTED STRATEGY.</span></div>
            </aside>
          </div>
          <div className={styles.quickLinks} aria-label="Jump to a service">
            {services.map((service) => {
              const Icon = serviceIcons[service.icon];
              return <a href={`#${service.id}`} key={service.id}><Icon size={19} strokeWidth={1.6} aria-hidden="true" /><span>{service.title}</span></a>;
            })}
          </div>
        </div>
      </section>

      <section id="our-services" className={`${styles.servicesSection} container`} aria-labelledby="offering-heading">
        <div className={styles.sectionHeading} data-reveal>
          <div><p className={styles.sectionLabel}><span /> 01 / WHAT WE DO · {services.length.toString().padStart(2, "0")} SERVICES</p><h2 id="offering-heading">More ways to grow.<br /><span>One connected approach.</span></h2></div>
          <p>From getting discovered to serving customers.<br />Marketing, websites, and tools built around your business.</p>
        </div>
        <div className={styles.serviceGrid}>
          {services.map((service, index) => {
            const Icon = serviceIcons[service.icon];
            return (
              <article id={service.id} className={styles.serviceCard} data-reveal key={service.id}>
                <div className={styles.serviceCardTop}><span className={styles.serviceIcon}><Icon size={29} strokeWidth={1.5} aria-hidden="true" /></span><span className={styles.serviceNumber}>/ {(index + 1).toString().padStart(2, "0")}</span></div>
                <p className={styles.serviceCategory}>{service.category}</p>
                <h3>{service.title}</h3>
                <p className={styles.serviceDescription}>{service.description}</p>
                <ul className={styles.deliverables} aria-label={`${service.title} includes`}>
                  {service.deliverables.map((item) => <li key={item}><Check size={14} aria-hidden="true" />{item}</li>)}
                </ul>
                <div className={styles.serviceActions}>
                  <Link href={serviceInquiryHref(service.title)} className={styles.serviceLink} aria-label={`Discuss ${service.title} with RevBoost`}>Discuss this service <ArrowUpRight size={18} /></Link>
                  {"workUrl" in service && <Link className={styles.workLink} href={service.workUrl}>See our web work <ArrowUpRight size={13} /></Link>}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className={styles.connected} aria-labelledby="connected-heading">
        <div className="container">
          <div className={styles.connectedHeading} data-reveal>
            <div><p className={styles.sectionLabel}><span /> 02 / THE BIGGER PICTURE</p><h2 id="connected-heading">Your channels should<br /><span>work together.</span></h2></div>
            <p>A post sparks interest. An ad reaches a new audience. A website, store, or app helps people take the next step. We connect your marketing and technology around your business goals.</p>
          </div>
          <ol className={styles.journey}>
            {journey.map((stage, index) => {
              const Icon = stage.icon;
              return <li key={stage.title} data-reveal><span className={styles.journeyIcon}><Icon size={25} strokeWidth={1.5} aria-hidden="true" /></span><span className={styles.journeyDetail}>{stage.detail}</span><h3>{stage.title}</h3>{index < journey.length - 1 && <ArrowRight className={styles.journeyArrow} size={20} aria-hidden="true" />}</li>;
            })}
          </ol>
        </div>
      </section>

      <section className={`${styles.processSection} container`} aria-labelledby="process-heading">
        <div className={styles.sectionHeading} data-reveal>
          <div><p className={styles.sectionLabel}><span /> 03 / HOW WE WORK</p><h2 id="process-heading">A clear plan.<br /><span>A close working relationship.</span></h2></div>
          <p>Thoughtful strategy. Hands-on execution.<br />A process you can be part of.</p>
        </div>
        <ol className={styles.processGrid}>
          {steps.map((step, index) => <li key={step.title} data-reveal><div className={styles.processTop}><span>0{index + 1}</span><ArrowUpRight size={19} aria-hidden="true" /></div><h3>{step.title}</h3><p>{step.description}</p></li>)}
        </ol>
      </section>

      <section className={`${styles.faqSection} container`} aria-labelledby="faq-heading">
        <div className={styles.faqIntro} data-reveal><p className={styles.sectionLabel}><span /> A LITTLE MORE CLARITY</p><h2 id="faq-heading">Good questions.<br /><span>Straight answers.</span></h2><Link href="/contact" className={styles.textLink}>Have something else in mind? <ArrowUpRight size={15} /></Link></div>
        <div className={styles.faqList} data-reveal>
          {questions.map((item, index) => <details key={item.question} open={index === 0}><summary>{item.question}<Plus size={18} aria-hidden="true" /></summary><p>{item.answer}</p></details>)}
        </div>
      </section>

      <section className={`${styles.ctaSection} container`} aria-labelledby="services-cta-heading">
        <div className={styles.cta} data-reveal>
          <div><p className={styles.sectionLabel}><span /> YOUR NEXT STAGE STARTS HERE</p><h2 id="services-cta-heading">Let’s give your growth<br /><span>a direction.</span></h2><p>Tell us about your business. Let’s work out the next move.</p><Link href="/contact" className={styles.primaryButton}>Talk to RevBoost <ArrowUpRight size={18} /></Link></div>
          <ArrowUpRight className={styles.ctaArrow} strokeWidth={0.7} aria-hidden="true" />
          <div className={styles.ctaFoot}><span className={styles.wordmark}>REV<span>BOOST</span></span><span><Globe2 size={13} aria-hidden="true" /> ISLAMABAD / WORKING WORLDWIDE</span></div>
        </div>
      </section>
      <RevealObserver />
    </div>
  );
}
