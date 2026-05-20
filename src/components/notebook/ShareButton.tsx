import { useState } from "react";

type ShareButtonProps = {
  /** Absolute URL of the entry being shared. */
  url: string;
  /** Entry title — used as the share sheet title. */
  title: string;
  /** Short blurb passed along to the native share sheet. */
  text?: string;
  /** Visual size: full link on the entry page, compact on a card. */
  variant?: "entry" | "card";
};

/**
 * Share affordance for journal entries. Prefers the OS-native share sheet
 * (navigator.share) — the only route to Instagram / Stories / WhatsApp — and
 * falls back to copying the link to the clipboard where that API is missing.
 */
export function ShareButton({
  url,
  title,
  text,
  variant = "entry",
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    // navigator.share must be called synchronously within the click gesture,
    // so it goes first — before any await that would drop transient activation.
    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch (err) {
        // User dismissed the native sheet — leave quietly, no fallback.
        if (err instanceof Error && err.name === "AbortError") return;
        // Any other failure falls through to the clipboard path below.
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      // Clipboard blocked (insecure context / permissions) — last resort.
      window.prompt("Copy this link:", url);
    }
  }

  const label =
    variant === "card"
      ? copied
        ? "link copied ✓"
        : "share"
      : copied
        ? "link copied — paste it anywhere ✓"
        : "share this entry";

  return (
    <button
      type="button"
      className={`share-btn share-btn--${variant}`}
      onClick={handleShare}
      aria-label={`Share "${title}"`}
    >
      {label}
    </button>
  );
}
