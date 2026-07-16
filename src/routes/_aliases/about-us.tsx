import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_aliases/about-us")({
  beforeLoad: () => {
    throw redirect({ to: "/about" });
  },
});
