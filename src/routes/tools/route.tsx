import { Footer } from "@/components/elements/Footer";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/tools")({
  component: RouteComponent,
  staticData: { config: { title: { text: "Tools" } } },
});

function RouteComponent() {
  return (
    <div>
      <main className="min-h-safe-dvh">
        <Outlet />
      </main>
      <Footer />
      <div className="p-4 bg-hg-black text-white text-center">
        <div>
          <p>Thanks for exploring our toolkit! Use them to build only amazing things.</p>
          <p className="text-hg-green">
            {"psst... try running "}
            <code className="text-primary rounded-md p-1.5" id="console-func">
              {"hg.confetti.start()"}
            </code>
            {" in the browser console for a surprise X)"}
          </p>
        </div>
      </div>
    </div>
  );
}
