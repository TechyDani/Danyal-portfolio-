"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Asterisk, Globe2, Menu, MessageCircle, X } from "lucide-react";
import { site } from "@/lib/content";
import { navigationLinks } from "@/lib/navigation";
import styles from "./site-chrome.module.css";

export function Header() {
  const pathname = usePathname();
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const open = menuPath === pathname;
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    const menu = dialog.current;
    if (!open || !menu) return;
    const desktop = window.matchMedia("(min-width: 901px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setMenuPath(null);
    };
    if (desktop.matches) {
      setMenuPath(null);
      return;
    }
    menu.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      if (menu.open) menu.close();
      document.body.style.overflow = previousOverflow;
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [open]);

  function closeMenu() {
    setMenuPath(null);
  }

  return (
    <header className={`${styles.header} container`}>
      <div className={styles.bar}>
        <Link href="/" className={styles.identity} aria-label="Danyal Khan home"
          aria-current={pathname === "/" ? "page" : undefined} onClick={closeMenu}>
          <span className={styles.monogram} aria-hidden="true">dk<span>®</span></span>
          <span className={styles.identityCopy}><strong>Danyal Khan<span>®</span></strong><span>Ideas into experiences.</span></span>
        </Link>
        <nav className={styles.desktopNav} aria-label="Main navigation">
          {navigationLinks.map((link) => (
            <Link href={link.href} key={link.href} aria-current={isActive(link.href) ? "page" : undefined}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className={styles.headerActions}>
          <Link href="/contact" className={styles.headerCta}><MessageCircle size={16} strokeWidth={1.6} aria-hidden="true" /><span>Let’s collaborate</span></Link>
          <button className={styles.menuButton} type="button" aria-label="Open navigation"
            aria-haspopup="dialog" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setMenuPath(pathname)}>
            <Menu size={21} strokeWidth={1.6} aria-hidden="true" />
          </button>
        </div>
      </div>
      <dialog ref={dialog} id="mobile-navigation" className={styles.mobileDialog} aria-labelledby="mobile-navigation-heading"
        onCancel={closeMenu} onClose={closeMenu}
        onClick={(event) => { if (event.target === event.currentTarget) closeMenu(); }}>
        <div className={styles.mobilePanel}>
          <div className={styles.mobileTopline}><p id="mobile-navigation-heading">A LOOK AROUND</p><button type="button" className={styles.closeButton} onClick={closeMenu} aria-label="Close navigation"><X size={21} strokeWidth={1.5} aria-hidden="true" /></button></div>
          <nav className={styles.mobileNav} aria-label="Mobile navigation">
            {navigationLinks.map((link) => (
              <Link href={link.href} key={link.href} onClick={closeMenu} aria-current={isActive(link.href) ? "page" : undefined}>
                <span><strong>{link.label}</strong><span>{link.description}</span></span><Asterisk size={21} strokeWidth={1.2} aria-hidden="true" />
              </Link>
            ))}
          </nav>
          <div className={styles.mobileContact}><p>GOOD THINGS START WITH A HELLO.</p><a href={`mailto:${site.email}`} onClick={closeMenu}>{site.email}</a><span><Globe2 size={14} aria-hidden="true" /> Islamabad · Working worldwide</span></div>
        </div>
      </dialog>
    </header>
  );
}
