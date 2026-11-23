"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  Asterisk, BookOpen, Braces, Check, Code2, Layers3, Megaphone,
  MessageCircle, Plus, Receipt, Search, ShoppingBag, Smartphone,
  Infinity as InfinityIcon,
} from "lucide-react";
import { services, serviceInquiryHref } from "@/lib/services";
import styles from "./services-explorer.module.css";

const serviceIcons = {
  social: Megaphone, ads: InfinityIcon, web: Code2, search: Search,
  app: Smartphone, pos: Receipt, catalog: BookOpen, shopify: ShoppingBag, custom: Braces,
};

const groups = [
  {
    id: "marketing-services",
    title: "Marketing & visibility",
    description: "Get discovered. Give people a reason to care.",
    icon: Megaphone,
    services: ["social-media-marketing", "meta-ads", "seo-aeo"],
  },
  {
    id: "development-services",
    title: "Websites & applications",
    description: "Build a digital experience that moves things forward.",
    icon: Code2,
    services: ["website-development", "app-development", "custom-website"],
  },
  {
    id: "commerce-services",
    title: "Commerce & operations",
    description: "Make browsing, buying, and running your business easier.",
    icon: ShoppingBag,
    services: ["point-of-sale-website", "product-catalog", "shopify-website"],
  },
] as const;

export function ServicesExplorer() {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    function openLinkedService() {
      const id = window.location.hash.slice(1);
      if (!services.some((service) => service.id === id)) return;
      const detail = document.getElementById(id);
      if (detail instanceof HTMLDetailsElement && section.current?.contains(detail)) {
        detail.open = true;
        // Opening a service can close an earlier panel and shift the anchor.
        detail.scrollIntoView({ behavior: "instant", block: "start" });
      }
    }
    function reopenCurrentService(event: MouseEvent) {
      const link = event.target instanceof Element ? event.target.closest('a[href^="#"]') : null;
      if (link?.getAttribute("href") === window.location.hash) openLinkedService();
    }
    openLinkedService();
    window.addEventListener("hashchange", openLinkedService);
    document.addEventListener("click", reopenCurrentService);
    return () => {
      window.removeEventListener("hashchange", openLinkedService);
      document.removeEventListener("click", reopenCurrentService);
    };
  }, []);

  return (
    <section ref={section} id="our-services" className={`${styles.section} container`} aria-labelledby="offering-heading">
      <div className={styles.topline} data-reveal>
        <p className={styles.label}><span /> 01 / WHAT WE DO · {String(services.length).padStart(2, "0")} SERVICES</p>
        <span className={styles.toplineNote}><Layers3 size={15} aria-hidden="true" /> Individual services. Shared direction.</span>
      </div>
      <div className={styles.heading} data-reveal>
        <h2 id="offering-heading">More ways to grow.<br /><span>One connected approach.</span></h2>
        <p>From the first impression to the everyday operation. Find the right support for where your business goes next.</p>
      </div>
      <div className={styles.layout}>
        <aside className={styles.sidebar} aria-label="Explore service categories">
          <nav className={styles.index} aria-label="Service categories">
            <p>Explore our expertise</p>
            {groups.map((group) => {
              const Icon = group.icon;
              return (
                <a key={group.id} href={`#${group.id}`}>
                  <Icon size={18} strokeWidth={1.5} aria-hidden="true" />
                  <span>{group.title}</span><span className={styles.count}>{String(group.services.length).padStart(2, "0")}</span>
                </a>
              );
            })}
          </nav>
          <div className={styles.guidance}>
            <Asterisk className={styles.guidanceMark} size={52} strokeWidth={1.1} aria-hidden="true" />
            <p>START WITH A CONVERSATION</p>
            <h3>Your next move.<br />Let’s find it.</h3>
            <p>You don’t need all nine services. Just the right ones for your business.</p>
            <Link href="/contact"><MessageCircle size={16} aria-hidden="true" /> Talk to RevBoost</Link>
          </div>
          <p className={styles.sidebarNote}>Strategy, creative, and technology.<br />Built to work together.</p>
        </aside>
        <div className={styles.groups}>
          {groups.map((group, groupIndex) => (
            <div id={group.id} className={styles.group} key={group.id}>
              <div className={styles.groupHeading}>
                <div><h3>{group.title}</h3><p>{group.description}</p></div>
                <span>{group.services.length} services</span>
              </div>
              <div className={styles.serviceList}>
                {group.services.map((id, index) => {
                  const service = services.find((item) => item.id === id)!;
                  const Icon = serviceIcons[service.icon];
                  return (
                    <details id={service.id} className={styles.service} name="revboost-service"
                      open={groupIndex === 0 && index === 0} key={service.id}>
                      <summary className={styles.serviceSummary}>
                        <span className={styles.serviceIcon}><Icon size={23} strokeWidth={1.5} aria-hidden="true" /></span>
                        <span className={styles.serviceTitle}><span>{service.category}</span><span>{service.title}</span></span>
                        <span className={styles.toggle}><Plus size={18} strokeWidth={1.5} aria-hidden="true" /></span>
                      </summary>
                      <div className={styles.serviceBody}>
                        <div className={styles.serviceContent}>
                          <p>{service.description}</p>
                          <div className={styles.deliverables}>
                            <p>What’s included</p>
                            <ul aria-label={`${service.title} includes`}>
                              {service.deliverables.map((item) => <li key={item}><Check size={15} aria-hidden="true" />{item}</li>)}
                            </ul>
                          </div>
                        </div>
                        <div className={styles.serviceActions}>
                          <Link className={styles.discussLink} href={serviceInquiryHref(service.title)}
                            aria-label={`Discuss ${service.title} with RevBoost`}>
                            <MessageCircle size={16} aria-hidden="true" /> Discuss this service
                          </Link>
                          {"workUrl" in service && <Link className={styles.workLink} href={service.workUrl}>Explore our web work</Link>}
                        </div>
                      </div>
                    </details>
                  );
                })}
              </div>
            </div>
          ))}
          <div className={styles.footnote}><span>A focused start. Room to grow.</span><span>One service or a connected plan.</span></div>
        </div>
      </div>
    </section>
  );
}
