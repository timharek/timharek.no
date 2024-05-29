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
        class="print:hidden transition left-0 bg-primary text-black absolute p-3 m-3 -translate-y-32 focus:translate-y-0"
        href="#main"
      >
        Skip to content
      </a>
      <header
        class="print:hidden max-w-screen-md mx-auto px-4 flex justify-between items-center my-4"
        aria-label="Main navigation"
      >
        <a
          class="group flex gap-2 items-center"
          rel="me"
          href="/"
          aria-label="Home"
        >
          <Logo className="w-16 h-16" />
          <div className="md:border-4 border-bg md:p-1 md:group-hover:border-primary transition-all">
            <div className="group-hover:underline bg-primary h-max text-black font-bold p-1">
              Tim Hårek
            </div>
          </div>
        </a>

        <nav>
          <ul class="flex gap-4">
            {navigation.map((item) => (
              <li>
                <Link href={item.path} label={item.title} />
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
      <a class="u-photo" href={config.author.avatar}>
        (Photo)
      </a>
      <a href={`mailto:${config.author.email}`} rel="me" class="u-email">
        {config.author.email}
      </a>
      <a class="u-key" href={`${config.base_url}/public-key.asc`}>PGP key</a>
    </div>
  );
}
