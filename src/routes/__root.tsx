import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  HeadContent,
} from "@tanstack/react-router";

import { ErrorPage } from "@/components/notebook/ErrorPage";
import { NotFound } from "@/components/notebook/NotFound";
import { site } from "@/content/portfolio";

// The static SEO suite (meta, OG, JSON-LD, icons, fonts) lives in index.html
// so social crawlers and the initial HTML response have it without waiting on
// JS. Each route's head() below overrides per-page title/description/og:url.
export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { title: `${site.name} — ${site.role} · Notebook` },
      { name: "description", content: site.description },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFound,
  errorComponent: ErrorPage,
});

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <HeadContent />
      <Outlet />
    </QueryClientProvider>
  );
}
