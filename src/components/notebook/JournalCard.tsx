import { Link } from "@tanstack/react-router";
import { ShareButton } from "@/components/notebook/ShareButton";
import { site } from "@/content/portfolio";
import type { Writing } from "@/lib/writings";
import { formatWritingDate } from "@/lib/writings";

export function JournalCard({
  entry,
  index,
}: {
  entry: Writing;
  index: number;
}) {
  const caseNo = String(index + 1).padStart(2, "0");
  return (
    <article className="proj">
      <div className="case-no">entry № {caseNo}</div>
      <h3>
        <Link to="/journal/$slug" params={{ slug: entry.slug }}>
          {entry.title}
        </Link>
        <svg
          className="underline-scribble"
          viewBox="0 0 220 12"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M 2 6 C 30 2, 80 10, 130 5 C 170 1, 200 8, 218 5"
            stroke="#2c1810"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </h3>
      <div className="row">
        <div className="key">dated</div>
        <div className="val">{formatWritingDate(entry.date)}</div>
        <div className="key">filed under</div>
        <div className="val">
          <code>{entry.category}</code>
          {" · "}
          <code>{entry.readingTime} min read</code>
        </div>
        <div className="key">excerpt</div>
        <div className="val">{entry.excerpt}</div>
      </div>
      <p className="link">
        <Link to="/journal/$slug" params={{ slug: entry.slug }}>
          read the long version
        </Link>
        <span className="link-sep" aria-hidden="true">
          ·
        </span>
        <ShareButton
          url={`${site.url}/journal/${entry.slug}`}
          title={entry.title}
          text={entry.excerpt}
          variant="card"
        />
      </p>
      {entry.tags.length > 0 && (
        <p className="sticky-note">tags — {entry.tags.join(", ")}</p>
      )}
    </article>
  );
}
