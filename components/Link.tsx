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
      class={`text-primary hover:underline data-[current]:text-white font-semibold${
        className ? ` ${className}` : ""
      }`}
    >
      {label}
    </a>
  );
}
