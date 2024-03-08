import { Link } from "./Link.tsx";

interface Props {
  posts: Post[];
}

export function PostList({ posts }: Props) {
  return (
    <ul class="space-y-4">
      {posts.map((post) => (
        <li
          class="h-entry border-l-4 border-primary pl-2 w-full"
          lang={post.language === "no" ? "no" : "en"}
        >
          <div class="flex flex-wrap-reverse gap-2 justify-between">
            <div class="flex gap-2">
              <Link
                href={`/${post.path}`}
                label={post.language === "no" ? `🇳🇴 ${post.title}` : post.title}
                className="p-name u-url"
              />
              {post.draft &&
                (
                  <div class="text-xs border-1 border-green-400 text-green-400 py-0.5 px-2 rounded-full lowercase">
                    Draft
                  </div>
                )}
            </div>
            {post.createdAt && (
              <time
                class="dt-published text-gray-400 font-mono"
                dateTime={post.createdAt.toISOString()}
                title={post.createdAt.toISOString()}
              >
                {post.createdAt.toISOString().split("T")[0]}
              </time>
            )}
          </div>
          <p class="p-summary">{post.description}</p>
        </li>
      ))}
    </ul>
  );
}
