import { projects } from "@/content/portfolio";
import { Divider } from "./Divider";
import { PageNum } from "./PageNum";
import { ProjectCard } from "./ProjectCard";

export function Projects() {
  const lastPage = String(3 + projects.length).padStart(2, "0");
  return (
    <section className="projects" id="projects" aria-labelledby="projects-heading">
      <div className="section-label">IV · case study notes</div>
      <h2 id="projects-heading">Things I've built.</h2>

      {projects.map((p) => (
        <ProjectCard key={p.caseNo} project={p} />
      ))}

      <Divider d="M 4 12 C 80 6, 160 18, 240 11 C 320 5, 400 17, 480 12 C 560 6, 640 15, 720 11 C 740 10, 752 12, 758 11" />
      <PageNum>pp. 04 – {lastPage}</PageNum>
    </section>
  );
}
