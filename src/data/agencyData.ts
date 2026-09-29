import { ServiceCapability, ProjectWork } from '../types';

export const agencyContactInfo = {
  companyName: 'NexGrid Digital Solutions',
  legalName: 'NexGrid Digital Solutions LLC',
  email: 'nexgriddigital@gmail.com',
  phone: '+251 91 123 4567',
  location: 'Addis Ababa, Ethiopia & Working Worldwide',
  workingHours: 'Monday – Friday, 8:30 AM – 5:30 PM EAT',
  turnaroundTime: 'We reply within 4 hours during business days',
  consultationLeadTime: 'Sprints begin within 7 to 10 days of kickoff',
};

export const capabilityServices: ServiceCapability[] = [
  {
    id: 'business-websites',
    number: '01',
    title: 'Business & Marketing Websites',
    headline: 'Fast, beautiful websites that establish credibility and turn visitors into clients.',
    description: 'Bespoke marketing websites designed specifically for your industry. Fast loading, effortless mobile navigation, and clear call-to-actions that drive inquiries.',
    deliverables: [
      'Tailored custom design matching your brand identity',
      'Mobile-first layout optimized for phones and tablets',
      'Lightning-fast page load speeds under 1 second',
      'Clear lead capture forms and call-to-action buttons',
      'Search engine optimization (SEO) so customers find you on Google',
      'Simple content editor so your team can edit text and images anytime',
    ],
    techStack: ['React', 'Tailwind CSS', 'Vercel / Cloudflare', 'Sanity CMS'],
    typicalTimeline: '3 to 4 weeks',
    idealFor: 'Professional services, consultancies, healthcare, legal, finance, and local businesses.',
    impactMetric: 'Sub-second load times & Google SEO ready',
  },
  {
    id: 'ecommerce-stores',
    number: '02',
    title: 'E-Commerce & Online Stores',
    headline: 'Smooth shopping experiences built to maximize orders and repeat buyers.',
    description: 'Fast, frictionless online storefronts with instant catalog browsing, simple mobile checkout, and secure payment processing via Stripe, Apple Pay, and PayPal.',
    deliverables: [
      'Clean product pages with high-resolution imagery and variants',
      'Frictionless slide-out cart drawer and one-click checkout',
      'Integrated payment gateways (Telebirr, Chapa, CBE Birr, Cards, Stripe)',
      'Automated email notifications for orders and abandoned carts',
      'Inventory management and shipping rate automation',
      'Mobile-optimized shopping flow tested across iOS and Android',
    ],
    techStack: ['Shopify Plus', 'React', 'Stripe', 'Tailwind CSS'],
    typicalTimeline: '4 to 6 weeks',
    idealFor: 'Direct-to-consumer brands, boutique retailers, and wholesale distributors.',
    impactMetric: '1-tap mobile checkout & local payment integrations',
  },
  {
    id: 'client-portals',
    number: '03',
    title: 'Client Portals & Custom Web Apps',
    headline: 'Custom dashboards and web tools that eliminate manual work and delight clients.',
    description: 'Purpose-built web applications and customer portals that streamline onboarding, file sharing, appointments, and operations into one clean interface.',
    deliverables: [
      'Secure user login with personalized client dashboards',
      'Document uploads, invoice history, and automated PDF downloads',
      'Self-serve scheduling, booking, or request management',
      'Syncs with your existing email, CRM, and accounting software',
      'Mobile-friendly administrative panel for your staff',
      'Rock-solid data security with encrypted databases',
    ],
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    typicalTimeline: '5 to 7 weeks',
    idealFor: 'Growing companies ready to replace messy spreadsheets with automated web systems.',
    impactMetric: 'Automate manual paperwork & self-serve workflows',
  },
  {
    id: 'website-redesigns',
    number: '04',
    title: 'Website Redesigns & Speed Upgrades',
    headline: 'Modernize an outdated, slow website without losing your Google rankings.',
    description: 'We take your existing clunky, slow WordPress or template site and completely rebuild it into a fast, modern asset while protecting all your hard-earned SEO traffic.',
    deliverables: [
      'Fresh, contemporary visual makeover aligned with modern design',
      'Speed optimization cutting load times from 5+ seconds to under 0.8s',
      '100% SEO preservation with proper page redirects and Google Console setup',
      'Elimination of vulnerable, outdated plugins and security risks',
      'Zero downtime during transition to your new website',
      'Comprehensive before-and-after performance report',
    ],
    techStack: ['React', 'Next.js', 'Tailwind CSS', 'Google Search Console'],
    typicalTimeline: '2 to 3 weeks',
    idealFor: 'Businesses whose current website looks dated, loads slowly, or fails on mobile devices.',
    impactMetric: 'Sub-0.8s load times with 100% SEO preservation',
  },
];

export const clientSteps = [
  {
    number: '01',
    title: 'Free Discovery & Fixed Quote',
    timing: '1 to 2 Days',
    description: 'We discuss your business goals, your audience, and what you need. Within 24 hours, you receive a clear, itemized proposal with a fixed price and an exact launch date. No hidden fees or surprises.',
  },
  {
    number: '02',
    title: 'Custom Design & Weekly Updates',
    timing: '2 to 4 Weeks',
    description: 'We design and build your custom website. You receive regular interactive staging previews and short video updates, so you always see progress and can provide feedback before launch.',
  },
  {
    number: '03',
    title: 'Launch, Training & 100% Ownership',
    timing: 'Launch Day',
    description: 'We handle domain connection, test on every mobile screen, and launch with zero downtime. You receive friendly video guides to make edits yourself, plus 100% ownership of your code and accounts.',
  },
];

export const clientGuarantees = [
  {
    title: '100% Code & Asset Ownership',
    description: 'You own everything we build: your code, domain, and accounts. You are never locked in or trapped.',
  },
  {
    title: 'Fixed Pricing Guarantee',
    description: 'The price on your quote is the final price you pay. If scope does not change, your bill never increases.',
  },
  {
    title: '30-Day Post-Launch Warranty',
    description: 'We stand behind our work. Any bug fixes, small tweaks, or adjustments in the first 30 days are completely free.',
  },
  {
    title: 'Direct Founder & Builder Access',
    description: 'No frustrating account manager chains or support ticket queues. You talk directly with the engineer building your site.',
  },
];

export const comparisonPoints = [
  {
    feature: 'Communication & Contact',
    nexgrid: 'Direct access to your dedicated lead designer & engineer (calls, email, WhatsApp)',
    traditionalAgency: 'Pass-through account managers, slow ticketing queues, and communication lag',
    cheapTemplates: 'Generic customer support or freelance silence once paid',
  },
  {
    feature: 'Website Speed & Quality',
    nexgrid: 'Custom-crafted code, sub-second load times, and flawless mobile experience',
    traditionalAgency: 'Bloated page builders with 30+ plugins slowing down visitor conversions',
    cheapTemplates: 'Cookie-cutter templates with fragile dependencies that easily break',
  },
  {
    feature: 'Pricing & Contracts',
    nexgrid: 'Transparent fixed-price proposal before kickoff. Zero surprise bills',
    traditionalAgency: 'Open-ended hourly billing, scope creep, and unexpected monthly management retainers',
    cheapTemplates: 'Looks cheap upfront, then charges for every tiny fix or add-on',
  },
  {
    feature: 'Ownership & Control',
    nexgrid: '100% full client ownership of all code, domains, and hosting accounts',
    traditionalAgency: 'Proprietary platforms where you must keep paying them just to keep your site alive',
    cheapTemplates: 'Locked into proprietary site-builder tools with no code export options',
  },
  {
    feature: 'Turnaround Timeline',
    nexgrid: '3 to 6 weeks from kickoff to official production launch',
    traditionalAgency: '3 to 6 months of endless discovery decks and committee meetings',
    cheapTemplates: 'Thrown together in 3 days, followed by weeks of trying to fix broken layouts',
  },
];

export const agencyFaqs = [
  {
    question: 'How much does a new website typically cost?',
    answer: 'Most custom business websites range between ETB 35,000 and ETB 65,000 depending on the number of pages and specific features. E-commerce stores with product catalogs, Telebirr/Chapa payment integrations, and custom portals generally range from ETB 75,000 to ETB 140,000. We provide an exact, itemized fixed quote before any work starts so you know the exact total upfront.',
  },
  {
    question: 'How long does the entire website build take?',
    answer: 'Standard marketing and business websites are completed in 3 to 4 weeks. Larger e-commerce storefronts or web application portals take 5 to 7 weeks. We share a clear milestone schedule at the start and keep you updated every week.',
  },
  {
    question: 'Do I completely own my website once it is finished?',
    answer: 'Yes, 100%. Unlike agencies that hold your website hostage on proprietary systems, NexGrid hands over full ownership of your code, domain registrar, and hosting accounts. If you ever decide to work with someone else, you can take everything with you without restriction.',
  },
  {
    question: 'Will I be able to easily update text, images, and blog posts myself?',
    answer: 'Absolutely. We set up an intuitive, user-friendly dashboard (CMS) tailored to your website. You can easily edit text, add new photos, publish blog articles, or update staff bios in a couple of clicks without knowing any code. We also record personalized video tutorials walking you through it.',
  },
  {
    question: 'What do I need to prepare before we get started?',
    answer: 'Just an idea of your goals, any branding assets you have (like your logo or brand colors), and rough notes about your services. If you do not have polished copywriting or high-res photography, we will guide you on content structure and provide high-quality curated imagery.',
  },
  {
    question: 'What happens after the website is launched?',
    answer: 'Every build includes 30 days of complimentary post-launch support and warranty. We monitor your site, resolve any questions, and make small tweaks at zero extra charge. After that, we offer simple, flexible maintenance plans if you want ongoing care, or you can manage it independently.',
  },
  {
    question: 'How do we get started?',
    answer: 'Simply use our quick quote calculator below or fill out the 2-minute contact form. We will review your project details and get back to you within 4 hours with recommendations and an initial estimate.',
  },
];

export const pricingPresets = {
  marketing: {
    title: 'Business & Marketing Website',
    basePrice: 45000,
    baseDays: 24,
    description: 'Perfect for established businesses, professional services, and local practices wanting a clean, high-converting digital presence.',
  },
  ecommerce: {
    title: 'E-Commerce Online Store',
    basePrice: 85000,
    baseDays: 38,
    description: 'Full-featured online store with fast product browsing, secure mobile checkout, inventory sync, and email marketing integration.',
  },
  webapp: {
    title: 'Custom Client Portal or Web App',
    basePrice: 115000,
    baseDays: 48,
    description: 'Tailored software with client logins, self-serve dashboards, automated documents, and custom business workflows.',
  },
  redesign: {
    title: 'Website Redesign & Speed Makeover',
    basePrice: 35000,
    baseDays: 18,
    description: 'Transform an outdated, slow WordPress or template website into a modern, lightning-fast engine with 100% SEO preserved.',
  },
};

export const portfolioProjects: ProjectWork[] = [
  {
    id: 'aura-capital-web',
    title: 'Aura Capital Partners Corporate Web Experience',
    category: 'marketing',
    categoryLabel: 'Corporate & Marketing',
    highlightBadge: 'Bespoke Brand Build',
    subtitle: 'Sub-second luxury corporate web presence with interactive deal showcase',
    headline: 'Positioning a premier African investment firm with an authoritative, high-speed digital presence.',
    description: 'Aura Capital required an executive web experience that commanded trust from international institutional investors and partners. We engineered a sleek, editorial aesthetic featuring custom typographic pacing, instant page loads, interactive deal showcases, and seamless mobile responsiveness.',
    featuredQuote: 'NexGrid delivered a website that immediately elevated our brand authority with global partners and institutional investors.',
    metrics: [
      { label: 'Page Load Speed', value: '0.48s' },
      { label: 'Investor Inquiries', value: '+180%' },
      { label: 'Lighthouse Score', value: '99 / 100' },
      { label: 'Bounce Rate', value: '-44%' },
    ],
    deliverables: [
      'Editorial luxury corporate art direction and custom typography',
      'Interactive transaction and portfolio showcase with instant filtering',
      'Sub-second edge caching across 280+ global CDN nodes',
      'Encrypted investor briefing download and gated PDF whitepapers',
      'Full brand asset ownership and documentation suite',
    ],
    techStack: ['React', 'Tailwind CSS', 'Next.js', 'Cloudflare Edge', 'TypeScript'],
  },
  {
    id: 'solis-retail-store',
    title: 'Solis Apparel & Lifestyle E-Commerce Store',
    category: 'ecommerce',
    categoryLabel: 'E-Commerce Store',
    highlightBadge: 'Telebirr & Card Checkout',
    subtitle: 'Mobile-first online catalog with 1-tap checkout and automated inventory',
    headline: 'Modernized shopping experience that cut cart abandonment and enabled local mobile payments.',
    description: 'Replaced a slow template storefront with a custom headless e-commerce experience. Features an instant slide-out cart, localized Ethiopian payment gateways (Telebirr, Chapa, CBE Birr), international Stripe card processing, and automated customer order receipt dispatch.',
    featuredQuote: 'Our mobile conversion rate surged within the first two weeks of launching the new NexGrid storefront.',
    metrics: [
      { label: 'Mobile Conversion', value: '+142%' },
      { label: 'Page Load Speed', value: '0.62s' },
      { label: 'Cart Drop-off', value: '-38%' },
      { label: 'Repeat Customers', value: '+2.4x' },
    ],
    deliverables: [
      'Frictionless slide-out cart drawer with instant quantity updates',
      'Integrated Telebirr, Chapa, CBE Birr & Stripe card processing',
      'High-resolution product variant & zoom imagery system',
      'Automated inventory synchronization and shipping calculator',
      'Customer order tracking via SMS and email confirmation',
    ],
    techStack: ['Shopify Plus', 'React', 'Tailwind CSS', 'Stripe', 'Telebirr API'],
  },
  {
    id: 'vanguard-client-portal',
    title: 'Vanguard Operations & Client Self-Service Portal',
    category: 'webapp',
    categoryLabel: 'Custom Web Application',
    highlightBadge: 'Operations Automation',
    subtitle: 'Eliminating manual paperwork with automated self-service customer dashboards',
    headline: 'Consolidated client onboarding, statement tracking, and document exchanges into one secure web portal.',
    description: 'Vanguard struggled with hundreds of daily WhatsApp and email threads for project status and billing. We developed a secure, passwordless authentication portal where clients upload files, download auto-generated tax invoices, track milestones, and book consultations directly.',
    featuredQuote: 'Saved our team over 30 hours every single week by eliminating manual document back-and-forth.',
    metrics: [
      { label: 'Admin Time Saved', value: '30+ hrs/wk' },
      { label: 'Client Satisfaction', value: '99.4%' },
      { label: 'Turnaround Time', value: '4x faster' },
      { label: 'Data Encryption', value: 'Enterprise' },
    ],
    deliverables: [
      'Secure passwordless authentication & single-sign-on for clients',
      'Automated PDF statement generation and financial transaction receipts',
      'Encrypted client file vault with drag-and-drop uploads',
      'Real-time project milestone tracker & notification emails',
      'Staff administration console for instant client approvals',
    ],
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'AWS S3'],
  },
  {
    id: 'zenith-speed-redesign',
    title: 'Zenith Advisory Corporate Redesign & Speed Makeover',
    category: 'redesign',
    categoryLabel: 'Website Redesign',
    highlightBadge: '100 Google Lighthouse',
    subtitle: 'Rebuilding a bloated WordPress site into a sub-second Google search leader',
    headline: 'Transformed a 6.2-second loading legacy site into a lightning-fast modern brand asset.',
    description: 'Zenith was losing prospective leads due to an outdated, slow WordPress website plagued by plugin bloat. We completely recoded the site from the ground up, preserving all Google rankings via careful 301 redirect mapping, resulting in a perfect 100 Google Lighthouse score.',
    featuredQuote: 'Our Google search positions climbed across the board within 30 days of the speed overhaul.',
    metrics: [
      { label: 'Page Load Speed', value: '0.55s' },
      { label: 'Lighthouse Score', value: '100 / 100' },
      { label: 'Organic Search Traffic', value: '+215%' },
      { label: 'Visitor Bounce Rate', value: '-52%' },
    ],
    deliverables: [
      'Clean, authoritative corporate design refresh aligned with modern luxury standards',
      'Complete migration off bloated WordPress plugins and vulnerable themes',
      'Comprehensive 301 URL redirect preserve matrix ensuring 0 broken links',
      'Integrated Schema.org structured data and Google Search Console optimization',
      'Responsive testing across 15+ mobile and desktop screen sizes',
    ],
    techStack: ['React', 'Next.js', 'Tailwind CSS', 'Vercel Edge', 'Schema.org'],
  },
];

