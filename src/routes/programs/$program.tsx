import { createFileRoute, notFound } from "@tanstack/react-router";
import { Footer } from "@/components/elements/Footer";
import { HackathonFAQ } from "@/components/elements/HackathonFAQ";
import { Button } from "@/components/ui/button";
import { ExtLink, Link } from "@/components/ui/ethendotapp/link";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { eventInfo } from "@/lib/meta";
import {
  RiAppleFill,
  RiGoogleFill,
  RiMapPinLine,
  RiMicrosoftFill,
  RiTimeLine,
} from "@remixicon/react";
import { addToCalendar } from "./-shared";

export const Route = createFileRoute("/programs/$program")({
  loader: ({ params }) => {
    switch (params.program) {
      case "hackathon":
        return {
          id: params.program,
          event: eventInfo.hackathon,
        };
      case "hackfest":
        return {
          id: params.program,
          event: eventInfo.hackfest,
        };
      // case "mentorship" // soon? or summer stuff
    }

    throw notFound();
  },
  component: RouteComponent,
  pendingComponent: () => <div>Loading...</div>,
});

function RouteComponent() {
  const { id, event } = Route.useLoaderData();

  return (
    <div>
      <div className="min-h-safe-dvh">
        <div className="p-6 md:p-9 mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-10">
            <div className="flex flex-col gap-6">
              <div className="space-y-2">
                <h1 className="font-semibold text-4xl">{event.name}</h1>
                <p>{event.description}</p>
              </div>
              <ItemGroup>
                <Item variant="muted">
                  <ItemMedia variant="icon">
                    <RiMapPinLine />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>{event.location.name}</ItemTitle>
                    <ItemDescription className="text-xs">
                      <ExtLink href={event.location.mapUrl}>{event.location.address}</ExtLink>
                    </ItemDescription>
                  </ItemContent>
                </Item>
                <Item variant="muted">
                  <ItemMedia variant="icon">
                    <RiTimeLine />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>
                      {event.startDate.toLocaleDateString([], {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </ItemTitle>
                    <ItemDescription className="text-xs">
                      <Popover>
                        <PopoverTrigger className="alt-link">Add to calendar</PopoverTrigger>
                        <PopoverContent className="">
                          <Button
                            variant="outline"
                            size="lg"
                            onClick={() => addToCalendar(event, "apple")}
                          >
                            <RiAppleFill /> Apple
                            <span className="sr-only">Apple Calendar</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="lg"
                            onClick={() => addToCalendar(event, "google")}
                          >
                            <RiGoogleFill /> Google
                            <span className="sr-only">Google Calendar</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="lg"
                            onClick={() => addToCalendar(event, "outlook")}
                          >
                            <RiMicrosoftFill /> Outlook
                            <span className="sr-only">Microsoft Outlook</span>
                          </Button>
                        </PopoverContent>
                      </Popover>
                    </ItemDescription>
                  </ItemContent>
                </Item>
              </ItemGroup>
              <div className="flex flex-col gap-2">
                {event.details?.split("\n").map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
                {id === "hackathon" && (
                  <p>
                    Check out more of 6.0 in our{" "}
                    <Link to="/posts/tag/$tag" params={{ tag: "hg6-sneak-peek" }}>
                      #hg6-sneak-peek
                    </Link>{" "}
                    posts!
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2 lg:items-end">
              {/* TODO: image carousel here yay HG!!! */}
              HackGwinnett images
              <HackathonFAQ responsiveText={false} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
