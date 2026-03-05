
CREATE TABLE public.knowledge_base (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  active boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.knowledge_base ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read knowledge_base" ON public.knowledge_base
  FOR SELECT USING (true);

CREATE POLICY "Admin insert knowledge_base" ON public.knowledge_base
  FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin update knowledge_base" ON public.knowledge_base
  FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin delete knowledge_base" ON public.knowledge_base
  FOR DELETE USING (public.has_role(auth.uid(), 'admin'));
