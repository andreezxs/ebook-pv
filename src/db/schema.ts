import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const chapters = pgTable("chapters", {
  id: uuid("id").primaryKey().defaultRandom(),

  title: text("title").notNull(),

  slug: text("slug").notNull(),

  chapterOrder: integer("chapter_order").notNull(),

  content: text("content").notNull(),

  summary: text("summary").notNull(),

  keyword: text("keyword"),

  theme: text("theme"),

  coverImage: text("cover_image"),

  readingTime: integer("reading_time").notNull(),

  publishedAt: timestamp("published_at", {
    withTimezone: true,
  }).notNull(),

  isPublished: boolean("is_published").notNull().default(false),
});