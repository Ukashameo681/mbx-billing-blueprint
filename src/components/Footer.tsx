import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import mbxLogo from '@/assets/mbx-logo.png';

const services = [
  { name: 'Claims Submission & Scrubbing', href: '/services/claims-submission' },
  { name: 'Denial Management & Appeals', href: '/services/denial-management' },
  { name: 'A/R Follow-Up & Collections', href: '/services/ar-follow-up' },
  { name: 'Eligibility & Benefits Verification', href: '/services/eligibility-verification' },
  { name: 'Credentialing & Enrollment', href: '/services/credentialing' },
  { name: 'Payment Posting & Reconciliation', href: '/services/payment-posting' },
];

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Benefits', href: '/benefits' },
  { name: 'About Us', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Blog', href: '/blog' },
];

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const currentYear = new Date().getFullYear();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Success!",
      description: "You've been subscribed to our newsletter.",
    });
    
    setEmail('');
    setIsSubmitting(false);
  };

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-20 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="grid grid-cols-2 gap-8 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-secondary-foreground">Quick Links</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {quickLinks.map((item) => (
                    <li key={item.name}>
                      <Link 
                        to={item.href} 
                        className="text-sm leading-6 text-muted-foreground hover:text-secondary-foreground transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-secondary-foreground">Services</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {services.slice(0, 4).map((item) => (
                    <li key={item.name}>
                      <Link 
                        to={item.href} 
                        className="text-sm leading-6 text-muted-foreground hover:text-secondary-foreground transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-secondary-foreground">More Services</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {services.slice(4).map((item) => (
                    <li key={item.name}>
                      <Link 
                        to={item.href} 
                        className="text-sm leading-6 text-muted-foreground hover:text-secondary-foreground transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-secondary-foreground">Contact Info</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <a href="mailto:info@mbx.example" className="text-sm leading-6 text-muted-foreground hover:text-secondary-foreground transition-colors">
                      info@mbx.example
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <a href="tel:+15551234567" className="text-sm leading-6 text-muted-foreground hover:text-secondary-foreground transition-colors">
                      +1 (555) 123-4567
                    </a>
                  </li>
                  <li className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-0.5" />
                    <span className="text-sm leading-6 text-muted-foreground">
                      123 Healthcare Ave<br />
                      Suite 100, City, ST
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-10 xl:mt-0">
            <h3 className="text-sm font-semibold leading-6 text-secondary-foreground">Subscribe to our newsletter</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Stay updated with the latest medical billing insights and industry news.
            </p>
            <form className="mt-6 sm:flex sm:max-w-md" onSubmit={handleNewsletterSubmit}>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <Input
                type="email"
                name="email-address"
                id="email-address"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full min-w-0 appearance-none border-input bg-background px-3 py-1.5 text-base text-foreground placeholder:text-muted-foreground sm:w-64 sm:text-sm sm:leading-6 xl:w-full"
                placeholder="Enter your email"
              />
              <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
                <Button type="submit" variant="default" disabled={isSubmitting}>
                  {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                </Button>
              </div>
            </form>
          </div>
        </div>
        
        <div className="mt-16 border-t border-border pt-8 sm:mt-20 md:flex md:items-center md:justify-between lg:mt-24">
          <div className="flex items-center space-x-6 md:order-2">
            <a href="#" className="text-muted-foreground hover:text-secondary-foreground">
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="h-6 w-6" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-secondary-foreground">
              <span className="sr-only">Facebook</span>
              <Facebook className="h-6 w-6" />
            </a>
          </div>
          <div className="mt-8 md:order-1 md:mt-0">
            <div className="flex items-center space-x-6">
              <img className="h-8 w-auto" src={mbxLogo} alt="MBX" />
              <div className="text-xs leading-5 text-muted-foreground">
                <p>MBX delivers end-to-end medical billing and RCM services for clinics and specialty practices.</p>
                <p className="mt-2">
                  &copy; {currentYear} MBX. All rights reserved. |{' '}
                  <Link to="/privacy" className="hover:text-secondary-foreground">
                    Privacy Policy
                  </Link>
                  {' | '}
                  <Link to="/terms" className="hover:text-secondary-foreground">
                    Terms of Service
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}