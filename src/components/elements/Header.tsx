import * as React from "react";
import { Link } from "@/components/ui/ethendotapp/link";
import { RiMenuLine, RiMenu3Line, RiDiscordFill, RiInstagramFill } from "@remixicon/react";
import {
  NavigationMenu as NavMenu,
  NavigationMenuContent as NavMenuContent,
  NavigationMenuItem as NavMenuItem,
  NavigationMenuLink as NavMenuLink,
  NavigationMenuList as NavMenuList,
  NavigationMenuTrigger as NavMenuTrigger,
  navigationMenuTriggerStyle as navMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { eventInfo } from "@/lib/meta";
import { useMobile } from "@/lib/browser";
// import type { FileRoutesByPath } from "@tanstack/react-router";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/ethendotapp/drawer";
import { toolInfo } from "@/routes/tools/-shared";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

interface NavLinkProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  href: string; // TODO: (PRIO) better typing or just string (so we don't have to do `as string` l8r) keyof FileRoutesByPath OR MAYBE SEPARATE TO/HREF???
  disabled?: boolean;
}

interface NavMenuProps {
  title: string;
  className?: string;
  list: { className?: string; items: NavLinkProps[] };
}

type NavItem = NavLinkProps | NavMenuProps;

const data: NavItem[] = [
  {
    title: "About Us",
    description: "Learn more about HackGwinnett, our team, and our mission.",
    href: "/about",
  },
  {
    title: "Posts",
    description: "News, updates, and announcements from HackGwinnett and the team.",
    href: "/posts",
  },
  {
    title: "Programs",
    list: {
      className: "w-100",
      items: [
        {
          title: eventInfo.hackathon.name,
          description: eventInfo.hackathon.description,
          href: "/programs/hackathon",
        },
        {
          title: eventInfo.hackfest.name,
          description: eventInfo.hackfest.description,
          href: "/programs/hackfest",
        },
        {
          title: "Summer Workshops (coming soon)",
          description: "in collaboration with Peach State Hacks",
          href: "/programs/summer-workshops",
          disabled: true,
        },
      ],
    },
  },
  {
    title: "Tools",
    list: {
      className: "w-96", // w-84
      items: [
        {
          title: toolInfo.bogey.name,
          description: toolInfo.bogey.description,
          href: "/tools/bogey",
        },
        {
          title: toolInfo.birdie.name,
          description: toolInfo.birdie.description,
          href: "/tools/birdie",
          disabled: true,
        },
        {
          title: "Legacy tools...",
          href: "/tools/legacy",
        },
      ],
    },
  },
  {
    title: "Archive",
    className: "hidden lg:flex",
    list: {
      className:
        "grid grid-flow-col gap-2 grid-rows-3 md:grid-cols-2 w-84 [&_.nav-label]:font-brand",
      items: [
        { title: "HackGwinnett 5.0", href: "/developer/404" },
        { title: "HackGwinnett 4.0", href: "/developer/404" },
        { title: "HackGwinnett 3.0", href: "/developer/404" },
        { title: "HackGwinnett 2.0", href: "/developer/404" },
        { title: "HackGwinnett[0]", href: "/developer/404" },
        { title: "Other events", href: "/developer/404" },
      ],
    },
  },
];

export type HeaderClassNames = {
  div?: string;
  logo?: string;
  navigationMenu?: {
    global?: string;
    container?: string;
    items?: { global?: string; container?: string; link?: string; dropdown?: string };
  };
  cta?: { global?: string; container?: string; link?: string };
};

export function Header({
  className,
  classNames,
  detached,
}: {
  className?: string;
  classNames?: HeaderClassNames;
  detached?: boolean;
}) {
  const { breakpoint } = useMobile();
  const isMobile = breakpoint === "sm";

  return (
    <header
      className={cn(
        "p-4 text-white",
        detached ? "fixed top-0 left-0 w-full z-50" : "sticky top-0 z-40 bg-primary",
        className,
      )}
    >
      <div
        className={cn(
          "mx-auto flex w-full max-w-7xl items-center justify-between",
          classNames?.div,
        )}
      >
        <span className={cn("flex flex-1 justify-start", classNames?.logo)}>
          <Link to="/" title="HackGwinnett Logo" className="text-xl font-brand font-bold" unstyled>
            [HG]
          </Link>
          {import.meta.env.DEV && <Link to="/developer">++</Link>}
        </span>

        <div
          className={cn(
            "hidden md:flex flex-1 justify-center",
            classNames?.navigationMenu?.global,
            classNames?.navigationMenu?.container,
          )}
        >
          <NavMenu>
            <NavMenuList>
              {data.map((item) => {
                if ("href" in item) {
                  return (
                    <NavMenuItem
                      key={`${item.title}-${item.href}`}
                      className={cn(
                        classNames?.navigationMenu?.items?.global,
                        classNames?.navigationMenu?.items?.container,
                      )}
                      title={item.description}
                    >
                      <NavMenuLink
                        className={cn(
                          navMenuTriggerStyle(),
                          "hover:bg-hg-green active:bg-hg-green/80 focus:bg-transparent",
                          classNames?.navigationMenu?.items?.global,
                          classNames?.navigationMenu?.items?.link,
                        )}
                        render={<Link to={item.href} disabled={item.disabled} buttonStyle />}
                      >
                        {item.title}
                      </NavMenuLink>
                    </NavMenuItem>
                  );
                }

                return (
                  <NavMenuItem
                    key={`${item.title}-${item.list.items.length}`}
                    className={item.className}
                  >
                    <NavMenuTrigger
                      className={cn(
                        "hover:bg-hg-green/50 data-popup-open:hover:bg-hg-green data-popup-open:bg-hg-green/50 focus:bg-transparent",
                        classNames?.navigationMenu?.items?.global,
                        classNames?.navigationMenu?.items?.dropdown,
                      )}
                    >
                      {item.title}
                    </NavMenuTrigger>
                    <NavMenuContent>
                      <ul className={item.list.className}>
                        {item.list.items.map((subItem) => (
                          <DesktopListItem key={`${subItem.title}-${subItem.href}`} item={subItem}>
                            {subItem.description}
                          </DesktopListItem>
                        ))}
                      </ul>
                    </NavMenuContent>
                  </NavMenuItem>
                );
              })}
            </NavMenuList>
          </NavMenu>
        </div>

        <div
          title="hgm.en-US.header_cta"
          className={cn(
            "flex flex-1 gap-1 justify-end",
            classNames?.cta?.global,
            classNames?.cta?.container,
          )}
        >
          <Button
            render={
              <Link to="/go/$slug" params={{ slug: "instagram" }} target="_blank" buttonStyle />
            }
            className={cn(
              "hover:bg-hg-green hover:text-ground",
              classNames?.cta?.global,
              classNames?.cta?.link,
            )}
            variant="ghost"
            size="icon-sm"
            nativeButton={false}
          >
            <RiInstagramFill />
          </Button>
          <Button
            render={
              <Link to="/go/$slug" params={{ slug: "discord" }} target="_blank" buttonStyle />
            }
            className={cn(
              "hover:bg-hg-green hover:text-ground",
              classNames?.cta?.global,
              classNames?.cta?.link,
            )}
            variant="ghost"
            size="icon-sm"
            nativeButton={false}
          >
            <RiDiscordFill />
          </Button>
          <Drawer swipeDirection="right">
            <DrawerTrigger
              render={
                <Button
                  className={cn(
                    "hover:bg-hg-green hover:text-ground",
                    classNames?.cta?.global,
                    classNames?.cta?.link,
                  )}
                  variant="ghost"
                  size="icon-sm"
                />
              }
            >
              <span className="sr-only">Menu</span>
              {isMobile ? <RiMenuLine className="size-4" /> : <RiMenu3Line className="size-4" />}
              {/* {isMobile && <span className="ml-2">Menu</span>} */}
            </DrawerTrigger>

            <DrawerContent>
              <DrawerHeader className="gap-0.5">
                <DrawerTitle className="flex items-center gap-2">
                  Explore <Badge>BETA</Badge>
                </DrawerTitle>
                <DrawerDescription>
                  Problem?{" "}
                  <Link to="/go/$slug" params={{ slug: "report" }}>
                    Report any issues
                  </Link>{" "}
                  you find in our new site {":)"}
                </DrawerDescription>
              </DrawerHeader>

              <Separator />

              <div className="flex-1 overflow-y-auto scroll-fade p-4">
                <nav className="flex flex-col gap-6">
                  {data.map((item) => (
                    <div key={item.title}>
                      {"href" in item ? (
                        <MobileLink item={item} />
                      ) : (
                        <div className="flex flex-col gap-3">
                          <h4 className="border-b pb-2 text-lg uppercase font-thin font-brand">
                            {item.title}
                          </h4>
                          {item.list.items.map((subItem) => (
                            <MobileLink key={`${subItem.title}-${subItem.href}`} item={subItem} />
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </nav>
              </div>

              <Separator />

              <DrawerFooter>
                <Button
                  render={<Link to="/go/$slug" params={{ slug: "register" }} buttonStyle />}
                  size="lg"
                  nativeButton={false}
                >
                  Register for {eventInfo.hackathon.shortName}
                </Button>
                <DrawerClose render={<Button size="sm" variant="outline" />}>
                  Close Menu
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </header>
  );
}

function DesktopListItem({
  item,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { item: NavLinkProps }) {
  return (
    <li {...props}>
      <NavMenuLink render={<Link to={item.href} disabled={item.disabled} buttonStyle />}>
        <div className="flex flex-col gap-1 text-sm">
          <div className="flex flex-row items-center gap-1 font-medium leading-none">
            {item.icon}
            <span className="nav-label">{item.title}</span>
          </div>
          <div className="line-clamp-2 text-muted-foreground">{children}</div>
        </div>
      </NavMenuLink>
    </li>
  );
}

function MobileLink({ item }: { item: NavLinkProps }) {
  return (
    <DrawerClose
      render={<Link to={item.href} disabled={item.disabled} buttonStyle />}
      nativeButton={false}
    >
      <div
        className={cn(
          "transition",
          "flex flex-col gap-1 p-2",
          "hover:bg-accent",
          item.disabled && "pointer-events-none opacity-50",
        )}
      >
        <div className="flex items-center gap-2 font-medium">
          {item.icon}
          <span className="nav-label">{item.title}</span>
        </div>
        {item.description && (
          <div className="line-clamp-2 text-sm text-muted-foreground">{item.description}</div>
        )}
      </div>
    </DrawerClose>
  );
}
