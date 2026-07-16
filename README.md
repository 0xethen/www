### www

The repository for the official HackGwinnett marketing website (https://hackgwinnett.org)

## Contributing

Before you commit: for more info on how to (correctly) create posts, the committing guidelines, and more, please see [CONTRIBUTING](CONTRIBUTING.md)

## Writing Posts

(moved to [CONTRIBUTING](CONTRIBUTING.md))

## Develop and Deploy

We use Vite+, the super-cool next-generation unified tooling system. [Or whatever.](#about-vite)

### Development

`vpr dev` (`vpr` is an alias for `vp run`. It is NOT the same as `vp`)

Congrats, content-collections is watching for CMS changes and your dev server is live at port `3000`. Go wild (not really though)!

### Build

`vpr build` (`vpr` is an alias for `vp run`. It is NOT the same as `vp`)

Congrats, you now have a build application at `dist/`. You'll see a `client` and `server` directory--rest assured, you'll only need the `client`. Our configuration [(vite.config.ts)](vite.config.ts) uses TanStack Start's [SPA mode](https://tanstack.com/start/latest/docs/framework/react/guide/spa-mode), so all of that server nonsense is completely useless!

### Deploy

You'll have to build the web app first [(see above)](#build). Because we're using [Nitro](https://nitro.build/deploy/providers/github-pages) in TanStack Start's SPA mode, we can deploy to pretty much any provider (static, serverless, or serverful!). Right now, we're using GitHub Pages, but Nitro makes it easy to switch!

Go to this repository's page on [GitHub](https://github.com/hackgwinnett), click on the Actions tab, and run the **"Deploy to GH Pages (Nitro, static)"** action. Boom. Deployed.

I'm sure there's some GitHub CLI or VSCode extension that can bring that right to your code editor... but eh. Maybe soon we can set it up to auto-deploy on commit.

### About Vite+

This project is using Vite+, a unified toolchain built on top of Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task. Vite+ wraps runtime management, package management, and frontend tooling in a single global CLI called `vp`. Vite+ is distinct from Vite, and it invokes Vite through `vp dev` and `vp build`. Run `vp help` to print a list of commands and `vp <command> --help` for information about a specific command.

---

> [Ethen](https://github.com/0xethen) wrote this very detailed, very thorough, very well-documented documentation with his own two hands! If at any point in time you were to send him a thank you card... or a snack from the vending machine... (maybe some another heartfelt gesture of gratitude?)... he would probably appreciate it. just sayin'.
