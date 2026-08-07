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

const FALLBACK_CHAPTERS: Chapter[] = [
  {
    id: "00000000-0000-0000-0000-000000000001",
    title: "O Fio Invisível",
    slug: "o-fio-invisivel",
    chapter_order: 1,
    content:
      "Existe um fio que ninguém vê e que, mesmo assim, sustenta tudo.\n\n" +
      "Ele começa em um gesto pequeno: um bom-dia dito com atenção, uma porta segurada, um nome pronunciado corretamente. " +
      "Coisas mínimas, quase invisíveis, que costuram a distância entre duas pessoas.\n\n" +
      "Aprendi a observar esse fio nas salas de espera, nos ônibus lotados, nos corredores onde ninguém se apresenta. " +
      "Há sempre alguém segurando a ponta. Há sempre alguém esperando que a outra ponta seja puxada.\n\n" +
      "O que chamamos de coincidência talvez seja apenas o fio se tensionando. Duas vidas que se aproximam porque, " +
      "em algum ponto anterior, alguém decidiu não cortar o que unia.\n\n" +
      "Quando o fio se rompe, o mundo não faz barulho. Apenas fica um pouco mais frio. E é por isso que insisto: sustente " +
      "o seu lado. Alguém do outro lado está fazendo o mesmo.",
    summary: "Sobre os laços que sustentam pessoas mesmo quando ninguém está olhando.",
    keyword: "Fio",
    theme: "Conexões humanas",
    cover_image: null,
    reading_time: 4,
    published_at: new Date().toISOString(),
  },
  {
    id: "00000000-0000-0000-0000-000000000002",
    title: "Ruído Branco",
    slug: "ruido-branco",
    chapter_order: 2,
    content:
      "Passei anos confundindo silêncio com ausência.\n\n" +
      "Preenchia cada intervalo: música no caminho, vídeo no almoço, voz alheia antes de dormir. Um ruído branco constante, " +
      "macio o suficiente para não incomodar e alto o suficiente para não me deixar pensar.\n\n" +
      "Até que uma noite a energia caiu. Sem tela, sem som, sem fuga. E ali, no escuro, o que apareceu não foi paz — foi tudo " +
      "que eu havia adiado.\n\n" +
      "Descobri que o silêncio não é vazio. É um espaço com formato próprio, onde as coisas que evitamos finalmente cabem.\n\n" +
      "Hoje procuro esse espaço de propósito. Poucos minutos, sem nada tocando. É desconfortável. É necessário. É a única sala " +
      "em que consigo escutar minha própria voz sem edição.",
    summary: "O que resta quando desligamos o barulho que usamos para não nos ouvir.",
    keyword: "Silêncio",
    theme: "Excesso e escuta",
    cover_image: null,
    reading_time: 5,
    published_at: new Date().toISOString(),
  },
];

export async function fetchChapters(): Promise<Chapter[]> {
  const { data, error } = await supabase
    .from("chapters")
    .select(SELECT)
    .eq("is_published", true)
    .order("chapter_order", { ascending: true });

  if (error) {
    console.warn(
      "[Supabase] fetchChapters failed, falling back to local chapter data:",
      error.message,
    );
    return FALLBACK_CHAPTERS;
  }

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
