export function getCurrentDate(): string {
  return new Date().toISOString().split("T")[0];
}

export const selectKeys = {
  next: ["down", "tab"],
  previous: ["up", "shift"],
};

/**
 * Slugify a string. Ex. `example.org` becomes `example-org`
 *
 * @param text String to slugified
 * @return string slugified
 */
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
