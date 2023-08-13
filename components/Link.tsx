import { JSX } from "preact";

interface LinkProps extends JSX.HTMLAttributes<HTMLAnchorElement> {
  label: string;
}
export function Link(props: LinkProps) {
  return (
    <a {...props} class="text-primary hover:underline font-semibold">
      {props.label}
    </a>
  );
}
