import { MessageCircle } from "lucide-react";
import { track } from "@/lib/track";

import capaSilicone from "@/assets/prod-capa-silicone-ip11.jpg.asset.json";
import capaMetal from "@/assets/prod-capa-metal-stand.jpg.asset.json";
import capaGear4 from "@/assets/prod-capa-gear4-s25.jpg.asset.json";
import bannerA07 from "@/assets/banner-samsung-a07.jpg.asset.json";
import cabo25w from "@/assets/prod-cabo-lightning-25w.jpg.asset.json";
import carregador41a from "@/assets/prod-carregador-41a.webp.asset.json";
import carregadorVeicular from "@/assets/prod-carregador-veicular.webp.asset.json";
import fone from "@/assets/prod-fone-lef1078.webp.asset.json";
import microfone from "@/assets/prod-microfone-lapela.webp.asset.json";
import garrafa from "@/assets/prod-garrafa-aloha.webp.asset.json";
import copo from "@/assets/prod-copo-termico.jpg.asset.json";

type Item = {
  img: string;
  title: string;
  desc: string;
  tag: string;
};

const items: Item[] = [
  {
    img: capaSilicone.url,
    title: "Capa Silicone iPhone 11",
    desc: "Toque aveludado, várias cores disponíveis.",
    tag: "Capas",
  },
  {
    img: capaMetal.url,
    title: "Metal Stand Case",
    desc: "Anti-impacto com suporte magnético e proteção 360°.",
    tag: "Capas",
  },
  {
    img: capaGear4.url,
    title: "Gear4 Crystal Palace — Galaxy S25",
    desc: "Transparente, antiamarelamento e queda de até 4 m.",
    tag: "Capas",
  },
  {
    img: bannerA07.url,
    title: "Capas Samsung A07",
    desc: "Novidade na loja — estoque limitado.",
    tag: "Capas",
  },
  {
    img: cabo25w.url,
    title: "Cabo Lightning 25W — 1 metro",
    desc: "Carga rápida e material resistente.",
    tag: "Cabos",
  },
  {
    img: carregador41a.url,
    title: "Kit Carregador 4.1A Tipo-C",
    desc: "2 USB, carga rápida e certificado Anatel.",
    tag: "Carregadores",
  },
  {
    img: carregadorVeicular.url,
    title: "Carregador Veicular Turbo 4.1A",
    desc: "Duas saídas USB para usar no carro.",
    tag: "Carregadores",
  },
  {
    img: fone.url,
    title: "Fone HD Estéreo LEF-1078",
    desc: "Com microfone, som HD e muito conforto.",
    tag: "Áudio",
  },
  {
    img: microfone.url,
    title: "Microfone de Lapela 2 em 1",
    desc: "Wireless com receptor Lightning e redução de ruído.",
    tag: "Áudio",
  },
  {
    img: garrafa.url,
    title: "Garrafa Térmica Aloha 500ml",
    desc: "Mantém gelado por horas, material resistente.",
    tag: "Utilidades",
  },
  {
    img: copo.url,
    title: "Copo Térmico com Canudo",
    desc: "Modelo com alça, ideal para o dia a dia.",
    tag: "Utilidades",
  },
];

const WHATSAPP = "5527996535765";

function waLink(title: string) {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
    `Olá! Tenho interesse em: ${title}. Ainda tem disponível?`,
  )}`;
}

export function CatalogGrid() {
  return (
    <section id="catalogo" className="mx-auto max-w-6xl px-5 pb-16">
      <p className="eyebrow">Catálogo</p>
      <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Modelos disponíveis</h2>
      <p className="mt-3 max-w-lg text-sm text-muted-foreground">
        Deslize para o lado no celular ou navegue pela grade. Toque no produto para pedir pelo
        WhatsApp.
      </p>

      {/* Carrossel no mobile, grade no desktop */}
      <div className="-mx-5 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.title}
            className="panel flex w-[78%] shrink-0 snap-start flex-col overflow-hidden transition hover:-translate-y-1 sm:w-auto"
          >
            <div className="relative aspect-square overflow-hidden bg-secondary">
              <img
                src={item.img}
                alt={item.title}
                loading="lazy"
                className="size-full object-cover"
              />
              <span className="absolute top-3 left-3 rounded-full bg-background/80 px-3 py-1 text-[11px] font-semibold tracking-wide text-primary uppercase backdrop-blur">
                {item.tag}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="text-base font-semibold">{item.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{item.desc}</p>
              <a
                href={waLink(item.title)}
                target="_blank"
                rel="noreferrer"
                onClick={() => track("whatsapp")}
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
              >
                <MessageCircle className="size-4" />
                Pedir no WhatsApp
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
