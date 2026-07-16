import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { RiPauseLine, RiPlayLine } from "@remixicon/react";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import WheelGestures from "embla-carousel-wheel-gestures";

export function HeroCarousel() {
  const [isCarouselPaused, setIsCarouselPaused] = useState<boolean>(false);

  return (
    <div className="group relative hidden lg:inline-flex max-w-xs xl:max-w-sm animate-in fade-in slide-in-from-bottom-5 animation-duration-1000 animation-delay-100 fill-mode-backwards">
      <Carousel
        plugins={[
          Autoplay({ active: !isCarouselPaused, stopOnInteraction: false }),
          WheelGestures(),
        ]}
        className="max-w-xs xl:max-w-sm"
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
      </Carousel>
      <button
        className={cn(
          "absolute bottom-2.5 right-2.5 z-10 animation-duration-500",
          "not-group-hover:hidden not-group-hover:animate-out not-group-hover:fade-out",
          "group-hover:animate-in group-hover:fade-in",
          "bg-secondary p-1",
        )}
        onClick={() => setIsCarouselPaused(!isCarouselPaused)}
      >
        {isCarouselPaused ? <RiPlayLine /> : <RiPauseLine />}
      </button>
    </div>
  );
}
