import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@/components/ui/ethendotapp/link";

export const Route = createFileRoute("/developer/404")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <p>
        this route serves as a placeholder. in production, users will be presented with the NotFound
        (404) component {":P"}
      </p>
      <p>
        {/* @ts-ignore */}
        or <Link to="/404">actually 404</Link>
      </p>
    </div>
  );
}
