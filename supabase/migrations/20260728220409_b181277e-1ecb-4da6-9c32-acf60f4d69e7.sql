CREATE TABLE public.site_events (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX site_events_type_created_idx ON public.site_events (event_type, created_at DESC);
GRANT INSERT ON public.site_events TO anon, authenticated;
GRANT ALL ON public.site_events TO service_role;
ALTER TABLE public.site_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can log an event" ON public.site_events FOR INSERT TO anon, authenticated WITH CHECK (event_type IN ('qrcode','review_button','whatsapp','whatsapp_float','instagram','facebook','wifi_copy','maps'));