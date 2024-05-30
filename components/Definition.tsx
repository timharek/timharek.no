interface DefinitionProps {
  title: string;
  value: string | number;
  showBullet?: boolean;
}
const bulletClass =
  "before:content-[''] before:bg-white before:w-2 before:h-2 before:rounded-full before:inline-block flex items-center gap-2";
export function Definition({ title, value, showBullet }: DefinitionProps) {
  return (
    <div
      class={`${showBullet ? bulletClass : "flex gap-2"}`}
    >
      <dt class="after:content-[':'] mr-1">{title}</dt>
      <dd class="">{value}</dd>
    </div>
  );
}
