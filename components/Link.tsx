import { JSX } from "preact";

interface LinkProps extends JSX.HTMLAttributes<HTMLAnchorElement> {
  label: string;
  className?: string;
}
export function Link(props: LinkProps) {
  const { label, className, ...propsWithoutLabel } = props;
  return (
    <a
      {...propsWithoutLabel}
      class={`text-primary underline hover:bg-primary hover:text-bg hover:decoration-primary data-[current]:text-text data-[current]:hover:text-bg font-semibold${
        className ? ` ${className}` : ""
      }`}
    >
      {label}
    </a>
  );
}
