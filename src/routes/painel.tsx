import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getEventStats } from "@/lib/stats.functions";

export const Route = createFileRoute("/painel")({
  head: () => ({
    meta: [
      { title: "Painel de cliques — Mania das Capas" },
      {
        name: "description",
        content:
          "Painel interno com o número de cliques no QR Code de avaliação, WhatsApp, redes sociais e cópia da senha do Wi-Fi.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Painel de cliques — Mania das Capas" },
      {
        property: "og:description",
        content: "Acompanhe os cliques do site da Mania das Capas.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Painel,
});

const LABELS: Record<string, string> = {
  qrcode: "QR Code de avaliação",
  review_button: "Botão Avaliar no Google",
  whatsapp: "WhatsApp (botões)",
  whatsapp_float: "WhatsApp (botão flutuante)",
  instagram: "Instagram",
  facebook: "Facebook",
  wifi_copy: "Copiar senha do Wi-Fi",
  maps: "Como chegar (mapa)",
};

function Painel() {
  const fetchStats = useServerFn(getEventStats);
  const { data, isLoading, error } = useQuery({
    queryKey: ["event-stats"],
    queryFn: () => fetchStats(),
    refetchInterval: 60_000,
  });

  const rows = Object.keys(LABELS).map((key) => {
    const found = data?.find((d) => d.event_type === key);
    return {
      key,
      label: LABELS[key],
      total: found?.total ?? 0,
      last7: found?.last7 ?? 0,
      last30: found?.last30 ?? 0,
    };
  });

  return (
    <div className="mx-auto max-w-4xl px-5 py-14">
      <p className="eyebrow">Uso interno</p>
      <h1 className="mt-3 text-3xl font-bold sm:text-4xl">Painel de cliques</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Quantas vezes cada botão do site foi clicado. Atualiza sozinho a cada
        minuto.
      </p>

      {isLoading && (
        <p className="mt-8 text-sm text-muted-foreground">Carregando…</p>
      )}
      {error && (
        <p className="mt-8 text-sm text-destructive">
          Não foi possível carregar os números.
        </p>
      )}

      {!isLoading && !error && (
        <div className="panel mt-8 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs tracking-widest text-muted-foreground uppercase">
              <tr className="border-b border-border">
                <th className="px-5 py-4">Ação</th>
                <th className="px-5 py-4 text-right">7 dias</th>
                <th className="px-5 py-4 text-right">30 dias</th>
                <th className="px-5 py-4 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.key} className="border-b border-border/50 last:border-0">
                  <td className="px-5 py-4 font-medium">{r.label}</td>
                  <td className="px-5 py-4 text-right">{r.last7}</td>
                  <td className="px-5 py-4 text-right">{r.last30}</td>
                  <td className="px-5 py-4 text-right font-semibold text-primary">
                    {r.total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
