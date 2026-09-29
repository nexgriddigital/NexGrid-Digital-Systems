export interface CMSArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  publishedDate: string;
  readTime: string;
  status: 'published' | 'draft';
  coverImage?: string;
  views?: number;
}

export interface ClientLead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectType: string;
  estimatedBudget: string;
  targetTimeline: string;
  notes: string;
  status: 'new' | 'contacted' | 'in_progress' | 'closed';
  dateReceived: string;
}

export interface CMSContent {
  heroBadge: string;
  heroHeadline: string;
  heroSubtitle: string;
  ctaButtonText: string;
  agencyEmail: string;
  agencyPhone: string;
  agencyLocation: string;
  workingHours: string;
  turnaroundTime: string;
  announcementActive: boolean;
  announcementText: string;
  articles: CMSArticle[];
}

const CMS_STORAGE_KEY = 'nexgrid_cms_content';
const LEADS_STORAGE_KEY = 'nexgrid_client_leads';

export const INITIAL_CMS_CONTENT: CMSContent = {
  heroBadge: 'Independent Web Engineering & Digital Studio',
  heroHeadline: 'We build fast, bespoke websites that grow your business.',
  heroSubtitle:
    'NexGrid is a modern web studio. We design and develop custom business websites, online stores, and web apps with guaranteed fixed quotes, zero tech jargon, and 100% full code ownership.',
  ctaButtonText: 'Calculate Your Estimate',
  agencyEmail: 'nexgriddigital@gmail.com',
  agencyPhone: '+251 906697634',
  agencyLocation: 'Addis Ababa, Ethiopia & Working Worldwide',
  workingHours: 'Monday – Friday, 8:30 AM – 5:30 PM EAT',
  turnaroundTime: 'We reply within 4 hours during business days',
  announcementActive: true,
  announcementText: '🚀 Spring 2026 Sprints: Now booking new client web builds with guaranteed launch timelines.',
  articles: [
    {
      id: 'art-1',
      title: '5 Ways Website Load Speed Directly Boosts Google Search Rankings',
      slug: 'website-speed-boosts-google-rankings',
      excerpt:
        'A comprehensive guide to Google Core Web Vitals and why modern businesses must prioritize sub-second performance over bloated templates.',
      content:
        'In 2026, website speed is no longer just a technical metric — it is the number one differentiator for customer retention and Google search visibility. Every 100ms delay drops conversion rates by up to 7%. Our headless approach eliminates unnecessary WordPress plugins and serves pre-rendered HTML across global edge CDNs.',
      author: 'NexGrid Engineering Team',
      category: 'SEO & Performance',
      publishedDate: '2026-03-24',
      readTime: '4 min read',
      status: 'published',
      coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      views: 1240,
    },
    {
      id: 'art-2',
      title: 'Ethiopian E-Commerce in 2026: Telebirr, Chapa & Local Payment Gateways',
      slug: 'ethiopian-ecommerce-telebirr-chapa-guide',
      excerpt:
        'How modern merchants in Addis Ababa and East Africa are capturing 2.4x more sales by adopting instant 1-tap mobile checkouts.',
      content:
        'Local payment integrations like Telebirr SuperApp and Chapa have completely altered the digital commerce landscape. Discover best practices for auto-reconciling transactions, instant SMS receipts, and reducing cart abandonment.',
      author: 'NexGrid Strategy',
      category: 'E-Commerce',
      publishedDate: '2026-03-18',
      readTime: '6 min read',
      status: 'published',
      coverImage: 'https://images.unsplash.com/photo-1556742049-0a67e5572293?auto=format&fit=crop&w=800&q=80',
      views: 980,
    },
    {
      id: 'art-3',
      title: 'Headless CMS vs Traditional WordPress: The Honest Breakdown',
      slug: 'headless-cms-vs-wordpress-breakdown',
      excerpt:
        'Why growing firms are moving away from plugin security vulnerabilities to tailored visual content editors with zero code headaches.',
      content:
        'WordPress powers millions of websites, but maintenance overhead, vulnerability patches, and sluggish admin dashboards frustrate marketing teams. Our custom CMS provides total freedom with zero maintenance liabilities.',
      author: 'NexGrid Product',
      category: 'CMS & Web Engineering',
      publishedDate: '2026-03-12',
      readTime: '5 min read',
      status: 'published',
      coverImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
      views: 812,
    },
  ],
};

const INITIAL_DEMO_LEADS: ClientLead[] = [
  {
    id: 'lead-01',
    name: 'Dawit Mengistu',
    email: 'dawit@apexconsulting.et',
    phone: '+251 91 234 5678',
    company: 'Apex Advisory Group',
    projectType: 'Business & Marketing Website',
    estimatedBudget: 'ETB 52,000',
    targetTimeline: '4 weeks',
    notes: 'Need a fast corporate website with Easy Content Editor (CMS) so our HR and partners can publish thought leadership articles without waiting for developers.',
    status: 'new',
    dateReceived: 'Today, 10:15 AM',
  },
  {
    id: 'lead-02',
    name: 'Sara Tadesse',
    email: 'sara@habeshacraft.com',
    phone: '+251 92 876 5432',
    company: 'Habesha Artisan & Textiles',
    projectType: 'E-Commerce & Online Store',
    estimatedBudget: 'ETB 85,000',
    targetTimeline: '5 weeks',
    notes: 'Looking to launch an export boutique with Telebirr & Stripe checkout, product variant inventory, and automatic shipping rates.',
    status: 'contacted',
    dateReceived: 'Yesterday, 3:40 PM',
  },
];

export function getCMSContent(): CMSContent {
  try {
    const raw = localStorage.getItem(CMS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...INITIAL_CMS_CONTENT, ...parsed };
    }
  } catch (e) {
    console.error('Failed reading CMS content from localStorage', e);
  }
  return INITIAL_CMS_CONTENT;
}

export function saveCMSContent(content: CMSContent): void {
  try {
    localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(content));
    window.dispatchEvent(new CustomEvent('nexgrid_cms_update', { detail: content }));
  } catch (e) {
    console.error('Failed saving CMS content to localStorage', e);
  }
}

export function resetCMSContent(): CMSContent {
  try {
    localStorage.removeItem(CMS_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('nexgrid_cms_update', { detail: INITIAL_CMS_CONTENT }));
  } catch (e) {
    console.error('Failed resetting CMS content', e);
  }
  return INITIAL_CMS_CONTENT;
}

export function getClientLeads(): ClientLead[] {
  try {
    const raw = localStorage.getItem(LEADS_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed reading client leads', e);
  }
  return INITIAL_DEMO_LEADS;
}

export function saveClientLead(lead: Omit<ClientLead, 'id' | 'dateReceived' | 'status'>): ClientLead {
  const current = getClientLeads();
  const newLead: ClientLead = {
    ...lead,
    id: `lead-${Date.now()}`,
    dateReceived: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', ' + new Date().toLocaleDateString(),
    status: 'new',
  };

  const updated = [newLead, ...current];
  try {
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('nexgrid_leads_update', { detail: updated }));
  } catch (e) {
    console.error('Failed persisting lead', e);
  }
  return newLead;
}

export function updateLeadStatus(id: string, status: ClientLead['status']): void {
  const current = getClientLeads();
  const updated = current.map((item) => (item.id === id ? { ...item, status } : item));
  try {
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('nexgrid_leads_update', { detail: updated }));
  } catch (e) {
    console.error('Failed updating lead status', e);
  }
}

export function deleteClientLead(id: string): void {
  const current = getClientLeads();
  const updated = current.filter((item) => item.id !== id);
  try {
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('nexgrid_leads_update', { detail: updated }));
  } catch (e) {
    console.error('Failed deleting lead', e);
  }
}
