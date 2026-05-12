import { createFileRoute } from "@tanstack/react-router";

import { NotFound } from "@/components/notebook/NotFound";
import { site } from "@/content/portfolio";

export const Route = createFileRoute("/$")({
  head: () => ({
    meta: [
      { title: `Not found · ${site.name}` },
      {
        name: "description",
        content: "This page is not in the notebook. Either it was never written, or you followed a stale link.",
      },
      { name: "robots", content: "noindex,follow" },
    ],
  }),
  component: NotFound,
});
