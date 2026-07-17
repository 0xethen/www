import { createFileRoute, type ErrorComponentProps } from "@tanstack/react-router";
import { Link } from "@/components/ui/ethendotapp/link";
import { TextScramble } from "@/components/ui/motion-primitives/text-scramble";
import { cn } from "@/lib/utils";
import { z } from "zod";

const templates = {
  "missing-content": {
    title: "Missing Content",
    description:
      "_Encountered a 404 error at {from}._\nDescribe the content that is missing, where you expected to find it, and any other details that might help us track down this pesky bug.",
  },
};

export const Route = createFileRoute("/eda/report")({
  staticData: { config: { title: { text: "Report a problem" } } },
  validateSearch: z.object({
    from: z.string().optional(), // the route the user came from, if applicable
    c: z.number().optional(),
    t: z.keyof(z.object(templates)).optional(), // template
  }),
  beforeLoad: ({ search }) => {
    if (search.from === "/thecakeisalie")
      throw new Response(JSON.stringify({ error: "Internal Server Error" }), {
        status: 418,
        statusText: "the cake is a lie",
      });
  },
  component: RouteComponent,
  errorComponent: ErrorComponent,
});

function RouteComponent() {
  const { from, t: templateId } = Route.useSearch();

  return (
    <div className="flex font-heading flex-col min-h-safe-dvh items-center justify-center text-center gap-4 px-4">
      <span>ethen.app issue reporter</span>
      <span>{templateId ? templates[templateId].title : "hello"}</span>
      <span>
        {templateId
          ? templates[templateId].description.replaceAll("{from}", from || "unknown")
          : "hello"}
      </span>
      <span> TODO: replace EDA issue reporter with a google form</span>
    </div>
  );
}

function ErrorComponent(props: ErrorComponentProps) {
  return (
    <div className="flex font-heading flex-col min-h-safe-dvh items-center justify-center text-center gap-1 select-none">
      <span className="animate-in fade-in delay-100 fill-mode-backwards">
        <TextScramble trigger>
          {props.error instanceof Response
            ? `${props.error.statusText} (${props.error.status})`
            : "the issue reporter failed to process your request."}
        </TextScramble>
      </span>
      <div className="flex flex-row items-center gap-3">
        <Link
          to="/"
          className={cn(
            "font-bold animate-in fade-in animation-duration-2000 animation-delay-600 fill-mode-backwards",
            "hover:underline",
          )}
        >
          go home {":("}
        </Link>
        {/* <Link
          to="/"
          className={cn(
            "font-bold animate-in fade-in animation-duration-1500 animation-delay-900 fill-mode-backwards",
            "hover:underline",
          )}
        >
          continue anyway
        </Link> */}
      </div>
    </div>
  );
}
