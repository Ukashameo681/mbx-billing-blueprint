-- Enable RLS
ALTER TABLE IF EXISTS public.authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.post_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.post_tags ENABLE ROW LEVEL SECURITY;

-- Create admin policies (allow authenticated users with admin role)
CREATE POLICY "Admin full access to authors" ON public.authors
FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admin full access to categories" ON public.categories
FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admin full access to tags" ON public.tags
FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admin full access to posts" ON public.posts
FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admin full access to post_categories" ON public.post_categories
FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admin full access to post_tags" ON public.post_tags
FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Public read access for published content
CREATE POLICY "Public read published posts" ON public.posts
FOR SELECT USING (status = 'published');

CREATE POLICY "Public read authors" ON public.authors
FOR SELECT USING (true);

CREATE POLICY "Public read categories" ON public.categories
FOR SELECT USING (true);

CREATE POLICY "Public read tags" ON public.tags
FOR SELECT USING (true);

CREATE POLICY "Public read post_categories" ON public.post_categories
FOR SELECT USING (true);

CREATE POLICY "Public read post_tags" ON public.post_tags
FOR SELECT USING (true);

-- Create admin user with role
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role
) VALUES (
  gen_random_uuid(),
  'admin@mbx.com',
  crypt('Admin123!', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider": "email", "providers": ["email"]}',
  '{"role": "admin"}',
  false,
  'authenticated'
) ON CONFLICT (email) DO NOTHING;