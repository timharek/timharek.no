interface Props {
  posts: Post[];
}

export function PostList({ posts }: Props) {
  return (
    <ul class="space-y-4">
      {posts.map((post) => (
        <li class="flex gap-2">
          <a class="text-primary hover:underline" href={post.path}>
            {post.title}
          </a>
          {post.date && (
            <span class="text-gray-400 font-mono">
              {post.date.toISOString().split("T")[0]}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
