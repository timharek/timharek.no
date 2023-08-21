import { Link } from "./Link.tsx";

interface Props {
  posts: Post[];
}

export function PostList({ posts }: Props) {
  return (
    <ul class="space-y-4">
      {posts.map((post) => (
        <li class="h-entry border-l-4 border-primary pl-2 w-full">
          <div class="flex flex-wrap-reverse gap-2 justify-between ">
            <Link
              href={`/${post.path}`}
              label={post.title}
              className="p-name u-url"
            />
            {post.date && (
              <time
                class="dt-published text-gray-400 font-mono"
                dateTime={post.date.toISOString()}
                title={post.date.toISOString()}
              >
                {post.date.toISOString().split("T")[0]}
              </time>
            )}
          </div>
          <p class="p-summary">{post.description}</p>
        </li>
      ))}
    </ul>
  );
}
