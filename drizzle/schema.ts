import { pgTable, uuid, text, integer, timestamp, boolean } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const chapters = pgTable("chapters", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	title: text().notNull(),
	slug: text().notNull(),
	chapterOrder: integer("chapter_order").notNull(),
	content: text().notNull(),
	summary: text().notNull(),
	keyword: text(),
	theme: text(),
	coverImage: text("cover_image"),
	readingTime: integer("reading_time").notNull(),
	publishedAt: timestamp("published_at", { withTimezone: true, mode: 'string' }).notNull(),
	isPublished: boolean("is_published").default(false).notNull(),
});
