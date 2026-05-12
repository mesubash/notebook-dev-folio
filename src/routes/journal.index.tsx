import { createFileRoute, Link } from "@tanstack/react-router";

import { Divider } from "@/components/notebook/Divider";
import { Footer } from "@/components/notebook/Footer";
import { JournalCard } from "@/components/notebook/JournalCard";
import { Nav } from "@/components/notebook/Nav";
import { PageNum } from "@/components/notebook/PageNum";
import { PaperLayers } from "@/components/notebook/PaperLayers";
import { site } from "@/content/portfolio";
import { writings } from "@/lib/writings";

const title = `Journal — ${site.name}`;
const description =
  "Notebook entries by Subash Singh Dhami — short essays on engineering, systems, and the thinking around them.";

export const Route = createFileRoute("/journal/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${site.url}/journal` },
      { property: "og:image", content: `${site.url}/og-image.png` },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: `${site.url}/og-image.png` },
    ],
    links: [{ rel: "canonical", href: `${site.url}/journal` }],
  }),
  component: JournalIndex,
});

function JournalIndex() {
  return (
    <>
      <PaperLayers />
      <Nav />

      <main className="page">
        <div className="margin-line" />

        <section className="hero" aria-labelledby="journal-heading">
          <span className="greet">filed —</span>
          <h1 id="journal-heading">Journal.</h1>
          <p className="title">
            Short entries on engineering, systems, and the thinking around them. Written
            slowly. Edited rarely.
          </p>
          <p className="date-entry">
            section II · {writings.length}{" "}
            {writings.length === 1 ? "entry" : "entries"}
          </p>

          <Divider d="M 4 13 C 60 4, 140 18, 220 11 C 300 5, 360 17, 440 12 C 520 7, 600 16, 680 10 C 720 7, 745 12, 756 11" />
          <PageNum>p. 01</PageNum>
        </section>

        <section className="projects" aria-labelledby="entries-heading">
          <div className="section-label">II · journal entries</div>
          <h2 id="entries-heading">Things I've written.</h2>

          {writings.length === 0 ? (
            <p>No entries yet. Check back soon.</p>
          ) : (
            writings.map((w, i) => (
              <JournalCard key={w.slug} entry={w} index={i} />
            ))
          )}

          <Divider d="M 4 12 C 80 6, 160 18, 240 11 C 320 5, 400 17, 480 12 C 560 6, 640 15, 720 11 C 740 10, 752 12, 758 11" />
          <PageNum>pp. 02 – {String(1 + writings.length).padStart(2, "0")}</PageNum>
        </section>

        <section className="contact" aria-labelledby="back-heading">
          <p className="lede" id="back-heading">
            <Link to="/">← back to the notebook</Link>
            <small>or close the book and go outside</small>
          </p>
          <p className="signature">{site.shortName}</p>
          <PageNum>p. {String(2 + writings.length).padStart(2, "0")}</PageNum>
        </section>
      </main>

      <Footer />
    </>
  );
}
