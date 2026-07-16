import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_aliases/about-us")({
  beforeLoad: () => {
    throw Route.redirect({ to: "/about" });
  },
});
