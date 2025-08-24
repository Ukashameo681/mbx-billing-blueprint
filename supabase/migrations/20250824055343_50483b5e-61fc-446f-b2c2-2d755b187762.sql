-- Create the blog tables first
CREATE TABLE public.authors (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  bio text,
  avatar_url text,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

CREATE TABLE public.categories (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL UNIQUE,
  description text,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

CREATE TABLE public.tags (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

CREATE TABLE public.posts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  excerpt text,
  content text NOT NULL,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_at timestamptz,
  cover_image_url text,
  author_id uuid REFERENCES public.authors(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

CREATE TABLE public.post_categories (
  post_id uuid REFERENCES public.posts(id) ON DELETE CASCADE,
  category_id uuid REFERENCES public.categories(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, category_id)
);

CREATE TABLE public.post_tags (
  post_id uuid REFERENCES public.posts(id) ON DELETE CASCADE,
  tag_id uuid REFERENCES public.tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_authors_updated_at BEFORE UPDATE ON public.authors FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_tags_updated_at BEFORE UPDATE ON public.tags FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON public.posts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Enable RLS
ALTER TABLE public.authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_tags ENABLE ROW LEVEL SECURITY;

-- Create public read policies for published content
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

-- Insert seed data
INSERT INTO public.authors (id, name, bio, avatar_url) VALUES
  ('00000000-0000-0000-0000-000000000001', 'MBX Editorial', 'The editorial team at Medical Billing Excellence, bringing you insights from industry experts.', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200'),
  ('00000000-0000-0000-0000-000000000002', 'Dr. Sarah Johnson', 'Healthcare billing specialist with over 15 years of experience in revenue cycle management.', 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=200'),
  ('00000000-0000-0000-0000-000000000003', 'Michael Chen', 'Certified medical billing expert and consultant for healthcare practices nationwide.', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200');

INSERT INTO public.categories (id, name, description) VALUES
  ('00000000-0000-0000-0000-000000000001', 'Revenue Cycle', 'Best practices for optimizing healthcare revenue cycles'),
  ('00000000-0000-0000-0000-000000000002', 'Credentialing', 'Provider credentialing and enrollment guidance'),
  ('00000000-0000-0000-0000-000000000003', 'Operations', 'Operational excellence in medical billing');

INSERT INTO public.tags (id, name) VALUES
  ('00000000-0000-0000-0000-000000000001', 'denials'),
  ('00000000-0000-0000-0000-000000000002', 'credentialing'),
  ('00000000-0000-0000-0000-000000000003', 'clean-claims'),
  ('00000000-0000-0000-0000-000000000004', 'a/r'),
  ('00000000-0000-0000-0000-000000000005', 'compliance');

INSERT INTO public.posts (id, title, slug, excerpt, content, status, published_at, cover_image_url, author_id) VALUES
  (
    '00000000-0000-0000-0000-000000000001',
    '5 Common Claim Denial Reasons—and How to Fix Them',
    '5-common-claim-denial-reasons-and-how-to-fix-them',
    'Learn about the most frequent causes of claim denials and proven strategies to prevent them from happening in your practice.',
    '# 5 Common Claim Denial Reasons—and How to Fix Them

Claim denials are one of the biggest challenges facing healthcare practices today. Understanding why claims get denied and how to prevent these denials is crucial for maintaining a healthy revenue cycle.

## 1. Incorrect Patient Information

The most common reason for claim denials is simple data entry errors. Double-check patient demographics before submission.

## 2. Missing or Invalid Authorization

Always verify prior authorization requirements before providing services.

## 3. Coding Errors

Ensure your coding team stays updated with the latest ICD-10 and CPT codes.

## 4. Timely Filing Limits

Submit claims within the payer-specific filing deadlines.

## 5. Duplicate Claims

Implement systems to prevent accidentally submitting the same claim twice.',
    'published',
    '2024-01-15 10:00:00+00',
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800',
    '00000000-0000-0000-0000-000000000002'
  ),
  (
    '00000000-0000-0000-0000-000000000002',
    'What a Clean Claims Rate Really Means for Your Practice',
    'what-a-clean-claims-rate-really-means-for-your-practice',
    'Discover why monitoring your clean claims rate is essential for financial health and how to improve it.',
    '# What a Clean Claims Rate Really Means for Your Practice

A clean claims rate is a critical metric that every healthcare practice should monitor closely. It represents the percentage of claims that are processed and paid on the first submission without requiring any corrections or additional information.

## Why Clean Claims Matter

- Faster payment cycles
- Reduced administrative costs
- Improved cash flow
- Better relationships with payers

## Industry Benchmarks

The industry standard for clean claims rates is typically 85-95%. If your practice falls below this range, there may be opportunities for improvement.

## Strategies to Improve Your Clean Claims Rate

1. Invest in staff training
2. Implement quality assurance processes
3. Use technology solutions
4. Regular audits and monitoring',
    'published',
    '2024-01-10 14:30:00+00',
    'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800',
    '00000000-0000-0000-0000-000000000001'
  ),
  (
    '00000000-0000-0000-0000-000000000003',
    'Credentialing Checklist for New Providers',
    'credentialing-checklist-for-new-providers',
    'A comprehensive guide to the provider credentialing process, including required documents and timeline expectations.',
    '# Credentialing Checklist for New Providers

Provider credentialing is a critical step for any new healthcare provider joining a practice. This comprehensive checklist will help ensure nothing is missed in the process.

## Required Documents

- [ ] Medical degree and transcripts
- [ ] State medical license
- [ ] DEA registration
- [ ] Professional liability insurance
- [ ] Hospital privileges
- [ ] Work history for the last 5 years
- [ ] References from colleagues

## Timeline Expectations

The credentialing process typically takes 90-120 days, but can vary by payer. Start the process as early as possible.

## Common Pitfalls to Avoid

1. Incomplete applications
2. Missing documentation
3. Failure to follow up
4. Not allowing enough time

Planning ahead and staying organized will help ensure a smooth credentialing process.',
    'published',
    '2024-01-05 09:15:00+00',
    'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800',
    '00000000-0000-0000-0000-000000000003'
  );

-- Link posts to categories and tags
INSERT INTO public.post_categories (post_id, category_id) VALUES
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
  ('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000003'),
  ('00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000002');

INSERT INTO public.post_tags (post_id, tag_id) VALUES
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000003'),
  ('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000003'),
  ('00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000002');