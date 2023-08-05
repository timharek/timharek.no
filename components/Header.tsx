import { config } from "../config.ts";
import { Breadcrumbs } from "./Breadcrumbs.tsx";

interface HeaderProps {
  currentPath: string;
  breadcrumbs?: Breadcrumbs[];
}

export function Header({ currentPath, breadcrumbs }: HeaderProps) {
  const navigation = config.navigation.header.map((item) => {
    return {
      ...item,
      current: currentPath === item.path,
    };
  });
  return (
    <>
      <a
        class="transition left-0 bg-primary text-primary-content absolute p-3 m-3 -translate-y-32 focus:translate-y-0"
        href="#main"
      >
        Skip to content
      </a>
      <header
        class="max-w-screen-md mx-auto px-4 flex justify-between items-center my-4"
        aria-label="Main navigation"
      >
        <a class="header__logo" rel="me" href="/" aria-label="Home">
          Logo
        </a>

        <nav>
          <ul class="flex gap-4">
            {navigation.map((item) => (
              <li>
                {item.current
                  ? item.title
                  : (
                    <a class="text-primary hover:underline" href={item.path}>
                      {item.title}
                    </a>
                  )}
              </li>
            ))}
          </ul>
        </nav>
      </header>
      {breadcrumbs && <Breadcrumbs crumbs={breadcrumbs} />}
    </>
  );
}
