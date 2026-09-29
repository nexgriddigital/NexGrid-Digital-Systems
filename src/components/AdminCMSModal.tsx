import React, { useState, useEffect } from 'react';
import {
  X,
  Sliders,
  FileText,
  Image as ImageIcon,
  Users,
  KeyRound,
  Save,
  RotateCcw,
  CheckCircle2,
  Trash2,
  Plus,
  Eye,
  LogOut,
  Sparkles,
  Check,
  Clock,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';
import { AdminUser, logoutAdmin, updateAdminCredentials } from '../services/authService';
import {
  CMSContent,
  CMSArticle,
  ClientLead,
  getCMSContent,
  saveCMSContent,
  resetCMSContent,
  getClientLeads,
  updateLeadStatus,
  deleteClientLead,
} from '../services/cmsService';
import { Toast } from './Toast';

interface AdminCMSModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: AdminUser;
  onLogout: () => void;
}

export const AdminCMSModal: React.FC<AdminCMSModalProps> = ({
  isOpen,
  onClose,
  user,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<'copy' | 'blog' | 'media' | 'leads' | 'security'>('copy');
  const [content, setContent] = useState<CMSContent>(getCMSContent());
  const [leads, setLeads] = useState<ClientLead[]>(getClientLeads());
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('CMS changes saved successfully and applied live!');
  
  // New article modal state
  const [isEditingArticle, setIsEditingArticle] = useState(false);
  const [editingArticleData, setEditingArticleData] = useState<Partial<CMSArticle>>({
    title: '',
    category: 'Industry Insights',
    excerpt: '',
    content: '',
    author: 'NexGrid Editorial',
    status: 'published',
    readTime: '3 min read',
  });

  // Password change state
  const [newAdminEmail, setNewAdminEmail] = useState(user.email);
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [securityMessage, setSecurityMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setContent(getCMSContent());
      setLeads(getClientLeads());
      setNewAdminEmail(user.email);
    }
  }, [isOpen, user.email]);

  if (!isOpen) return null;

  const handleSaveContent = () => {
    saveCMSContent(content);
    setToastMessage('Website copy & CMS configuration successfully saved and updated on live pages!');
    setShowToast(true);
  };

  const handleResetContent = () => {
    if (window.confirm('Reset all website copy and CMS content to studio defaults?')) {
      const reset = resetCMSContent();
      setContent(reset);
      setToastMessage('Content reset to factory studio defaults.');
      setShowToast(true);
    }
  };

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticleData.title?.trim()) return;

    let updatedArticles = [...content.articles];
    if (editingArticleData.id) {
      // Edit existing
      updatedArticles = updatedArticles.map((art) =>
        art.id === editingArticleData.id
          ? ({ ...art, ...editingArticleData } as CMSArticle)
          : art
      );
    } else {
      // Create new
      const newArticle: CMSArticle = {
        id: `art-${Date.now()}`,
        title: editingArticleData.title || 'Untitled Article',
        slug: (editingArticleData.title || 'untitled').toLowerCase().replace(/\s+/g, '-'),
        excerpt: editingArticleData.excerpt || 'Brief summary of this article.',
        content: editingArticleData.content || 'Article body content...',
        author: editingArticleData.author || 'NexGrid Team',
        category: editingArticleData.category || 'General',
        publishedDate: new Date().toISOString().split('T')[0],
        readTime: editingArticleData.readTime || '4 min read',
        status: editingArticleData.status || 'published',
        views: 0,
      };
      updatedArticles = [newArticle, ...updatedArticles];
    }

    const updatedContent = { ...content, articles: updatedArticles };
    setContent(updatedContent);
    saveCMSContent(updatedContent);
    setIsEditingArticle(false);
    setToastMessage('Article saved and updated in the CMS database.');
    setShowToast(true);
  };

  const handleDeleteArticle = (id: string) => {
    if (window.confirm('Delete this article from the blog?')) {
      const updatedArticles = content.articles.filter((a) => a.id !== id);
      const updatedContent = { ...content, articles: updatedArticles };
      setContent(updatedContent);
      saveCMSContent(updatedContent);
      setToastMessage('Article deleted.');
      setShowToast(true);
    }
  };

  const handleToggleArticleStatus = (id: string) => {
    const updatedArticles = content.articles.map((a) => {
      if (a.id === id) {
        return {
          ...a,
          status: (a.status === 'published' ? 'draft' : 'published') as 'published' | 'draft',
        };
      }
      return a;
    });
    const updatedContent = { ...content, articles: updatedArticles };
    setContent(updatedContent);
    saveCMSContent(updatedContent);
  };

  const handleUpdateSecurity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminPassword || newAdminPassword.length < 6) {
      setSecurityMessage('Password must be at least 6 characters.');
      return;
    }
    const res = updateAdminCredentials(newAdminEmail, newAdminPassword);
    if (res.success) {
      setSecurityMessage('Credentials updated successfully. Please use them on your next login.');
      setNewAdminPassword('');
    } else {
      setSecurityMessage(res.error || 'Failed to update credentials.');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/75 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-5xl h-[92vh] rounded-2xl bg-white border border-slate-200 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header Bar */}
        <div className="bg-slate-900 text-white px-5 sm:px-6 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-xs">
              <Check className="h-5 w-5 stroke-[3]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-base sm:text-lg font-bold">
                  NexGrid Easy Content Editor (CMS)
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-950 text-sky-300 border border-sky-800">
                  Included in Marketing
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Edit copy, photos, and publish blog articles without code
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-300 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="truncate max-w-[160px]">{user.email}</span>
            </div>

            <button
              onClick={() => {
                logoutAdmin();
                onLogout();
              }}
              title="Log Out"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/60 text-slate-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer border border-slate-700"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>

            <button
              onClick={onClose}
              aria-label="Close CMS"
              className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* CMS Navigation Tabs Bar */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between overflow-x-auto shrink-0">
          <div className="flex items-center space-x-1 sm:space-x-2 py-2">
            <button
              onClick={() => setActiveTab('copy')}
              className={`px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'copy'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              <Sliders className="h-3.5 w-3.5" />
              <span>1. Live Copy &amp; Hero</span>
            </button>

            <button
              onClick={() => setActiveTab('blog')}
              className={`px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'blog'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              <FileText className="h-3.5 w-3.5" />
              <span>2. Blog &amp; Articles ({content.articles.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('media')}
              className={`px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'media'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              <ImageIcon className="h-3.5 w-3.5" />
              <span>3. Media Gallery</span>
            </button>

            <button
              onClick={() => setActiveTab('leads')}
              className={`px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'leads'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              <Users className="h-3.5 w-3.5" />
              <span>4. Client Inquiries ({leads.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('security')}
              className={`px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'security'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              <KeyRound className="h-3.5 w-3.5" />
              <span>5. Security &amp; Access</span>
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Live CMS Sync Active</span>
            </span>
          </div>
        </div>

        {/* Tab Body Container */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 bg-slate-50/50">
          
          {/* TAB 1: LIVE COPY & HERO */}
          {activeTab === 'copy' && (
            <div className="max-w-4xl mx-auto space-y-6">
              
              {/* Highlight Banner */}
              <div className="p-4 rounded-xl border border-sky-300 bg-linear-to-r from-sky-50 via-white to-sky-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
                <div>
                  <div className="font-bold text-xs text-sky-900 flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-sky-600" />
                    <span>Real-Time Website Updates</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Changes made here directly update the Hero, contact information, and public announcement banner without code.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleSaveContent}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  <Save className="h-3.5 w-3.5" />
                  <span>Save Changes</span>
                </button>
              </div>

              {/* Form Fields */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-5">
                <h4 className="font-display text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                  Homepage Hero Section
                </h4>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Announcement Banner (Top of Page)
                  </label>
                  <div className="flex items-center gap-3 mb-2">
                    <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={content.announcementActive}
                        onChange={(e) =>
                          setContent({ ...content, announcementActive: e.target.checked })
                        }
                        className="rounded border-slate-300 text-sky-600 focus:ring-sky-500 h-4 w-4"
                      />
                      <span>Show top notification bar</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    value={content.announcementText}
                    onChange={(e) => setContent({ ...content, announcementText: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Main Hero Headline
                  </label>
                  <input
                    type="text"
                    value={content.heroHeadline}
                    onChange={(e) => setContent({ ...content, heroHeadline: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm font-bold rounded-lg border border-slate-200 bg-slate-50 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                  <div className="text-[11px] text-slate-400 mt-1">
                    Keep under 60 characters for best Google SEO presentation.
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Hero Subtitle / Value Proposition
                  </label>
                  <textarea
                    rows={3}
                    value={content.heroSubtitle}
                    onChange={(e) => setContent({ ...content, heroSubtitle: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Primary CTA Button Text
                  </label>
                  <input
                    type="text"
                    value={content.ctaButtonText}
                    onChange={(e) => setContent({ ...content, ctaButtonText: e.target.value })}
                    className="w-full sm:w-1/2 px-3 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              {/* Agency Contact & Operating Hours */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
                <h4 className="font-display text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                  Agency Contact &amp; Operating Credentials
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Official Contact Email
                    </label>
                    <input
                      type="email"
                      value={content.agencyEmail}
                      onChange={(e) => setContent({ ...content, agencyEmail: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Direct WhatsApp / Phone
                    </label>
                    <input
                      type="text"
                      value={content.agencyPhone}
                      onChange={(e) => setContent({ ...content, agencyPhone: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Physical / Operating Location
                    </label>
                    <input
                      type="text"
                      value={content.agencyLocation}
                      onChange={(e) => setContent({ ...content, agencyLocation: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Client Response Guarantee
                    </label>
                    <input
                      type="text"
                      value={content.turnaroundTime}
                      onChange={(e) => setContent({ ...content, turnaroundTime: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={handleResetContent}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-500 hover:text-rose-600 transition-colors cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Reset to Studio Defaults</span>
                </button>

                <button
                  type="button"
                  onClick={handleSaveContent}
                  className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors shadow-xs cursor-pointer"
                >
                  <Save className="h-4 w-4" />
                  <span>Apply &amp; Save Changes</span>
                </button>
              </div>

            </div>
          )}

          {/* TAB 2: BLOG & ARTICLES */}
          {activeTab === 'blog' && (
            <div className="max-w-4xl mx-auto space-y-6">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-display text-lg font-bold text-slate-900">
                    Publish Blog Articles Without Code
                  </h4>
                  <p className="text-xs text-slate-600">
                    Manage articles, write announcements, and update Google SEO metadata with 1-click publishing.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setEditingArticleData({
                      title: '',
                      category: 'SEO & Performance',
                      excerpt: '',
                      content: '',
                      author: 'NexGrid Team',
                      status: 'published',
                      readTime: '4 min read',
                    });
                    setIsEditingArticle(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-xs cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                  <span>Write New Article</span>
                </button>
              </div>

              {/* Articles List */}
              <div className="space-y-3">
                {content.articles.map((art) => (
                  <div
                    key={art.id}
                    className="p-4 sm:p-5 rounded-xl border border-slate-200 bg-white shadow-xs hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5 flex-1 pr-4">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2 py-0.5 rounded">
                          {art.category}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            art.status === 'published'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {art.status === 'published' ? '● Published' : '○ Draft'}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {art.publishedDate} • {art.readTime}
                        </span>
                      </div>
                      <h5 className="font-display text-base font-bold text-slate-900">
                        {art.title}
                      </h5>
                      <p className="text-xs text-slate-600 line-clamp-2">
                        {art.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0">
                      <button
                        type="button"
                        onClick={() => handleToggleArticleStatus(art.id)}
                        className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
                      >
                        {art.status === 'published' ? 'Switch to Draft' : 'Publish Live'}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setEditingArticleData(art);
                          setIsEditingArticle(true);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold cursor-pointer"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteArticle(art.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer"
                        title="Delete Article"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB 3: MEDIA GALLERY */}
          {activeTab === 'media' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div>
                <h4 className="font-display text-lg font-bold text-slate-900">
                  Media &amp; WebP Photo Gallery
                </h4>
                <p className="text-xs text-slate-600">
                  All uploaded photography is automatically converted to WebP compression for sub-second page loads.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    title: 'Brand Hero Showcase',
                    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
                    size: '48 KB',
                    type: 'WebP',
                  },
                  {
                    title: 'Modern Retail Storefront',
                    url: 'https://images.unsplash.com/photo-1556742049-0a67e5572293?auto=format&fit=crop&w=600&q=80',
                    size: '56 KB',
                    type: 'WebP',
                  },
                  {
                    title: 'Executive Portal Interface',
                    url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80',
                    size: '41 KB',
                    type: 'WebP',
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-xs"
                  >
                    <img
                      src={item.url}
                      alt={item.title}
                      className="h-36 w-full object-cover"
                    />
                    <div className="p-3">
                      <div className="text-xs font-bold text-slate-900 truncate">
                        {item.title}
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1">
                        <span className="font-mono text-emerald-600 font-bold">{item.size}</span>
                        <span className="px-1.5 py-0.5 rounded bg-slate-100">{item.type}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 rounded-xl border border-dashed border-slate-300 bg-white text-center space-y-2">
                <ImageIcon className="h-8 w-8 text-slate-400 mx-auto" />
                <div className="text-xs font-bold text-slate-800">
                  Drop new photos or project banners here to auto-optimize
                </div>
                <div className="text-[11px] text-slate-500">
                  Supports PNG, JPG, WebP, SVG up to 10MB
                </div>
                <button
                  type="button"
                  onClick={() => alert('Photo upload dialog simulated in sandbox. In production, assets sync straight to Cloudflare / AWS S3 CDN.')}
                  className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 cursor-pointer"
                >
                  <span>Select Image from Computer</span>
                </button>
              </div>

            </div>
          )}

          {/* TAB 4: CLIENT INQUIRIES & LEADS */}
          {activeTab === 'leads' && (
            <div className="max-w-4xl mx-auto space-y-6">
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-display text-lg font-bold text-slate-900">
                    Incoming Client Leads &amp; Estimates
                  </h4>
                  <p className="text-xs text-slate-600">
                    Inquiries captured from your website forms and interactive price calculator.
                  </p>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-sky-50 text-sky-800 border border-sky-200">
                  {leads.length} Total Leads
                </span>
              </div>

              {leads.length === 0 ? (
                <div className="p-8 text-center bg-white rounded-xl border border-slate-200 text-xs text-slate-500">
                  No inquiries received yet. Submit the contact form to see leads populate here in real time.
                </div>
              ) : (
                <div className="space-y-3">
                  {leads.map((lead) => (
                    <div
                      key={lead.id}
                      className="p-5 rounded-xl border border-slate-200 bg-white shadow-xs space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-slate-900">{lead.name}</span>
                            {lead.company && (
                              <span className="text-xs text-slate-500">({lead.company})</span>
                            )}
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                lead.status === 'new'
                                  ? 'bg-blue-100 text-blue-800'
                                  : lead.status === 'contacted'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-slate-100 text-slate-700'
                              }`}
                            >
                              {lead.status.toUpperCase()}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
                            <span className="flex items-center gap-1">
                              <Mail className="h-3 w-3 text-slate-400" />
                              <a href={`mailto:${lead.email}`} className="text-sky-600 hover:underline">
                                {lead.email}
                              </a>
                            </span>
                            {lead.phone && (
                              <span className="flex items-center gap-1">
                                <Phone className="h-3 w-3 text-slate-400" />
                                {lead.phone}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="text-xs text-slate-400">
                          {lead.dateReceived}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                        <div className="p-2 rounded bg-slate-50 border border-slate-100">
                          <span className="text-slate-500 block text-[10px]">Project Type</span>
                          <span className="font-bold text-slate-800">{lead.projectType}</span>
                        </div>
                        <div className="p-2 rounded bg-slate-50 border border-slate-100">
                          <span className="text-slate-500 block text-[10px]">Budget</span>
                          <span className="font-bold text-emerald-700">{lead.estimatedBudget}</span>
                        </div>
                        <div className="p-2 rounded bg-slate-50 border border-slate-100">
                          <span className="text-slate-500 block text-[10px]">Timeline</span>
                          <span className="font-bold text-slate-800">{lead.targetTimeline}</span>
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-slate-50/70 border border-slate-200/80 text-xs text-slate-700">
                        <span className="font-bold text-slate-900 block mb-1">Requirements &amp; Scope:</span>
                        {lead.notes}
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] text-slate-500">Update status:</span>
                          <select
                            value={lead.status}
                            onChange={(e) => {
                              updateLeadStatus(lead.id, e.target.value as ClientLead['status']);
                              setLeads(getClientLeads());
                            }}
                            className="text-xs font-semibold px-2 py-1 rounded border border-slate-200 bg-white"
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="in_progress">In Progress</option>
                            <option value="closed">Closed</option>
                          </select>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm('Delete this lead record?')) {
                              deleteClientLead(lead.id);
                              setLeads(getClientLeads());
                            }
                          }}
                          className="text-xs text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          )}

          {/* TAB 5: SECURITY & ACCESS */}
          {activeTab === 'security' && (
            <div className="max-w-2xl mx-auto space-y-6">
              <div>
                <h4 className="font-display text-lg font-bold text-slate-900">
                  Admin Credentials &amp; Access Control
                </h4>
                <p className="text-xs text-slate-600">
                  Update your authentication email and password for the NexGrid Studio CMS.
                </p>
              </div>

              {securityMessage && (
                <div className="p-3.5 rounded-lg bg-sky-50 border border-sky-200 text-xs text-sky-800 flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-sky-600" />
                  <span>{securityMessage}</span>
                </div>
              )}

              <form onSubmit={handleUpdateSecurity} className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Administrator Email
                  </label>
                  <input
                    type="email"
                    required
                    value={newAdminEmail}
                    onChange={(e) => setNewAdminEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Set New Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter at least 6 characters"
                    value={newAdminPassword}
                    onChange={(e) => setNewAdminPassword(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold cursor-pointer transition-colors shadow-xs"
                  >
                    Update Admin Credentials
                  </button>
                </div>
              </form>

              <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 space-y-1">
                <div className="font-bold text-slate-800">Current Session Details:</div>
                <div>User: {user.name} ({user.email})</div>
                <div>Role: {user.role}</div>
                <div>Active Token: Encrypted Client Session Storage</div>
              </div>
            </div>
          )}

        </div>

        {/* Bottom Status Bar */}
        <div className="bg-white border-t border-slate-200 px-6 py-3 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="font-medium text-slate-700">Easy Content Editor (CMS) Operational</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold cursor-pointer"
          >
            Close Dashboard
          </button>
        </div>

      </div>

      {/* Write/Edit Article Submodal */}
      {isEditingArticle && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl rounded-2xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-7 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsEditingArticle(false)}
              className="absolute top-4 right-4 h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="h-4 w-4" />
            </button>

            <h4 className="font-display text-lg font-bold text-slate-900 mb-4">
              {editingArticleData.id ? 'Edit Article' : 'Write New Blog Article'}
            </h4>

            <form onSubmit={handleSaveArticle} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Article Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 5 Strategies for Higher Conversion Rates"
                  value={editingArticleData.title || ''}
                  onChange={(e) =>
                    setEditingArticleData({ ...editingArticleData, title: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={editingArticleData.category || ''}
                    onChange={(e) =>
                      setEditingArticleData({ ...editingArticleData, category: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Reading Time</label>
                  <input
                    type="text"
                    value={editingArticleData.readTime || ''}
                    onChange={(e) =>
                      setEditingArticleData({ ...editingArticleData, readTime: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Article Excerpt / Summary
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Short teaser shown on blog cards..."
                  value={editingArticleData.excerpt || ''}
                  onChange={(e) =>
                    setEditingArticleData({ ...editingArticleData, excerpt: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Full Article Body
                </label>
                <textarea
                  rows={6}
                  required
                  placeholder="Write the full content..."
                  value={editingArticleData.content || ''}
                  onChange={(e) =>
                    setEditingArticleData({ ...editingArticleData, content: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 font-mono text-[11px]"
                />
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={editingArticleData.status === 'published'}
                    onChange={(e) =>
                      setEditingArticleData({
                        ...editingArticleData,
                        status: e.target.checked ? 'published' : 'draft',
                      })
                    }
                    className="rounded border-slate-300 text-sky-600 focus:ring-sky-500 h-4 w-4"
                  />
                  <span>Publish immediately to live blog</span>
                </label>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditingArticle(false)}
                    className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold cursor-pointer"
                  >
                    Save Article
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Toast */}
      <Toast
        isOpen={showToast}
        onClose={() => setShowToast(false)}
        title="Easy Content Editor (CMS)"
        message={toastMessage}
      />
    </div>
  );
};
