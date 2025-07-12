"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startCommand = void 0;
const startCommand = (ctx) => {
    const name = ctx.from?.first_name || 'Utilizator';
    ctx.reply(`Salut ${name}! 🚀\nSunt gata să te ajut!`);
};
exports.startCommand = startCommand;
