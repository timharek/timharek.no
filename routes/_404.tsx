import { Link } from "../components/Link.tsx";
import { PageHeader } from "../components/PageHeader.tsx";

export default function NotFoundPage() {
  return (
    <article class="max-w-screen-md mx-auto px-4 mb-4">
      <PageHeader title="404 - Page not found" />
      <p>
        Please return to the <Link href="/" label="home page" />
      </p>
    </article>
  );
}
