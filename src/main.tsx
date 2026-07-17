import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";

import { ErrorBoundary } from "@/components/ErrorBoundary";
import { NotFound } from "@/components/NotFound";
import type { HeaderClassNames } from "@/components/elements/Header";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a new router instance
const router = createRouter({
  routeTree,
  scrollRestoration: true,
  defaultPreload: false,
  defaultPreloadStaleTime: 0,
  defaultErrorComponent: ErrorBoundary,
  defaultNotFoundComponent: NotFound,
  basepath: "www",
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
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

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
}
