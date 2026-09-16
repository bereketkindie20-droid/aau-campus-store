export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { items, total, studentInfo } = req.body;
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_ADMIN_CHAT_ID;

  if (!botToken || !chatId) {
    return res.status(500).json({ error: 'Server credentials missing' });
  }

  const itemList = items
    .map((item) => `• ${item.name} (x${item.quantity}) - ${item.price * item.quantity} ETB`)
    .join('\n');

  const message = 
    `🛍️ *NEW AAU CAMPUS STORE ORDER*\n\n` +
    `👤 *Student:* ${studentInfo?.name || 'Anonymous'}\n` +
    `📞 *Contact/Handle:* ${studentInfo?.contact || 'N/A'}\n` +
    `📍 *Campus Drop Point:* ${studentInfo?.campus || 'Main Campus'}\n\n` +
    `📦 *Order Details:*\n${itemList}\n\n` +
    `💰 *Total Amount:* *${total} ETB*`;

  try {
    const telegramRes = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'Markdown',
        }),
      }
    );

    if (!telegramRes.ok) throw new Error('Telegram API failure');

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to dispatch notification' });
  }
}
