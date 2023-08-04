import { config } from "../config.ts";

export function Footer() {
  const navigation = config.navigation.footer;
  return (
    <footer class="max-w-screen-md mx-auto mb-4 px-4 flex justify-between">
      <div>
        Last deploy: (date-coming)
      </div>

      <nav class="footer__nav" aria-label="Secondary navigation">
        <ul class="flex gap-4">
          {navigation.map((item) => (
            <li>
              <a class="text-primary hover:underline" href={item.path}>
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
}
