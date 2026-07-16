import { defineCollection, defineConfig } from "@content-collections/core";
import { z } from "zod";
import { authorInfo } from "cms/authors";

const postsCollection = defineCollection({
  name: "posts",
  directory: "cms/posts",
  include: "**/*.md",
  schema: z.object({
    title: z.string(),
    authors: z.array(z.keyof(z.object(authorInfo))),
    date: z.number(),

    summary: z.string().optional(),
    cover: z
      .object({ src: z.string(), alt: z.string(), height: z.number().min(20).max(200).optional() })
      .optional(),
    tags: z.array(z.string()).optional(),
    unlisted: z.boolean().optional(),
    hidden: z.boolean().optional(),

    content: z.string(),
  }),
});

export default defineConfig({
  content: [postsCollection],
});
