# Telegram Bot Deployment Guide for Vercel

## Problem
Your bot works locally with `npm run dev` but doesn't respond to commands when deployed to Vercel because:
- Local development uses **polling** (bot.launch())
- Vercel requires **webhooks** for serverless functions

## Solution
I've configured your bot to work with Vercel webhooks.

## Files Created/Modified:
1. **`api/webhook.js`** - Webhook handler for Vercel
2. **`vercel.json`** - Vercel configuration
3. **`setup-webhook.js`** - Script to configure Telegram webhook
4. **`package.json`** - Added setup-webhook script

## Deployment Steps:

### 1. Deploy to Vercel
```bash
# Install Vercel CLI if you haven't
npm i -g vercel

# Deploy your project
vercel --prod
```

### 2. Set Environment Variables in Vercel
- Go to your Vercel dashboard
- Navigate to your project → Settings → Environment Variables
- Add: `BOT_KEY` = `7883936753:AAGVyHA2y2UuG7Hf7pyb7htPBxAwAbHDjmw`

### 3. Configure Webhook
After deployment, run:
```bash
WEBHOOK_URL=https://your-vercel-app.vercel.app/api/webhook npm run setup-webhook
```

Replace `your-vercel-app.vercel.app` with your actual Vercel domain.

### 4. Test Your Bot
- Send `/start` to your bot
- Send `/help` to see available commands
- Send any text message

## Important Notes:
- **Don't run `npm run dev` in production** - it uses polling which conflicts with webhooks
- **Your bot token is exposed in .env** - make sure to add `.env` to `.gitignore`
- **Test the webhook endpoint** by visiting `https://your-app.vercel.app/api/webhook` (should return bot status)

## Troubleshooting:
- If bot doesn't respond: Check Vercel function logs
- If webhook setup fails: Verify your bot token and URL
- If you get "Method not allowed": The webhook is working, that's normal for GET requests

## Security Recommendation:
Add `.env` to your `.gitignore` file to prevent committing your bot token to GitHub.
