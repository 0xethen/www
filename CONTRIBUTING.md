# Contributing

> As of right now, HackGwinnett's marketing website repository (www) is private to HG officers.

Your commit messages should have at least 1 (one) of the following prefixes:

| Prefix   | Description                                                          |
| -------- | -------------------------------------------------------------------- |
| [site]   | Contributions relating to the site source code (e.g. adding a route) |
| [docs]   | Adding a post to the content collection (/posts)                     |
| [feat]   | Major overhauls to site                                              |
| [hotfix] | Quick fix to one or more site bugs that cause crashing.              |

## Posts

> **IMPORTANT:** When making changes to the internal blog source code (`posts/index.tsx`, `posts/post.$slug.tsx`, etc), NEVER, under ANY CIRCUMSTANCES, get posts via:

```tsx
import { ... } from "content-collections";
```

> Post-related stuff should only be imported from `"cms"`, `"cms/posts"`, `"cms/authors"`, etc. There is rarely a time when you need to be importing raw post data from `"content-collections"`.

### Introduction

Unlike traditional CMS systems, there is no dedicated UI in our website for managing posts--it's all in the source code. This is good for many reasons; some of which include:

- No need to maintain a CMS
- I don't have to maintain a CMS
- We are a team of eight and we don't need a CMS

_(honestly, we rarely put out posts anyway)_

### Directory structure

So here's how it works:

- [`cms/posts`](cms/posts) folder
  - This is where every post, stored as a Markdown (`.md`) file, lives.

- [`cms/authors.ts`](cms/authors.ts) file
  - This is where author details are stored.

  - It is important--nay, IMPERATIVE--that you ALWAYS specify authors that ACTUALLY have a key in authors.json (and all the appropriate data).

  - Otherwise, the post will literally not even show up on the website.

  - _Note: this was originally a JSON file, which was annoying because I couldn't type it. I very quickly converted it to a TypeScript file, but if there's any little JSON leftovers, please lmk ASAP_

- [`content-collections.ts`](content-collections.ts) file
  - Configuration for content-collections

  - To modify (add/remove/change type of) metadata for **every post**, edit the Zod schema present in this file

  - > The build step requires frontmatter (metadata) from ALL posts to match the schema present in [content-collections.ts](content-collections.ts). If you _must_ change the metadata schema, it is your responsibility to alert your fellow officers and edit all existing posts

- `.content-collections` folder (locally)
  - When running the `vpr dev` script, you'll notice a .content-collections folder. This is where all the auto-generated nerdy code is that turns it into real code under the hood.
  - There's no need to worry about this folder, but if it doesn't show up _you are doing something wrong_!
  - Most likely, you did `vp dev` (which only ran the dev server) instead of `vp run dev` or `vpr dev` (which ran the dev script in `package.json`, whcih concurrently runs the content-collections stuff for you)

Alright, enough yap. Here's what you've been waiting for:

### Post structure

At the top of every post is the frontmatter, which serves as metadata for the website:

```md
---
title: "React Compiler is getting a Rust slopfork"
authors: ["ethen"]
date: 1781016713527 # to get the current timestamp, run `node -e "console.log(Date.now())"` in your terminal
summary: "The jury's still out on whether it'll be reviewed thoroughly"
cover:
  {
    src: "/assets/covers/cookies.png",
    alt: "A plate of cookies my grandma made me. They were delicious.",
  }
tags:
  - "react"
  - "www"
  - "news"
---
```

<!-- TODO: "any" "other" "post" should be replaced with links to valid complete posts -->

(again, the schema (effectively types) for everything can be found in [content-collections.ts](content-collections.ts). If it gets confusing, you can look at [any](cms/posts/) [other](cms/posts/) (complete) [post](cms/posts/) for help.)

Notice how the `authors` property is an array set to [`ethen`] instead of a full government name? Take a look at [`authors.ts`](cms/authors.ts#11):

```ts
export const authorInfo: AuthorDetail = {
  ethen: {
    name: "Ethen",
    bio: "enjoys water and long walks on the beach",
    avatar: "/assets/posts/avatars/0xethen.png",
    socials: [
      { platform: "Instagram", url: "https://instagram.com/ethentseggai" },
      // { platform: "Twitter", url: "..." } and here's where I'd put my Twitter... IF I HAD ONE!
    ],
    officer: true,
  },
  // ...
};
```

"ethen" is the authorId, used as a key to my details in authorsRaw. The `authors` attribute is an array in order from **most contributed to least contributed**, like research papers. This way, on any given post, the first name that shows up will link to the author with the most contributions to the article.

---

The rest (you know, the actual "writing") is up to you. Remember, it's a **Markdown (`.md`) file**, so there's a lot of formatting to your disposal. You're probably familiar with writing in Markdown (heard of Discord?), but in case you get stuck:

- check out [this cheat sheet](https://www.markdownguide.org/basic-syntax/)
- look up a tutorial on [YouTube](https://www.youtube.com/results?search_query=markdown+tutorial)
- or ask another friendly officer :)

Happy writing! ✍️

Ethen
