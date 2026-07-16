import * as React from "react";
import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer";

import { cn } from "@/lib/utils";

// Stable feature utilities
const createDrawerHandle = DrawerPrimitive.createHandle;

function DrawerProvider({ ...props }: DrawerPrimitive.Provider.Props) {
  return <DrawerPrimitive.Provider {...props} />;
}

function DrawerIndentBackground({ className, ...props }: DrawerPrimitive.IndentBackground.Props) {
  return (
    <DrawerPrimitive.IndentBackground
      className={cn(
        "bg-black transition-transform duration-450 ease-[cubic-bezier(0.32,0.72,0,1)]",
        className,
      )}
      {...props}
    />
  );
}

function DrawerIndent({ className, ...props }: DrawerPrimitive.Indent.Props) {
  return (
    <DrawerPrimitive.Indent
      className={cn(
        "bg-background transition-transform duration-450 ease-[cubic-bezier(0.32,0.72,0,1)] data-active:scale-[0.93] data-active:rounded-xl overflow-hidden",
        className,
      )}
      {...props}
    />
  );
}

// Defaults to "down" instead of "right", as it's the standard for bottom sheets
function Drawer({ swipeDirection = "down", ...props }: DrawerPrimitive.Root.Props) {
  return <DrawerPrimitive.Root swipeDirection={swipeDirection} data-slot="drawer" {...props} />;
}

function DrawerTrigger({ ...props }: DrawerPrimitive.Trigger.Props) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />;
}

function DrawerSwipeArea({ className, ...props }: DrawerPrimitive.SwipeArea.Props) {
  return (
    <DrawerPrimitive.SwipeArea
      data-slot="drawer-swipe-area"
      className={cn(
        "fixed z-40 touch-none select-none transition-colors",
        // Position area automatically based on screen edges per swipe direction
        "data-[swipe-direction=left]:left-0 data-[swipe-direction=left]:inset-y-0 data-[swipe-direction=left]:w-4",
        "data-[swipe-direction=right]:right-0 data-[swipe-direction=right]:inset-y-0 data-[swipe-direction=right]:w-4",
        "data-[swipe-direction=up]:top-0 data-[swipe-direction=up]:inset-x-0 data-[swipe-direction=up]:h-4",
        "data-[swipe-direction=down]:bottom-0 data-[swipe-direction=down]:inset-x-0 data-[swipe-direction=down]:h-4",
        className,
      )}
      {...props}
    />
  );
}

function DrawerPortal({ ...props }: DrawerPrimitive.Portal.Props) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;
}

function DrawerClose({ ...props }: DrawerPrimitive.Close.Props) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />;
}

function DrawerOverlay({ className, ...props }: DrawerPrimitive.Backdrop.Props) {
  return (
    <DrawerPrimitive.Backdrop
      data-slot="drawer-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/20 supports-backdrop-filter:backdrop-blur-sm transition-opacity duration-450 ease-[cubic-bezier(0.32,0.72,0,1)] opacity-[calc(1-var(--drawer-swipe-progress,0))] data-swiping:duration-0 data-starting-style:opacity-0 data-ending-style:opacity-0 data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)]",
        className,
      )}
      {...props}
    />
  );
}

function DrawerContent({ className, children, ...props }: DrawerPrimitive.Popup.Props) {
  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Viewport className="fixed inset-0 z-50 flex p-0 data-[swipe-direction=down]:items-end data-[swipe-direction=down]:justify-center data-[swipe-direction=up]:items-start data-[swipe-direction=up]:justify-center data-[swipe-direction=left]:items-stretch data-[swipe-direction=left]:justify-start data-[swipe-direction=right]:items-stretch data-[swipe-direction=right]:justify-end">
        <DrawerPrimitive.Popup
          data-slot="drawer-content"
          className={cn(
            "group/drawer-content fixed z-50 flex h-auto flex-col bg-popover text-sm text-popover-foreground transition-transform duration-450 ease-[cubic-bezier(0.32,0.72,0,1)] data-swiping:select-none touch-auto outline-none shadow-xl data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)]",
            // Down Direction
            "data-[swipe-direction=down]:inset-x-0 data-[swipe-direction=down]:bottom-0 data-[swipe-direction=down]:mt-24 data-[swipe-direction=down]:max-h-[80vh] data-[swipe-direction=down]:rounded-t-xl data-[swipe-direction=down]:border-t data-[swipe-direction=down]:transform-[translateY(var(--drawer-swipe-movement-y))] data-[swipe-direction=down]:data-starting-style:transform-[translateY(100%)] data-[swipe-direction=down]:data-ending-style:transform-[translateY(100%)]",
            // Left Direction
            "data-[swipe-direction=left]:inset-y-0 data-[swipe-direction=left]:left-0 data-[swipe-direction=left]:w-3/4 data-[swipe-direction=left]:rounded-none data-[swipe-direction=left]:border-r data-[swipe-direction=left]:transform-[translateX(var(--drawer-swipe-movement-x))] data-[swipe-direction=left]:data-starting-style:transform-[translateX(-100%)] data-[swipe-direction=left]:data-ending-style:transform-[translateX(-100%)]",
            // Right Direction
            "data-[swipe-direction=right]:inset-y-0 data-[swipe-direction=right]:right-0 data-[swipe-direction=right]:w-3/4 data-[swipe-direction=right]:rounded-none data-[swipe-direction=right]:border-l data-[swipe-direction=right]:transform-[translateX(var(--drawer-swipe-movement-x))] data-[swipe-direction=right]:data-starting-style:transform-[translateX(100%)] data-[swipe-direction=right]:data-ending-style:transform-[translateX(100%)]",
            // Up Direction
            "data-[swipe-direction=up]:inset-x-0 data-[swipe-direction=up]:top-0 data-[swipe-direction=up]:mb-24 data-[swipe-direction=up]:max-h-[80vh] data-[swipe-direction=up]:rounded-b-xl data-[swipe-direction=up]:border-b data-[swipe-direction=up]:transform-[translateY(var(--drawer-swipe-movement-y))] data-[swipe-direction=up]:data-starting-style:transform-[translateY(-100%)] data-[swipe-direction=up]:data-ending-style:transform-[translateY(-100%)]",
            // Responsive Max Widths
            "data-[swipe-direction=left]:sm:max-w-sm data-[swipe-direction=right]:sm:max-w-sm",
            className,
          )}
          {...props}
        >
          <DrawerPrimitive.Content className="flex flex-col h-full w-full outline-none relative">
            {/* Visual Drag Handle scoped accurately to 'down' sheet swipe direction */}
            <div className="mx-auto mt-3 hidden h-1 w-12 shrink-0 rounded-full bg-muted-foreground/30 group-data-[swipe-direction=down]/drawer-content:block cursor-grab active:cursor-grabbing" />
            {children}
          </DrawerPrimitive.Content>
        </DrawerPrimitive.Popup>
      </DrawerPrimitive.Viewport>
    </DrawerPortal>
  );
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={cn(
        "flex flex-col gap-1 p-4 group-data-[swipe-direction=down]/drawer-content:text-center group-data-[swipe-direction=up]/drawer-content:text-center md:gap-2 md:text-left",
        className,
      )}
      {...props}
    />
  );
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  );
}

function DrawerTitle({ className, ...props }: DrawerPrimitive.Title.Props) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn("text-lg font-semibold tracking-wider text-foreground uppercase", className)}
      {...props}
    />
  );
}

function DrawerDescription({ className, ...props }: DrawerPrimitive.Description.Props) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn("mt-0.5 text-sm leading-relaxed text-muted-foreground", className)}
      {...props}
    />
  );
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerSwipeArea,
  DrawerProvider,
  DrawerIndentBackground,
  DrawerIndent,
  createDrawerHandle,
};
