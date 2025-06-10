import TelegramBot from 'node-telegram-bot-api';
import startCommand from './commands/start.js';
import helpCommand from './commands/help.js';
import todosCommand from './commands/todos.js';

const userTokens = {};

const token = process.env.TELEGRAM_TOKEN;

if (!token) {
  console.error("Error: TELEGRAM_TOKEN не задан!");
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => startCommand(bot, msg, userTokens));
bot.onText(/\/help/, (msg) => helpCommand(bot, msg, userTokens));
bot.onText(/\/todos/, (msg) => todosCommand(bot, msg, userTokens));

export { bot, userTokens };
