import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  className?: string;
}

export function ServiceCard({ title, description, icon: Icon, href, className }: ServiceCardProps) {
  return (
    <Card className={`card-shadow hover:shadow-lg transition-all duration-300 group ${className}`}>
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent">
            <Icon className="h-6 w-6 text-accent-foreground" />
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base leading-relaxed mb-4">
          {description}
        </CardDescription>
        <Button variant="link" asChild className="group-hover:translate-x-1 transition-transform p-0">
          <Link to={href}>
            Learn More <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}