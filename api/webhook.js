const { Telegraf } = require('telegraf');

// Get bot token from environment variables
const BOT_KEY = process.env.BOT_KEY;

if (!BOT_KEY) {
  throw new Error('BOT_KEY is not defined');
}

const bot = new Telegraf(BOT_KEY);

// Set up bot commands directly here to avoid import issues
bot.start((ctx) => {
  ctx.reply('🎉 Bun venit! Sunt un bot de sănătate.\n\n' +
           '🔹 Folosește /help pentru a vedea comenzile disponibile.\n' +
           '🔹 Scrie orice mesaj și îți voi răspunde!');
});

bot.help((ctx) => {
  ctx.reply('📋 *Comenzi disponibile:*\n\n' +
           '🔸 /start - Pornește bot-ul\n' +
           '🔸 /help - Afișează acest mesaj\n' +
           '🔸 Scrie orice mesaj pentru a primi un răspuns!',
           { parse_mode: 'Markdown' });
});

bot.on('text', (ctx) => {
  const message = ctx.message && 'text' in ctx.message ? ctx.message.text : '';
  ctx.reply(`📝 Ai scris: ${message}\n\n✨ Mulțumesc pentru mesaj!`);
});

bot.catch((err, ctx) => {
  console.error('Error:', err);
  ctx.reply('❌ A apărut o eroare. Te rog încearcă din nou.');
});

// Webhook handler for Vercel
module.exports = async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      // Handle webhook update
      await bot.handleUpdate(req.body);
      res.status(200).json({ ok: true });
    } else if (req.method === 'GET') {
      // Health check endpoint
      res.status(200).json({
        status: 'Bot is running',
        timestamp: new Date().toISOString(),
        bot_username: bot.botInfo?.username || 'Unknown'
      });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
