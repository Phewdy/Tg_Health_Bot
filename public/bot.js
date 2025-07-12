"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
// @ts-ignore
const start_ts_1 = require("./commands/start.ts");
// @ts-ignore
const help_ts_1 = require("./commands/help.ts");
// @ts-ignore
const env_ts_1 = require("./config/env.ts");
const bot = new telegraf_1.Telegraf(env_ts_1.BOT_KEY);
// Comandă de start
bot.start((ctx) => {
    (0, start_ts_1.startCommand)(ctx);
});
// Comandă de help
bot.help((ctx) => {
    (0, help_ts_1.helpCommand)(ctx);
});
// Răspuns la mesaje text
bot.on('text', (ctx) => {
    const message = ctx.message && 'text' in ctx.message ? ctx.message.text : '';
    ctx.reply(` Ai scris: ${message}`);
});
// Gestionarea erorilor
bot.catch((err, ctx) => {
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
//comment
