import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

export function Button({
  children,
  href,
  secondary = false,
  external = false,
  className = "",
}: {
  children: ReactNode;
  href: string;
  secondary?: boolean;
  external?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`button ${secondary ? "button-secondary" : ""} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span>{children}</span>
      {external ? <ArrowUpRight size={16} /> : <ArrowRight size={16} />}
    </Link>
  );
}

export function SectionLabel({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <p className={`section-label ${light ? "text-white/50" : ""}`}>
      <span className="label-square" />
      {children}
    </p>
  );
}

export function PageIntro({
  label,
  children,
  description,
}: {
  label: string;
  children: ReactNode;
  description?: string;
}) {
  return (
    <section className="page-intro container">
      <SectionLabel>{label}</SectionLabel>
      <h1>{children}</h1>
      {description && <p className="page-description">{description}</p>}
    </section>
  );
}

export function ScrollHint() {
  return (
    <a href="#selected-work" className="scroll-hint">
      <span className="round-icon">
        <ArrowDown size={16} />
      </span>
      Scroll to explore
    </a>
  );
}
