import { Input, prompt, Select } from "../deps.ts";
import { Entry } from "../schemas.ts";
import { getCurrentDate, selectKeys } from "../utils.ts";

export async function logLifeEvent(): Promise<Entry> {
  const currentDate = getCurrentDate();

  const { title, description, date, category } = await prompt([
    {
      name: "title",
      message: "Which life event do you want to log?",
      type: Input,
    },
    {
      name: "description",
      message: "Add a description",
      type: Input,
    },
    {
      name: "date",
      message: "When did this occur? (YYYY-MM-DD)",
      type: Input,
      suggestions: [currentDate],
    },
    {
      name: "category",
      message: "Do you want to add a custom prefix?",
      type: Select,
      options: [
        { name: "Health", value: "💪 Health" },
        { name: "Hobby", value: "🖲️ Hobby" },
        { name: "Milestone", value: "🪨 Milestone" },
        { name: "Writing", value: "✍️ Writing" },
        { name: "Career", value: "💼 Career" },
        { name: "Custom", value: "custom" },
        { name: "None", value: "0" },
      ],
      search: true,
      keys: selectKeys,
    },
  ]);

  if (!title || !description || !date) {
    throw new Error("Missing some fields");
  }

  return {
    type: "life",
    title,
    description,
    date: date,
    ...(category && category != "0" && {
      category: await getCategory(category),
    }),
  };
}

async function getCategory(prefix: string): Promise<string> {
  if (prefix === "custom") {
    const { prefix } = await prompt([{
      name: "prefix",
      message: "Enter category",
      type: Input,
    }]);
    return prefix as string;
  }
  return prefix;
}

export const LifeTesting = {
  getCategory,
};
