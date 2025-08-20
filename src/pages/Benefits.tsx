import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  TrendingUp, 
  ShieldAlert, 
  BarChart3, 
  Shield, 
  Users, 
  CheckCircle,
  DollarSign,
  Clock,
  FileText,
  Award,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const benefits = [
  {
    icon: DollarSign,
    title: 'Financial Impact',
    description: 'Increase net collections and reduce write-offs with optimized billing processes.',
    details: [
      'Average 15-25% increase in collections',
      'Reduced denial rates by up to 40%',
      'Faster payment cycles (30-45 days average)',
      'Decreased write-offs and bad debt'
    ]
  },
  {
    icon: Clock,
    title: 'Operational Efficiency',
    description: 'Clear workflows that reduce administrative burden on your staff.',
    details: [
      'Eliminate billing staff overhead costs',
      'Reduce training and turnover expenses',
      'Free up time for patient care activities',
      'Streamlined prior authorization processes'
    ]
  },
  {
    icon: Shield,
    title: 'Compliance & Security',
    description: 'HIPAA-compliant processes and staff training keep you protected.',
    details: [
      'SOC 2 Type II certified operations',
      'Regular HIPAA compliance training',
      'Encrypted data transmission and storage',
      'Detailed audit trails and documentation'
    ]
  },
  {
    icon: BarChart3,
    title: 'Transparency',
    description: 'Real-time dashboards and monthly performance reviews.',
    details: [
      '24/7 access to billing dashboards',
      'Monthly performance reports',
      'Real-time claim status updates',
      'Detailed financial analytics'
    ]
  },
  {
    icon: Users,
    title: 'Specialty Expertise',
    description: 'Primary care, cardiology, ortho, dental, behavioral health, and more.',
    details: [
      'Certified coders for each specialty',
      'Up-to-date knowledge of payer requirements',
      'Specialty-specific denial management',
      'Custom workflows for unique procedures'
    ]
  },
  {
    icon: Award,
    title: 'Partnership',
    description: 'A dedicated account manager and SLA-backed support.',
    details: [
      'Dedicated account management team',
      'Regular strategy and performance reviews',
      'Priority support and quick response times',
      'Proactive communication about issues'
    ]
  }
];

const comparisonData = [
  {
    feature: 'Initial Setup Cost',
    inHouse: '$50,000 - $100,000+',
    mbx: 'No upfront costs'
  },
  {
    feature: 'Monthly Staff Costs',
    inHouse: '$15,000 - $30,000+',
    mbx: 'Percentage-based pricing'
  },
  {
    feature: 'Training & Certification',
    inHouse: 'Ongoing expense',
    mbx: 'Included in service'
  },
  {
    feature: 'Technology & Software',
    inHouse: '$5,000 - $15,000/month',
    mbx: 'Included in service'
  },
  {
    feature: 'Scalability',
    inHouse: 'Limited by staff size',
    mbx: 'Unlimited scaling'
  },
  {
    feature: 'Expertise Depth',
    inHouse: 'Limited specialization',
    mbx: 'Multi-specialty experts'
  },
  {
    feature: 'Performance Guarantee',
    inHouse: 'No guarantees',
    mbx: 'SLA-backed performance'
  }
];

export default function Benefits() {
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
              Why Practices Choose MBX
            </h1>
            <p className="mt-6 text-lg leading-8 text-secondary-foreground/90">
              Experience measurable improvements in revenue, efficiency, and compliance with our 
              comprehensive medical billing solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Detailed Benefits */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Comprehensive Benefits
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              See how MBX transforms every aspect of your revenue cycle management.
            </p>
          </div>
          
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="card-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent">
                      <benefit.icon className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{benefit.title}</CardTitle>
                      <CardDescription className="text-base mt-2">
                        {benefit.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {benefit.details.map((detail, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-24 sm:py-32 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              In-House vs MBX
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Compare the total cost and benefits of in-house billing versus partnering with MBX.
            </p>
          </div>
          
          <div className="mx-auto max-w-4xl">
            <div className="overflow-hidden rounded-xl border border-border bg-background shadow-card">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Feature
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      In-House Billing
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-primary">
                      MBX
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {comparisonData.map((row, index) => (
                    <tr key={index} className="hover:bg-muted/20">
                      <td className="px-6 py-4 text-sm font-medium text-foreground">
                        {row.feature}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {row.inHouse}
                      </td>
                      <td className="px-6 py-4 text-sm text-primary font-medium">
                        {row.mbx}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator Placeholder */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Calculate Your Potential Savings
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Most practices see a positive ROI within 90 days of partnering with MBX. 
              Let's calculate your potential savings and revenue improvements.
            </p>
            
            <div className="mt-10 rounded-xl border border-border bg-muted/30 p-8">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">$250K+</div>
                  <div className="text-sm text-muted-foreground">Average Annual Savings</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">90 Days</div>
                  <div className="text-sm text-muted-foreground">Time to Positive ROI</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">25%</div>
                  <div className="text-sm text-muted-foreground">Average Revenue Increase</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32 bg-gradient-hero">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-secondary-foreground sm:text-4xl">
              Ready to See These Benefits?
            </h2>
            <p className="mt-4 text-lg leading-8 text-secondary-foreground/90">
              Start with a free billing audit to see exactly how much MBX can improve your practice's performance.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button variant="default" size="xl" onClick={scrollToContact}>
                Get Your Free Audit
              </Button>
              <Button variant="outline-hero" size="xl" asChild>
                <Link to="/services">
                  View Services <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}