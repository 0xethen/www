import { defineConfig, lazyPlugins } from "vite-plus";
import { devtools } from "@tanstack/devtools-vite";
import contentCollections from "@content-collections/vite";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";

// https://vite.dev/config/
export default defineConfig({
  // base: "/www/", // for github pages
  staged: { "*": "vp check --fix" },
  fmt: {},
  lint: {
    plugins: ["react", "typescript", "oxc"],
    rules: {
      "react/rules-of-hooks": "error",
      "react/only-export-components": [
        "warn",
        {
          allowConstantExport: true,
        },
      ],
      "vite-plus/prefer-vite-plus-imports": "error",
      "no-restricted-imports": [
        "warn",
        // no content-collections imports (allowlist: cms/ only)
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
    jsPlugins: [
      {
        name: "vite-plus",
        specifier: "vite-plus/oxlint-plugin",
      },
    ],
  },
  resolve: { tsconfigPaths: true },
  plugins: lazyPlugins(() => [
    devtools(),
    contentCollections(),
    tailwindcss(),
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    react(),
    babel({ presets: [reactCompilerPreset()] }),
  ]),
  build: { rolldownOptions: { output: { codeSplitting: true } }, outDir: "dist" },
});
