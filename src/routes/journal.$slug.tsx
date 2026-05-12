import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { Divider } from "@/components/notebook/Divider";
import { Footer } from "@/components/notebook/Footer";
import { Nav } from "@/components/notebook/Nav";
import { PageNum } from "@/components/notebook/PageNum";
import { PaperLayers } from "@/components/notebook/PaperLayers";
import { site } from "@/content/portfolio";
import { formatWritingDate, getWriting, renderMarkdown } from "@/lib/writings";

export const Route = createFileRoute("/journal/$slug")({
  loader: ({ params }) => {
    const writing = getWriting(params.slug);
    if (!writing) throw notFound();
    return { writing, html: renderMarkdown(writing.content) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { writing } = loaderData;
    const url = `${site.url}/journal/${writing.slug}`;
    return {
      meta: [
        { title: `${writing.title} — ${site.name}` },
        { name: "description", content: writing.excerpt },
        { property: "og:title", content: writing.title },
        { property: "og:description", content: writing.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:image", content: `${site.url}/og-image.png` },
        { property: "article:published_time", content: writing.date },
        { property: "article:tag", content: writing.tags.join(", ") },
        { name: "twitter:title", content: writing.title },
        { name: "twitter:description", content: writing.excerpt },
        { name: "twitter:image", content: `${site.url}/og-image.png` },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: JournalEntry,
});

function JournalEntry() {
  const { writing, html } = Route.useLoaderData();

  return (
    <>
      <PaperLayers />
      <Nav />

      <main className="page">
        <div className="margin-line" />

        <section className="hero" aria-labelledby="entry-heading">
          <span className="greet">entry —</span>
          <h1 id="entry-heading">{writing.title}</h1>
          <p className="title">{writing.excerpt}</p>
          <p className="date-entry">
            {formatWritingDate(writing.date)} · {writing.category} ·{" "}
            {writing.readingTime} min read
          </p>

          <Divider d="M 4 13 C 60 4, 140 18, 220 11 C 300 5, 360 17, 440 12 C 520 7, 600 16, 680 10 C 720 7, 745 12, 756 11" />
          <PageNum>p. 01</PageNum>
        </section>

        <section className="about" aria-label="entry body">
          <div className="section-label">II · the entry, in full</div>
          <div
            className="journal-prose"
            dangerouslySetInnerHTML={{ __html: html }}
          />
          {writing.tags.length > 0 && (
            <p className="sticky-note">tags — {writing.tags.join(", ")}</p>
          )}
          <span className="signoff">— S.</span>

          <Divider d="M 6 12 C 80 18, 160 6, 240 13 C 320 19, 400 7, 480 12 C 560 17, 640 9, 720 13 C 740 14, 752 12, 758 12" />
          <PageNum>p. 02</PageNum>
        </section>

        <section className="contact" aria-labelledby="back-heading">
          <p className="lede" id="back-heading">
            <Link to="/journal">← back to the journal</Link>
            <small>or page back to the notebook</small>
          </p>
          <div className="lines">
            <div className="row">
              <span className="key">notebook</span>
              <Link to="/">subashsdhami.com.np</Link>
            </div>
          </div>
          <p className="signature">{site.shortName}</p>
          <PageNum>p. 03</PageNum>
        </section>
      </main>

      <Footer />
    </>
  );
}
