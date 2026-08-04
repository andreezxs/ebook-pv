import { Link } from "@tanstack/react-router";
import { BOOK } from "@/lib/chapters";

export function SiteFooter() {
  return (
    <footer className="relative mx-auto mt-28 w-full max-w-6xl px-4 pb-10 sm:px-6">
      <div className="glass-panel flex flex-col gap-6 p-7 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-base font-semibold">{BOOK.title}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Escrito por {BOOK.author} · leitura digital contínua
          </p>
        </div>
        <nav aria-label="Links do rodapé" className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <Link to="/livro" className="text-muted-foreground transition-colors hover:text-primary">
            O Livro
          </Link>
          <Link to="/sobre" className="text-muted-foreground transition-colors hover:text-primary">
            Sobre o Projeto
          </Link>
          <Link to="/autor" className="text-muted-foreground transition-colors hover:text-primary">
            Autor
          </Link>
          <Link to="/contato" className="text-muted-foreground transition-colors hover:text-primary">
            Contato
          </Link>
        </nav>
      </div>
    </footer>
  );
}
