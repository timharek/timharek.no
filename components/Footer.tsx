import { config } from "../config.ts";
import { Link } from "./Link.tsx";

interface FooterProps {
  currentPath: string;
  lastDeploy: string;
}

export function Footer({ currentPath, lastDeploy }: FooterProps) {
  const navigation = config.navigation.footer.map((item) => {
    return {
      ...item,
      current: currentPath === item.path,
    };
  });
  return (
    <footer class="print:hidden max-w-screen-md mx-auto my-4 px-4 flex justify-between flex-wrap">
      <div>
        Last deploy: <span className="font-mono">{lastDeploy}</span>
      </div>

      <nav class="footer__nav" aria-label="Secondary navigation">
        <ul class="flex gap-4">
          {navigation.map((item) => (
            <li>
              <Link href={item.path} label={item.title} />
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
}
