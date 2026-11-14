import { ArrowUpRight } from "lucide-react";
import { process } from "@/lib/content";
import { SectionLabel } from "./ui";

export function Process({ sectionNumber = "04" }: { sectionNumber?: string }) {
  return (
    <section className="process-section container section-space" data-reveal>
      <SectionLabel>{sectionNumber} / My process</SectionLabel>
      <div className="section-heading">
        <h2>
          From first conversation.
          <br />
          <span className="muted">To final execution.</span>
        </h2>
        <p>
          One connected process.
          <br />A little curiosity at every step.
        </p>
      </div>
      <div className="process-grid">
        {process.map((step, index) => (
          <div className="process-step" key={step.title}>
            <div className="process-step-top">
              <span>0{index + 1}</span>
              <ArrowUpRight size={17} />
            </div>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
