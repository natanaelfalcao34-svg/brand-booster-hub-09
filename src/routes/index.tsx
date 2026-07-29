import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  MapPin,
  Clock,
  Phone,
  Instagram,
  Facebook,
  Wifi,
  Copy,
  Check,
  Smartphone,
  ShieldCheck,
  Headphones,
  Cable,
  MessageCircle,
  Star,
} from "lucide-react";
import fachadaAsset from "@/assets/fachada-loja.jpg.asset.json";
import logoAsset from "@/assets/logo-mania-das-capas.jpg.asset.json";
import { track } from "@/lib/track";
import qrcodeAsset from "@/assets/qrcode-avaliacao.png.asset.json";


const WHATSAPP = "5527996535765";
const WHATSAPP_LABEL = "(27) 99653-5765";
const ADDRESS = "Avenida Brasil, 982 — Novo Horizonte, Serra/ES";
const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("Avenida Brasil 982, Novo Horizonte, Serra ES");
const WIFI_SSID = "MANIA DAS CAPAS";
const WIFI_PASS = "HOPEMA2026";
const REVIEW_URL = "https://g.page/r/CSIqReQasS88EBM/review";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mania das Capas — Capas, Películas e Acessórios | Serra ES" },
      {
        name: "description",
        content:
          "Capas, películas, acessórios e eletrônicos na Serra/ES. Av. Brasil, 982 — Novo Horizonte. Seg a sáb, 9h às 19h. WhatsApp (27) 99653-5765.",
      },
      { property: "og:title", content: "Mania das Capas — Capas, Películas e Acessórios" },
      {
        property: "og:description",
        content:
          "Loja de capas, películas, acessórios e eletrônicos na Serra/ES. Fale com a gente no WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const products = [
  { icon: Smartphone, title: "Capas", text: "Silicone, transparente, antichoque e personalizadas." },
  { icon: ShieldCheck, title: "Películas", text: "Vidro 3D, privacidade e hidrogel com aplicação." },
  { icon: Headphones, title: "Acessórios", text: "Fones, caixinhas, suportes e power banks." },
  { icon: Cable, title: "Eletrônicos", text: "Carregadores, cabos, adaptadores e muito mais." },
];

function Index() {
  const [copied, setCopied] = useState(false);

  const copyPass = async () => {
    try {
      await navigator.clipboard.writeText(WIFI_PASS);
      track("wifi_copy");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Logo />
          <a
            href={`https://wa.me/${WHATSAPP}`}
            target="_blank"
            rel="noreferrer"
            onClick={() => track("whatsapp")}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            <MessageCircle className="size-4" />
            WhatsApp
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="hero-surface">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-24">
          <div>
            <Logo className="mb-6 h-24 rounded-xl border border-border/60" />
            <p className="eyebrow">Serra • Espírito Santo</p>
            <h1 className="mt-4 text-4xl leading-[1.05] font-bold sm:text-5xl md:text-6xl">
              Tudo para o seu celular em{" "}
              <span className="text-primary">um só lugar</span>
            </h1>
            <p className="mt-5 max-w-md text-base text-muted-foreground">
              Capas, películas, acessórios e eletrônicos com preço justo, variedade e atendimento
              de verdade. Passe na loja ou chame no WhatsApp.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Olá! Vim pelo site da Mania das Capas.")}`}
                target="_blank"
                rel="noreferrer"
                onClick={() => track("whatsapp")}
                className="glow inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
              >
                <MessageCircle className="size-4" />
                Chamar no WhatsApp
              </a>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noreferrer"
                onClick={() => track("maps")}
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold transition hover:bg-secondary"
              >
                <MapPin className="size-4" />
                Como chegar
              </a>
            </div>
          </div>

          <div className="panel overflow-hidden">
            <img
              src={fachadaAsset.url}
              alt="Fachada da loja Mania das Capas na Avenida Brasil, Serra/ES"
              className="h-full max-h-[520px] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Avaliação Google — destaque principal */}
      <section id="avaliacao" className="mx-auto max-w-4xl px-5 py-14">
        <div className="panel glow p-8 text-center">
          <p className="eyebrow">Nos avalie no Google</p>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
            Sua opinião vale 5 estrelas ⭐
          </h2>
          <div className="mt-4 flex items-center justify-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-7 fill-primary text-primary" />
            ))}
          </div>
          <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">
            Aponte a câmera do celular para o QR Code ou toque no botão abaixo.
            Leva menos de 30 segundos e ajuda demais a nossa loja!
          </p>
          <a
            href={REVIEW_URL}
            target="_blank"
            rel="noreferrer"
            onClick={() => track("qrcode")}
            className="mt-6 inline-block rounded-xl bg-white p-4 transition hover:scale-[1.03]"
          >
            <img
              src={qrcodeAsset.url}
              alt="QR Code para avaliar a Mania das Capas no Google"
              className="size-48 sm:size-56"
              loading="lazy"
            />
          </a>
          <div>
            <a
              href={REVIEW_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => track("review_button")}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition hover:opacity-90"
            >
              <Star className="size-5 fill-current" />
              Avaliar no Google
            </a>
          </div>
        </div>
      </section>

      {/* Wi-Fi grátis — destaque */}
      <section className="mx-auto max-w-4xl px-5 pb-14">
        <div className="panel p-8 text-center">
          <Wifi className="mx-auto size-8 text-primary" />
          <p className="eyebrow mt-3">Wi-Fi grátis da loja</p>
          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Conecte-se de graça</h2>
          <dl className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <dt className="text-xs tracking-widest text-muted-foreground uppercase">Rede</dt>
              <dd className="mt-1 font-display text-xl font-semibold">{WIFI_SSID}</dd>
            </div>
            <div>
              <dt className="text-xs tracking-widest text-muted-foreground uppercase">Senha</dt>
              <dd className="mt-1 flex items-center justify-center gap-3">
                <span className="font-display text-xl font-semibold tracking-wider text-primary">
                  {WIFI_PASS}
                </span>
                <button
                  onClick={copyPass}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium transition hover:bg-secondary"
                >
                  {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                  {copied ? "Copiada" : "Copiar"}
                </button>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Redes sociais — destaque */}
      <section className="mx-auto max-w-4xl px-5 pb-14">
        <div className="panel p-8 text-center">
          <p className="eyebrow">Siga a gente</p>
          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Nossas redes sociais</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
            Novidades, promoções e lançamentos primeiro por lá.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href="https://instagram.com/maniadascapas"
              target="_blank"
              rel="noreferrer"
              onClick={() => track("instagram")}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold transition hover:bg-secondary"
            >
              <Instagram className="size-5 text-primary" />
              Instagram
            </a>
            <a
              href="https://facebook.com/maniadascapas"
              target="_blank"
              rel="noreferrer"
              onClick={() => track("facebook")}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold transition hover:bg-secondary"
            >
              <Facebook className="size-5 text-primary" />
              Facebook
            </a>
            <a
              href={`https://wa.me/${WHATSAPP}`}
              target="_blank"
              rel="noreferrer"
              onClick={() => track("whatsapp")}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              <MessageCircle className="size-5" />
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Nossa história */}
      <section id="historia" className="mx-auto max-w-4xl px-5 pb-14">
        <div className="panel p-8">
          <p className="eyebrow">Nossa história</p>
          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
            De uma vitrine pequena no Novo Horizonte para a loja de todo mundo
          </h2>
          <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              A Mania das Capas abriu as portas em <strong className="text-foreground">2019</strong>,
              na Avenida Brasil, no <strong className="text-foreground">Novo Horizonte</strong>, em
              Serra/ES. No começo era simples: um balcão, algumas dezenas de capas penduradas e uma
              vontade enorme de resolver o problema de quem tinha acabado de deixar o celular cair
              no chão.
            </p>
            <p>
              O bairro foi quem fez a loja crescer. Cliente indicava para o vizinho, o vizinho
              trazia o filho, o filho trazia a turma da escola. Cada pedido de “vocês têm película
              para esse modelo?” virou um item novo na prateleira — e foi assim que chegaram os
              fones, as caixinhas, os carregadores, os cabos e os eletrônicos do dia a dia.
            </p>
            <p>
              Hoje somos ponto de referência no Novo Horizonte: aplicação de película na hora,
              Wi‑Fi liberado para quem entra, atendimento pelo WhatsApp e aquele papo de sempre com
              quem já conhecemos pelo nome. Crescemos junto com a comunidade — e é por isso que a
              gente continua aqui, na mesma esquina, com o mesmo cuidado do primeiro dia.
            </p>
          </div>
        </div>
      </section>

      {/* Produtos */}

      <section className="mx-auto max-w-6xl px-5 pb-14">
        <p className="eyebrow">O que vendemos</p>
        <h2 className="mt-3 text-2xl font-bold sm:text-3xl">Produtos da loja</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <div key={p.title} className="panel p-6">
              <p.icon className="size-7 text-primary" />
              <h3 className="mt-4 text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="mx-auto max-w-4xl px-5 pb-16">
        <div className="panel p-7">
          <p className="eyebrow">Contato e visita</p>
          <h2 className="mt-3 text-2xl font-bold">Onde nos encontrar</h2>
          <ul className="mt-6 space-y-5 text-sm">
            <li className="flex gap-3">
              <MapPin className="size-5 shrink-0 text-primary" />
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noreferrer"
                onClick={() => track("maps")}
                className="hover:text-primary"
              >
                {ADDRESS}
              </a>
            </li>
            <li className="flex gap-3">
              <Clock className="size-5 shrink-0 text-primary" />
              <span>Segunda a sábado, das 9h às 19h</span>
            </li>
            <li className="flex gap-3">
              <Phone className="size-5 shrink-0 text-primary" />
              <a href={`tel:+${WHATSAPP}`} className="hover:text-primary">
                {WHATSAPP_LABEL}
              </a>
            </li>
          </ul>
        </div>
      </section>




      <footer className="border-t border-border/60">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-5 py-8 text-center text-sm text-muted-foreground sm:flex-row sm:justify-between sm:text-left">
          <Logo />
          <p>© {new Date().getFullYear()} Mania das Capas — Serra/ES</p>
        </div>
      </footer>

      {/* Botão flutuante WhatsApp */}
      <a
        href={`https://wa.me/${WHATSAPP}`}
        target="_blank"
        rel="noreferrer"
        onClick={() => track("whatsapp_float")}
        aria-label="Falar no WhatsApp"
        className="fixed right-5 bottom-5 z-40 inline-flex size-14 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-panel transition hover:scale-105"
      >
        <MessageCircle className="size-7" />
      </a>
    </div>
  );
}

function Logo({ className = "h-11" }: { className?: string }) {
  return (
    <img
      src={logoAsset.url}
      alt="Mania das Capas"
      className={`${className} w-auto rounded-md`}
    />
  );
}
