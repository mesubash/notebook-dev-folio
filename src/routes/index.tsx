import { createFileRoute } from "@tanstack/react-router";

import { About } from "@/components/notebook/About";
import { Contact } from "@/components/notebook/Contact";
import { Experience } from "@/components/notebook/Experience";
import { Footer } from "@/components/notebook/Footer";
import { Hero } from "@/components/notebook/Hero";
import { Nav } from "@/components/notebook/Nav";
import { PaperLayers } from "@/components/notebook/PaperLayers";
import { Projects } from "@/components/notebook/Projects";
import { Skills } from "@/components/notebook/Skills";
import { site } from "@/content/portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${site.name} — ${site.role} · Notebook` },
      { name: "description", content: site.description },
      { property: "og:title", content: `${site.name} — ${site.role} · Notebook` },
      { property: "og:description", content: site.description },
      { property: "og:url", content: site.url },
      { property: "og:image", content: `${site.url}/og-image.png` },
      { name: "twitter:title", content: `${site.name} — ${site.role}` },
      { name: "twitter:description", content: site.description },
      { name: "twitter:image", content: `${site.url}/og-image.png` },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <PaperLayers />
      <Nav />

      <main className="page">
        <div className="margin-line" />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
