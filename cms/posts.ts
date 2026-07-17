// eslint-disable-next-line no-restricted-imports
import { allPosts as ccPosts } from "content-collections";
import { authorInfo, type Author } from "cms/authors";

export const allPosts = ccPosts
  .filter((p) => !p.hidden)
  .sort((a, b) => b.date - a.date)
  .map((p) => ({
    ...p,
    date: new Date(p.date),
    cover: {
      ...p.cover,
      src: p.cover?.src.startsWith("/") ? `/www/${p.cover.src}` : p.cover?.src,
    },
    authors: p.authors.map((id: string) => ({ id, ...authorInfo[id] })) as Author[],
  }));

export const posts = allPosts.filter((p) => !p.unlisted);
