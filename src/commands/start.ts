import { Context } from 'telegraf';

export const startCommand = (ctx: Context) => {
  const name = ctx.from?.first_name || 'Utilizator';
  ctx.reply(`Salut ${name}! 🚀\nSunt gata să te ajut!`);
};