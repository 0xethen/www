import { createFileRoute } from "@tanstack/react-router";
import { EDATestingError } from "@/lib/utils";

export const Route = createFileRoute("/developer/err")({
  beforeLoad: () => {
    throw new EDATestingError("this is a test error for the ethendotapp error boundary");
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/developer/err"!</div>;
}
