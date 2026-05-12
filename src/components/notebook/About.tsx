import { about } from "@/content/portfolio";
import { Divider } from "./Divider";
import { PageNum } from "./PageNum";

export function About() {
  return (
    <section className="about" id="about" aria-labelledby="about-heading">
      <div className="section-label">{about.sectionLabel}</div>
      <h2 id="about-heading">{about.heading}</h2>
      {about.paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
      <span className="signoff">{about.signoff}</span>

      <Divider d="M 6 12 C 80 18, 160 6, 240 13 C 320 19, 400 7, 480 12 C 560 17, 640 9, 720 13 C 740 14, 752 12, 758 12" />
      <PageNum>p. 02</PageNum>
    </section>
  );
}
