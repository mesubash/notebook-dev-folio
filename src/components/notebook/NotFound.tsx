import { Link } from "@tanstack/react-router";

import { site } from "@/content/portfolio";
import { Divider } from "./Divider";
import { Footer } from "./Footer";
import { Nav } from "./Nav";
import { PageNum } from "./PageNum";
import { PaperLayers } from "./PaperLayers";

export function NotFound() {
  return (
    <>
      <PaperLayers />
      <Nav />

      <main className="page">
        <div className="margin-line" />

        <section className="hero" aria-labelledby="nf-heading">
          <span className="greet">um —</span>
          <h1 id="nf-heading">404.</h1>
          <p className="title">
            This page is not in the notebook. Either I never wrote it, the page
            got torn out, or you followed a link from a draft.
          </p>
          <p className="date-entry">entry · missing · misfiled · 404</p>

          <div className="stamp-date stamp-404" aria-hidden="true">
            <span>NOT</span>
            <span className="big">FOUND</span>
          </div>

          <Divider
            d="M 4 13 C 60 4, 140 18, 220 11 C 300 5, 360 17, 440 12 C 520 7, 600 16, 680 10 C 720 7, 745 12, 756 11"
            extra="M 30 16 C 90 12, 130 18, 170 16"
          />
          <PageNum>p. 404</PageNum>
        </section>

        <section className="about" aria-label="what now">
          <div className="section-label">II · the next page</div>
          <h2>Where to go from here.</h2>
          <p>
            The notebook is finite. The internet is not. A few directions, in
            order of how often I'd recommend them:
          </p>

          <ul className="nf-list">
            <li>
              <Link to="/">→ back to the cover</Link>
              <span className="nf-list-note"> — the front of the notebook, everything in it</span>
            </li>
            <li>
              <Link to="/journal">→ flip to the journal</Link>
              <span className="nf-list-note"> — short entries, slowly written</span>
            </li>
            <li>
              <a
                href={site.resume.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                → read the résumé instead
              </a>
              <span className="nf-list-note"> — the formal one, in pdf</span>
            </li>
            <li>
              <a href={`mailto:${site.email}`}>→ write to me</a>
              <span className="nf-list-note"> — if you came here looking for something specific</span>
            </li>
          </ul>

          <p className="sticky-note">
            note to self — if this URL used to work, it might be in an older
            draft. I haven't gone back to fix every broken link, sorry.
          </p>

          <span className="signoff">— S.</span>

          <Divider d="M 6 12 C 80 18, 160 6, 240 13 C 320 19, 400 7, 480 12 C 560 17, 640 9, 720 13 C 740 14, 752 12, 758 12" />
          <PageNum>p. 405</PageNum>
        </section>
      </main>

      <Footer />
    </>
  );
}
