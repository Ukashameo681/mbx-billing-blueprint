import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, User, Clock, Share2 } from 'lucide-react';
import { getPostBySlug, BlogPost } from '@/lib/blog-api';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      loadPost(slug);
    }
  }, [slug]);

  const loadPost = async (postSlug: string) => {
    try {
      setLoading(true);
      setError(null);
      const postData = await getPostBySlug(postSlug);
      setPost(postData);
    } catch (error) {
      setError('Post not found');
    } finally {
      setLoading(false);
    }
  };

  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 225;
    const wordCount = content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readingTime} min read`;
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="animate-pulse">
          <div className="h-4 bg-muted rounded w-32 mb-8"></div>
          <div className="h-8 bg-muted rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-muted rounded w-1/2 mb-8"></div>
          <div className="h-64 bg-muted rounded mb-8"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-4 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
        <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
        <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist.</p>
        <Button asChild>
          <Link to="/blog">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Back to Blog */}
      <Button variant="ghost" asChild className="mb-8">
        <Link to="/blog">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>
      </Button>

      {/* Article Header */}
      <header className="mb-8">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <Badge key={tag.name} variant="secondary">
              {tag.name}
            </Badge>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-foreground mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
            {post.excerpt}
          </p>
        )}

        {/* Meta Info */}
        <div className="flex items-center gap-6 text-sm text-muted-foreground border-b border-border pb-6">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>{post.author.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>
              {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{calculateReadingTime(post.content)}</span>
          </div>
          <Button variant="ghost" size="sm" className="ml-auto">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </header>

      {/* Cover Image */}
      {post.coverImageUrl && (
        <div className="mb-8">
          <img
            src={post.coverImageUrl}
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
          />
        </div>
      )}

      {/* Article Content */}
      <div className="prose prose-lg max-w-none">
        <div 
          className="text-foreground leading-relaxed"
          dangerouslySetInnerHTML={{ 
            __html: post.content.replace(/\n/g, '<br/>') 
          }}
        />
      </div>

      {/* Author Bio */}
      {post.author.bio && (
        <div className="mt-12 p-6 bg-muted/30 rounded-lg">
          <div className="flex items-start gap-4">
            {post.author.avatarUrl && (
              <img
                src={post.author.avatarUrl}
                alt={post.author.name}
                className="w-16 h-16 rounded-full object-cover"
              />
            )}
            <div>
              <h3 className="font-semibold text-lg mb-2">About {post.author.name}</h3>
              <p className="text-muted-foreground">{post.author.bio}</p>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="mt-12 p-8 bg-gradient-hero rounded-lg text-center">
        <h2 className="text-2xl font-bold text-secondary-foreground mb-4">
          Ready to Optimize Your Medical Billing?
        </h2>
        <p className="text-secondary-foreground/90 mb-6">
          Let MBX help you improve your clean claims rate and maximize revenue.
        </p>
        <Button variant="default" size="lg" asChild>
          <Link to="/contact">
            Get a Free Billing Audit
          </Link>
        </Button>
      </div>
    </article>
  );
}