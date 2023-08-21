interface PageHeaderProps {
  title: string;
  date?: Date;
  updated?: Date;
  readingTime?: number;
}

export function PageHeader(
  { title, date, updated, readingTime }: PageHeaderProps,
) {
  return (
    <div class="mb-4">
      <h1 class="p-name text-4xl font-semibold mb-4">{title}</h1>
      {(date || updated || readingTime) && (
        <div class="space-y-1">
          {date && (
            <DateBlock date={date} text="Published" className="dt-published" />
          )}
          {updated && (
            <DateBlock
              date={updated}
              text="Last updated"
              className="dt-updated"
            />
          )}
          {readingTime && (
            <span
              class=""
              aria-label="Estimated read time"
              title="Estimated read time"
            >
              {readingTime} {readingTime > 1 ? "minutes" : "minute"} read
            </span>
          )}
        </div>
      )}
    </div>
  );
}

function DateBlock(
  { text, date, className }: { text: string; date: Date; className?: string },
) {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
  return (
    <div class="">
      {text}{" "}
      <time
        dateTime={date.toISOString()}
        title={date.toISOString()}
        class={className}
      >
        {formattedDate}
      </time>
    </div>
  );
}
