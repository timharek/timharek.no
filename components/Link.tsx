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
      class={`text-primary underline hover:(bg-primary text-black decoration-primary) data-[current]:(text-white hover:text-black) font-semibold${
        className ? ` ${className}` : ""
      }`}
    >
      {label}
    </a>
  );
}
