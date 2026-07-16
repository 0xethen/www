import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_aliases/contact")({
  beforeLoad: () => {
    throw redirect({ to: "/about", hash: "contact" });
  },
});
