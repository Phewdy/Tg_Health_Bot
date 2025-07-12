// Script to set up webhook for Telegram bot on Vercel
// Run this after deploying to Vercel: node setup-webhook.js

const BOT_KEY = process.env.BOT_KEY || '7883936753:AAGVyHA2y2UuG7Hf7pyb7htPBxAwAbHDjmw';
const WEBHOOK_URL = process.env.WEBHOOK_URL; // Your Vercel deployment URL + /api/webhook

if (!WEBHOOK_URL) {
  console.error('Please set WEBHOOK_URL environment variable');
  console.log('Example: WEBHOOK_URL=https://your-app.vercel.app/api/webhook node setup-webhook.js');
  process.exit(1);
}

async function setupWebhook() {
  try {
    const response = await fetch(`https://api.telegram.org/bot${BOT_KEY}/setWebhook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: WEBHOOK_URL,
        allowed_updates: ['message', 'callback_query']
      })
    });

    const result = await response.json();

    if (result.ok) {
      console.log('✅ Webhook set successfully!');
      console.log('Webhook URL:', WEBHOOK_URL);
    } else {
      console.error('❌ Failed to set webhook:', result.description);
    }

    return result;
  } catch (error) {
    console.error('❌ Error setting webhook:', error);
  }
}

setupWebhook();
