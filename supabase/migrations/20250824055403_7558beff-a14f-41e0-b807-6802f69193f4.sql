-- Create admin policies for all operations
CREATE POLICY "Admin full access to authors" ON public.authors
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.email = 'admin@mbx.com'
  )
);

CREATE POLICY "Admin full access to categories" ON public.categories
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.email = 'admin@mbx.com'
  )
);

CREATE POLICY "Admin full access to tags" ON public.tags
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.email = 'admin@mbx.com'
  )
);

CREATE POLICY "Admin full access to posts" ON public.posts
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.email = 'admin@mbx.com'
  )
);

CREATE POLICY "Admin full access to post_categories" ON public.post_categories
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.email = 'admin@mbx.com'
  )
);

CREATE POLICY "Admin full access to post_tags" ON public.post_tags
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.email = 'admin@mbx.com'
  )
);