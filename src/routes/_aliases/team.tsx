import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_aliases/team")({
  beforeLoad: () => {
    throw Route.redirect({ to: "/about" });
  },
});
