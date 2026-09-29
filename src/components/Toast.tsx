import React, { useEffect, useState } from 'react';
import { CheckCircle2, Bot, X, ExternalLink } from 'lucide-react';

export interface ToastProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  duration?: number; // ms
  actionLabel?: string;
  actionUrl?: string;
}

export const Toast: React.FC<ToastProps> = ({
  isOpen,
  onClose,
  title = 'Message Sent to Telegram Bot',
  message,
  duration = 5500,
  actionLabel,
  actionUrl,
}) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!isOpen) {
      setProgress(100);
      return;
    }

    const intervalTime = 50;
    const totalSteps = duration / intervalTime;
    const decrement = 100 / totalSteps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev <= decrement) {
          clearInterval(timer);
          onClose();
          return 0;
        }
        return prev - decrement;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 max-w-sm w-full mx-4 sm:mx-0 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="relative overflow-hidden rounded-xl border border-emerald-200 bg-white/95 backdrop-blur-md p-4 shadow-xl shadow-slate-900/10 text-slate-800">
        <div className="flex items-start gap-3">
          {/* Subtle Telegram Bot Success Badge */}
          <div className="relative shrink-0 mt-0.5">
            <div className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
              <Bot className="h-4 w-4" />
            </div>
            <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center">
              <CheckCircle2 className="h-2.5 w-2.5 text-white stroke-[3]" />
            </span>
          </div>

          {/* Toast Copy */}
          <div className="flex-1 pr-2">
            <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <span>{title}</span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
              {message}
            </p>

            {actionUrl && (
              <a
                href={actionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0088cc] hover:text-[#0077b5] mt-1.5 hover:underline"
              >
                <span>{actionLabel || 'View in Telegram'}</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>

          {/* Dismiss Button */}
          <button
            onClick={onClose}
            aria-label="Close notification"
            className="shrink-0 h-6 w-6 rounded-md flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Subtle timer progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-100">
          <div
            className="h-full bg-emerald-500 transition-all duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
