import { createServerFn } from "@tanstack/react-start";

export type EventStats = {
  event_type: string;
  total: number;
  last7: number;
  last30: number;
};

export const getEventStats = createServerFn({ method: "GET" }).handler(
  async (): Promise<EventStats[]> => {
    const { supabaseAdmin } = await import(
      "@/integrations/supabase/client.server"
    );
    const { data, error } = await supabaseAdmin
      .from("site_events")
      .select("event_type, created_at")
      .order("created_at", { ascending: false })
      .limit(50000);
    if (error) throw new Error(error.message);

    const now = Date.now();
    const map = new Map<string, EventStats>();
    for (const row of data ?? []) {
      const stat = map.get(row.event_type) ?? {
        event_type: row.event_type,
        total: 0,
        last7: 0,
        last30: 0,
      };
      const age = now - new Date(row.created_at).getTime();
      stat.total += 1;
      if (age <= 7 * 864e5) stat.last7 += 1;
      if (age <= 30 * 864e5) stat.last30 += 1;
      map.set(row.event_type, stat);
    }
    return [...map.values()].sort((a, b) => b.total - a.total);
  },
);
