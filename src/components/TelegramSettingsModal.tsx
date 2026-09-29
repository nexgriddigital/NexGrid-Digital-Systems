import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, AlertCircle, Bot, Key, ExternalLink, Sparkles, RefreshCw } from 'lucide-react';
import { getTelegramConfig, saveTelegramConfig, testTelegramBot, autoDetectChatId, TelegramConfig } from '../services/telegramService';

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
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectNotice, setDetectNotice] = useState<{ type: 'success' | 'error' | 'info'; text: string; link?: string; linkText?: string } | null>(null);

  useEffect(() => {
    if (isOpen) {
      setConfig(getTelegramConfig());
      setTestResult(null);
      setSavedSuccess(false);
      setDetectNotice(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const botIdFromToken = config.botToken.trim().split(':')[0];
  const isEnteringBotIdAsChatId = Boolean(botIdFromToken && config.chatId.trim() === botIdFromToken);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEnteringBotIdAsChatId) {
      setTestResult({
        success: false,
        message: 'Cannot save: Your Chat ID is currently set to your Bot ID. Telegram bots cannot message themselves.',
      });
      return;
    }
    saveTelegramConfig(config);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleAutoDetectChatId = async () => {
    if (!config.botToken.trim()) {
      setDetectNotice({
        type: 'error',
        text: 'Please enter your Telegram Bot Token first.',
      });
      return;
    }

    setIsDetecting(true);
    setDetectNotice(null);

    const res = await autoDetectChatId(config.botToken.trim());
    setIsDetecting(false);

    if (res.success && res.chatId) {
      setConfig((prev) => ({ ...prev, chatId: res.chatId! }));
      setDetectNotice({
        type: 'success',
        text: `Found your chat! Connected to ${res.senderName || 'user'} (Chat ID: ${res.chatId}).`,
      });
      setTestResult(null);
    } else {
      const botHandle = res.botUsername ? `@${res.botUsername}` : 'your bot';
      const botUrl = res.botUsername ? `https://t.me/${res.botUsername}` : undefined;
      setDetectNotice({
        type: 'info',
        text: res.error || `No messages received yet. Please open ${botHandle} in Telegram, send /start or "hello", then click Auto-Detect again!`,
        link: botUrl,
        linkText: botUrl ? `Open ${botHandle} on Telegram` : undefined,
      });
    }
  };

  const handleTest = async () => {
    if (!config.botToken.trim() || !config.chatId.trim()) {
      setTestResult({
        success: false,
        message: 'Please provide both a Telegram Bot Token and Chat ID to run the test.',
      });
      return;
    }

    if (isEnteringBotIdAsChatId) {
      setTestResult({
        success: false,
        message: `Forbidden: ${config.chatId} is the bot's own ID! A bot cannot send messages to itself. Use your personal user ID or click "Auto-Detect Chat ID".`,
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
      <div className="relative w-full max-w-lg rounded-2xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-7 overflow-y-auto max-h-[92vh]">
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
            <span>How to connect your Bot &amp; get your personal Chat ID:</span>
          </div>
          <ol className="list-decimal list-inside space-y-1.5 pl-1 text-[11px] text-slate-600">
            <li>
              Open{' '}
              <a
                href="https://t.me/BotFather"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-sky-600 hover:underline inline-flex items-center gap-0.5"
              >
                @BotFather <ExternalLink className="h-2.5 w-2.5" />
              </a>{' '}
              to get your <strong>Bot Token</strong>.
            </li>
            <li>
              Open your bot{' '}
              <a
                href="https://t.me/NexGridDigital_bot"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-sky-600 hover:underline inline-flex items-center gap-0.5"
              >
                @NexGridDigital_bot <ExternalLink className="h-2.5 w-2.5" />
              </a>{' '}
              and click <strong>Start</strong> (or send "hello").
            </li>
            <li>
              Click the blue <strong>"Auto-Detect My Chat ID"</strong> button below, or message{' '}
              <a
                href="https://t.me/userinfobot"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-sky-600 hover:underline inline-flex items-center gap-0.5"
              >
                @userinfobot <ExternalLink className="h-2.5 w-2.5" />
              </a>{' '}
              to get your personal user ID.
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
              onChange={(e) => {
                setConfig({ ...config, botToken: e.target.value });
                setDetectNotice(null);
              }}
              className="w-full px-3.5 py-2.5 text-xs font-mono rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-700">
                Your Personal Telegram Chat ID
              </label>
              <button
                type="button"
                onClick={handleAutoDetectChatId}
                disabled={isDetecting || !config.botToken.trim()}
                className="text-[11px] font-semibold text-sky-600 hover:text-sky-700 disabled:text-slate-400 flex items-center gap-1 cursor-pointer disabled:cursor-not-allowed transition-colors"
              >
                <Sparkles className={`h-3 w-3 ${isDetecting ? 'animate-spin' : ''}`} />
                <span>{isDetecting ? 'Detecting...' : 'Auto-Detect My Chat ID'}</span>
              </button>
            </div>
            <input
              type="text"
              placeholder="e.g. 987654321 (Your personal user ID, NOT the bot's ID)"
              value={config.chatId}
              onChange={(e) => {
                setConfig({ ...config, chatId: e.target.value });
                setDetectNotice(null);
                setTestResult(null);
              }}
              className={`w-full px-3.5 py-2.5 text-xs font-mono rounded-lg border bg-white text-slate-900 focus:outline-none focus:ring-2 ${
                isEnteringBotIdAsChatId
                  ? 'border-rose-400 focus:ring-rose-400'
                  : 'border-slate-200 focus:ring-sky-400'
              }`}
            />

            {/* Warning if user typed bot ID */}
            {isEnteringBotIdAsChatId && (
              <div className="mt-1.5 p-2 rounded-md bg-rose-50 border border-rose-200 text-[11px] text-rose-700 leading-tight">
                ⚠️ <strong>That is your Bot's ID ({botIdFromToken})!</strong> A bot cannot send messages to itself. You must enter your <strong>personal</strong> Telegram Chat ID so the bot can message you. Click <em>"Auto-Detect My Chat ID"</em> above or message <a href="https://t.me/userinfobot" target="_blank" rel="noreferrer" className="underline font-bold">@userinfobot</a>.
              </div>
            )}

            {/* Auto-detect notification message */}
            {detectNotice && (
              <div
                className={`mt-1.5 p-2.5 rounded-md text-[11px] leading-relaxed flex items-start gap-1.5 ${
                  detectNotice.type === 'success'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : detectNotice.type === 'error'
                    ? 'bg-rose-50 text-rose-800 border border-rose-200'
                    : 'bg-sky-50 text-sky-800 border border-sky-200'
                }`}
              >
                {detectNotice.type === 'success' ? (
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                ) : detectNotice.type === 'error' ? (
                  <AlertCircle className="h-3.5 w-3.5 text-rose-600 shrink-0 mt-0.5" />
                ) : (
                  <RefreshCw className="h-3.5 w-3.5 text-sky-600 shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <span>{detectNotice.text}</span>
                  {detectNotice.link && (
                    <div className="mt-1">
                      <a
                        href={detectNotice.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 font-semibold text-sky-700 hover:underline"
                      >
                        {detectNotice.linkText || 'Open in Telegram'} <ExternalLink className="h-2.5 w-2.5" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}
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
              disabled={isTesting || !config.botToken.trim() || !config.chatId.trim() || isEnteringBotIdAsChatId}
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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
                disabled={isEnteringBotIdAsChatId}
                className="px-4 py-2 text-xs font-bold text-white bg-[#1F1F1F] hover:bg-slate-800 rounded-lg transition-colors cursor-pointer shadow-xs disabled:opacity-50 disabled:cursor-not-allowed"
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
