import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Subash — Backend Developer · Notebook" },
      {
        name: "description",
        content:
          "A handwritten notebook portfolio of Subash, a backend developer working in Go, Python and Postgres.",
      },
    ],
  }),
  component: Index,
});

function Divider({ d, extra }: { d: string; extra?: string }) {
  return (
    <svg className="divider" viewBox="0 0 760 22" preserveAspectRatio="none" aria-hidden="true">
      <path d={d} stroke="#2c1810" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.85" />
      {extra && (
        <path d={extra} stroke="#2c1810" strokeWidth="0.9" fill="none" strokeLinecap="round" opacity="0.45" />
      )}
    </svg>
  );
}

function Index() {
  return (
    <>
      <div className="blotches" />
      <div className="grain" />
      <div className="vignette" />

      <header className="flap flap-top">
        <div className="mini-grain" />
        <nav className="nav">
          <span className="brand">Subash.</span>
          <a href="#about">about</a>
          <a href="#skills">skills</a>
          <a href="#projects">projects</a>
          <a href="#experience">experience</a>
          <a href="#contact">contact</a>
        </nav>
        <div className="crease" />
        <div className="crease-shadow" />
      </header>

      <main className="page">
        <div className="margin-line" />

        {/* HERO */}
        <section className="hero">
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

          <span className="greet">hello —</span>
          <h1>Subash.</h1>
          <p className="title">
            Backend developer. Writes systems, breaks <em>them</em>, fixes them again.
          </p>
          <p className="date-entry">
            entry no. 42 · March 14
            <sup style={{ fontFamily: "'Special Elite'", fontSize: "0.55em", verticalAlign: "0.6em" }}>th</sup>
            , 2026
          </p>

          <div className="stamp-date" aria-hidden="true">
            <span>NOTEBOOK</span>
            <span className="big">№ 07</span>
          </div>

          <Divider
            d="M 4 13 C 60 4, 140 18, 220 11 C 300 5, 360 17, 440 12 C 520 7, 600 16, 680 10 C 720 7, 745 12, 756 11"
            extra="M 30 16 C 90 12, 130 18, 170 16"
          />
          <span className="page-num">p. 01</span>
        </section>

        {/* ABOUT */}
        <section className="about" id="about">
          <div className="section-label">II · about the author</div>
          <h2>A note about me.</h2>
          <p>
            I build the parts of software that nobody is supposed to notice — the queues, the indexes,
            the migrations that run at 3am without paging anyone. Seven years of this, mostly in Go and
            Python, mostly on systems that move money or messages or both. I like the quiet kind of
            engineering: small interfaces, boring databases, observability you could explain to your
            mother.
          </p>
          <p>
            Currently writing distributed systems at a fintech I'm fond of. Before that: ads infra, an
            ill-advised crypto detour I learned a lot from, and a long stretch at a startup that
            eventually exited. I keep a notebook because the screen forgets — this is some of it.
          </p>
          <span className="signoff">— S.</span>

          <Divider d="M 6 12 C 80 18, 160 6, 240 13 C 320 19, 400 7, 480 12 C 560 17, 640 9, 720 13 C 740 14, 752 12, 758 12" />
          <span className="page-num">p. 02</span>
        </section>

        {/* SKILLS */}
        <section className="skills" id="skills">
          <div className="section-label">III · tools of the trade</div>
          <h2>Skills, roughly inventoried.</h2>

          <div className="group">
            <span className="group-label">Languages I reach for</span>
            <ul className="checklist">
              <li>Go</li>
              <li>Python</li>
              <li>TypeScript</li>
              <li>Rust</li>
              <li className="maybe">SQL (PL/pgSQL)</li>
              <li className="maybe">Bash &amp; awk</li>
              <li className="todo">Zig (learning)</li>
              <li className="todo">Elixir (still learning)</li>
            </ul>
          </div>

          <div className="group">
            <span className="group-label">Datastores &amp; messaging</span>
            <div className="stamps">
              {["PostgreSQL", "Redis", "ClickHouse", "Kafka", "RabbitMQ", "NATS", "DynamoDB", "SQLite"].map(
                (s) => (
                  <span className="stamp" key={s}>
                    {s}
                  </span>
                ),
              )}
            </div>
          </div>

          <div className="group">
            <span className="group-label">Infrastructure &amp; runtime</span>
            <div className="stamps">
              {[
                "Docker",
                "Kubernetes",
                "Terraform",
                "AWS · GCP",
                "Linux",
                "gRPC",
                "OpenTelemetry",
                "Prometheus",
                "Nginx",
              ].map((s) => (
                <span className="stamp" key={s}>
                  {s}
                </span>
              ))}
            </div>
          </div>

          <Divider
            d="M 4 11 C 70 5, 150 17, 230 10 C 310 4, 390 16, 470 11 C 550 6, 630 15, 710 10 C 730 9, 750 11, 758 10"
            extra="M 440 16 C 480 14, 530 18, 580 15"
          />
          <span className="page-num">p. 03</span>
        </section>

        {/* PROJECTS */}
        <section className="projects" id="projects">
          <div className="section-label">IV · case study notes</div>
          <h2>Things I've built.</h2>

          <article className="proj">
            <div className="case-no">case study i.</div>
            <h3>
              Ledger
              <svg className="underline-scribble" viewBox="0 0 220 12" preserveAspectRatio="none" aria-hidden="true">
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
              <div className="key">problem</div>
              <div className="val">
                Existing payments ledger was a single Postgres table with race conditions and a 14-second
                p99. Reconciliation took an analyst three days each month.
              </div>
              <div className="key">approach</div>
              <div className="val">
                Designed a double-entry append-only ledger with idempotency keys, per-account
                partitioning, and a streaming reconciler. Migrated 410M rows live with zero downtime via
                dual-write + shadow reads.
              </div>
              <div className="key">stack</div>
              <div className="val">
                <code>Go</code> · <code>PostgreSQL</code> · <code>Kafka</code> · <code>Redis</code> ·{" "}
                <code>gRPC</code>
              </div>
              <div className="key">result</div>
              <div className="val">
                p99 down to 38ms. Reconciliation is now a cron job that finishes before coffee.
              </div>
            </div>
            <p className="link">
              <a href="#">read the long version</a>
            </p>
            <p className="sticky-note">
              note to self — the dual-write pattern was overkill in retrospect. Single-write + CDC would
              have shipped two months earlier.
            </p>
          </article>

          <article className="proj">
            <div className="case-no">case study ii.</div>
            <h3>
              Pipefitter
              <svg className="underline-scribble" viewBox="0 0 240 12" preserveAspectRatio="none" aria-hidden="true">
                <path
                  d="M 2 7 C 40 3, 100 11, 160 6 C 200 2, 220 9, 238 6"
                  stroke="#2c1810"
                  strokeWidth="1.8"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </h3>
            <div className="row">
              <div className="key">problem</div>
              <div className="val">
                Twelve product teams, each running their own brittle ETL. Schemas drifted weekly. The data
                team spent half their time chasing missing fields.
              </div>
              <div className="key">approach</div>
              <div className="val">
                Built a typed event pipeline: a schema registry with compatibility checks, a Kafka
                backbone, and connectors that materialize to ClickHouse for analytics and Postgres for
                ops. Wrote a CLI so product engineers could ship a new event in under an hour.
              </div>
              <div className="key">stack</div>
              <div className="val">
                <code>Python</code> · <code>Kafka</code> · <code>Avro</code> · <code>ClickHouse</code> ·{" "}
                <code>Terraform</code>
              </div>
              <div className="key">result</div>
              <div className="val">
                ~190 event types in production, schema-violation incidents down 94% YoY.
              </div>
            </div>
            <p className="link">
              <a href="#">read the long version</a>
            </p>
          </article>

          <article className="proj">
            <div className="case-no">case study iii.</div>
            <h3>
              Gatehouse
              <svg className="underline-scribble" viewBox="0 0 230 12" preserveAspectRatio="none" aria-hidden="true">
                <path
                  d="M 2 6 C 40 11, 90 2, 140 7 C 180 11, 210 4, 228 7"
                  stroke="#2c1810"
                  strokeWidth="1.8"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </h3>
            <div className="row">
              <div className="key">problem</div>
              <div className="val">
                A multi-tenant API getting hammered by a few noisy customers. The existing rate limiter
                was per-instance and unfair — small tenants got starved during spikes.
              </div>
              <div className="key">approach</div>
              <div className="val">
                Distributed token-bucket limiter in Redis with hierarchical quotas (tenant → plan →
                endpoint), backed by an admin UI for support to bump limits live. Added structured 429s
                with a sensible <code>Retry-After</code>.
              </div>
              <div className="key">stack</div>
              <div className="val">
                <code>Go</code> · <code>Redis</code> · <code>Lua</code> · <code>OpenTelemetry</code>
              </div>
              <div className="key">result</div>
              <div className="val">
                Fair-share enforced across 1,400 tenants. On-call pages from rate-limit drama went from
                weekly to maybe twice a year.
              </div>
            </div>
            <p className="link">
              <a href="#">read the long version</a>
            </p>
            <p className="sticky-note">the Lua script is forty lines and I am irrationally fond of it.</p>
          </article>

          <Divider d="M 4 12 C 80 6, 160 18, 240 11 C 320 5, 400 17, 480 12 C 560 6, 640 15, 720 11 C 740 10, 752 12, 758 11" />
          <span className="page-num">pp. 04 – 06</span>
        </section>

        {/* EXPERIENCE */}
        <section id="experience">
          <div className="section-label">V · log entries</div>
          <h2>The work, by date.</h2>

          <div className="timeline">
            {[
              {
                start: "2024",
                end: "present",
                title: "Senior Backend Engineer",
                where: "Ferryman Financial · remote",
                bullets: [
                  "Tech lead on the ledger and settlement platform.",
                  "Wrote the migration plan that took us off the monolith without an outage.",
                  'Mentor two engineers; run an internal "boring infra" reading group.',
                ],
              },
              {
                start: "2022",
                end: "2024",
                title: "Backend Engineer",
                where: "Halftone Labs · Bengaluru",
                bullets: [
                  "Owned the events platform end-to-end (Kafka, schema registry, ingest).",
                  "Took p99 latency on the public API from 2.1s → 180ms.",
                  "Wrote a fair amount of Terraform I'd rather not talk about.",
                ],
              },
              {
                start: "2020",
                end: "2022",
                title: "Software Engineer",
                where: "Inkwell Systems · Bengaluru",
                bullets: [
                  "First backend hire. Built the Django monolith that's still standing.",
                  "Set up CI, the deploy pipeline, and most of our 3am alerts.",
                ],
              },
              {
                start: "2019",
                end: "2020",
                title: "Software Engineering Intern",
                where: "A research lab · part-time",
                bullets: ["Wrote tooling for a distributed-systems group. Mostly Go and complaining about YAML."],
              },
            ].map((e) => (
              <div className="entry" key={e.start}>
                <div className="when">
                  {e.start}
                  <span className="dash">↓</span>
                  <span className="yr-end">{e.end}</span>
                </div>
                <div className="what">
                  <h4>{e.title}</h4>
                  <div className="where">{e.where}</div>
                  <ul>
                    {e.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <Divider d="M 4 11 C 70 17, 150 5, 230 12 C 310 18, 390 6, 470 11 C 550 17, 630 7, 710 12 C 730 13, 750 11, 758 12" />
          <span className="page-num">pp. 07 – 08</span>
        </section>

        {/* CONTACT */}
        <section className="contact" id="contact">
          <div className="section-label">VI · back cover</div>
          <p className="lede">
            Drop me a line.
            <small>or a postcard, if you must</small>
          </p>
          <div className="lines">
            <div className="row">
              <span className="key">email</span>
              <a href="mailto:subash@example.dev">subash [at] example.dev</a>
            </div>
            <div className="row">
              <span className="key">github</span>
              <a href="#">github.com/subash</a>
            </div>
            <div className="row">
              <span className="key">linkedin</span>
              <a href="#">in/subash-the-engineer</a>
            </div>
            <div className="row">
              <span className="key">x &amp; bluesky</span>
              <a href="#">@subashwrites</a>
            </div>
            <div className="row">
              <span className="key">writing</span>
              <a href="#">subash.notebook.dev</a>
            </div>
          </div>

          <p className="scribble">
            I read every email. I reply slower than I should — please nudge me if it's been a week.
          </p>

          <p className="signature">Subash.</p>

          <p className="smallprint">
            this notebook is page-numbered, hand-bound, and accepts no warranty. last entry: march 2026.
            composed in special elite + caveat. printed on f2e8d5 parchment.
          </p>
          <span className="page-num">p. 09</span>
        </section>
      </main>

      <footer className="flap flap-bottom">
        <div className="mini-grain" />
        <div className="crease" />
        <div className="crease-shadow" />
        <div className="foot">
          <span className="closing">— end of notebook —</span>
          <span className="meta">Subash · MMXXVI</span>
        </div>
      </footer>
    </>
  );
}
