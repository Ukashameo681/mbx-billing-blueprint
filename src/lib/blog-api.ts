import { supabase } from '@/integrations/supabase/client';

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

export interface Category {
  id: string;
  name: string;
  description?: string;
}

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
  author: Author;
  tags: Tag[];
  categories: Category[];
}

// Supabase API functions
export async function getAllPosts(searchTerm?: string, published?: boolean): Promise<BlogPost[]> {
  let query = supabase
    .from('posts')
    .select(`
      *,
      author:authors(*),
      post_tags(tags(*)),
      post_categories(categories(*))
    `)
    .order('published_at', { ascending: false, nullsFirst: false })
    .order('created_at', { ascending: false });

  if (published) {
    query = query.eq('status', 'published');
  }

  if (searchTerm) {
    query = query.or(`title.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%,excerpt.ilike.%${searchTerm}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }

  return data?.map(post => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    status: post.status as 'draft' | 'published',
    publishedAt: post.published_at,
    createdAt: post.created_at,
    updatedAt: post.updated_at,
    coverImageUrl: post.cover_image_url,
    authorId: post.author_id,
    author: {
      id: post.author.id,
      name: post.author.name,
      bio: post.author.bio,
      avatarUrl: post.author.avatar_url
    },
    tags: post.post_tags?.map((pt: any) => pt.tags) || [],
    categories: post.post_categories?.map((pc: any) => pc.categories) || []
  })) || [];
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      author:authors(*),
      post_tags(tags(*)),
      post_categories(categories(*))
    `)
    .eq('slug', slug)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null; // Post not found
    }
    console.error('Error fetching post:', error);
    throw error;
  }

  return {
    id: data.id,
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt,
    content: data.content,
    status: data.status as 'draft' | 'published',
    publishedAt: data.published_at,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    coverImageUrl: data.cover_image_url,
    authorId: data.author_id,
    author: {
      id: data.author.id,
      name: data.author.name,
      bio: data.author.bio,
      avatarUrl: data.author.avatar_url
    },
    tags: data.post_tags?.map((pt: any) => pt.tags) || [],
    categories: data.post_categories?.map((pc: any) => pc.categories) || []
  };
}

// Public API functions 
export async function getPublishedPosts(page = 1, pageSize = 9, search = '', tags: string[] = []) {
  const posts = await getAllPosts(search, true);
  
  let filteredPosts = posts;
  
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

export async function getAllAuthors(): Promise<Author[]> {
  const { data, error } = await supabase
    .from('authors')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching authors:', error);
    throw error;
  }

  return data?.map(author => ({
    id: author.id,
    name: author.name,
    bio: author.bio,
    avatarUrl: author.avatar_url
  })) || [];
}

export async function getAllTags(): Promise<Tag[]> {
  const { data, error } = await supabase
    .from('tags')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching tags:', error);
    throw error;
  }

  return data || [];
}

export async function getAllCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }

  return data || [];
}

export async function createPost(postData: any): Promise<BlogPost> {
  // Generate slug if not provided
  const slug = postData.slug || postData.title?.toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim();

  const { data, error } = await supabase
    .from('posts')
    .insert({
      title: postData.title,
      slug,
      excerpt: postData.excerpt,
      content: postData.content,
      status: postData.status || 'draft',
      published_at: postData.status === 'published' ? new Date().toISOString() : null,
      cover_image_url: postData.coverImageUrl,
      author_id: postData.authorId
    })
    .select(`
      *,
      author:authors(*)
    `)
    .single();

  if (error) {
    console.error('Error creating post:', error);
    throw error;
  }

  return {
    id: data.id,
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt,
    content: data.content,
    status: data.status as 'draft' | 'published',
    publishedAt: data.published_at,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    coverImageUrl: data.cover_image_url,
    authorId: data.author_id,
    author: {
      id: data.author.id,
      name: data.author.name,
      bio: data.author.bio,
      avatarUrl: data.author.avatar_url
    },
    tags: [],
    categories: []
  };
}

export async function updatePost(id: string, postData: any): Promise<BlogPost> {
  const updateData: any = {
    title: postData.title,
    slug: postData.slug,
    excerpt: postData.excerpt,
    content: postData.content,
    status: postData.status,
    cover_image_url: postData.coverImageUrl,
    author_id: postData.authorId
  };

  // Set published_at if status is being changed to published
  if (postData.status === 'published') {
    updateData.published_at = postData.publishedAt || new Date().toISOString();
  }

  const { data, error } = await supabase
    .from('posts')
    .update(updateData)
    .eq('id', id)
    .select(`
      *,
      author:authors(*),
      post_tags(tags(*)),
      post_categories(categories(*))
    `)
    .single();

  if (error) {
    console.error('Error updating post:', error);
    throw error;
  }

  return {
    id: data.id,
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt,
    content: data.content,
    status: data.status as 'draft' | 'published',
    publishedAt: data.published_at,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    coverImageUrl: data.cover_image_url,
    authorId: data.author_id,
    author: {
      id: data.author.id,
      name: data.author.name,
      bio: data.author.bio,
      avatarUrl: data.author.avatar_url
    },
    tags: data.post_tags?.map((pt: any) => pt.tags) || [],
    categories: data.post_categories?.map((pc: any) => pc.categories) || []
  };
}

export async function deletePost(id: string): Promise<void> {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
}

export async function createTag(tagData: { name: string }): Promise<Tag> {
  const { data, error } = await supabase
    .from('tags')
    .insert({ name: tagData.name })
    .select()
    .single();

  if (error) {
    console.error('Error creating tag:', error);
    throw error;
  }

  return data;
}