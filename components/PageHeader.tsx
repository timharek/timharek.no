interface PageHeaderProps {
  title: string;
  date?: Date;
  updated?: Date;
}

export function PageHeader({ title, date, updated }: PageHeaderProps) {
  return (
    <div class="mb-4">
      <h1 class="text-4xl font-semibold mb-4">{title}</h1>
      {(date || updated) && (
        <div class="space-y-1">
          {date && <DateBlock date={date} text="Published" />}
          {updated && <DateBlock date={updated} text="Last updated" />}
        </div>
      )}
    </div>
  );
}

function DateBlock({ text, date }: { text: string; date: Date }) {
  return (
    <div class="">
      {text}{" "}
      <time datetime={date}>
        {date.toISOString().split("T")[0]}
      </time>
    </div>
  );
}
