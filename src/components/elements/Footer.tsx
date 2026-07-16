import { Link } from "@/components/ui/ethendotapp/link";
import { brandInfo } from "@/lib/meta";
import { cn } from "@/lib/utils";

export function Footer({ className, cta }: { className?: string; cta?: React.ReactNode }) {
  return (
    <footer className={cn("bg-hg-black text-background p-4", className)}>
      <p className="text-center text-sm text-muted-foreground">
        Made with ❤️ by{" "}
        <Link to="/about" hash="team">
          the HackGwinnett Team
        </Link>
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="space-y-0.5">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} {brandInfo.company}. All rights reserved.
          </p>
          <p className="hidden sm:block text-xs text-white/80">
            HackGwinnett and the HG wordmark are trademarks of {brandInfo.company}
          </p>
        </div>
        <div>{cta}</div>
      </div>
    </footer>
  );
}

/*
      <footer className="bg-hg-black text-white p-4">
        {/ * TODO: if finishing index.tsx (this) footer, which is meant to look cool, also update the Footer.tsx component, which is meant to be purely functional * /}
        {import.meta.env.DEV && <p className="text-center">TODO: (temporary, see comment)</p>}
        <p className="text-center">
          HackGwinnett and the HG wordmark are trademarks of the HackGwinnett Foundation.
        </p>
        {/ *
          HackGwinnett is a 501(c)(3) nonprofit organization. Our mission is to empower the next
          generation of technology leaders in Metro Atlanta by providing free access to computer
          science education and fostering a vibrant community of young innovators.

          One day!
        * /}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="space-y-0.5">
            <p className="text-sm text-center">
              &copy; {new Date().getFullYear()} {brandInfo.company}. All rights reserved.
            </p>
            <p className="hidden sm:block text-xs text-muted-foreground">
              Made with ❤️ by{" "}
              <Link to="/about" hash="team">
                the HackGwinnett Team
              </Link>
            </p>
          </div>
          <Magnetic intensity={0.4}>
            <Button
              className="cursor-none hover:scale-105 active:scale-100"
              variant="glass"
              size="sm"
              onClick={async () => {
                await play("pop");
                document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <RiArrowUpBoxLine className="size-6" />
              Back to Top
            </Button>
          </Magnetic>
        </div>
      </footer>
*/
