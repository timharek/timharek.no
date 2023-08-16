export function slugify(text: string): string {
  return text
    .toString() // Cast to string (optional)
    .normalize("NFKD") // The normalize() using NFKD method returns the Unicode Normalization Form of a given string.
    .toLowerCase() // Convert the string to lowercase letters
    .trim() // Remove whitespace from both sides of a string (optional)
    .replace(/\./g, "-") // Replace spaces with -
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

export function getWordCount(input: string): number {
  // Remove Markdown formatting tags using a regular expression
  const strippedContent = input.replace(/[#*_]+/g, "");

  // Split the content into words using whitespace as a delimiter
  const wordsArray = strippedContent.split(/\s+/);

  // Filter out empty strings from the array
  const filteredWords = wordsArray.filter((word) => word.trim() !== "");

  // Count the number of words
  const wordCount = filteredWords.length;
  return wordCount;
}

// Based on https://help.medium.com/hc/en-us/articles/214991667-Read-time
export function getReadingTime(input: string): number {
  const averagePerMinute = 265;

  const wordCount = getWordCount(input);

  return Math.ceil(wordCount / averagePerMinute);
}

export function capitalize(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const WEEK_IN_MILLIS = 6.048e8;
const DAY_IN_MILLIS = 8.64e7;
const HOUR_IN_MILLIS = 3.6e6;
const MIN_IN_MILLIS = 6e4;
const SEC_IN_MILLIS = 1e3;

export function getRelativeTime(date: Date, now = new Date()) {
  const formatter = new Intl.RelativeTimeFormat("en", { style: "long" });
  const millis = date.getTime();
  const diff = now.getTime() - millis;
  const absDiff = Math.abs(diff);

  if (absDiff > WEEK_IN_MILLIS) {
    return formatter.format(Math.trunc(diff / WEEK_IN_MILLIS), "week");
  } else if (absDiff >= DAY_IN_MILLIS) {
    return formatter.format(Math.trunc(diff / DAY_IN_MILLIS), "day");
  } else if (absDiff >= HOUR_IN_MILLIS) {
    return formatter.format(
      Math.trunc((diff % DAY_IN_MILLIS) / HOUR_IN_MILLIS),
      "hour",
    );
  } else if (absDiff > MIN_IN_MILLIS) {
    return formatter.format(
      Math.trunc((diff % HOUR_IN_MILLIS) / MIN_IN_MILLIS),
      "minute",
    );
  } else {
    return formatter.format(
      Math.trunc((diff % MIN_IN_MILLIS) / SEC_IN_MILLIS),
      "second",
    );
  }
}
