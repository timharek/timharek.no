import { config } from "../config.ts";

interface FooterProps {
  currentPath: string;
}

export function Footer({ currentPath }: FooterProps) {
  const navigation = config.navigation.footer.map((item) => {
    return {
      ...item,
      current: currentPath === item.path,
    };
  });
  return (
    <footer class="max-w-screen-md mx-auto my-4 px-4 flex justify-between">
      <div>
        Last deploy: (date-coming)
      </div>

      <nav class="footer__nav" aria-label="Secondary navigation">
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
    </footer>
  );
}
