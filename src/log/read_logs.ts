import { Confirm, logPath, Select } from "../deps.ts";
import { selectKeys } from "./util.ts";

type Type = "movie" | "tv" | "game" | "book" | "life" | "travel";

async function readFile() {
  const type = await Select.prompt<Type>({
    message: "What do you want to log?",
    options: [
      { name: "Movie", value: "movie" },
      { name: "TV Show", value: "tv" },
      { name: "Game", value: "game" },
      { name: "Book", value: "book" },
      { name: "Travel", value: "travel" },
      { name: "Life event", value: "life" },
    ],
    search: true,
    keys: selectKeys,
  });

  const fileToRead = logPath[type];

  const file: Log.Entry[] = JSON.parse(await Deno.readTextFile(fileToRead));

  const titles = file.map((item) => {
    return { name: `${item.title}`, value: `${item.title}` };
  });

  const selectedTitle = await Select.prompt({
    message: "Which title do you to view in more detail?",
    options: titles,
    search: true,
  });

  console.log(selectedTitle);

  const details: unknown = file.find((item) =>
    item.title === selectedTitle.value
  );

  console.log(details);

  const continueOnward: boolean = await Confirm.prompt("Look through more?");
  if (continueOnward) {
    await readFile();
  }
}

await readFile();
