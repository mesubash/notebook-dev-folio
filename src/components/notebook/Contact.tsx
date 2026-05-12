import { site, socials } from "@/content/portfolio";
import { ContactForm } from "./ContactForm";
import { PageNum } from "./PageNum";

export function Contact() {
  return (
    <section className="contact" id="contact" aria-labelledby="contact-heading">
      <div className="section-label">VI · back cover</div>
      <p className="lede" id="contact-heading">
        Drop me a line.
        <small>or a postcard, if you must</small>
      </p>

      <ContactForm />

      <p className="cform-divider">— or, the analog channels —</p>

      <div className="lines">
        {socials.map((s) => {
          const isExternal = !s.href.startsWith("mailto:");
          return (
            <div className="row" key={s.key}>
              <span className="key">{s.label}</span>
              <a
                href={s.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
              >
                {s.display}
              </a>
            </div>
          );
        })}
      </div>

      <p className="scribble">
        I read every email. I reply slower than I should — please nudge me if it's been a week.
      </p>

      <p className="signature">{site.shortName}</p>

      <p className="smallprint">
        this notebook is page-numbered, hand-bound, and accepts no warranty. last entry:{" "}
        {site.lastEntry}. composed in special elite + caveat. printed on f2e8d5 parchment.
      </p>
      <PageNum>p. 09</PageNum>
    </section>
  );
}
