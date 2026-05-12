import { skillGroups, type SkillGroup } from "@/content/portfolio";
import { Divider } from "./Divider";
import { PageNum } from "./PageNum";

function SkillGroupBlock({ group }: { group: SkillGroup }) {
  return (
    <div className="group">
      <span className="group-label">{group.label}</span>
      {group.style === "checklist" ? (
        <ul className="checklist">
          {group.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : (
        <div className="stamps">
          {group.items.map((item) => (
            <span className="stamp" key={item}>
              {item}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export function Skills() {
  return (
    <section className="skills" id="skills" aria-labelledby="skills-heading">
      <div className="section-label">III · tools of the trade</div>
      <h2 id="skills-heading">Skills, roughly inventoried.</h2>

      {skillGroups.map((group) => (
        <SkillGroupBlock key={group.label} group={group} />
      ))}

      <Divider
        d="M 4 11 C 70 5, 150 17, 230 10 C 310 4, 390 16, 470 11 C 550 6, 630 15, 710 10 C 730 9, 750 11, 758 10"
        extra="M 440 16 C 480 14, 530 18, 580 15"
      />
      <PageNum>p. 03</PageNum>
    </section>
  );
}
