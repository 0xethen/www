import {
  HeadContent,
  Scripts,
  createRootRoute,
  useMatches,
  type RootRoute,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { TooltipProvider } from "@/components/ui/tooltip.tsx";
import css from "../styles/index.css?url";
import { cn } from "@/lib/utils";
import { ConsoleSecrets } from "@/routes/thecakeisalie";
import { brandInfo } from "@/lib/meta";
import { Header } from "@/components/elements/Header";
import { Toaster } from "@/components/ui/sonner";
import type { Register } from "@tanstack/react-start";

const buildTitle = (matches: ReturnType<typeof useMatches>): string => {
  if (matches[matches.length - 1].globalNotFound) return `Not Found / ${brandInfo.name}`;

  const titles = matches
    .filter((m) => m.staticData?.config?.title)
    .map((m) => m.staticData?.config?.title?.text)
    .reverse();

  return titles.length ? `${titles.join(" / ")} / ${brandInfo.name}` : brandInfo.name;
};

export const Route: RootRoute<Register> = createRootRoute({
  head: (ctx) => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        name: "theme-color",
        content: "#01150a",
      },
      {
        name: "apple-mobile-web-app-status-bar-style",
        content: "black-translucent",
      },
      {
        title: buildTitle(ctx.matches),
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: css,
      },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  const matches = useMatches();

  const getHasLayoutOffset = () => {
    return getHeaderVisible() || matches[matches.length - 1].staticData.header?.forceLayoutOffset;
  };

  const getHeaderVisible = (): boolean => {
    return (
      !matches[matches.length - 1].staticData.header?.hidden &&
      !matches[matches.length - 1].globalNotFound &&
      !matches[matches.length - 1].error &&
      matches[matches.length - 1].status !== "error" &&
      matches[matches.length - 1].status !== "notFound"
    );
  };

  return (
    <html
      lang="en"
      data-header={getHasLayoutOffset()}
      className={cn(
        [...matches].reverse().find((m) => m.staticData?.config?.classNames?.root)?.staticData
          .config?.classNames?.root,
        "overscroll-x-none",
        getHeaderVisible() && "overscroll-y-none",
      )}
    >
      <head>
        <HeadContent />
      </head>
      <body>
        {getHeaderVisible() && (
          <Header
            className={matches[matches.length - 1].staticData.header?.className}
            classNames={matches[matches.length - 1].staticData.header?.classNames}
            detached={matches[matches.length - 1].staticData.header?.detached}
          />
        )}
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster richColors closeButton position="top-center" />
        <TanStackDevtools
          config={{
            position: "bottom-right",
            customTrigger: (
              <img
                src="/assets/images/brand/hgbeta.png"
                className="size-12 border-border border-2 rounded-full"
              />
            ),
          }}
          plugins={[
            {
              name: "Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
        <ConsoleSecrets />
      </body>
    </html>
  );
}
