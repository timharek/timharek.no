import { config } from "../config.ts";
import { Breadcrumbs } from "./Breadcrumbs.tsx";
import { Link } from "./Link.tsx";
import { Logo } from "./Logo.tsx";

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
        class="print:hidden transition left-0 bg-primary text-primary-content absolute p-3 m-3 -translate-y-32 focus:translate-y-0"
        href="#main"
      >
        Skip to content
      </a>
      <header
        class="print:hidden max-w-screen-md mx-auto px-4 flex justify-between items-center my-4"
        aria-label="Main navigation"
      >
        <a class="w-20 h-20" rel="me" href="/" aria-label="Home">
          <Logo />
        </a>

        <nav>
          <ul class="flex gap-4">
            {navigation.map((item) => (
              <li>
                {item.current
                  ? <span class="font-semibold">{item.title}</span>
                  : <Link href={item.path} label={item.title} />}
              </li>
            ))}
          </ul>
        </nav>
      </header>
      {breadcrumbs && <Breadcrumbs crumbs={breadcrumbs} />}
      <HCard />
    </>
  );
}

function HCard() {
  return (
    <div class="h-card" hidden>
      <a href={config.base_url} class="u-uid u-url p-name">
        {config.author}
      </a>
      <a class="u-photo" href={`${config.base_url}/${config.author_img}`}>
        (Photo)
      </a>
      <a href={`mailto:${config.email}`} rel="me" class="u-email">
        {config.email}
      </a>
      <a class="u-key" href={`${config.base_url}/public-key.asc`}>PGP key</a>
    </div>
  );
}
