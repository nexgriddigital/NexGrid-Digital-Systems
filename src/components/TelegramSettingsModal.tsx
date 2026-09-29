import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, AlertCircle, Bot, Key, MessageSquare, ExternalLink } from 'lucide-react';
import { getTelegramConfig, saveTelegramConfig, testTelegramBot, TelegramConfig } from '../services/telegramService';

interface TelegramSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TelegramSettingsModal: React.FC<TelegramSettingsModalProps> = ({ isOpen, onClose }) => {
  const [config, setConfig] = useState<TelegramConfig>({
    botToken: '',
    chatId: '',
    telegramHandle: 'nexgriddigital',
  });
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setConfig(getTelegramConfig());
      setTestResult(null);
      setSavedSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveTelegramConfig(config);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleTest = async () => {
    if (!config.botToken.trim() || !config.chatId.trim()) {
      setTestResult({
        success: false,
        message: 'Please provide both a Telegram Bot Token and Chat ID to run the test.',
      });
      return;
    }

    setIsTesting(true);
    setTestResult(null);
    const res = await testTelegramBot(config.botToken.trim(), config.chatId.trim());
    setIsTesting(false);
    if (res.success) {
      setTestResult({
        success: true,
        message: 'Test message delivered successfully to your Telegram chat!',
      });
    } else {
      setTestResult({
        success: false,
        message: res.error || 'Failed to deliver test message. Please verify your token and chat ID.',
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg rounded-2xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-7 overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="h-10 w-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 border border-sky-200">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-display text-lg font-bold text-slate-900">
              Telegram Bot Notification Settings
            </h3>
            <p className="text-xs text-slate-500">
              Receive live consultation requests &amp; quote summaries directly on Telegram
            </p>
          </div>
        </div>

        {/* Quick Instructions */}
        <div className="mb-5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
          <div className="font-semibold text-slate-800 flex items-center gap-1.5">
            <Key className="h-3.5 w-3.5 text-sky-600" />
            <span>How to get your Bot Token &amp; Chat ID (takes 1 minute):</span>
          </div>
          <ol className="list-decimal list-inside space-y-1 pl-1 text-[11px] text-slate-600">
            <li>
              Open Telegram and search for <strong>@BotFather</strong> to create a new bot and copy the <strong>HTTP API Token</strong>.
            </li>
            <li>
              Search for <strong>@userinfobot</strong> in Telegram and send <code>/start</code> to get your <strong>numeric Chat ID</strong> (e.g. <code>123456789</code>).
            </li>
            <li>
              Send a quick "hello" message to your new bot in Telegram so it has permission to message you.
            </li>
          </ol>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Telegram Bot Token (from @BotFather)
            </label>
            <input
              type="text"
              placeholder="e.g. 1234567890:ABCdefGhIJKlmNoPQRsTUVwxyZ"
              value={config.botToken}
              onChange={(e) => setConfig({ ...config, botToken: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs font-mono rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Telegram Chat ID (your personal or group chat ID)
            </label>
            <input
              type="text"
              placeholder="e.g. 987654321"
              value={config.chatId}
              onChange={(e) => setConfig({ ...config, chatId: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs font-mono rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Direct Telegram Username / Handle (fallback link)
            </label>
            <input
              type="text"
              placeholder="e.g. nexgriddigital"
              value={config.telegramHandle}
              onChange={(e) => setConfig({ ...config, telegramHandle: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
            <div className="text-[10px] text-slate-400 mt-1">
              Used to open direct Telegram chat if bot token is not available.
            </div>
          </div>

          {/* Test Feedback */}
          {testResult && (
            <div
              className={`p-3 rounded-lg text-xs flex items-start gap-2 ${
                testResult.success
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-rose-50 text-rose-800 border border-rose-200'
              }`}
            >
              {testResult.success ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
              )}
              <span>{testResult.message}</span>
            </div>
          )}

          {savedSuccess && (
            <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              <span>Settings saved! Your bot is ready to receive consultations.</span>
            </div>
          )}

          {/* Action buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-2">
            <button
              type="button"
              onClick={handleTest}
              disabled={isTesting}
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Send className="h-3.5 w-3.5" />
              <span>{isTesting ? 'Testing...' : 'Send Test Notification'}</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-bold text-white bg-[#1F1F1F] hover:bg-slate-800 rounded-lg transition-colors cursor-pointer shadow-xs"
              >
                Save Settings
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
