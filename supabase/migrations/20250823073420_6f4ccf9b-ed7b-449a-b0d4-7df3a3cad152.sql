-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE post_status AS ENUM ('draft', 'scheduled', 'published', 'archived');
CREATE TYPE author_role AS ENUM ('admin', 'editor', 'author');
CREATE TYPE audit_entity AS ENUM ('post', 'author', 'tag', 'category', 'media', 'auth');
CREATE TYPE audit_action AS ENUM ('create', 'update', 'delete', 'publish', 'login', 'logout');

-- Create authors table (user profiles for blog system)
CREATE TABLE public.authors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    bio TEXT,
    avatar_url TEXT,
    role author_role NOT NULL DEFAULT 'author',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create categories table
CREATE TABLE public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tags table
CREATE TABLE public.tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create posts table
CREATE TABLE public.posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT CHECK (char_length(excerpt) BETWEEN 160 AND 200),
    content TEXT NOT NULL,
    status post_status NOT NULL DEFAULT 'draft',
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    cover_image_url TEXT,
    cover_image_alt TEXT,
    reading_minutes INTEGER DEFAULT 0,
    seo_title TEXT,
    seo_description TEXT,
    canonical_url TEXT,
    og_image_url TEXT,
    featured BOOLEAN DEFAULT FALSE,
    allow_comments BOOLEAN DEFAULT FALSE,
    author_id UUID NOT NULL REFERENCES public.authors(id) ON DELETE CASCADE
);

-- Create post_categories junction table
CREATE TABLE public.post_categories (
    post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
    category_id UUID REFERENCES public.categories(id) ON DELETE CASCADE,
    PRIMARY KEY (post_id, category_id)
);

-- Create post_tags junction table
CREATE TABLE public.post_tags (
    post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES public.tags(id) ON DELETE CASCADE,
    PRIMARY KEY (post_id, tag_id)
);

-- Create revisions table for versioning
CREATE TABLE public.post_revisions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
    version INTEGER NOT NULL,
    snapshot JSONB NOT NULL,
    edited_by UUID NOT NULL REFERENCES public.authors(id),
    edited_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(post_id, version)
);

-- Create media table
CREATE TABLE public.media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    url TEXT NOT NULL,
    alt TEXT,
    width INTEGER,
    height INTEGER,
    mime_type TEXT NOT NULL,
    file_size INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    uploaded_by UUID REFERENCES public.authors(id)
);

-- Create audit_logs table
CREATE TABLE public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entity audit_entity NOT NULL,
    entity_id UUID,
    action audit_action NOT NULL,
    by_user_id UUID REFERENCES auth.users(id),
    payload JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for performance
CREATE INDEX idx_posts_status ON public.posts(status);
CREATE INDEX idx_posts_published_at ON public.posts(published_at);
CREATE INDEX idx_posts_slug ON public.posts(slug);
CREATE INDEX idx_posts_author_id ON public.posts(author_id);
CREATE INDEX idx_authors_slug ON public.authors(slug);
CREATE INDEX idx_authors_user_id ON public.authors(user_id);
CREATE INDEX idx_categories_slug ON public.categories(slug);
CREATE INDEX idx_tags_slug ON public.tags(slug);
CREATE INDEX idx_audit_logs_entity ON public.audit_logs(entity, entity_id);
CREATE INDEX idx_audit_logs_created_at ON public.audit_logs(created_at);

-- Add full-text search indexes
CREATE INDEX idx_posts_fts ON public.posts USING gin(to_tsvector('english', title || ' ' || coalesce(content, '')));

-- Enable Row Level Security
ALTER TABLE public.authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_revisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Authors policies
CREATE POLICY "Authors are viewable by everyone" ON public.authors
    FOR SELECT USING (true);

CREATE POLICY "Authors can update their own profile" ON public.authors
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Only admins can create authors" ON public.authors
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.authors 
            WHERE user_id = auth.uid() AND role = 'admin'
        )
    );

-- Categories policies (public read, admin/editor write)
CREATE POLICY "Categories are viewable by everyone" ON public.categories
    FOR SELECT USING (true);

CREATE POLICY "Admins and editors can manage categories" ON public.categories
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.authors 
            WHERE user_id = auth.uid() AND role IN ('admin', 'editor')
        )
    );

-- Tags policies (public read, admin/editor write)
CREATE POLICY "Tags are viewable by everyone" ON public.tags
    FOR SELECT USING (true);

CREATE POLICY "Admins and editors can manage tags" ON public.tags
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.authors 
            WHERE user_id = auth.uid() AND role IN ('admin', 'editor')
        )
    );

-- Posts policies
CREATE POLICY "Published posts are viewable by everyone" ON public.posts
    FOR SELECT USING (status = 'published' OR 
        EXISTS (
            SELECT 1 FROM public.authors 
            WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Authors can create posts" ON public.posts
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.authors 
            WHERE user_id = auth.uid() AND id = author_id
        )
    );

CREATE POLICY "Authors can update their own posts, admins and editors can update any" ON public.posts
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.authors a
            WHERE a.user_id = auth.uid() AND (
                a.id = posts.author_id OR 
                a.role IN ('admin', 'editor')
            )
        )
    );

CREATE POLICY "Only admins can delete posts" ON public.posts
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.authors 
            WHERE user_id = auth.uid() AND role = 'admin'
        )
    );

-- Junction table policies
CREATE POLICY "Post categories are viewable by everyone" ON public.post_categories
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage post categories" ON public.post_categories
    FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Post tags are viewable by everyone" ON public.post_tags
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage post tags" ON public.post_tags
    FOR ALL USING (auth.uid() IS NOT NULL);

-- Revisions policies
CREATE POLICY "Authors can view revisions of their posts, admins can view all" ON public.post_revisions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.authors a
            JOIN public.posts p ON p.id = post_revisions.post_id
            WHERE a.user_id = auth.uid() AND (
                a.id = p.author_id OR 
                a.role = 'admin'
            )
        )
    );

CREATE POLICY "Authenticated users can create revisions" ON public.post_revisions
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Media policies
CREATE POLICY "Media are viewable by everyone" ON public.media
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can upload media" ON public.media
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update their own media, admins can update any" ON public.media
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.authors a
            WHERE a.user_id = auth.uid() AND (
                a.id = media.uploaded_by OR 
                a.role = 'admin'
            )
        )
    );

-- Audit logs policies
CREATE POLICY "Only admins can view audit logs" ON public.audit_logs
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.authors 
            WHERE user_id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "System can create audit logs" ON public.audit_logs
    FOR INSERT WITH CHECK (true);

-- Create function to auto-increment revision version
CREATE OR REPLACE FUNCTION public.get_next_revision_version(p_post_id UUID)
RETURNS INTEGER AS $$
BEGIN
    RETURN COALESCE(
        (SELECT MAX(version) + 1 FROM public.post_revisions WHERE post_id = p_post_id),
        1
    );
END;
$$ LANGUAGE plpgsql;

-- Create function to calculate reading time
CREATE OR REPLACE FUNCTION public.calculate_reading_time(content TEXT)
RETURNS INTEGER AS $$
BEGIN
    -- Average reading speed: 225 words per minute
    RETURN CEIL(
        array_length(string_to_array(trim(regexp_replace(content, '<[^>]*>', '', 'g')), ' '), 1) / 225.0
    );
END;
$$ LANGUAGE plpgsql;

-- Create function to generate unique slug
CREATE OR REPLACE FUNCTION public.generate_unique_slug(base_slug TEXT, table_name TEXT, current_id UUID DEFAULT NULL)
RETURNS TEXT AS $$
DECLARE
    final_slug TEXT := base_slug;
    counter INTEGER := 1;
    exists_check BOOLEAN;
BEGIN
    LOOP
        -- Check if slug exists (excluding current record if updating)
        EXECUTE format('SELECT EXISTS(SELECT 1 FROM %I WHERE slug = $1 AND ($2 IS NULL OR id != $2))', table_name)
        INTO exists_check
        USING final_slug, current_id;
        
        IF NOT exists_check THEN
            EXIT;
        END IF;
        
        counter := counter + 1;
        final_slug := base_slug || '-' || counter;
    END LOOP;
    
    RETURN final_slug;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_authors_updated_at
    BEFORE UPDATE ON public.authors
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_categories_updated_at
    BEFORE UPDATE ON public.categories
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_tags_updated_at
    BEFORE UPDATE ON public.tags
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_posts_updated_at
    BEFORE UPDATE ON public.posts
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger to auto-calculate reading time
CREATE OR REPLACE FUNCTION public.auto_calculate_reading_time()
RETURNS TRIGGER AS $$
BEGIN
    NEW.reading_minutes = public.calculate_reading_time(NEW.content);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER auto_calculate_posts_reading_time
    BEFORE INSERT OR UPDATE ON public.posts
    FOR EACH ROW
    EXECUTE FUNCTION public.auto_calculate_reading_time();

-- Insert seed data
INSERT INTO public.authors (user_id, name, slug, bio, role) VALUES 
    (NULL, 'MBX Editorial', 'mbx-editorial', 'The editorial team at Medical Billing Excellence, bringing you the latest insights in healthcare revenue cycle management.', 'admin'),
    (NULL, 'Ayesha Khan', 'ayesha-khan', 'RCM Specialist with over 8 years of experience in medical billing, credentialing, and revenue cycle optimization.', 'author');

INSERT INTO public.categories (name, slug, description) VALUES 
    ('Revenue Cycle', 'revenue-cycle', 'Posts about revenue cycle management, billing processes, and financial optimization.'),
    ('Credentialing', 'credentialing', 'Provider credentialing, enrollment, and compliance topics.'),
    ('Operations', 'operations', 'Practice management, operational efficiency, and business optimization.');

INSERT INTO public.tags (name, slug, description) VALUES 
    ('Denials', 'denials', 'Claim denial management and prevention strategies.'),
    ('Credentialing', 'credentialing', 'Provider credentialing and enrollment processes.'),
    ('Clean Claims', 'clean-claims', 'Best practices for submitting clean, error-free claims.'),
    ('A/R', 'ar', 'Accounts receivable management and optimization.'),
    ('Compliance', 'compliance', 'Healthcare compliance and regulatory requirements.');

-- Get author IDs for posts
INSERT INTO public.posts (title, slug, excerpt, content, status, published_at, author_id, featured, cover_image_url, cover_image_alt)
SELECT 
    '5 Common Claim Denial Reasons—and How to Fix Them',
    '5-common-claim-denial-reasons-and-how-to-fix-them',
    'Learn the top 5 reasons claims get denied and proven strategies to prevent them, improving your clean claims rate and accelerating your revenue cycle.',
    '# 5 Common Claim Denial Reasons—and How to Fix Them

Claim denials are one of the biggest obstacles to maintaining a healthy revenue cycle. Understanding why claims get denied and how to prevent these issues can significantly improve your practice''s financial performance.

## 1. Incorrect Patient Demographics

**The Problem:** Mismatched patient information such as name, date of birth, or insurance ID numbers.

**The Solution:**
- Verify patient information at every visit
- Implement real-time eligibility verification
- Train staff on proper data entry procedures

## 2. Missing or Invalid Authorization

**The Problem:** Services requiring prior authorization were performed without proper approval.

**The Solution:**
- Maintain an authorization tracking system
- Verify requirements before scheduling procedures
- Follow up on pending authorizations regularly

## 3. Coding Errors

**The Problem:** Incorrect or outdated procedure codes, diagnosis codes, or modifier usage.

**The Solution:**
- Regular coding training for staff
- Use coding audit tools
- Stay updated with annual code changes

## 4. Timely Filing Limits

**The Problem:** Claims submitted after the payer''s deadline for filing.

**The Solution:**
- Track claim submission deadlines by payer
- Implement automated filing reminders
- Submit claims within 24-48 hours of service

## 5. Duplicate Claims

**The Problem:** Submitting the same claim multiple times.

**The Solution:**
- Maintain accurate claim tracking systems
- Train staff on proper resubmission procedures
- Use claim status inquiry tools before resubmitting

## Conclusion

By addressing these common denial reasons proactively, practices can improve their clean claims rate from the industry average of 85% to over 95%, resulting in faster payments and reduced administrative costs.',
    'published',
    NOW() - INTERVAL '7 days',
    (SELECT id FROM public.authors WHERE slug = 'ayesha-khan'),
    true,
    '/api/placeholder/800/400',
    'Medical billing professional reviewing claim forms'
WHERE EXISTS (SELECT 1 FROM public.authors WHERE slug = 'ayesha-khan');

INSERT INTO public.posts (title, slug, excerpt, content, status, published_at, author_id, cover_image_url, cover_image_alt)
SELECT 
    'What a Clean Claims Rate Really Means for Your Practice',
    'what-a-clean-claims-rate-really-means-for-your-practice',
    'Discover why your clean claims rate is the most important KPI for practice profitability and learn strategies to achieve industry-leading performance.',
    '# What a Clean Claims Rate Really Means for Your Practice

Your clean claims rate is arguably the most important key performance indicator (KPI) for measuring the efficiency of your revenue cycle management. But what exactly does it mean, and why should it be a top priority?

## Understanding Clean Claims Rate

A clean claim is one that:
- Contains no errors or omissions
- Passes all payer edits
- Gets paid on first submission
- Requires no additional information

The clean claims rate is calculated as: (Number of claims paid on first submission / Total claims submitted) × 100

## Industry Benchmarks

- **Excellent:** 95% or higher
- **Good:** 90-95%
- **Average:** 85-90%
- **Poor:** Below 85%

## Financial Impact

Consider a practice that submits 1,000 claims monthly with an average value of $200 per claim:

### At 85% Clean Claims Rate:
- 150 claims require rework
- Additional processing time: 30 hours/month
- Delayed revenue: $30,000
- Administrative costs: $1,200

### At 95% Clean Claims Rate:
- Only 50 claims require rework
- Processing time: 10 hours/month
- Delayed revenue: $10,000
- Administrative costs: $400

**Monthly savings:** $20,800 in faster revenue + $800 in reduced costs = $21,600

## Strategies to Improve Clean Claims Rate

### 1. Real-time Eligibility Verification
Verify patient insurance coverage and benefits before each visit.

### 2. Accurate Patient Registration
Implement double-verification processes for patient demographics.

### 3. Coding Excellence
Ensure proper ICD-10, CPT, and HCPCS coding with regular training.

### 4. Claims Scrubbing Technology
Use automated tools to identify and fix errors before submission.

### 5. Regular Performance Monitoring
Track clean claims rate by provider, service type, and payer.

## Conclusion

Improving your clean claims rate from 85% to 95% can increase monthly cash flow by over $20,000 for a typical practice. Focus on prevention rather than correction to achieve sustainable improvements.',
    'published',
    NOW() - INTERVAL '3 days',
    (SELECT id FROM public.authors WHERE slug = 'mbx-editorial'),
    '/api/placeholder/800/400',
    'Dashboard showing clean claims rate analytics'
WHERE EXISTS (SELECT 1 FROM public.authors WHERE slug = 'mbx-editorial');

INSERT INTO public.posts (title, slug, excerpt, content, status, published_at, author_id, cover_image_url, cover_image_alt)
SELECT 
    'Credentialing Checklist for New Providers',
    'credentialing-checklist-for-new-providers',
    'Complete step-by-step checklist for credentialing new providers efficiently, avoiding common delays that can cost your practice thousands in lost revenue.',
    '# Credentialing Checklist for New Providers

Provider credentialing is a critical process that can take 90-120 days to complete. Proper preparation and organization can help avoid delays that cost practices an average of $9,000 per month in lost revenue per provider.

## Pre-Application Preparation (Days 1-14)

### Personal Information
- [ ] Completed application form
- [ ] Current CV/resume
- [ ] Professional headshot photo
- [ ] Copy of driver''s license
- [ ] Social Security card copy
- [ ] Passport (if applicable)

### Education & Training
- [ ] Medical school diploma
- [ ] Residency completion certificate
- [ ] Fellowship certificates (if applicable)
- [ ] Continuing education certificates
- [ ] Board certification documents

### Licensing & Certifications
- [ ] Current state medical license
- [ ] DEA registration certificate
- [ ] NPI number documentation
- [ ] State controlled substance license
- [ ] Any specialty certifications

## Professional History (Days 15-21)

### Work History
- [ ] Complete employment history (last 5-10 years)
- [ ] Contact information for previous employers
- [ ] Explanation letters for any gaps in employment
- [ ] Hospital affiliations and privileges

### References
- [ ] 3-5 professional references
- [ ] Contact information for each reference
- [ ] Notification to references about potential contact

## Insurance & Legal (Days 22-28)

### Malpractice Insurance
- [ ] Current malpractice insurance policy
- [ ] Historical coverage documentation
- [ ] Claims history (if any)
- [ ] Tail coverage documentation

### Legal Documentation
- [ ] Malpractice case history
- [ ] Any disciplinary actions
- [ ] Medicare/Medicaid sanctions check
- [ ] OIG exclusion list verification

## Application Submission (Days 29-35)

### Quality Check
- [ ] Review all documents for completeness
- [ ] Verify all dates and information
- [ ] Ensure signatures are current
- [ ] Make copies of entire application package

### Submission Process
- [ ] Submit to primary insurance plans
- [ ] Track submission dates
- [ ] Obtain confirmation receipts
- [ ] Set up follow-up schedule

## Follow-up & Monitoring (Days 36-120)

### Regular Check-ins
- [ ] Weekly status calls to payers
- [ ] Document all communications
- [ ] Address any additional requirements immediately
- [ ] Escalate delays after 90 days

### Final Steps
- [ ] Obtain effective dates
- [ ] Update practice management system
- [ ] Notify billing department
- [ ] Begin revenue capture

## Common Delays and How to Avoid Them

### 1. Incomplete Applications (40% of delays)
**Solution:** Use our comprehensive checklist above

### 2. Outdated Documents (25% of delays)
**Solution:** Ensure all documents are less than 90 days old

### 3. Reference Delays (20% of delays)
**Solution:** Notify references in advance and provide contact forms

### 4. Primary Source Verification Issues (15% of delays)
**Solution:** Maintain direct relationships with credential verification organizations

## Pro Tips for Faster Credentialing

1. **Start Early:** Begin the process 4-6 months before the provider''s start date
2. **Use CAQH:** Maintain an updated CAQH profile for faster processing
3. **Batch Applications:** Submit to multiple payers simultaneously
4. **Maintain Templates:** Keep standardized document packages ready
5. **Track Everything:** Use spreadsheets or software to monitor progress

## Conclusion

Proper credentialing preparation can reduce the typical 120-day process to 90 days or less. This 30-day improvement translates to $9,000 in additional revenue per provider. Investment in a systematic credentialing process pays for itself many times over.',
    'published',
    NOW() - INTERVAL '1 day',
    (SELECT id FROM public.authors WHERE slug = 'ayesha-khan'),
    '/api/placeholder/800/400',
    'Healthcare professional reviewing credentialing documents'
WHERE EXISTS (SELECT 1 FROM public.authors WHERE slug = 'ayesha-khan');

-- Link posts to tags and categories
INSERT INTO public.post_tags (post_id, tag_id)
SELECT p.id, t.id 
FROM public.posts p, public.tags t
WHERE (p.slug = '5-common-claim-denial-reasons-and-how-to-fix-them' AND t.slug IN ('denials', 'clean-claims'))
   OR (p.slug = 'what-a-clean-claims-rate-really-means-for-your-practice' AND t.slug = 'clean-claims')
   OR (p.slug = 'credentialing-checklist-for-new-providers' AND t.slug = 'credentialing');

INSERT INTO public.post_categories (post_id, category_id)
SELECT p.id, c.id 
FROM public.posts p, public.categories c
WHERE (p.slug = '5-common-claim-denial-reasons-and-how-to-fix-them' AND c.slug = 'revenue-cycle')
   OR (p.slug = 'what-a-clean-claims-rate-really-means-for-your-practice' AND c.slug = 'operations')
   OR (p.slug = 'credentialing-checklist-for-new-providers' AND c.slug = 'credentialing');