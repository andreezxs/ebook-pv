import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Chapter {
  id: string;
  title: string;
  slug: string;
  chapter_order: number;
  content: string;
  summary: string;
  keyword: string | null;
  theme: string | null;
  cover_image: string | null;
  reading_time: number;
  published_at: string;
}

const SELECT =
  "id,title,slug,chapter_order,content,summary,keyword,theme,cover_image,reading_time,published_at";

export async function fetchChapters(): Promise<Chapter[]> {
  const { data, error } = await supabase
    .from("chapters")
    .select(SELECT)
    .eq("is_published", true)
    .order("chapter_order", { ascending: true });

  if (error) throw error;
  return (data ?? []) as Chapter[];
}

export const chaptersQuery = () =>
  queryOptions({
    queryKey: ["chapters"],
    queryFn: fetchChapters,
    staleTime: 5 * 60 * 1000,
  });

export function chapterNeighbors(chapters: Chapter[], slug: string) {
  const index = chapters.findIndex((c) => c.slug === slug);
  return {
    index,
    chapter: index >= 0 ? chapters[index] : undefined,
    previous: index > 0 ? chapters[index - 1] : undefined,
    next: index >= 0 && index < chapters.length - 1 ? chapters[index + 1] : undefined,
  };
}

export const BOOK = {
  title: "Tramas Ocultas: Vozes da Vida",
  author: "@designerandrecmg",
  subtitle: "Um livro digital sobre o que existe por baixo do visível.",
} as const;
