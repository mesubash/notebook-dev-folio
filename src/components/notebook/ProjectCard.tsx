import type { Project } from "@/content/portfolio";
import { Fragment } from "react";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="proj">
      <div className="case-no">{project.caseNo}</div>
      <h3>
        {project.title}
        <svg
          className="underline-scribble"
          viewBox={project.underlineViewBox ?? "0 0 220 12"}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d={project.underlineD}
            stroke="#2c1810"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </h3>
      <div className="row">
        <div className="key">problem</div>
        <div className="val">{project.problem}</div>
        <div className="key">approach</div>
        <div className="val">{project.approach}</div>
        <div className="key">stack</div>
        <div className="val">
          {project.stack.map((tech, i) => (
            <Fragment key={tech}>
              <code>{tech}</code>
              {i < project.stack.length - 1 ? " · " : null}
            </Fragment>
          ))}
        </div>
        <div className="key">result</div>
        <div className="val">{project.result}</div>
      </div>
      {project.href && (
        <p className="link">
          <a href={project.href} target="_blank" rel="noopener noreferrer">
            read the long version
          </a>
        </p>
      )}
      {project.note && <p className="sticky-note">{project.note}</p>}
    </article>
  );
}
