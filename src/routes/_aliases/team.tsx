import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_aliases/team")({
  beforeLoad: () => {
    throw redirect({ to: "/about" });
  },
});
