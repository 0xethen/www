import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useMobile } from "@/lib/browser";
import { Header } from "@/components/elements/Header";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/motion-primitives/magnetic";
import { ExtLink, Link } from "@/components/ui/ethendotapp/link";
import { TextScramble } from "@/components/ui/motion-primitives/text-scramble";
import { cn } from "@/lib/utils";
import {
  RiArrowDownBoxLine,
  RiArrowRightDoubleLine,
  RiPauseLine,
  RiPlayLine,
} from "@remixicon/react";
import { ColorBadge } from "@/components/ui/color-badge";
import { eventInfo } from "@/lib/meta";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import WheelGestures from "embla-carousel-wheel-gestures";
import { Card, CardContent } from "@/components/ui/card";
import { HackathonFAQ } from "@/components/elements/HackathonFAQ";
import { Scroller } from "@/components/ui/motion-primitives/scroller";
import { type Sponsor, sponsors, statefarm } from "@/lib/sponsors";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  staticData: { config: { classNames: { root: "bg-hg-black" } }, header: { hidden: true } },
});

/*
className: "text-white", classNames: { navigationMenu: { items: { link: "hover:bg-primary active:bg-primary/80 focus-visible:bg-transparent", dropdown: "hover:bg-hg-green/50 data-popup-open:hover:bg-primary data-popup-open:bg-hg-green/50 focus:bg-transparent" } }, cta: { link: "hover:bg-primary hover:text-ground" }
*/

// guys I have just reconstructed this page after accidentally deleting it it took me 2 hours plz give me food for my sanity

const SCROLL_THRESHOLD = 67;

function RouteComponent() {
  const isMobile = useMobile().breakpoint === "sm";

  const [isScrolled, setIsScrolled] = useState(false);
  const [showGrid, setShowGrid] = useState(isMobile);

  const [carouselPaused, setCarouselPaused] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (typeof window === "undefined") return;
      setIsScrolled(window.pageYOffset >= SCROLL_THRESHOLD);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setShowGrid(isMobile);
  }, [isMobile]);

  return (
    <div>
      <Header
        className={cn("transition-all", isScrolled && "bg-hg-black/80 backdrop-blur-sm")}
        classNames={{
          navigationMenu: {
            items: {
              global: isScrolled
                ? "hover:bg-white/50 data-popup-open:hover:bg-white data-popup-open:bg-white/50 hover:text-black data-popup-open:text-black focus:bg-transparent"
                : undefined,
            },
          },
        }}
        detached
      />

      <div className="bg-blue-500 "></div>

      <div className="min-h-safe-dvh bg-hg-black bg-[url('/assets/images/hero/bgtexture01.svg')] text-white">
        <div className="min-h-safe-dvh px-8 md:px-12 flex flex-row items-center justify-between gap-12 animate-in fade-in slide-in-from-bottom-5 animation-duration-800 animation-delay-50 fill-mode-backwards">
          <div className="flex flex-col justify-center gap-4">
            <ColorBadge
              render={
                <Link
                  to="/posts/$postId"
                  params={{ postId: "peach-state-hacks-partnered-workshops" }}
                  unstyled
                />
              }
            >
              NEW: Introducing Summer Workshops {!isMobile && " with Peach State Hacks "}
              <RiArrowRightDoubleLine />
            </ColorBadge>
            <h1 className="text-3xl sm:text-5xl md:text-6xl max-w-2xl font-mono leading-10 sm:leading-14 md:leading-17 select-none">
              Atlanta's premier{" "}
              <span className="text-primary-light">
                <TextScramble>computer science</TextScramble>
              </span>{" "}
              organization
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/80">
              {eventInfo.hackathon.name} is{" "}
              {eventInfo.hackathon.endDate.getTime() < Date.now() ? (
                <>over. Thank you, everyone!</>
              ) : (
                <>
                  {eventInfo.hackathon.startDate.toLocaleDateString("en-US", {
                    dateStyle: "full",
                  })}
                  . Sign up today!
                </>
              )}
            </p>
            <div className="flex flex-row gap-4">
              <Magnetic intensity={0.4}>
                <Button
                  render={<Link to="/go/$slug" params={{ slug: "register" }} unstyled />}
                  className="cursor-none striped-hg-green active:scale-98"
                  variant="hero"
                  size={isMobile ? "sm" : "lg"}
                  nativeButton={false}
                >
                  Register
                </Button>
              </Magnetic>
              <Magnetic intensity={0.4}>
                <Button
                  render={
                    <Link to="/programs/$program" params={{ program: "hackathon" }} unstyled />
                  }
                  className="cursor-none active:scale-98"
                  variant="glass"
                  size={isMobile ? "sm" : "lg"}
                  nativeButton={false}
                >
                  Learn more
                </Button>
              </Magnetic>
            </div>
          </div>
          <Carousel
            plugins={[Autoplay({ active: !carouselPaused, stopOnLastSnap: true }), WheelGestures()]}
            className={cn(
              "group relative hidden xl:inline-flex max-w-xs xl:max-w-sm",
              "animate-in fade-in slide-in-from-bottom-5 animation-duration-1000 animation-delay-100 fill-mode-backwards",
            )}
          >
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index}>
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-4xl font-semibold">hgm_hero_carousel_{index + 1}</span>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>

            <button
              className={cn(
                "absolute bottom-2.5 right-2.5 z-10 animation-duration-500",
                "p-1.5 bg-black/50",
                "transition-opacity opacity-0 group-hover:opacity-100",
              )}
              onClick={() => setCarouselPaused((prev) => !prev)}
            >
              {carouselPaused ? <RiPlayLine /> : <RiPauseLine />}
            </button>
          </Carousel>
        </div>
        <div className="absolute bottom-0 left-[49dvw] flex justify-center pb-8">
          <Magnetic intensity={0.4}>
            <Button
              className={cn(
                "transition-opacity mx-auto cursor-none",
                isScrolled ? "animate-out fade-out hidden" : "animate-in fade-in inline-flex",
              )}
              variant="glass"
              size={isMobile ? "icon" : "icon-lg"}
              onClick={() =>
                document.getElementById("subhero")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <RiArrowDownBoxLine className="size-7" />
            </Button>
          </Magnetic>
        </div>
      </div>
      <div id="subhero" className="bg-hg-green striped-hg-green-alt/20 h-20" />
      <main className="bg-background p-6 sm:p-8 md:p-12">
        {/* About section */}
        <section className="grid lg:grid-cols-2 gap-10 mb-20">
          <div className="space-y-4 text-base md:text-lg lg:text-xl">
            <h1 className="text-2xl sm:text-3xl md:text-4xl">Hack-a-What?!</h1>
            <p>
              HackGwinnett is Metro Atlanta's premier high school computer science organization.
              HackGwinnett's signature event is its annual hackathon: free of cost, hosted at
              Gwinnett School of Mathematics, Science, and Technology, and open to middle and high
              school students across Georgia.
            </p>
            <p>
              During our flagship hackathon, students (solo or in groups up to four) gather to
              create innovative solutions to real-world problems within a short time constraint. Be
              on the lookout for HackGwinnett's fifth hackathon on October 25th to build awesome
              projects, participate in enriching workshops, and make new friends!
            </p>
          </div>
          <div className="space-y-4 flex flex-col lg:items-end">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl lg:text-end">
              {isMobile ? "Frequently Asked" : "FAQ"}
            </h1>
            <HackathonFAQ />
          </div>
        </section>
        <section
          className="space-y-8 text-center"
          onFocusCapture={() => !isMobile && setShowGrid(true)}
          onBlurCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
              setShowGrid(isMobile);
            }
          }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl">Sponsors</h1>

          <div className="space-y-4">
            <SponsorLogo classNames={{ parent: "w-auto", image: "w-70" }} sponsor={statefarm} />

            {showGrid ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 justify-items-center">
                {sponsors.map((sponsor) => (
                  <SponsorLogo key={sponsor.title} sponsor={sponsor} />
                ))}
              </div>
            ) : (
              <Scroller
                className="mx-auto max-w-4xl w-full mask-x-from-95%"
                speedOnHover={0.5}
                gap={24}
              >
                {sponsors.map((sponsor) => (
                  <SponsorLogo key={sponsor.title} sponsor={sponsor} />
                ))}
              </Scroller>
            )}
          </div>

          <div>
            <span className="text-muted-foreground/50">
              Prizes brought to you by{" "}
              <img
                src="/www/assets/images/sponsors/sf-symbol.svg"
                alt="State Farm Brand Icon"
                className="inline h-[1em] not-hover:grayscale opacity-50 drag-none"
              />
            </span>
          </div>
        </section>
      </main>
      <footer className="bg-hg-black text-white p-4 md:p-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2">
          <span className="text-sm text-white/50">
            &copy; {new Date().getFullYear()} HackGwinnett. All rights reserved.
          </span>
          <div className="flex flex-row gap-4">
            <ExtLink
              href="https://ethen.app/marketing-sites/privacy"
              className="text-sm text-white/50 hover:text-white"
            >
              Cookies / Privacy Policy
            </ExtLink>
          </div>
        </div>
      </footer>
    </div>
  );
}

const SponsorLogo = ({
  sponsor,
  classNames,
}: {
  sponsor: Sponsor;
  classNames?: { parent?: string; image?: string };
}) => (
  <ExtLink
    href={sponsor.href}
    title={sponsor.title}
    className={cn(
      "group flex items-center justify-center rounded-lg p-3 transition focus-visible:ring-2 focus-visible:ring-ring",
      classNames?.parent,
    )}
    unstyled
  >
    <img
      src={`/www/assets/images/sponsors/${sponsor.src}`}
      alt={sponsor.title}
      className={cn(
        "max-h-12 max-w-full object-contain transition grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-focus-visible:grayscale-0 group-focus-visible:opacity-100 select-none",
        classNames?.image,
      )}
    />
  </ExtLink>
);
