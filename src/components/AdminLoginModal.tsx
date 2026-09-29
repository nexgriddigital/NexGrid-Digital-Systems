import React, { useState } from 'react';
import {
  Lock,
  Mail,
  KeyRound,
  ArrowRight,
  ShieldCheck,
  X,
  AlertCircle,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import {
  loginAdmin,
  DEFAULT_ADMIN_EMAIL,
  DEFAULT_ADMIN_PASSWORD,
  getStoredCredentials,
  AdminUser,
} from '../services/authService';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: AdminUser) => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleQuickDemoFill = () => {
    const creds = getStoredCredentials();
    setEmail(creds.email);
    setPassword(creds.pass);
    setErrorMessage(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please provide both an email and password.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const res = loginAdmin(email, password, rememberMe);
      setIsLoading(false);

      if (res.success && res.user) {
        onLoginSuccess(res.user);
      } else {
        setErrorMessage(res.error || 'Authentication failed. Please verify credentials.');
      }
    }, 350);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-login-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
    >
      <div className="relative w-full max-w-md rounded-2xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-11 w-11 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-xs">
            <Lock className="h-5 w-5 text-sky-400" />
          </div>
          <div>
            <h3 id="admin-login-title" className="font-display text-xl font-bold text-slate-900">
              NexGrid Admin Login
            </h3>
            <p className="text-xs text-slate-500">
              Access the Easy Content Editor (CMS) &amp; Leads
            </p>
          </div>
        </div>

        {/* Quick Demo Credentials helper card */}
        <div className="mb-6 p-3.5 rounded-xl bg-sky-50 border border-sky-200/90 text-xs">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-1.5 font-bold text-sky-900">
              <Sparkles className="h-3.5 w-3.5 text-sky-600" />
              <span>Studio Quick-Access:</span>
            </div>
            <button
              type="button"
              onClick={handleQuickDemoFill}
              className="text-[11px] font-bold text-sky-700 hover:text-sky-900 underline cursor-pointer"
            >
              Auto-fill credentials
            </button>
          </div>
          <div className="mt-1.5 font-mono text-[11px] text-slate-600 space-y-0.5">
            <div>Email: <span className="text-slate-900 font-semibold">{DEFAULT_ADMIN_EMAIL}</span></div>
            <div>Password: <span className="text-slate-900 font-semibold">{DEFAULT_ADMIN_PASSWORD}</span></div>
          </div>
        </div>

        {/* Error message */}
        {errorMessage && (
          <div className="mb-5 p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-start gap-2">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-rose-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Admin Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@nexgrid.com"
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Admin Password
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-slate-300 text-sky-600 focus:ring-sky-500 h-3.5 w-3.5"
              />
              <span>Keep me signed in</span>
            </label>
            <span className="text-[11px] text-slate-400">Encrypted session</span>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
            >
              {isLoading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In to CMS Dashboard</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center gap-2 text-[11px] text-slate-500">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
          <span>Role-Based Access Control • NexGrid Studio Security</span>
        </div>

      </div>
    </div>
  );
};
