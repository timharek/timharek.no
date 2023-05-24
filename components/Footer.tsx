export function Footer() {
  const navigation = [
    {
      title: "Stats",
      path: "/stats",
    },
    {
      title: "Privacy",
      path: "/privacy",
    },
    {
      title: "Sitemap",
      path: "/sitemap",
    },
    {
      title: "RSS",
      path: "/rss.xml",
    },
  ];
  return (
    <footer class="max-w-screen-md mx-auto px-4 flex justify-between">
      <div>
        Last deploy: (date-coming)
      </div>

      <nav class="footer__nav" aria-label="Secondary navigation">
        <ul class="flex gap-4">
          {navigation.map((item) => (
            <li>
              <a href={item.path}>{item.title}</a>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
}
