import { site } from "@/content/portfolio";
import { Divider } from "./Divider";
import { PageNum } from "./PageNum";

function DogEar() {
  return (
    <svg className="dog-ear" viewBox="0 0 100 100" aria-hidden="true">
      <polygon points="100,0 100,55 45,0" fill="#cdb888" />
      <polygon points="100,0 100,55 45,0" fill="url(#dogShade)" />
      <polygon points="100,0 100,55 45,0" fill="#e0cfa6" transform="translate(-6 6)" />
      <line x1="45" y1="0" x2="100" y2="55" stroke="#7a5a30" strokeWidth="0.6" opacity="0.55" />
      <path
        d="M 47 2 Q 60 35 99 56"
        stroke="rgba(60,40,18,0.22)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="dogShade" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#a88a55" stopOpacity="0.55" />
          <stop offset="1" stopColor="#a88a55" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Hero() {
  const [monthDay, year] = site.entryDate.split(", ");
  const ordinalMatch = monthDay.match(/^(.*?)(st|nd|rd|th)$/);
  const datePrefix = ordinalMatch ? ordinalMatch[1] : monthDay;
  const ordinal = ordinalMatch ? ordinalMatch[2] : "";

  return (
    <section className="hero" aria-labelledby="hero-heading">
      <DogEar />

      <span className="greet">hello —</span>
      <h1 id="hero-heading">{site.shortName}</h1>
      <p className="title">{site.tagline}</p>
      <p className="date-entry">
        entry no. {site.entryNo} · {datePrefix}
        {ordinal && (
          <sup
            style={{
              fontFamily: "'Special Elite'",
              fontSize: "0.55em",
              verticalAlign: "0.6em",
            }}
          >
            {ordinal}
          </sup>
        )}
        , {year}
      </p>

      <p className="enclosure">
        <span className="clip" aria-hidden="true">¶</span>
        enclosed —{" "}
        <a href={site.resume.href} target="_blank" rel="noopener noreferrer">
          {site.resume.label} (pdf, view)
        </a>
        {" · "}
        <a href={site.resume.href} download={site.resume.filename}>
          download
        </a>
      </p>

      <div className="stamp-date" aria-hidden="true">
        <span>NOTEBOOK</span>
        <span className="big">№ {site.notebookNo}</span>
      </div>

      <Divider
        d="M 4 13 C 60 4, 140 18, 220 11 C 300 5, 360 17, 440 12 C 520 7, 600 16, 680 10 C 720 7, 745 12, 756 11"
        extra="M 30 16 C 90 12, 130 18, 170 16"
      />
      <PageNum>p. 01</PageNum>
    </section>
  );
}
