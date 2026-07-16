import { Link } from "@/components/ui/ethendotapp/link";
import { createFileRoute } from "@tanstack/react-router";
import { posts } from "cms/posts";

export const Route = createFileRoute("/posts/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-4">
      <p>CHECK OUT OUR AWESOME POSTS!</p>
      <ul>
        {posts.map((post) => (
          <li key={post._meta.path}>
            *{" "}
            <Link to="/posts/$postId" params={{ postId: post._meta.path }}>
              {post.title}
            </Link>{" "}
            by {post.authors.map((a) => a.name).join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
}
