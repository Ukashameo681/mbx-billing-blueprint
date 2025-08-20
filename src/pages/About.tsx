import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Shield, Users, Award, Heart, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

const values = [
  {
    icon: Shield,
    title: 'Compliance',
    description: 'We prioritize HIPAA compliance and data security in everything we do.'
  },
  {
    icon: CheckCircle,
    title: 'Accuracy',
    description: 'Precision in coding, billing, and reporting is fundamental to our service.'
  },
  {
    icon: Heart,
    title: 'Empathy',
    description: 'We understand the challenges healthcare providers face every day.'
  },
  {
    icon: Target,
    title: 'Accountability',
    description: 'We take ownership of your revenue cycle performance and results.'
  },
  {
    icon: Award,
    title: 'Learning',
    description: 'Continuous education keeps us ahead of industry changes and regulations.'
  }
];

const team = [
  {
    name: 'Sarah Johnson',
    role: 'CEO & Founder',
    bio: 'Former healthcare administrator with 15+ years of revenue cycle management experience.',
    image: '/placeholder-team-1.jpg'
  },
  {
    name: 'Mark Rodriguez',
    role: 'VP of Operations',
    bio: 'Certified Professional Coder (CPC) with expertise in multi-specialty billing.',
    image: '/placeholder-team-2.jpg'
  },
  {
    name: 'Lisa Chen',
    role: 'Director of Compliance',
    bio: 'HIPAA compliance specialist ensuring data security and regulatory adherence.',
    image: '/placeholder-team-3.jpg'
  },
  {
    name: 'David Thompson',
    role: 'Client Success Manager',
    bio: 'Dedicated to ensuring client satisfaction and optimal billing performance.',
    image: '/placeholder-team-4.jpg'
  }
];

export default function About() {
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
              About MBX
            </h1>
            <p className="mt-6 text-lg leading-8 text-secondary-foreground/90">
              Simplifying revenue cycle management so healthcare providers can focus on what matters most—patient care.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Story */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Our Mission
              </h2>
              <p className="mt-6 text-xl leading-8 text-muted-foreground">
                To simplify revenue cycle management so providers can focus on patient care.
              </p>
            </div>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-8 text-muted-foreground mb-6">
                Founded in 2018, MBX emerged from a simple observation: healthcare providers were spending too much time 
                on administrative tasks and not enough time with patients. Our founders, having worked in healthcare 
                administration for decades, saw firsthand how complex billing processes were draining resources from 
                patient care.
              </p>
              
              <p className="text-lg leading-8 text-muted-foreground mb-6">
                Today, MBX serves practices across the country, from single-provider clinics to large multi-specialty 
                groups. Our team combines deep healthcare expertise with cutting-edge technology to deliver transparent, 
                reliable revenue cycle management services.
              </p>
              
              <p className="text-lg leading-8 text-muted-foreground">
                We believe that by handling the complexities of medical billing, we free healthcare providers to do 
                what they do best—heal and care for their patients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 sm:py-32 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Our Values
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              The principles that guide every interaction and decision we make.
            </p>
          </div>
          
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {values.slice(0, 3).map((value) => (
              <Card key={value.title} className="card-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent">
                      <value.icon className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <CardTitle className="text-lg">{value.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-2">
            {values.slice(3).map((value) => (
              <Card key={value.title} className="card-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent">
                      <value.icon className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <CardTitle className="text-lg">{value.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Meet Our Team
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Experienced professionals dedicated to your practice's success.
            </p>
          </div>
          
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <Card key={member.name} className="card-shadow text-center">
                <CardHeader>
                  <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                    <Users className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <Badge variant="secondary">{member.role}</Badge>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    {member.bio}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Statement */}
      <section className="py-24 sm:py-32 bg-gradient-hero">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-secondary-foreground sm:text-4xl">
              Compliance & Security
            </h2>
            <p className="mt-6 text-lg leading-8 text-secondary-foreground/90">
              Your data security and regulatory compliance are our top priorities.
            </p>
            
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div>
                <Shield className="h-12 w-12 text-secondary-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-secondary-foreground">HIPAA Compliant</h3>
                <p className="mt-2 text-secondary-foreground/80">
                  All staff trained and processes certified for HIPAA compliance
                </p>
              </div>
              
              <div>
                <CheckCircle className="h-12 w-12 text-secondary-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-secondary-foreground">SOC 2 Type II</h3>
                <p className="mt-2 text-secondary-foreground/80">
                  Independently audited security controls and procedures
                </p>
              </div>
              
              <div>
                <Award className="h-12 w-12 text-secondary-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-secondary-foreground">Industry Certified</h3>
                <p className="mt-2 text-secondary-foreground/80">
                  Team holds relevant certifications including CPC, CCS, and CHPS
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Meet Your Account Manager
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Ready to learn more about how MBX can help your practice? Let's start with a conversation.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button variant="hero" size="xl" onClick={scrollToContact}>
                Schedule a Call
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link to="/services">
                  View Our Services
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}