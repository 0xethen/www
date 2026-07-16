import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/developer/nested")({
  staticData: { config: { title: { text: "developer nested testing" } } },
});
