"use client";

import { useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Check, LoaderCircle } from "lucide-react";
import { expertise, site } from "@/lib/content";
import { services } from "@/lib/services";
import styles from "@/app/contact/contact.module.css";

export function ContactForm({ configured, initialService = "" }: { configured: boolean; initialService?: string }) {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");
  const [briefLength, setBriefLength] = useState(0);
  const startedAt = useRef(Date.now());
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "loading") return;
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    if (!configured) {
      const body = `Name: ${data.name}\nEmail: ${data.email}\nProject: ${data.projectType}\nBudget: ${data.budget || "Not specified"}\n\n${data.message}`;
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`Project inquiry: ${data.projectType}`)}&body=${encodeURIComponent(body)}`;
      setMessage(
        "Your email app will open with your inquiry prepared. Send it there to get in touch.",
      );
      return;
    }
    setState("loading");
    setMessage("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, startedAt: startedAt.current }),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(
          result.error || "Your inquiry couldn’t be sent. Please try again.",
        );
      setState("success");
      setMessage("Thanks for reaching out. Your inquiry is on its way to me.");
      form.reset();
      setBriefLength(0);
      startedAt.current = Date.now();
    } catch (error) {
      setState("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please email me directly.",
      );
    }
  }
  return (
    <form className={styles.form} onSubmit={handleSubmit} aria-labelledby="enquiry-heading" aria-busy={state === "loading"}>
      <fieldset className={styles.fieldset}>
        <legend><span>01</span>A little about you</legend>
        <div className={styles.formRow}>
        <label htmlFor="enquiry-name">
          Your name <span>*</span>
          <input
            id="enquiry-name"
            name="name"
            autoComplete="name"
            placeholder="Your name"
            required
            minLength={2}
            maxLength={100}
          />
        </label>
        <label htmlFor="enquiry-email">
          Email address <span>*</span>
          <input
            id="enquiry-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            required
            maxLength={254}
          />
        </label>
        </div>
      </fieldset>
      <fieldset className={styles.fieldset}>
        <legend><span>02</span>The kind of help you need</legend>
        <div className={styles.formRow}>
        <label htmlFor="enquiry-service">
          Service or project type <span>*</span>
          <select id="enquiry-service" name="projectType" defaultValue={initialService} required>
            <option value="" disabled>
              Choose a service
            </option>
            <optgroup label="RevBoost services">
              {services.map((item) => <option key={item.id}>{item.title}</option>)}
            </optgroup>
            <optgroup label="Creative projects">
              {expertise.map((item) => <option key={item.title}>{item.title}</option>)}
            </optgroup>
            <option>Creative collaboration</option>
            <option>Something else</option>
          </select>
        </label>
        <label htmlFor="enquiry-budget">
          Project budget <small>(optional)</small>
          <select id="enquiry-budget" name="budget" defaultValue="">
            <option value="">Select a range</option>
            <option>Under $500</option>
            <option>$500 – $1,500</option>
            <option>$1,500 – $5,000</option>
            <option>$5,000+</option>
            <option>Let’s discuss</option>
          </select>
        </label>
        </div>
      </fieldset>
      <fieldset className={styles.fieldset}>
        <legend><span>03</span>The big picture</legend>
      <label htmlFor="enquiry-message">
        Your project brief <span>*</span>
        <textarea
          id="enquiry-message"
          name="message"
          rows={5}
          required
          minLength={20}
          maxLength={5000}
          placeholder="What are you building or hoping to improve? Share your goals, the scope, or a timeline you have in mind."
          aria-describedby="brief-hint brief-count"
          onChange={(event) => setBriefLength(event.target.value.length)}
        />
      </label>
      <div className={styles.briefHint}><p id="brief-hint">A few sentences is a good start. Minimum 20 characters.</p><span id="brief-count">{briefLength.toLocaleString("en-US")} / 5,000</span></div>
      </fieldset>
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="enquiry-website">
          Website
          <input id="enquiry-website" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className={styles.formBottom}>
        <p>
          {configured
            ? "Your details are only used to reply to your inquiry."
            : "Your inquiry opens in your email app, ready to send."}
        </p>
        <button type="submit" className={styles.submitButton} disabled={state === "loading"}>
          {state === "loading" ? (
            <>
              Sending
              <LoaderCircle size={17} className={styles.spinner} aria-hidden="true" />
            </>
          ) : state === "success" ? (
            <>
              Send another inquiry
              <Check size={17} aria-hidden="true" />
            </>
          ) : (
            <>
              {configured ? "Send your inquiry" : "Prepare your inquiry"}
              <ArrowUpRight size={17} aria-hidden="true" />
            </>
          )}
        </button>
      </div>
      {message && (
        <p
          className={`${styles.feedback} ${state === "error" ? styles.feedbackError : state === "success" ? styles.feedbackSuccess : ""}`}
          role={state === "error" ? "alert" : "status"}
        >
          {message}
          {state === "error" && (
            <>
              {" "}
              Or <a href={`mailto:${site.email}`}>email me directly</a>.
            </>
          )}
        </p>
      )}
    </form>
  );
}
