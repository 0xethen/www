import { NotFound } from "@/components/NotFound";
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ColorBadge } from "@/components/ui/color-badge";
import { ExtLink, Link } from "@/components/ui/ethendotapp/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cap } from "@/lib/utils";
import { RiGithubFill, RiInstagramLine, RiTwitterLine } from "@remixicon/react";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { posts } from "cms/posts";
import { authorInfo } from "cms/authors";

export const Route = createFileRoute("/posts/@{$author}")({
  loader: async ({ params }) => {
    const found = posts.filter((post) => post.authors.some((a) => a.id === params.author));
    if (!found || found.length === 0) throw notFound();

    const authorId = params.author;
    if (!authorInfo[authorId]) throw notFound();

    return { posts: found, authorId };
  },
  component: RouteComponent,
  notFoundComponent: (props) =>
    NotFound({
      ...props,
      title: "author not found (404)",
      link: { text: "all posts", href: "/posts" },
    }),
});

function RouteComponent() {
  const { posts, authorId } = Route.useLoaderData();
  const author = authorInfo[authorId];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar size="2xl">
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback>{author.name.initials()}</AvatarFallback>
            <AvatarBadge
              className="bg-secondary text-secondary-foreground text-xs"
              title={`Authored ${posts.length} ${"post".plural(posts.length)}`}
            >
              {cap(posts.length, 99, "+")}
            </AvatarBadge>
          </Avatar>
          <div>
            <h1 className="inline-flex items-center gap-2 text-3xl font-bold">
              {author.name} {author.officer && <ColorBadge>Staff</ColorBadge>}
            </h1>
            <p className="text-gray-600">{author.bio}</p>
          </div>
        </div>

        {author.socials && (
          <div className="flex items-center gap-2">
            {author.socials?.map((social) => (
              <Button
                key={social.platform}
                size="icon"
                variant="secondary"
                render={<ExtLink href={social.url} target="_blank" />}
                nativeButton={false}
              >
                {social.platform === "Instagram" && <RiInstagramLine />}
                {social.platform === "Twitter" && <RiTwitterLine />}
                {social.platform === "GitHub" && <RiGithubFill />}
                {social.platform === "Email" && "@"}
              </Button>
            ))}
          </div>
        )}
      </div>

      <Separator className="my-6" />

      <ScrollArea className="h-[60vh]">
        <div className="grid gap-4">
          {posts.map((post) => (
            <Card key={post._meta.path}>
              <CardHeader>
                <CardTitle>
                  <a href={`/posts/${post._meta.path}`} className="block">
                    {post.title}
                  </a>
                </CardTitle>
                <CardDescription className="text-sm">{post.summary}</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  {/* {post.readingTime ? `${post.readingTime} min read · ` : ""}*/}
                  {post.date ? post.date.toLocaleDateString([], { dateStyle: "long" }) : ""}
                </div>
                <div>
                  <Link to="/posts/$postId" params={{ postId: post._meta.path.slugify() }}>
                    Read article <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
