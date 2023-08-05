interface Props {
  posts: Post[];
}

export function PostList({ posts }: Props) {
  return (
    <ul class="space-y-4">
      {posts.map((post) => (
        <li class="border-l-4 border-primary pl-2 flex flex-wrap-reverse gap-2 justify-between w-full">
          <a
            class="text-primary hover:underline max-md:w-full"
            href={post.path}
          >
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
