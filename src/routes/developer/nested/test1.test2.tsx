import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/developer/nested/test1/test2")({
  component: RouteComponent,
  staticData: { config: { title: { text: "test2" } } },
});

function RouteComponent() {
  return <div>Hello "/nested/test1/test2"!</div>;
}
