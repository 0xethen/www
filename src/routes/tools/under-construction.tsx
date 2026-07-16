import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tools/under-construction")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-safe-dvh bg-yellow-800 striped-yellow-900/50">
      {/*<div className="max-w-2xl mx-auto h-full">*/}
      <div className="h-safe-dvh flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold font-mono text-white">under construction</h1>
        <p className="mt-4 text-lg text-white">
          This page is currently under construction. But good things are coming soon... check back
          later.
        </p>
      </div>
      {/*</div>*/}
    </div>
  );
}
