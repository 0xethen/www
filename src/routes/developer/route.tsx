import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { z } from "zod";

const IGNORE_ENV = true;

export const Route = createFileRoute("/developer")({
  preload: false,
  validateSearch: z.object({
    p: z.string().optional(),
  }),
  beforeLoad: ({ search }) => {
    if (IGNORE_ENV && search.p === import.meta.env.VITE_PASSWORD) return;
    if (!import.meta.env.DEV) throw notFound();
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <span className="z-50 fixed bg-hg-green striped-hg-green-alt/5 text-white px-2 py-1 rounded opacity-90 text-sm top-13.5 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none select-none">
        {IGNORE_ENV ? (
          <>AUTHORIZED USERS ONLY</>
        ) : (
          <>
            <span className="hidden sm:inline">/developer routes are only accessible in the </span>
            DEVELOPMENT<span className="hidden sm:inline"> server environment</span>
          </>
        )}
      </span>
      <Outlet />
    </div>
  );
}
