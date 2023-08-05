import { UnknownPageProps } from "$fresh/server.ts";
import { PageHeader } from "../components/PageHeader.tsx";

export default function NotFoundPage({ url }: UnknownPageProps) {
  return (
    <article class="max-w-screen-md mx-auto px-4 mb-4">
      <PageHeader title="404 - Page not found" />
      <p>
        Please return to the{" "}
        <a class="text-primary hover:underline" href="/">home page</a>
      </p>
    </article>
  );
}
