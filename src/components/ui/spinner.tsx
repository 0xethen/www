import { cn } from "@/lib/utils";
import { type RemixiconComponentType, RiLoaderLine } from "@remixicon/react";

function Spinner({ className, ...props }: RemixiconComponentType & { className?: string }) {
  return (
    <RiLoaderLine
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  );
}

export { Spinner };
