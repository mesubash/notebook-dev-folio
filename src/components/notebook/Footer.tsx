import { site } from "@/content/portfolio";

export function Footer() {
  return (
    <footer className="flap flap-bottom">
      <div className="mini-grain" />
      <div className="crease" />
      <div className="crease-shadow" />
      <div className="foot">
        <span className="closing">— end of notebook —</span>
        <span className="meta">
          {site.name} · {site.copyrightYear}
        </span>
      </div>
    </footer>
  );
}
