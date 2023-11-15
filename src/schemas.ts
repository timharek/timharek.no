import { z } from "zod";

const Review = z.object({
  rating: z.number(),
  comment: z.string().optional(),
});

const MovieEntry = z.object({
  type: z.enum(["movie"]),
  release_year: z.number(),
  review: Review,
  genres: z.array(z.string()).optional(),
  director: z.array(z.string()).optional(),
});

const TVEntry = z.object({
  type: z.enum(["tv"]),
  release_year: z.number().nullable(),
  review: Review,
  genres: z.array(z.string()).optional(),
  season: z.number(),
  episode_count: z.number().optional(),
  director: z.array(z.string()).optional(),
  creator: z.array(z.string()).optional(),
});

const GameEntry = z.object({
  type: z.enum(["game"]),
  release_year: z.number(),
  review: Review,
  genres: z.array(z.string()).optional(),
  platform: z.string(),
});

const BookEntry = z.object({
  type: z.enum(["book"]),
  publish_year: z.number(),
  review: Review,
  author: z.array(z.string()),
  genres: z.array(z.string()).optional(),
});

const Occassion = z.enum(["business", "pleasure"]);

const TravelEntry = z.object({
  type: z.enum(["travel"]),
  occasion: Occassion,
  to_date: z.string(),
  location: z.object({
    country: z.object({
      name: z.string(),
      emoji: z.string().emoji(),
    }),
    cities: z.array(z.string()),
  }),
});

const LifeEventEntry = z.object({
  type: z.enum(["life"]),
  description: z.string(),
  category: z.string().optional(),
});

const Entry = z.intersection(
  z.object({
    title: z.string(),
    date: z.string(),
  }),
  z.discriminatedUnion("type", [
    MovieEntry,
    TVEntry,
    GameEntry,
    BookEntry,
    TravelEntry,
    LifeEventEntry,
  ]),
);

export const Log = {
  Entry,
  Occassion,
};

export type Entry = z.infer<typeof Entry>;
