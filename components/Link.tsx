import { JSX } from "preact";

interface LinkProps extends JSX.HTMLAttributes<HTMLAnchorElement> {
  label: string;
}
export function Link(props: LinkProps) {
  const { label, ...propsWithoutLabel } = props;
  return (
    <a
      {...propsWithoutLabel}
      class="text-primary hover:underline font-semibold"
    >
      {label}
    </a>
  );
}
