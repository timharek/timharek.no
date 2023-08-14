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
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
  return (
    <div class="">
      {text}{" "}
      <time dateTime={date.toISOString()} title={date.toISOString()}>
        {formattedDate}
      </time>
    </div>
  );
}
