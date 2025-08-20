import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface FormData {
  name: string;
  practiceName: string;
  email: string;
  phone: string;
  specialty: string;
  monthlyClaimsVolume: string;
  message: string;
  agreeToPrivacy: boolean;
  honeypot: string; // Anti-spam field
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    practiceName: '',
    email: '',
    phone: '',
    specialty: '',
    monthlyClaimsVolume: '',
    message: '',
    agreeToPrivacy: false,
    honeypot: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitTime] = useState(Date.now());
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Anti-spam checks
    if (formData.honeypot || Date.now() - submitTime < 3000) {
      return; // Likely spam
    }

    if (!formData.agreeToPrivacy) {
      toast({
        title: "Privacy Policy Required",
        description: "Please agree to the Privacy Policy to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Success!",
        description: "Thank you for your inquiry. We'll reach out within one business day.",
      });
      
      // Reset form
      setFormData({
        name: '',
        practiceName: '',
        email: '',
        phone: '',
        specialty: '',
        monthlyClaimsVolume: '',
        message: '',
        agreeToPrivacy: false,
        honeypot: '',
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="card-shadow">
      <CardHeader>
        <CardTitle>Get Your Free Billing Audit</CardTitle>
        <CardDescription>
          Let's discuss how MBX can improve your practice's revenue cycle management.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Honeypot field - hidden from users */}
          <input
            type="text"
            name="honeypot"
            value={formData.honeypot}
            onChange={(e) => handleInputChange('honeypot', e.target.value)}
            style={{ display: 'none' }}
            tabIndex={-1}
            autoComplete="off"
          />
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="John Doe"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="practiceName">Practice Name</Label>
              <Input
                id="practiceName"
                type="text"
                value={formData.practiceName}
                onChange={(e) => handleInputChange('practiceName', e.target.value)}
                placeholder="ABC Medical Center"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="john@example.com"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="(555) 123-4567"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="specialty">Specialty</Label>
              <Select value={formData.specialty} onValueChange={(value) => handleInputChange('specialty', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select specialty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="primary-care">Primary Care</SelectItem>
                  <SelectItem value="cardiology">Cardiology</SelectItem>
                  <SelectItem value="orthopedics">Orthopedics</SelectItem>
                  <SelectItem value="dental">Dental</SelectItem>
                  <SelectItem value="behavioral-health">Behavioral Health</SelectItem>
                  <SelectItem value="dermatology">Dermatology</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="monthlyClaimsVolume">Monthly Claims Volume</Label>
              <Select value={formData.monthlyClaimsVolume} onValueChange={(value) => handleInputChange('monthlyClaimsVolume', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select volume" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-100">0-100 claims</SelectItem>
                  <SelectItem value="101-500">101-500 claims</SelectItem>
                  <SelectItem value="501-1000">501-1,000 claims</SelectItem>
                  <SelectItem value="1001-2500">1,001-2,500 claims</SelectItem>
                  <SelectItem value="2500+">2,500+ claims</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              required
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              placeholder="Tell us about your current billing challenges..."
              rows={4}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="privacy"
              checked={formData.agreeToPrivacy}
              onCheckedChange={(checked) => handleInputChange('agreeToPrivacy', checked as boolean)}
            />
            <Label htmlFor="privacy" className="text-sm">
              I agree to the{' '}
              <a href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </a>
              *
            </Label>
          </div>
          
          <Button 
            type="submit" 
            variant="hero" 
            size="lg" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Request Free Audit'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}