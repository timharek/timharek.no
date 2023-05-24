export function Header() {
  const navigation = [
    {
      title: "Blog",
      path: "/blog",
    },
    {
      title: "Connect",
      path: "/connect",
    },
    {
      title: "About",
      path: "/about",
    },
  ];
  return (
    <>
      <a
        class="transition left-0 bg-primary text-primary-content absolute p-3 m-3 -translate-y-16 focus:translate-y-0"
        href="#main"
      >
        Skip to content
      </a>
      <header
        class="max-w-3xl mx-auto px-4 flex justify-between items-center my-4"
        aria-label="Main navigation"
      >
        <a class="header__logo" rel="me" href="/" aria-label="Home">
          Logo
        </a>

        <nav>
          <ul class="flex gap-4">
            {navigation.map((item) => (
              <li>
                <a href={item.path}>{item.title}</a>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  );
}
