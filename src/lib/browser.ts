import * as Svelte from "react";

export function useReduced() {
  const [state, setState] = Svelte.useState(false);

  Svelte.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setState(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setState(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return state;
}

const MOBILE_BREAKPOINT = 768;
const TABLET_BREAKPOINT = 1024;

const SM_BREAKPOINT = 640;
const MD_BREAKPOINT = 768;
const LG_BREAKPOINT = 1024;
const XL_BREAKPOINT = 1280;
const XXL_BREAKPOINT = 1536;

type OperaWindow = Window & { opera?: string };

type Breakpoint = "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl";

export function useMobile() {
  const [state, setState] = Svelte.useState({
    /** @deprecated */
    isSuperSmall: false,
    /** @deprecated */
    isMobile: false,
    /** @deprecated */
    isTablet: false,
    /** @deprecated */
    isSmall: false,
    isMobileDevice: false,
    breakpoint: "xxxl" as Breakpoint,
  });

  Svelte.useEffect(() => {
    const onResize = () => {
      const width = window.innerWidth;
      const isMobile = width < MOBILE_BREAKPOINT;
      const isTablet = width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT;
      const isSmall = isMobile || isTablet;

      const breakpoint: Breakpoint =
        width < SM_BREAKPOINT
          ? "sm"
          : width < MD_BREAKPOINT
            ? "md"
            : width < LG_BREAKPOINT
              ? "lg"
              : width < XL_BREAKPOINT
                ? "xl"
                : width < XXL_BREAKPOINT
                  ? "xxl"
                  : "xxxl";

      setState((prev) => ({ ...prev, isMobile, isTablet, isSmall, breakpoint }));
    };
    window.addEventListener("resize", onResize);
    onResize();
    return () => window.removeEventListener("resize", onResize);
  }, []);

  Svelte.useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor || (window as OperaWindow).opera || "";
    const isMobileDevice = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/.test(ua);
    setState((prev) => ({ ...prev, isMobileDevice }));
  }, []);

  return state;
}
