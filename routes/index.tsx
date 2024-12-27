import { PostList } from "../components/PostList.tsx";
import { getSection } from "../src/content.ts";

export default async function Home() {
  const posts = (await getSection("blog")).pages as Post[];
  return (
    <div class="p-4 mx-auto max-w-screen-md space-y-4 md:space-y-8">
      <section class="space-y-4 md:space-y-4">
        <h1 class="text-4xl font-semibold">Hi, I'm Tim 👋</h1>
        <p class="max-w-prose">
          I'm a technologist from Norway. I care about creating solutions that
          respects people's privacy, security and user experience. This is my
          corner on the interwebs, have a look around.
        </p>
      </section>
      <section class="space-y-4 md:space-y-4">
        <h2 class="text-3xl font-semibold">Latest posts</h2>
        <PostList posts={posts.slice(0, 5)} />
      </section>
    </div>
  );
}
