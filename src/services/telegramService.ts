export interface TelegramConfig {
  botToken: string;
  chatId: string;
  telegramHandle: string; // e.g., 'nexgriddigital'
}

export interface ConsultationSubmission {
  name: string;
  email: string;
  phone: string;
  company?: string;
  notes?: string;
  estimate: {
    projectType: string;
    scopeLevel: string;
    estimatedPrice: string;
    estimatedWeeks: string;
    addonsList: string[];
    inclusions: string[];
  };
}

const STORAGE_KEY_TOKEN = 'nexgrid_tg_bot_token';
const STORAGE_KEY_CHAT_ID = 'nexgrid_tg_chat_id';
const STORAGE_KEY_HANDLE = 'nexgrid_tg_handle';

export function getTelegramConfig(): TelegramConfig {
  const envToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || '';
  const envChatId = import.meta.env.VITE_TELEGRAM_CHAT_ID || '';
  const envHandle = import.meta.env.VITE_TELEGRAM_HANDLE || 'nexgriddigital';

  const storedToken = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY_TOKEN) : null;
  const storedChatId = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY_CHAT_ID) : null;
  const storedHandle = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY_HANDLE) : null;

  return {
    botToken: storedToken !== null ? storedToken : envToken,
    chatId: storedChatId !== null ? storedChatId : envChatId,
    telegramHandle: storedHandle !== null ? storedHandle : envHandle,
  };
}

export function saveTelegramConfig(config: TelegramConfig): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY_TOKEN, config.botToken.trim());
    localStorage.setItem(STORAGE_KEY_CHAT_ID, config.chatId.trim());
    localStorage.setItem(STORAGE_KEY_HANDLE, config.telegramHandle.trim());
  }
}

export function formatConsultationHtml(data: ConsultationSubmission): string {
  const addonsFormatted = data.estimate.addonsList.length > 0
    ? data.estimate.addonsList.map((a) => `  • ${a}`).join('\n')
    : '  • Standard package inclusions';

  return `<b>🚀 NEW PROJECT CONSULTATION REQUEST</b>
--------------------------------------
<b>👤 CLIENT INFORMATION</b>
• <b>Name:</b> ${data.name}
• <b>Email:</b> ${data.email}
• <b>Phone / Telegram:</b> ${data.phone}
• <b>Company / Project:</b> ${data.company || 'Not provided'}

<b>📊 ATTACHED ESTIMATE SUMMARY</b>
• <b>Project Type:</b> ${data.estimate.projectType}
• <b>Scope & Pages:</b> ${data.estimate.scopeLevel}
• <b>Estimated Total:</b> ${data.estimate.estimatedPrice} (Fixed Guarantee)
• <b>Timeline to Launch:</b> ${data.estimate.estimatedWeeks}
• <b>Selected Features & Add-ons:</b>
${addonsFormatted}

• <b>Standard Inclusions:</b>
  - 100% Full Code & Account Ownership
  - Sub-second Speed & Google SEO Optimization
  - 30-Day Post-Launch Warranty & Training

<b>📝 CLIENT NOTES / REQUIREMENTS</b>
${data.notes ? data.notes : 'No extra notes provided.'}

--------------------------------------
<i>Sent via NexGrid Digital Solutions Website</i>
<i>Timestamp: ${new Date().toLocaleString()}</i>`;
}

export function formatConsultationPlainText(data: ConsultationSubmission): string {
  const addonsFormatted = data.estimate.addonsList.length > 0
    ? data.estimate.addonsList.map((a) => `• ${a}`).join('\n')
    : '• Standard package inclusions';

  return `🚀 NEXGRID CONSULTATION REQUEST

CLIENT DETAILS:
- Name: ${data.name}
- Email: ${data.email}
- Phone/Telegram: ${data.phone}
- Company: ${data.company || 'Not provided'}

ATTACHED ESTIMATE SUMMARY:
- Project Type: ${data.estimate.projectType}
- Scope Level: ${data.estimate.scopeLevel}
- Estimated Total: ${data.estimate.estimatedPrice}
- Delivery Timeline: ${data.estimate.estimatedWeeks}

SELECTED ADD-ONS:
${addonsFormatted}

CLIENT NOTES:
${data.notes || 'None'}

Date: ${new Date().toLocaleString()}`;
}

export async function sendTelegramNotification(data: ConsultationSubmission): Promise<{
  success: boolean;
  error?: string;
  directUrl?: string;
}> {
  const config = getTelegramConfig();
  const plainText = formatConsultationPlainText(data);
  const handleClean = config.telegramHandle.replace(/^@/, '');
  const directUrl = `https://t.me/${handleClean || 'nexgriddigital'}?text=${encodeURIComponent(plainText)}`;

  // If bot token and chat ID are configured, post directly to Telegram Bot API
  if (config.botToken && config.chatId) {
    try {
      const htmlText = formatConsultationHtml(data);
      const url = `https://api.telegram.org/bot${config.botToken}/sendMessage`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: config.chatId,
          text: htmlText,
          parse_mode: 'HTML',
          disable_web_page_preview: true,
        }),
      });

      const resJson = await response.json();
      if (resJson.ok) {
        return { success: true, directUrl };
      } else {
        return {
          success: false,
          error: resJson.description || 'Telegram Bot rejected the message.',
          directUrl,
        };
      }
    } catch (err: any) {
      return {
        success: false,
        error: err?.message || 'Network error connecting to Telegram Bot API.',
        directUrl,
      };
    }
  }

  // If no bot token is set yet, return note with the direct Telegram link
  return {
    success: false,
    error: 'NO_TOKEN_CONFIGURED',
    directUrl,
  };
}

export async function sendNewsletterSubscriber(email: string): Promise<{ success: boolean; error?: string }> {
  const config = getTelegramConfig();
  if (config.botToken && config.chatId) {
    try {
      const text = `<b>📬 NEW NEWSLETTER SUBSCRIBER</b>\n\n• <b>Email:</b> ${email}\n• <b>Source:</b> Footer Newsletter Field\n• <b>Date:</b> ${new Date().toLocaleString()}`;
      const url = `https://api.telegram.org/bot${config.botToken}/sendMessage`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: config.chatId,
          text,
          parse_mode: 'HTML',
        }),
      });
      const resJson = await response.json();
      return { success: !!resJson.ok, error: resJson.description };
    } catch (e: any) {
      return { success: false, error: e?.message };
    }
  }
  return { success: false, error: 'NO_TOKEN_CONFIGURED' };
}

export async function testTelegramBot(token: string, chatId: string): Promise<{ success: boolean; error?: string }> {
  try {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: `<b>🔔 NexGrid Bot Test</b>\n\nYour Telegram Bot is successfully configured and connected to the NexGrid Digital Solutions website!\n\n<i>Time: ${new Date().toLocaleString()}</i>`,
        parse_mode: 'HTML',
      }),
    });
    const res = await response.json();
    if (res.ok) {
      return { success: true };
    }
    return { success: false, error: res.description || 'Failed to send test message.' };
  } catch (e: any) {
    return { success: false, error: e?.message || 'Network error testing Telegram Bot.' };
  }
}
