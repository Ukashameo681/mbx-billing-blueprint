import { ServiceCard } from '@/components/ServiceCard';
import { Button } from '@/components/ui/button';
import { 
  FileCheck, 
  ShieldAlert, 
  TrendingUp, 
  IdCard, 
  BadgeCheck, 
  Receipt,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    title: 'Claims Submission & Scrubbing',
    description: 'We validate codes, scrub claims, and submit electronically to minimize rejections and accelerate payment. Our comprehensive pre-submission review ensures clean claims that get paid faster.',
    icon: FileCheck,
    href: '/services/claims-submission'
  },
  {
    title: 'Denial Management & Appeals',
    description: 'Root-cause analysis, timely appeals, and payer-specific strategies to recover revenue. We turn denials into opportunities for improved cash flow.',
    icon: ShieldAlert,
    href: '/services/denial-management'
  },
  {
    title: 'A/R Follow-Up & Collections',
    description: 'Proactive follow-up, aging analysis, and compliance-aligned collections to keep cash flow healthy. Systematic approach to outstanding receivables.',
    icon: TrendingUp,
    href: '/services/ar-follow-up'
  },
  {
    title: 'Eligibility & Benefits Verification',
    description: 'Real-time checks to prevent avoidable denials and improve point-of-service clarity. Verify coverage before services are rendered.',
    icon: IdCard,
    href: '/services/eligibility-verification'
  },
  {
    title: 'Credentialing & Enrollment',
    description: 'Provider enrollment, revalidations, and CAQH updates to keep your practice in-network and paid. Complete credentialing lifecycle management.',
    icon: BadgeCheck,
    href: '/services/credentialing'
  },
  {
    title: 'Payment Posting & Reconciliation',
    description: 'Accurate ERA/EOB posting, adjustments, and daily reconciliation for audit-ready books. Maintain financial accuracy and transparency.',
    icon: Receipt,
    href: '/services/payment-posting'
  }
];

export default function Services() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/#contact';
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-24 sm:py-32 bg-gradient-hero">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-secondary-foreground sm:text-5xl">
              Complete Medical Billing Services
            </h1>
            <p className="mt-6 text-lg leading-8 text-secondary-foreground/90">
              From claims submission to payment posting, MBX provides comprehensive revenue cycle management 
              solutions tailored to your practice's unique needs.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              End-to-End Revenue Cycle Management
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Every service designed to maximize your revenue and minimize administrative burden.
            </p>
          </div>
          
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Service Process */}
      <section className="py-24 sm:py-32 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Our Service Delivery Process
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Proven methodology that delivers consistent results for practices of all sizes.
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-4xl">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Initial Assessment</h3>
                    <p className="text-muted-foreground">Complete analysis of your current billing processes and systems</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Custom Implementation</h3>
                    <p className="text-muted-foreground">Tailored setup aligned with your EHR and practice workflows</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Quality Assurance</h3>
                    <p className="text-muted-foreground">Multi-layer review process to ensure accuracy and compliance</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Ongoing Monitoring</h3>
                    <p className="text-muted-foreground">Continuous performance tracking and optimization</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                    5
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Regular Reporting</h3>
                    <p className="text-muted-foreground">Transparent dashboards and monthly performance reviews</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                    6
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Continuous Improvement</h3>
                    <p className="text-muted-foreground">Regular optimization based on performance data and industry changes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Ready to Optimize Your Revenue Cycle?
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Let's discuss which services would be most beneficial for your practice.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button variant="hero" size="xl" onClick={scrollToContact}>
                Request Free Audit
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link to="/benefits">
                  View Benefits <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}