import { supabase } from "@/integrations/supabase/client";

export type EventType =
  | "qrcode"
  | "review_button"
  | "whatsapp"
  | "whatsapp_float"
  | "instagram"
  | "facebook"
  | "wifi_copy"
  | "maps";

export function track(eventType: EventType) {
  void supabase
    .from("site_events")
    .insert({ event_type: eventType })
    .then(({ error }) => {
      if (error) console.warn("track failed", error.message);
    });
}
