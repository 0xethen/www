import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/developer")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>removed to reduce build size. every byte counts!</div>;
}
