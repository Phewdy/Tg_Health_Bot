# Telegram Bot cu Node.js și TypeScript

## Cerințe preliminare
- Node.js (versiunea 16 sau mai nouă)
- npm sau yarn
- Un cont Telegram
- Editor de cod (VS Code recomandat)

## Pasul 1: Crearea unui bot Telegram

1. Deschide Telegram și caută `@BotFather`
2. Trimite `/newbot` și urmează instrucțiunile
3. Salvează TOKEN-ul primit (va arăta ca: `1234567890:ABC-DEF1234ghIkl-zyx57W2v1u123ew11`)

## Pasul 2: Configurarea proiectului

### Structura folderelor
```
telegram-bot/
├── src/
│   ├── bot.ts
│   ├── commands/
│   │   ├── start.ts
│   │   └── help.ts
│   └── utils/
│       └── logger.ts
├── dist/
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

### Instalarea dependințelor

```bash
# Inițializează proiectul
npm init -y

# Instalează dependințele principale
npm install telegraf dotenv

# Instalează dependințele de dezvoltare
npm install -D typescript @types/node ts-node nodemon
```

## Pasul 3: Configurarea TypeScript

### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### package.json scripts
```json
{
  "scripts": {
    "build": "tsc",
    "start": "node dist/bot.js",
    "dev": "nodemon src/bot.ts",
    "clean": "rm -rf dist"
  }
}
```

## Pasul 4: Configurarea mediului

### .env
```
BOT_TOKEN=your_bot_token_here
NODE_ENV=development
```

### .gitignore
```
node_modules/
dist/
.env
*.log
```

## Pasul 5: Implementarea bot-ului

### src/bot.ts
```typescript
import { Telegraf, Context } from 'telegraf';
import dotenv from 'dotenv';

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN!);

// Comandă de start
bot.start((ctx: Context) => {
  ctx.reply('Bun venit! 👋\nSunt bot-ul tău personal.');
});

// Comandă de help
bot.help((ctx: Context) => {
  ctx.reply('Comenzi disponibile:\n/start - Pornește bot-ul\n/help - Afișează ajutorul');
});

// Răspuns la mesaje text
bot.on('text', (ctx: Context) => {
  const message = ctx.message && 'text' in ctx.message ? ctx.message.text : '';
  ctx.reply(`Ai scris: ${message}`);
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
```

### src/commands/start.ts
```typescript
import { Context } from 'telegraf';

export const startCommand = (ctx: Context) => {
  const name = ctx.from?.first_name || 'Utilizator';
  ctx.reply(`Salut ${name}! 🚀\nSunt gata să te ajut!`);
};
```

### src/utils/logger.ts
```typescript
export const logger = {
  info: (message: string) => {
    console.log(`[INFO] ${new Date().toISOString()}: ${message}`);
  },
  error: (message: string, error?: any) => {
    console.error(`[ERROR] ${new Date().toISOString()}: ${message}`, error);
  }
};
```

## Pasul 6: Rularea bot-ului

### Dezvoltare
```bash
npm run dev
```

### Producție
```bash
npm run build
npm start
```

## Funcționalități avansate

### Keyboard inline
```typescript
bot.command('menu', (ctx) => {
  ctx.reply('Alege o opțiune:', {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Opțiunea 1', callback_data: 'opt1' }],
        [{ text: 'Opțiunea 2', callback_data: 'opt2' }]
      ]
    }
  });
});

bot.action('opt1', (ctx) => {
  ctx.answerCbQuery('Ai ales opțiunea 1!');
});
```

### Middleware personalizat
```typescript
bot.use((ctx, next) => {
  const start = Date.now();
  console.log(`Request from ${ctx.from?.username}`);
  return next().then(() => {
    const ms = Date.now() - start;
    console.log(`Response time: ${ms}ms`);
  });
});
```

## Deployment

### Heroku
1. Creează un cont Heroku
2. Instalează Heroku CLI
3. Configurează variabilele de mediu
4. Deploy cu Git

### PM2 (pentru servere)
```bash
npm install -g pm2
pm2 start dist/bot.js --name telegram-bot
pm2 save
pm2 startup
```

## Debugging

### Loguri
```typescript
bot.use((ctx, next) => {
  logger.info(`Message from ${ctx.from?.username}: ${ctx.message}`);
  return next();
});
```

### Testare
```bash
# Testează conexiunea
curl -X GET https://api.telegram.org/bot<TOKEN>/getMe
```

## Resurse utile

- [Telegraf Documentation](https://telegraf.js.org/)
- [Telegram Bot API](https://core.telegram.org/bots/api)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## Sfaturi

1. **Securitate**: Nu include niciodată TOKEN-ul în cod
2. **Rate limiting**: Respectă limitele API-ului Telegram
3. **Logging**: Implementează logging pentru debugging
4. **Error handling**: Gestionează toate erorile posibile
5. **Testing**: Testează bot-ul în medii diferite

## Exemplu complet de comenzi

```typescript
// Comenzi simple
bot.command('ping', (ctx) => ctx.reply('Pong!'));
bot.command('time', (ctx) => ctx.reply(`Ora actuală: ${new Date()}`));

// Comandă cu parametri
bot.command('echo', (ctx) => {
  const text = ctx.message.text.split(' ').slice(1).join(' ');
  ctx.reply(text || 'Te rog scrie ceva după /echo');
});
```

