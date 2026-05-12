import { useRouter } from "@tanstack/react-router";

import { site } from "@/content/portfolio";
import { Divider } from "./Divider";
import { Footer } from "./Footer";
import { Nav } from "./Nav";
import { PageNum } from "./PageNum";
import { PaperLayers } from "./PaperLayers";

export function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();
  const message = error?.message ? String(error.message).slice(0, 240) : "";

  return (
    <>
      <PaperLayers />
      <Nav />

      <main className="page">
        <div className="margin-line" />

        <section className="hero" aria-labelledby="err-heading">
          <span className="greet">oh —</span>
          <h1 id="err-heading">Something tore.</h1>
          <p className="title">
            A page in this notebook didn't load. The error is probably mine, not
            yours. You can try again, or page back to the cover.
          </p>
          <p className="date-entry">entry · interrupted · 500</p>

          <div className="stamp-date stamp-404" aria-hidden="true">
            <span>ERROR</span>
            <span className="big">№ 500</span>
          </div>

          <Divider d="M 4 13 C 60 4, 140 18, 220 11 C 300 5, 360 17, 440 12 C 520 7, 600 16, 680 10 C 720 7, 745 12, 756 11" />
          <PageNum>p. 500</PageNum>
        </section>

        <section className="about" aria-label="what happened">
          <div className="section-label">II · marginalia</div>
          <h2>What you can do.</h2>
          <p>
            The page tried to load and didn't. There are two reasonable next
            steps — pick whichever feels right.
          </p>

          <ul className="nf-list">
            <li>
              <button
                type="button"
                className="err-action-link"
                onClick={() => {
                  router.invalidate();
                  reset();
                }}
              >
                → try again
              </button>
              <span className="nf-list-note"> — reload the page state and re-fetch</span>
            </li>
            <li>
              <a href="/">→ back to the cover</a>
              <span className="nf-list-note"> — the front of the notebook, always works</span>
            </li>
            <li>
              <a href={`mailto:${site.email}?subject=Broken page on ${site.url}`}>
                → tell me what broke
              </a>
              <span className="nf-list-note"> — if this keeps happening, I'd like to know</span>
            </li>
          </ul>

          {message && (
            <p className="sticky-note" role="note">
              the page reported — <code>{message}</code>
            </p>
          )}

          <span className="signoff">— S.</span>

          <Divider d="M 6 12 C 80 18, 160 6, 240 13 C 320 19, 400 7, 480 12 C 560 17, 640 9, 720 13 C 740 14, 752 12, 758 12" />
          <PageNum>p. 501</PageNum>
        </section>
      </main>

      <Footer />
    </>
  );
}
