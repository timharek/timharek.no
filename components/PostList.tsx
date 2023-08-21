import { Link } from "./Link.tsx";

interface Props {
  posts: Post[];
}

export function PostList({ posts }: Props) {
  return (
    <ul class="space-y-4">
      {posts.map((post) => (
        <li class="border-l-4 border-primary pl-2 w-full">
          <div class="flex flex-wrap-reverse gap-2 justify-between ">
            <Link href={`/${post.path}`} label={post.title} />
            {post.date && (
              <span class="text-gray-400 font-mono">
                {post.date.toISOString().split("T")[0]}
              </span>
            )}
          </div>
          <p class="">{post.description}</p>
        </li>
      ))}
    </ul>
  );
}
