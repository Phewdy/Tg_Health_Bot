import {Context} from 'telegraf';

export const helpCommand = (ctx: Context) => {
  ctx.reply(
    `🩺 *Health Assistant Bot*

Tell me your symptoms (e.g. *"I have a headache"*, *"I feel nauseous"*) and I'll try to suggest some common over-the-counter medications and their active substances.

_This bot is not a substitute for professional medical advice._ Always consult your doctor if you're unsure.

📋 *Available Commands*:
/start – Welcome message
/help – Show this help guide
/about – About the bot
/symptoms – Show a list of common symptoms you can ask about
/feedback – Send feedback or suggestions`,
    {parse_mode: 'Markdown'}
  );
};





