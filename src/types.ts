export type ThemeMode = 'dark' | 'light';

export interface ServiceCapability {
  id: string;
  number: string;
  title: string;
  headline: string;
  description: string;
  deliverables: string[];
  techStack: string[];
  typicalTimeline: string;
  idealFor: string;
  impactMetric: string;
}

export interface EstimatorState {
  projectType: 'marketing' | 'ecommerce' | 'webapp' | 'redesign';
  pageScope: 'starter' | 'medium' | 'enterprise';
  addons: {
    cms: boolean;
    authPortal: boolean;
    advancedSeo: boolean;
    apiIntegrations: boolean;
    expressDelivery: boolean;
    slaSupport: boolean;
  };
}

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  projectType: string;
  estimatedBudget: string;
  targetTimeline: string;
  projectScopeNotes: string;
}

export interface ProjectWork {
  id: string;
  title: string;
  category: 'all' | 'marketing' | 'ecommerce' | 'webapp' | 'redesign';
  categoryLabel: string;
  subtitle: string;
  headline: string;
  description: string;
  highlightBadge?: string;
  featuredQuote?: string;
  metrics: { label: string; value: string }[];
  deliverables: string[];
  techStack: string[];
  isCMSShowcase?: boolean;
}
