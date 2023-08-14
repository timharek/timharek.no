export interface Breadcrumbs {
  title: string;
  path: string;
  current?: boolean;
}

interface BreadcrumbsProps {
  crumbs: Breadcrumbs[];
}

export function Breadcrumbs({ crumbs }: BreadcrumbsProps) {
  return (
    <nav class="max-w-screen-md mx-auto px-4 mb-4">
      <ol class="flex gap-2 flex-wrap">
        {crumbs.map((crumb) => {
          if (crumb.current) {
            return (
              <li class="">
                {crumb.title}
              </li>
            );
          }
          return (
            <li class="after:content-['/'] after:pl-1 flex gap-1">
              <a class="text-primary hover:underline" href={crumb.path}>
                {crumb.title}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
