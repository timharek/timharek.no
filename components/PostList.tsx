interface Props {
  posts: Post[];
}

export function PostList({ posts }: Props) {
  console.log(posts);
  return (
    <ul class="space-y-4">
      {posts.map((post) => (
        <li class="border-l-4 border-primary pl-2 w-full">
          <div class="flex flex-wrap-reverse gap-2 justify-between ">
            <a
              class="text-primary hover:underline font-semibold max-md:w-full"
              href={post.path}
            >
              {post.title}
            </a>
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
