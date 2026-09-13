import { eq } from "drizzle-orm";
import { db } from "./client";
import { chapters } from "./schema";

export async function getChapters() {
  return db.select().from(chapters);
}

export async function getPublishedChapters() {
  return db
    .select()
    .from(chapters)
    .where(eq(chapters.isPublished, true));
}

export async function getChapterBySlug(slug: string) {
  const result = await db
    .select()
    .from(chapters)
    .where(eq(chapters.slug, slug))
    .limit(1);

  return result[0] ?? null;
}

export async function upsertChapter(data: typeof chapters.$inferInsert) {
  return db
    .insert(chapters)
    .values(data)
    .onConflictDoUpdate({
      target: chapters.id,
      set: data,
    })
    .returning();
}