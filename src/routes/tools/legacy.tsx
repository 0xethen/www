import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tools/legacy")({
  component: RouteComponent,
  staticData: { config: { title: { text: "Legacy open-source projects" } } },
});

function RouteComponent() {
  return <div>Hello "/tools/legacy"!</div>;
}
