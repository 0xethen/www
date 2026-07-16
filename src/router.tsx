import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { NotFound } from "@/components/NotFound";
import type { HeaderClassNames } from "@/components/elements/Header";

export function getRouter() {
  const router = createTanStackRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0,
    defaultErrorComponent: ErrorBoundary,
    defaultNotFoundComponent: NotFound,
  });

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }

  interface StaticDataRouteOption {
    config?: {
      title?: { text: string; hideSuffix?: string };
      classNames?: { root?: string };
    };
    // todo: cleanup (like bogey)
    header?: {
      className?: string;
      classNames?: HeaderClassNames;
      hidden?: boolean;
      detached?: boolean;
      forceLayoutOffset?: boolean;
    };
  }
}
