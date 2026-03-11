CREATE TABLE website_leads (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL,
  consultant_name text,
  message text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE website_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public insert website_leads"
ON website_leads FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Admin read website_leads"
ON website_leads FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));