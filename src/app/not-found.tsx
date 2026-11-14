import { Button, SectionLabel } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="container not-found">
      <SectionLabel>404 / A little off the canvas</SectionLabel>
      <h1>
        This idea hasn’t
        <br />
        <span className="muted">taken shape yet.</span>
      </h1>
      <p>Let’s get you back to something worth exploring.</p>
      <Button href="/work">Explore my work</Button>
    </section>
  );
}
