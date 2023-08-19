interface DefinitionProps {
  title: string;
  value: string | number;
}
export function Definition({ title, value }: DefinitionProps) {
  return (
    <div class="flex gap-2">
      <dt class="after:content-[':'] mr-1">{title}</dt>
      <dd class="">{value}</dd>
    </div>
  );
}
