import { experience, type ExperienceEntry } from "@/content/portfolio";
import { Divider } from "./Divider";
import { PageNum } from "./PageNum";

function TimelineEntry({ entry }: { entry: ExperienceEntry }) {
  return (
    <div className="entry">
      <div className="when">
        {entry.start}
        <span className="dash">↓</span>
        <span className="yr-end">{entry.end}</span>
      </div>
      <div className="what">
        <h4>{entry.role}</h4>
        <div className="where">
          {entry.company} · {entry.location}
        </div>
        <ul>
          {entry.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-heading">
      <div className="section-label">V · log entries</div>
      <h2 id="experience-heading">The work, by date.</h2>

      <div className="timeline">
        {experience.map((entry) => (
          <TimelineEntry key={`${entry.company}-${entry.start}`} entry={entry} />
        ))}
      </div>

      <Divider d="M 4 11 C 70 17, 150 5, 230 12 C 310 18, 390 6, 470 11 C 550 17, 630 7, 710 12 C 730 13, 750 11, 758 12" />
      <PageNum>pp. 07 – 08</PageNum>
    </section>
  );
}
