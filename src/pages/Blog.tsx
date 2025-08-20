import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, ArrowRight, Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const blogPosts = [
  {
    id: 1,
    title: '5 Common Claim Denial Reasons—and How to Fix Them',
    excerpt: 'Learn about the top reasons claims get denied and proven strategies to prevent them from happening to your practice. This comprehensive guide covers the most frequent denial codes and actionable solutions.',
    author: 'Sarah Johnson',
    date: '2024-03-15',
    readTime: '8 min read',
    tags: ['Claims', 'Denials', 'Best Practices'],
    href: '/blog/5-common-claim-denial-reasons',
    featured: true
  },
  {
    id: 2,
    title: 'What a Clean Claims Rate Really Means for Your Practice',
    excerpt: 'Understanding clean claims rates and why they\'re the most important KPI for your revenue cycle management. Discover how to calculate, track, and improve this critical metric.',
    author: 'Mark Rodriguez',
    date: '2024-03-10',
    readTime: '6 min read',
    tags: ['KPIs', 'Clean Claims', 'Revenue Cycle'],
    href: '/blog/clean-claims-rate-guide',
    featured: true
  },
  {
    id: 3,
    title: 'Credentialing Checklist for New Providers',
    excerpt: 'A comprehensive guide to credentialing new providers and avoiding common pitfalls that delay payment. Everything you need to know about the credentialing process.',
    author: 'Lisa Chen',
    date: '2024-03-05',
    readTime: '10 min read',
    tags: ['Credentialing', 'Providers', 'Checklist'],
    href: '/blog/credentialing-checklist',
    featured: false
  },
  {
    id: 4,
    title: 'Understanding Prior Authorization: A Complete Guide',
    excerpt: 'Navigate the complex world of prior authorizations with confidence. Learn strategies to streamline the process and reduce delays in patient care.',
    author: 'David Thompson',
    date: '2024-02-28',
    readTime: '7 min read',
    tags: ['Prior Authorization', 'Patient Care', 'Workflow'],
    href: '/blog/prior-authorization-guide',
    featured: false
  },
  {
    id: 5,
    title: 'HIPAA Compliance in Medical Billing: What You Need to Know',
    excerpt: 'Stay compliant with HIPAA regulations while managing your revenue cycle. Essential requirements and best practices for protecting patient information.',
    author: 'Lisa Chen',
    date: '2024-02-20',
    readTime: '9 min read',
    tags: ['HIPAA', 'Compliance', 'Security'],
    href: '/blog/hipaa-compliance-billing',
    featured: false
  },
  {
    id: 6,
    title: 'Maximizing Collections: Strategies That Work',
    excerpt: 'Proven techniques to improve your collection rates and reduce aging receivables. Learn how top-performing practices optimize their collections process.',
    author: 'Mark Rodriguez',
    date: '2024-02-15',
    readTime: '8 min read',
    tags: ['Collections', 'A/R', 'Revenue Optimization'],
    href: '/blog/maximizing-collections',
    featured: false
  }
];

const allTags = ['Claims', 'Denials', 'Best Practices', 'KPIs', 'Clean Claims', 'Revenue Cycle', 'Credentialing', 'Providers', 'Checklist', 'Prior Authorization', 'Patient Care', 'Workflow', 'HIPAA', 'Compliance', 'Security', 'Collections', 'A/R', 'Revenue Optimization'];

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => post.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-24 sm:py-32 bg-gradient-hero">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-secondary-foreground sm:text-5xl">
              Medical Billing Insights
            </h1>
            <p className="mt-6 text-lg leading-8 text-secondary-foreground/90">
              Stay informed with the latest best practices, industry updates, and expert insights 
              from the medical billing professionals at MBX.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-12 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            {/* Search Bar */}
            <div className="relative mb-8">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* Tag Filters */}
            <div>
              <h3 className="text-sm font-medium text-foreground mb-3">Filter by topic:</h3>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <Button
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleTag(tag)}
                    className="text-xs"
                  >
                    {tag}
                  </Button>
                ))}
              </div>
              {selectedTags.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedTags([])}
                  className="mt-2 text-xs"
                >
                  Clear filters
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredPosts.length > 0 && (
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Featured Articles
              </h2>
            </div>
            
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-2">
              {featuredPosts.map((post) => (
                <Card key={post.id} className="card-shadow hover:shadow-lg transition-all duration-300 group">
                  <CardHeader>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      <Link to={post.href}>
                        {post.title}
                      </Link>
                    </CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                      <span>{post.readTime}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base mb-4 line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                    <Button variant="link" asChild className="group-hover:translate-x-1 transition-transform p-0">
                      <Link to={post.href}>
                        Read More <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Articles */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {featuredPosts.length > 0 ? 'More Articles' : 'Latest Articles'}
            </h2>
          </div>
          
          {regularPosts.length > 0 ? (
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {regularPosts.map((post) => (
                <Card key={post.id} className="card-shadow hover:shadow-lg transition-all duration-300 group">
                  <CardHeader>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      <Link to={post.href}>
                        {post.title}
                      </Link>
                    </CardTitle>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{post.author}</span>
                      <span>•</span>
                      <span>{new Date(post.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                    <Button variant="link" asChild className="group-hover:translate-x-1 transition-transform p-0 text-sm">
                      <Link to={post.href}>
                        Read More <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <p className="text-muted-foreground">No articles found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-24 sm:py-32 bg-gradient-hero">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-secondary-foreground sm:text-4xl">
              Never Miss an Insight
            </h2>
            <p className="mt-4 text-lg leading-8 text-secondary-foreground/90">
              Subscribe to our newsletter for the latest medical billing best practices delivered to your inbox.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button variant="default" size="xl">
                Subscribe to Newsletter
              </Button>
              <Button variant="outline-hero" size="xl" asChild>
                <Link to="/contact">
                  Contact Us <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}