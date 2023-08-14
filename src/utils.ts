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

export function capitalize(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
