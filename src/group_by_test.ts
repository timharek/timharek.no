import { assertEquals } from "$std/testing/asserts.ts";
import { groupBy, groupByMap } from "./group_by.ts";

type Category = "refactor" | "thought";
interface Event {
  title: string;
  date: string;
  category: Category;
}

const array: Event[] = [
  {
    title: "Remade in Fresh",
    date: "2023-08-13",
    category: "refactor",
  },
  {
    title: "Thought about Deno",
    date: "2023-01-01",
    category: "thought",
  },
  {
    title: "Remade in Zola",
    date: "2021-06-29",
    category: "refactor",
  },
  {
    title: "Made in Jekyll",
    date: "2019-03-28",
    category: "refactor",
  },
];

Deno.test("Map: Group by year", () => {
  const groupedBy = groupByMap<number, Event>(
    array,
    (event) => new Date(event.date).getFullYear(),
  );
  assertEquals(groupedBy.get(2023), [
    {
      title: "Remade in Fresh",
      date: "2023-08-13",
      category: "refactor",
    },
    {
      title: "Thought about Deno",
      date: "2023-01-01",
      category: "thought",
    },
  ]);
});

Deno.test("Object: Group by year", () => {
  const groupedBy = groupBy<number, Event>(
    array,
    (event) => new Date(event.date).getFullYear(),
  );
  assertEquals(groupedBy["2023"], [
    {
      title: "Remade in Fresh",
      date: "2023-08-13",
      category: "refactor",
    },
    {
      title: "Thought about Deno",
      date: "2023-01-01",
      category: "thought",
    },
  ]);
});

Deno.test("Map: Group by category", () => {
  const groupedBy = groupByMap<Category, Event>(
    array,
    (event) => event.category,
  );
  assertEquals(groupedBy.get("thought"), [
    {
      title: "Thought about Deno",
      date: "2023-01-01",
      category: "thought",
    },
  ]);
});

Deno.test("Object: Group by category", () => {
  const groupedBy = groupBy<Category, Event>(
    array,
    (event) => event.category,
  );
  assertEquals(groupedBy["thought"], [
    {
      title: "Thought about Deno",
      date: "2023-01-01",
      category: "thought",
    },
  ]);
});
