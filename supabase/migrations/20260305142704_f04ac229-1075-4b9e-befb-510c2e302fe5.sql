
-- 1. Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- 2. Create consultants table
CREATE TABLE public.consultants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  title text,
  image_url text,
  competences text[] DEFAULT '{}',
  industries text[] DEFAULT '{}',
  experience_years int DEFAULT 0,
  location text DEFAULT 'Oslo',
  description text,
  sort_order int DEFAULT 0,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 3. Create user_roles table
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

-- 4. Enable RLS
ALTER TABLE public.consultants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 5. has_role() security definer function
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- 6. RLS policies for consultants
CREATE POLICY "Public read consultants"
  ON public.consultants
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admin insert consultants"
  ON public.consultants
  FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin update consultants"
  ON public.consultants
  FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin delete consultants"
  ON public.consultants
  FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 7. RLS policies for user_roles (admin only)
CREATE POLICY "Admin manage roles"
  ON public.user_roles
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 8. Create public storage bucket for consultant images
INSERT INTO storage.buckets (id, name, public)
VALUES ('consultant-images', 'consultant-images', true);

-- 9. Storage RLS: anyone can read
CREATE POLICY "Public read consultant images"
  ON storage.objects
  FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'consultant-images');

-- 10. Storage RLS: admin can upload
CREATE POLICY "Admin upload consultant images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'consultant-images' AND public.has_role(auth.uid(), 'admin'));
