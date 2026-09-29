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

// Verified Production Telegram Configuration
const VERIFIED_DEFAULT_BOT_TOKEN = '8627048561:AAGPCwMb__Igb_oiamB3si6Ys6J_QvCrf9s';
const VERIFIED_DEFAULT_CHAT_ID = '8877039972';
const VERIFIED_DEFAULT_HANDLE = 'nexgriddigital';

export function getTelegramConfig(): TelegramConfig {
  const envToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || VERIFIED_DEFAULT_BOT_TOKEN;
  const envChatId = import.meta.env.VITE_TELEGRAM_CHAT_ID || VERIFIED_DEFAULT_CHAT_ID;
  const envHandle = import.meta.env.VITE_TELEGRAM_HANDLE || VERIFIED_DEFAULT_HANDLE;

  const storedToken = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY_TOKEN) : null;
  const storedChatId = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY_CHAT_ID) : null;
  const storedHandle = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY_HANDLE) : null;

  return {
    botToken: storedToken && storedToken.trim().length > 0 ? storedToken : envToken,
    chatId: storedChatId && storedChatId.trim().length > 0 ? storedChatId : envChatId,
    telegramHandle: storedHandle && storedHandle.trim().length > 0 ? storedHandle : envHandle,
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

export async function autoDetectChatId(botToken: string): Promise<{
  success: boolean;
  chatId?: string;
  senderName?: string;
  botUsername?: string;
  error?: string;
}> {
  if (!botToken.trim()) {
    return { success: false, error: 'Please enter your Bot Token first.' };
  }
  try {
    let botUsername = '';
    try {
      const meRes = await fetch(`https://api.telegram.org/bot${botToken.trim()}/getMe`);
      const meJson = await meRes.json();
      if (meJson.ok && meJson.result?.username) {
        botUsername = meJson.result.username;
      }
    } catch {
      // Ignore getMe failure
    }

    const res = await fetch(`https://api.telegram.org/bot${botToken.trim()}/getUpdates`);
    const json = await res.json();
    if (!json.ok) {
      return { success: false, error: json.description || 'Could not connect to Telegram bot API.' };
    }
    const updates = json.result || [];
    if (updates.length === 0) {
      const botHandle = botUsername ? `@${botUsername}` : 'your bot';
      return {
        success: false,
        botUsername,
        error: `No messages received yet. Please open ${botHandle} in Telegram, click "Start" (or send "hello"), then click Auto-Detect again!`,
      };
    }

    // Look for the most recent message with chat id
    for (let i = updates.length - 1; i >= 0; i--) {
      const u = updates[i];
      const chat = u.message?.chat || u.my_chat_member?.chat || u.channel_post?.chat;
      if (chat && chat.id) {
        const senderName = chat.first_name || chat.title || chat.username || 'User';
        return {
          success: true,
          chatId: String(chat.id),
          senderName,
          botUsername,
        };
      }
    }
    return {
      success: false,
      botUsername,
      error: 'Could not find a Chat ID in recent messages. Please send a message to your bot first.',
    };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Network error fetching Telegram updates.' };
  }
}

export async function testTelegramBot(token: string, chatId: string): Promise<{ success: boolean; error?: string }> {
  const cleanToken = token.trim();
  const cleanChatId = chatId.trim();
  const botIdFromToken = cleanToken.split(':')[0];

  // Detect if user entered bot ID as chat ID
  if (botIdFromToken && cleanChatId === botIdFromToken) {
    return {
      success: false,
      error: `Chat ID (${cleanChatId}) is the Bot's own ID! A Telegram bot cannot send messages to itself. Please enter your personal Telegram user ID (or click "Auto-Detect Chat ID").`,
    };
  }

  try {
    const url = `https://api.telegram.org/bot${cleanToken}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: cleanChatId,
        text: `<b>🔔 NexGrid Bot Test</b>\n\nYour Telegram Bot is successfully configured and connected to the NexGrid Digital Solutions website!\n\n<i>Time: ${new Date().toLocaleString()}</i>`,
        parse_mode: 'HTML',
      }),
    });
    const res = await response.json();
    if (res.ok) {
      return { success: true };
    }
    
    // Provide user-friendly translation for common Telegram bot error codes
    if (res.description && res.description.toLowerCase().includes("bot can't send messages to the bot")) {
      return {
        success: false,
        error: `Telegram error: A bot cannot send messages to itself. You must use your personal numeric Telegram Chat ID (not the bot's ID).`,
      };
    }
    if (res.description && res.description.toLowerCase().includes("chat not found")) {
      return {
        success: false,
        error: `Chat not found. Make sure you have opened your bot in Telegram and clicked "Start" before sending messages.`,
      };
    }
    return { success: false, error: res.description || 'Failed to send test message.' };
  } catch (e: any) {
    return { success: false, error: e?.message || 'Network error testing Telegram Bot.' };
  }
}
