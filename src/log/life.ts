import { Input, prompt, Select } from "../deps.ts";
import { Entry } from "../schemas.ts";
import { getCurrentDate, selectKeys } from "../utils.ts";
import { z } from "zod";

const lifeSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string().transform((value) =>
    new Date(value).toISOString().split("T")[0]
  ),
  category: z.enum([
    "Health",
    "Hobby",
    "Milestone",
    "Writing",
    "Career",
    "Custom",
    "0",
  ]),
});

export async function logLifeEvent(): Promise<Entry> {
  const currentDate = getCurrentDate();

  const lifePrompt = await prompt([
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

  const { title, description, date, category } = lifeSchema.parse(lifePrompt);

  return {
    type: "life",
    title,
    description,
    date: date,
    ...(category && category !== "0" && {
      category: await getCategory(category),
    }),
  };
}

async function getCategory(prefix: string): Promise<string> {
  if (prefix === "custom") {
    const { prefix }: { prefix: string } = await prompt([{
      name: "prefix",
      message: "Enter category",
      type: Input,
    }]);
    return prefix;
  }
  return prefix;
}

export const LifeTesting = {
  getCategory,
};
