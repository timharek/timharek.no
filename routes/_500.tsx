import { PageProps } from "$fresh/server.ts";
import { PageHeader } from "../components/PageHeader.tsx";

export default function Error500Page({ error }: PageProps) {
  return (
    <article class="max-w-screen-md mx-auto px-4 mb-4">
      <PageHeader title="500 - internal error" />
      <p>500 internal error: {(error as Error).message}</p>
    </article>
  );
}
