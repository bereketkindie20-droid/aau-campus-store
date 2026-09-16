export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { items, total, studentInfo } = req.body;

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const adminChatId = process.env.TELEGRAM_ADMIN_CHAT_ID;

  if (!botToken || !adminChatId) {
    return res.status(500).json({ message: 'Telegram configuration missing on server.' });
  }

  // Generate a random 4-digit order reference ID
  const orderId = `AAU-${Math.floor(1000 + Math.random() * 9000)}`;

  const itemListText = items
    .map((item) => `• ${item.name} (x${item.quantity}) - ${item.price * item.quantity} ETB`)
    .join('\n');

  const message = `🛍️ *NEW CAMPUS ORDER (#${orderId})*\n\n` +
    `👤 *Customer:* ${studentInfo.name}\n` +
    `📞 *Contact:* ${studentInfo.contact}\n` +
    `📍 *Location:* ${studentInfo.campus}\n\n` +
    `📦 *Items Ordered:*\n${itemListText}\n\n` +
    `💰 *Total Amount:* ${total} ETB\n\n` +
    `⚡ *Action:* Contact buyer to arrange pickup/delivery!`;

  try {
    const telegramRes = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: adminChatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    if (telegramRes.ok) {
      return res.status(200).json({ success: true, orderId });
    } else {
      const errorData = await telegramRes.json();
      console.error('Telegram API Error:', errorData);
      return res.status(500).json({ message: 'Failed to send Telegram alert' });
    }
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
