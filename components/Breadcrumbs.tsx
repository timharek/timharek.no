import { Link } from "./Link.tsx";

export interface Breadcrumbs {
  title: string;
  path: string;
}

interface BreadcrumbsProps {
  crumbs: Breadcrumbs[];
}

export function Breadcrumbs({ crumbs }: BreadcrumbsProps) {
  return (
    <nav class="print:hidden max-w-screen-md mx-auto px-4 mb-4">
      <ol class="flex gap-2 flex-wrap">
        {crumbs.map((crumb) => {
          return (
            <li class="after:content-['/'] after:pl-1 flex gap-1 last:after:content-['']">
              <Link href={crumb.path} label={crumb.title} />
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
