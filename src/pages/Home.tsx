import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { ServiceCard } from '@/components/ServiceCard';
import { ContactForm } from '@/components/ContactForm';
import { 
  FileCheck, 
  ShieldAlert, 
  TrendingUp, 
  IdCard, 
  BadgeCheck, 
  Receipt,
  CheckCircle,
  Clock,
  BarChart3,
  Shield,
  Users,
  ArrowRight,
  Star
} from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-image.jpg';
import billingOffice from '@/assets/billing-office.jpg';
import billingProcess from '@/assets/billing-process.jpg';

const services = [
  {
    title: 'Claims Submission & Scrubbing',
    description: 'We validate codes, scrub claims, and submit electronically to minimize rejections and accelerate payment.',
    icon: FileCheck,
    href: '/services/claims-submission'
  },
  {
    title: 'Denial Management & Appeals',
    description: 'Root-cause analysis, timely appeals, and payer-specific strategies to recover revenue.',
    icon: ShieldAlert,
    href: '/services/denial-management'
  },
  {
    title: 'A/R Follow-Up & Collections',
    description: 'Proactive follow-up, aging analysis, and compliance-aligned collections to keep cash flow healthy.',
    icon: TrendingUp,
    href: '/services/ar-follow-up'
  },
  {
    title: 'Eligibility & Benefits Verification',
    description: 'Real-time checks to prevent avoidable denials and improve point-of-service clarity.',
    icon: IdCard,
    href: '/services/eligibility-verification'
  },
  {
    title: 'Credentialing & Enrollment',
    description: 'Provider enrollment, revalidations, and CAQH updates to keep your practice in-network and paid.',
    icon: BadgeCheck,
    href: '/services/credentialing'
  },
  {
    title: 'Payment Posting & Reconciliation',
    description: 'Accurate ERA/EOB posting, adjustments, and daily reconciliation for audit-ready books.',
    icon: Receipt,
    href: '/services/payment-posting'
  }
];

const benefits = [
  {
    icon: TrendingUp,
    title: 'Faster Reimbursements',
    description: 'Streamlined processes that get you paid quicker'
  },
  {
    icon: ShieldAlert,
    title: 'Fewer Denials',
    description: 'Proactive scrubbing reduces claim rejections'
  },
  {
    icon: BarChart3,
    title: 'Transparent Reporting',
    description: 'Real-time dashboards and detailed analytics'
  },
  {
    icon: Users,
    title: 'Specialty-Aware Expertise',
    description: 'Billing specialists trained in your field'
  },
  {
    icon: Shield,
    title: 'Compliance & Security',
    description: 'HIPAA-compliant processes and data protection'
  },
  {
    icon: CheckCircle,
    title: 'Scalable as You Grow',
    description: 'Solutions that adapt to your practice size'
  }
];

const faqs = [
  {
    question: 'How do you integrate with my EHR/PM?',
    answer: 'We work with all major EHR and practice management systems including Epic, Cerner, athenahealth, eClinicalWorks, and many others. Our integration process is seamless and typically takes 2-3 weeks to complete.'
  },
  {
    question: 'Do you serve my specialty?',
    answer: 'Yes! We have experience with primary care, cardiology, orthopedics, dental, behavioral health, dermatology, and many other specialties. Our team includes certified coders and billing specialists trained in specialty-specific requirements.'
  },
  {
    question: 'What\'s your pricing model?',
    answer: 'We offer transparent, percentage-based pricing that aligns our success with yours. Pricing varies based on practice size, specialty, and services required. Contact us for a custom quote based on your specific needs.'
  },
  {
    question: 'How soon can we start?',
    answer: 'Implementation typically takes 4-6 weeks depending on your current system setup and data migration requirements. We provide dedicated onboarding support to ensure a smooth transition with minimal disruption to your operations.'
  },
  {
    question: 'How do you ensure HIPAA compliance?',
    answer: 'All our staff undergo regular HIPAA training, we maintain SOC 2 Type II certification, use encrypted data transmission, and follow strict access controls. We provide detailed compliance documentation and regular security audits.'
  }
];

const blogPosts = [
  {
    title: '5 Common Claim Denial Reasons—and How to Fix Them',
    excerpt: 'Learn about the top reasons claims get denied and proven strategies to prevent them from happening to your practice.',
    date: '2024-03-15',
    tags: ['Claims', 'Denials', 'Best Practices'],
    href: '/blog/5-common-claim-denial-reasons'
  },
  {
    title: 'What a Clean Claims Rate Really Means for Your Practice',
    excerpt: 'Understanding clean claims rates and why they\'re the most important KPI for your revenue cycle management.',
    date: '2024-03-10',
    tags: ['KPIs', 'Clean Claims', 'Revenue Cycle'],
    href: '/blog/clean-claims-rate-guide'
  },
  {
    title: 'Credentialing Checklist for New Providers',
    excerpt: 'A comprehensive guide to credentialing new providers and avoiding common pitfalls that delay payment.',
    date: '2024-03-05',
    tags: ['Credentialing', 'Providers', 'Checklist'],
    href: '/blog/credentialing-checklist'
  }
];

export default function Home() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden bg-gradient-hero pt-14">
        <div className="absolute inset-0">
          <img
            className="h-full w-full object-cover opacity-20"
            src={heroImage}
            alt="Medical billing professionals"
          />
          <div className="absolute inset-0 bg-gradient-hero/90" />
        </div>
        
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-secondary-foreground sm:text-6xl animate-fade-up">
              Medical Billing, Done Right.
            </h1>
            <p className="mt-6 text-lg leading-8 text-secondary-foreground/90 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              MBX helps healthcare practices maximize reimbursements and minimize denials with end-to-end, 
              HIPAA-compliant revenue cycle management.
            </p>
            
            <div className="mt-10 flex items-center justify-center gap-x-6 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <Button variant="default" size="xl" onClick={scrollToContact}>
                Get a Free Billing Audit
              </Button>
              <Button variant="outline-hero" size="xl" asChild>
                <Link to="/services">
                  Explore Services <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-secondary-foreground/80 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <Badge variant="secondary" className="bg-secondary-foreground/10 text-secondary-foreground">
                HIPAA Compliant
              </Badge>
              <Badge variant="secondary" className="bg-secondary-foreground/10 text-secondary-foreground">
                ICD-10 & CPT Expertise
              </Badge>
              <Badge variant="secondary" className="bg-secondary-foreground/10 text-secondary-foreground">
                98%+ Clean Claims Rate*
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Client Logos / Social Proof */}
      <section className="py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-lg font-semibold leading-8 text-muted-foreground">
              Trusted by healthcare practices nationwide
            </h2>
          </div>
          <div className="mx-auto mt-10 grid max-w-5xl grid-cols-2 items-center gap-x-8 gap-y-10 sm:grid-cols-4 sm:gap-x-10 lg:grid-cols-5">
            {/* Placeholder logos - would be replaced with actual client logos */}
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="col-span-1 flex justify-center">
                <div className="h-12 w-32 bg-muted rounded flex items-center justify-center text-muted-foreground text-sm">
                  Client Logo {i}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Complete Revenue Cycle Management
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              From claims submission to payment posting, we handle every aspect of your medical billing.
            </p>
          </div>
          
          <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 sm:py-32 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Get started with MBX in three simple steps.
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-6xl">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="relative">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary text-primary-foreground text-xl font-bold">
                  1
                </div>
                <h3 className="mt-6 text-xl font-semibold text-foreground">
                  Free Billing Audit
                </h3>
                <p className="mt-4 text-muted-foreground">
                  We review your current RCM and spot revenue leaks.
                </p>
              </div>
              
              <div className="relative">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary text-primary-foreground text-xl font-bold">
                  2
                </div>
                <h3 className="mt-6 text-xl font-semibold text-foreground">
                  Tailored Onboarding
                </h3>
                <p className="mt-4 text-muted-foreground">
                  Clean data handoff, payer setup, and workflows aligned to your EHR.
                </p>
              </div>
              
              <div className="relative">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary text-primary-foreground text-xl font-bold">
                  3
                </div>
                <h3 className="mt-6 text-xl font-semibold text-foreground">
                  Ongoing Optimization
                </h3>
                <p className="mt-4 text-muted-foreground">
                  Transparent reporting and continuous denial reduction.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-16 flex justify-center">
            <img
              className="rounded-xl shadow-xl"
              src={billingProcess}
              alt="Medical billing process workflow"
            />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Why Practices Choose MBX
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Experience the difference with our comprehensive medical billing solutions.
            </p>
          </div>
          
          <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="card-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent">
                      <benefit.icon className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {benefit.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Metrics */}
      <section className="py-24 sm:py-32 bg-gradient-hero">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-secondary-foreground sm:text-4xl">
              Proven Results
            </h2>
            <p className="mt-4 text-lg leading-8 text-secondary-foreground/90">
              Our track record speaks for itself.
            </p>
          </div>
          
          <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="text-4xl font-bold text-secondary-foreground sm:text-5xl">
                98%+
              </div>
              <div className="mt-2 text-lg text-secondary-foreground/80">
                Clean Claims Rate
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-secondary-foreground sm:text-5xl">
                30–45
              </div>
              <div className="mt-2 text-lg text-secondary-foreground/80">
                Average Days in A/R
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-secondary-foreground sm:text-5xl">
                15–25%
              </div>
              <div className="mt-2 text-lg text-secondary-foreground/80">
                Denial Reduction in 90 Days
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Blog/Insights */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Latest Insights
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Stay informed with the latest medical billing best practices and industry updates.
            </p>
          </div>
          
          <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <Card key={post.title} className="card-shadow hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <CardTitle className="text-lg">
                    <Link to={post.href} className="hover:text-primary transition-colors">
                      {post.title}
                    </Link>
                  </CardTitle>
                  <div className="text-sm text-muted-foreground">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-4">
                    {post.excerpt}
                  </CardDescription>
                  <Button variant="link" asChild className="p-0">
                    <Link to={post.href}>
                      Read More <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Button variant="outline" size="lg" asChild>
              <Link to="/blog">
                View All Articles <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 sm:py-32 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Get answers to the most common questions about our medical billing services.
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-4xl">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Ready to Optimize Your Revenue?
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Let's discuss how MBX can improve your practice's billing outcomes.
            </p>
          </div>
          
          <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-16 lg:grid-cols-2">
            <div>
              <ContactForm />
            </div>
            
            <div className="lg:pl-8">
              <img
                className="rounded-xl shadow-xl"
                src={billingOffice}
                alt="MBX medical billing team"
              />
              
              <div className="mt-8 space-y-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground">Free Consultation</h3>
                    <p className="text-muted-foreground">No obligation assessment of your current billing performance</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Clock className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground">Quick Response</h3>
                    <p className="text-muted-foreground">We'll reach out within one business day</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Shield className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground">HIPAA Compliant</h3>
                    <p className="text-muted-foreground">Your data is protected with enterprise-grade security</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}