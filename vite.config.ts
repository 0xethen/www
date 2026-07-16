import { defineConfig } from "vite-plus";
import { devtools } from "@tanstack/devtools-vite";
import { nitro } from "nitro/vite";

import { tanstackStart } from "@tanstack/react-start/plugin/vite";

import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import contentCollections from "@content-collections/vite";

const config = defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  fmt: {},
  lint: {
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    rules: {
      "vite-plus/prefer-vite-plus-imports": "error",
      "no-restricted-imports": [
        "warn",
        // no content-collections imports (cms/ only)
        {
          paths: [
            {
              name: "content-collections",
              message: "NEVER IMPORT FROM `content-collections`!!! EVER! (see CONTRIBUTING.md).",
            },
          ],
        },
      ],
    },
    options: { typeAware: true, typeCheck: true },
  },
  resolve: { tsconfigPaths: true },
  plugins: [
    devtools(),
    nitro({ static: true, rolldownConfig: { external: [/^@sentry\//] } }),
    contentCollections(),
    tailwindcss(),
    tanstackStart({
      spa: { enabled: true, prerender: { outputPath: "/index.html", crawlLinks: true } },
      prerender: { failOnError: false },
    }),
    viteReact(),
  ],
});

export default config;
