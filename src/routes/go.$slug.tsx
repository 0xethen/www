import { createFileRoute, notFound } from "@tanstack/react-router";
import { brandInfo } from "@/lib/meta";

export const goRedirects: Record<string, string> = {
  register: "/programs/hackathon",
  report: "/eda/report",
  instagram: brandInfo.socials.instagram || "/",
  discord: brandInfo.socials.discord || "/",

  summerws26: "/posts/summer-workshops-with-peach-state-2026",
};

// FOR THE RECORD, I opened #7141 in TanStack/router TWO MONTHS AGO
// but I didn't see that it was closed an hour later until... just now :P
// anyway this buildRedirectOpts needs to be here to avoid page hangs
// update 7/14: bug only occurs when a route tries to preload via link hover

const buildRedirectOpts = (href: string) => {
  if (href.startsWith("/")) {
    return { to: href };
  }

  return { href };
};

export const Route = createFileRoute("/go/$slug")({
  loader: ({ params }) => {
    const { slug } = params;

    if (goRedirects[slug]) {
      return Route.redirect(buildRedirectOpts(goRedirects[slug]));
    }

    throw notFound();
  },
  staticData: { config: { title: { text: "Redirecting..." } }, header: { hidden: true } },
});
