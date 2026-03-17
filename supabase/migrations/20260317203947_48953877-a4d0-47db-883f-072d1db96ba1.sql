
INSERT INTO storage.buckets (id, name, public)
VALUES ('cvs', 'cvs', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Anyone can upload CVs"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'cvs');

CREATE POLICY "Anyone can read CVs"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (bucket_id = 'cvs');
