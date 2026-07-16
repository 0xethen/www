import { useRef, useEffect } from "react";

type BufferMap = Map<string, AudioBuffer>;
type SourceSet = Set<AudioBufferSourceNode>;

const DEFAULT_EXT = ".wav";
const ASSET_PREFIX = "/assets";

export function useSound() {
  const ctxRef = useRef<AudioContext | null>(null);
  const buffersRef = useRef<BufferMap>(new Map());
  const activeSourcesRef = useRef<SourceSet>(new Set());
  const decodePromisesRef = useRef<Map<string, Promise<AudioBuffer>>>(new Map());

  useEffect(() => {
    // create on first interaction or eagrly
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    // cleanup on unmount
    return () => {
      stopAllInternal();
      if (ctxRef.current) {
        try {
          void ctxRef.current.close();
        } catch {}
        ctxRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function mapPath(path: string) {
    // allow callers to pass "/audio/pop" or "audio/pop"
    if (!path.startsWith("/")) path = "/" + path;
    return `${ASSET_PREFIX}${path}${DEFAULT_EXT}`;
  }

  async function loadBuffer(urlPath: string) {
    const url = mapPath(urlPath);
    const buffers = buffersRef.current;
    const decodePromises = decodePromisesRef.current;
    if (buffers.has(url)) return buffers.get(url)!;
    if (decodePromises.has(url)) return decodePromises.get(url)!;

    const ctx = ctxRef.current || new (window.AudioContext || (window as any).webkitAudioContext)();
    ctxRef.current = ctx;

    const p = fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load audio: " + url);
        return res.arrayBuffer();
      })
      .then((arrayBuffer) => ctx.decodeAudioData(arrayBuffer))
      .then((buffer) => {
        buffers.set(url, buffer);
        decodePromises.delete(url);
        return buffer;
      })
      .catch((err) => {
        decodePromises.delete(url);
        throw err;
      });

    decodePromises.set(url, p);
    return p;
  }

  function play(path: string, opts?: { volume?: number; loop?: boolean; playbackRate?: number }) {
    const ctx = ctxRef.current || new (window.AudioContext || (window as any).webkitAudioContext)();
    ctxRef.current = ctx;
    const { volume = 1, loop = false, playbackRate = 1 } = opts || {};

    // resume context on user interaction if needed
    if (ctx.state === "suspended") ctx.resume().catch(() => {});

    return loadBuffer(path).then((buffer) => {
      const src = ctx.createBufferSource();
      src.buffer = buffer;
      src.loop = loop;
      src.playbackRate.value = playbackRate;

      const gain = ctx.createGain();
      gain.gain.value = volume;

      src.connect(gain);
      gain.connect(ctx.destination);

      activeSourcesRef.current.add(src);
      src.onended = () => activeSourcesRef.current.delete(src);

      src.start(0);
      return {
        stop: () => {
          try {
            src.stop();
          } catch {}
          activeSourcesRef.current.delete(src);
        },
      };
    });
  }

  function stopAllInternal() {
    const set = activeSourcesRef.current;
    set.forEach((src) => {
      try {
        src.stop();
      } catch {}
    });
    set.clear();
  }

  function stopAll() {
    stopAllInternal();
  }

  return { play, stopAll };
}
