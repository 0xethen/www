import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_aliases/register")({
  beforeLoad: () => {
    throw Route.redirect({ to: "/programs/$program", params: { program: "hackathon" } });
  },
});
