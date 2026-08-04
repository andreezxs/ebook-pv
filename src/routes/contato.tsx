import { createFileRoute } from "@tanstack/react-router";
import { Instagram, Mail, MessageCircle } from "lucide-react";
import { PageTransition, Reveal } from "@/components/Motion";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato | Tramas Ocultas: Vozes da Vida" },
      {
        name: "description",
        content:
          "Fale com @designerandrecmg sobre a obra Tramas Ocultas: Vozes da Vida, parcerias, leituras e projetos.",
      },
      { property: "og:title", content: "Contato — Tramas Ocultas" },
      { property: "og:description", content: "Converse com o autor da obra." },
      { property: "og:url", content: "/contato" },
    ],
    links: [{ rel: "canonical", href: "/contato" }],
  }),
  component: ContactPage,
});

const channels = [
  {
    icon: Instagram,
    label: "Instagram",
    value: "@designerandrecmg",
    href: "https://instagram.com/designerandrecmg",
  },
  {
    icon: Mail,
    label: "E-mail",
    value: "designerandrecmg@gmail.com",
    href: "mailto:designerandrecmg@gmail.com",
  },
  {
    icon: MessageCircle,
    label: "Mensagem direta",
    value: "Envie uma DM no Instagram",
    href: "https://instagram.com/designerandrecmg",
  },
];

function ContactPage() {
  return (
    <PageTransition>
      <div className="mx-auto max-w-3xl px-4 pb-10 pt-36 sm:px-6">
        <Reveal>
          <p className="text-[0.66rem] uppercase tracking-[0.32em] text-primary">Contato</p>
          <h1 className="title-gradient mt-4 font-display text-4xl font-semibold sm:text-5xl">
            Vamos conversar
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            Impressões sobre a leitura, convites, parcerias ou apenas uma palavra nova para o próximo
            capítulo — toda mensagem é lida.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4">
          {channels.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.08}>
              <a
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="glass-panel group flex items-center gap-5 p-6 transition-transform duration-500 hover:-translate-y-1"
              >
                <span className="glass grid h-11 w-11 shrink-0 place-items-center rounded-2xl text-primary">
                  <c.icon className="h-4.5 w-4.5" aria-hidden />
                </span>
                <span>
                  <span className="block text-[0.64rem] uppercase tracking-[0.24em] text-muted-foreground">
                    {c.label}
                  </span>
                  <span className="mt-1 block font-display text-lg font-semibold group-hover:text-primary">
                    {c.value}
                  </span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
