import { ContactForm } from '@/components/ContactForm';
import { Mail, MapPin, Phone, Clock } from 'lucide-react';

export default function Contact() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-24 sm:py-32 bg-gradient-hero">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-secondary-foreground sm:text-5xl">
              Let's Improve Your Billing Outcomes
            </h1>
            <p className="mt-6 text-lg leading-8 text-secondary-foreground/90">
              Ready to transform your revenue cycle management? We're here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 lg:grid-cols-2">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground mb-8">
                Get in Touch
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground">Email</h3>
                    <a 
                      href="mailto:info@mbx.example"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      info@mbx.example
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground">Phone</h3>
                    <a 
                      href="tel:+15551234567"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      +1 (555) 123-4567
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground">Address</h3>
                    <div className="text-muted-foreground">
                      123 Healthcare Ave<br />
                      Suite 100<br />
                      City, ST 12345
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Clock className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground">Business Hours</h3>
                    <div className="text-muted-foreground">
                      Monday - Friday: 8:00 AM - 6:00 PM EST<br />
                      Saturday: 9:00 AM - 2:00 PM EST<br />
                      Sunday: Closed
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Map Placeholder */}
              <div className="mt-12">
                <div className="h-64 w-full rounded-xl bg-muted flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Interactive Map</p>
                    <p className="text-sm text-muted-foreground">123 Healthcare Ave, Suite 100</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-24 sm:py-32 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              What Happens Next?
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Here's what you can expect after reaching out to us.
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-4xl">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary text-primary-foreground text-xl font-bold mx-auto">
                  1
                </div>
                <h3 className="mt-6 text-lg font-semibold text-foreground">
                  Initial Consultation
                </h3>
                <p className="mt-4 text-muted-foreground">
                  We'll reach out within one business day to schedule a free consultation call.
                </p>
              </div>
              
              <div className="text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary text-primary-foreground text-xl font-bold mx-auto">
                  2
                </div>
                <h3 className="mt-6 text-lg font-semibold text-foreground">
                  Free Billing Audit
                </h3>
                <p className="mt-4 text-muted-foreground">
                  Our experts will analyze your current billing processes and identify opportunities.
                </p>
              </div>
              
              <div className="text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary text-primary-foreground text-xl font-bold mx-auto">
                  3
                </div>
                <h3 className="mt-6 text-lg font-semibold text-foreground">
                  Custom Proposal
                </h3>
                <p className="mt-4 text-muted-foreground">
                  Receive a tailored solution and pricing proposal based on your practice's needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}