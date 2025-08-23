// Mock data for now until Supabase types are regenerated
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  status: 'draft' | 'published';
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  coverImageUrl?: string;
  authorId: string;
  author: {
    name: string;
    bio?: string;
    avatarUrl?: string;
  };
  tags: {
    name: string;
  }[];
}

export interface Author {
  id: string;
  name: string;
  bio?: string;
  avatarUrl?: string;
}

export interface Tag {
  id: string;
  name: string;
}

// Mock data
const mockAuthors: Author[] = [
  {
    id: '1',
    name: 'MBX Editorial',
    bio: 'The MBX editorial team brings decades of experience in medical billing and revenue cycle management.',
    avatarUrl: undefined
  },
  {
    id: '2',
    name: 'Ayesha Khan',
    bio: 'RCM Specialist with 8+ years of experience helping practices optimize their revenue cycle.',
    avatarUrl: undefined
  }
];

const mockTags: Tag[] = [
  { id: '1', name: 'Denials' },
  { id: '2', name: 'Clean Claims' },
  { id: '3', name: 'Revenue Cycle' },
  { id: '4', name: 'Credentialing' },
  { id: '5', name: 'Compliance' }
];

const mockPosts: BlogPost[] = [
  {
    id: '1',
    title: '5 Common Claim Denial Reasons—and How to Fix Them',
    slug: '5-common-claim-denial-reasons',
    excerpt: 'Learn about the top reasons claims get denied and proven strategies to prevent them from happening to your practice.',
    content: `
# 5 Common Claim Denial Reasons—and How to Fix Them

Claim denials can significantly impact your practice's revenue cycle. Understanding the most common reasons claims get denied—and how to prevent them—is crucial for maintaining a healthy cash flow.

## 1. Incorrect Patient Information

One of the most frequent causes of claim denials is incorrect patient information. This includes:
- Misspelled names
- Wrong date of birth
- Incorrect insurance ID numbers
- Outdated insurance information

**Solution:** Implement a verification process at registration and before each appointment.

## 2. Invalid or Missing Prior Authorization

Many procedures require prior authorization from the insurance company. Claims submitted without proper authorization are often denied.

**Solution:** Maintain a list of procedures that require prior authorization and implement a tracking system.

## 3. Coding Errors

Incorrect medical coding is another major cause of denials. This includes:
- Using outdated codes
- Mismatched diagnosis and procedure codes
- Missing or incomplete codes

**Solution:** Regular training for coding staff and implementing coding audits.

## 4. Missing Documentation

Claims may be denied due to insufficient or missing medical documentation to support the services provided.

**Solution:** Ensure complete and accurate documentation for all services rendered.

## 5. Timely Filing Issues

Each insurance company has specific time limits for claim submission. Claims submitted after these deadlines are automatically denied.

**Solution:** Implement a claim submission schedule and tracking system.

## Conclusion

By addressing these common denial reasons proactively, practices can significantly improve their clean claims rate and reduce the administrative burden of reworking denied claims.
    `,
    status: 'published',
    publishedAt: '2024-03-15T00:00:00Z',
    createdAt: '2024-03-15T00:00:00Z',
    updatedAt: '2024-03-15T00:00:00Z',
    coverImageUrl: undefined,
    authorId: '1',
    author: mockAuthors[0],
    tags: [{ name: 'Denials' }, { name: 'Clean Claims' }]
  },
  {
    id: '2',
    title: 'What a Clean Claims Rate Really Means for Your Practice',
    slug: 'clean-claims-rate-guide',
    excerpt: 'Understanding clean claims rates and why they\'re the most important KPI for your revenue cycle management.',
    content: `
# What a Clean Claims Rate Really Means for Your Practice

The clean claims rate is arguably the most important key performance indicator (KPI) for any medical practice. But what exactly does it mean, and why should you care?

## Definition of Clean Claims Rate

A clean claims rate is the percentage of claims that are processed and paid by insurance companies without the need for resubmission or follow-up. A "clean" claim contains accurate information and meets all payer requirements.

## Industry Benchmarks

- **Excellent:** 95% or higher
- **Good:** 85-94%
- **Needs Improvement:** Below 85%

## Why It Matters

### 1. Cash Flow Impact
Higher clean claims rates mean faster payments and improved cash flow for your practice.

### 2. Reduced Administrative Costs
Clean claims require less staff time for follow-up and resubmission.

### 3. Improved Patient Satisfaction
Accurate claims processing leads to fewer billing issues and happier patients.

## How to Calculate Your Clean Claims Rate

Clean Claims Rate = (Number of Clean Claims / Total Claims Submitted) × 100

## Strategies to Improve Your Rate

1. **Invest in Staff Training**
   - Regular coding updates
   - Insurance verification procedures
   - Documentation requirements

2. **Implement Technology Solutions**
   - Electronic health records (EHR)
   - Practice management systems
   - Automated eligibility verification

3. **Regular Audits**
   - Monthly claims analysis
   - Denial trend reporting
   - Performance monitoring

## Conclusion

Monitoring and improving your clean claims rate should be a top priority for any practice serious about optimizing their revenue cycle management.
    `,
    status: 'published',
    publishedAt: '2024-03-10T00:00:00Z',
    createdAt: '2024-03-10T00:00:00Z',
    updatedAt: '2024-03-10T00:00:00Z',
    coverImageUrl: undefined,
    authorId: '2',
    author: mockAuthors[1],
    tags: [{ name: 'Clean Claims' }, { name: 'Revenue Cycle' }]
  },
  {
    id: '3',
    title: 'Credentialing Checklist for New Providers',
    slug: 'credentialing-checklist',
    excerpt: 'A comprehensive guide to credentialing new providers and avoiding common pitfalls that delay payment.',
    content: `
# Credentialing Checklist for New Providers

Provider credentialing is a critical process that can make or break your practice's ability to receive timely payments. Here's a comprehensive checklist to ensure smooth credentialing for new providers.

## Before You Start

### Documentation Needed
- [ ] Medical license (current and valid)
- [ ] DEA certificate
- [ ] Board certification
- [ ] Malpractice insurance
- [ ] CV (updated within last 6 months)
- [ ] Work history (last 5 years)
- [ ] References from colleagues

## Application Process

### 1. CAQH Profile
- [ ] Create or update CAQH profile
- [ ] Upload all required documents
- [ ] Verify all information is accurate
- [ ] Set up automatic renewal reminders

### 2. Insurance Applications
- [ ] Submit applications to all relevant payers
- [ ] Track submission dates
- [ ] Follow up on pending applications
- [ ] Document all communications

### 3. Hospital Privileges
- [ ] Apply for hospital privileges if needed
- [ ] Coordinate with medical staff office
- [ ] Schedule peer review meetings

## Timeline Expectations

- **Commercial Insurance:** 60-120 days
- **Medicare:** 60-90 days
- **Medicaid:** 30-90 days
- **Hospital Privileges:** 90-180 days

## Common Pitfalls to Avoid

1. **Incomplete Applications**
   - Missing signatures
   - Outdated information
   - Missing documentation

2. **Poor Follow-up**
   - Not tracking application status
   - Missing deadlines
   - Inadequate communication

3. **Documentation Issues**
   - Expired licenses
   - Missing attestations
   - Inconsistent information

## Best Practices

### Start Early
Begin the credentialing process at least 6 months before the provider's start date.

### Use a Tracking System
Implement a system to track all applications and deadlines.

### Regular Updates
Keep CAQH and all provider information current.

### Professional Help
Consider hiring a credentialing specialist for complex cases.

## Conclusion

Proper credentialing is essential for your practice's financial health. By following this checklist and starting early, you can avoid costly delays and ensure your new providers can start seeing patients and generating revenue as soon as possible.
    `,
    status: 'published',
    publishedAt: '2024-03-05T00:00:00Z',
    createdAt: '2024-03-05T00:00:00Z',
    updatedAt: '2024-03-05T00:00:00Z',
    coverImageUrl: undefined,
    authorId: '2',
    author: mockAuthors[1],
    tags: [{ name: 'Credentialing' }]
  }
];

// Public API functions (using mock data for now)
export async function getPublishedPosts(page = 1, pageSize = 9, search = '', tags: string[] = []) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  let filteredPosts = mockPosts.filter(post => post.status === 'published');
  
  // Apply search filter
  if (search) {
    filteredPosts = filteredPosts.filter(post =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(search.toLowerCase()))
    );
  }
  
  // Apply tag filter
  if (tags.length > 0) {
    filteredPosts = filteredPosts.filter(post =>
      tags.some(tag => post.tags.some(postTag => postTag.name === tag))
    );
  }
  
  // Apply pagination
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex);
  
  return {
    posts: paginatedPosts,
    total: filteredPosts.length,
    totalPages: Math.ceil(filteredPosts.length / pageSize)
  };
}

export async function getPostBySlug(slug: string) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const post = mockPosts.find(p => p.slug === slug && p.status === 'published');
  if (!post) {
    throw new Error('Post not found');
  }
  
  return post;
}

export async function getAllAuthors() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockAuthors;
}

export async function getAllTags() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockTags;
}

// Admin API functions (using mock data for now)
export async function createPost(postData: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt' | 'author' | 'tags'>) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const newPost: BlogPost = {
    ...postData,
    id: String(mockPosts.length + 1),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    author: mockAuthors.find(a => a.id === postData.authorId) || mockAuthors[0],
    tags: []
  };
  
  mockPosts.unshift(newPost);
  return newPost;
}

export async function updatePost(id: string, postData: Partial<BlogPost>) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const index = mockPosts.findIndex(p => p.id === id);
  if (index === -1) throw new Error('Post not found');
  
  const updatedPost = {
    ...mockPosts[index],
    ...postData,
    updatedAt: new Date().toISOString(),
    author: mockAuthors.find(a => a.id === postData.authorId) || mockPosts[index].author
  };
  
  mockPosts[index] = updatedPost;
  return updatedPost;
}

export async function deletePost(id: string) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const index = mockPosts.findIndex(p => p.id === id);
  if (index === -1) throw new Error('Post not found');
  
  mockPosts.splice(index, 1);
}

export async function getAllPosts() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return mockPosts;
}

export async function createTag(name: string) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const newTag: Tag = {
    id: String(mockTags.length + 1),
    name
  };
  
  mockTags.push(newTag);
  return newTag;
}

export async function createAuthor(authorData: Omit<Author, 'id'>) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const newAuthor: Author = {
    ...authorData,
    id: String(mockAuthors.length + 1)
  };
  
  mockAuthors.push(newAuthor);
  return newAuthor;
}