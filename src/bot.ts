import {Context, Telegraf} from 'telegraf';
// @ts-ignore
import {startCommand} from './commands/start.ts';
// @ts-ignore
import {helpCommand} from './commands/help.ts';

// @ts-ignore
import { BOT_KEY } from "./config/env.ts";

const bot = new Telegraf(BOT_KEY!);

// Comandă de start
bot.start((ctx: Context) => {
  startCommand(ctx);
});

// Comandă de help
bot.help((ctx: Context) => {
  helpCommand(ctx);
});

// Răspuns la mesaje text
bot.on('text', (ctx: Context) => {
  const message = ctx.message && 'text' in ctx.message ? ctx.message.text : '';
  ctx.reply(` Ai scris: ${message}`);
});

// Gestionarea erorilor
bot.catch((err: any, ctx: Context) => {
  console.error('Error:', err);
  ctx.reply('A apărut o eroare. Te rog încearcă din nou.');
});

// Pornirea bot-ului
bot.launch()
  .then(() => console.log('Bot pornit cu succes!'))
  .catch(err => console.error('Eroare la pornirea bot-ului:', err));

// Oprirea gracioasă
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));