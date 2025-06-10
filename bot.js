import TelegramBot from 'node-telegram-bot-api';

// Токен бота из @BotFather, передаём через переменную окружения
const token = process.env.TELEGRAM_TOKEN;

if (!token) {
  console.error("Error: TELEGRAM_TOKEN не задан!");
  process.exit(1);
}

// Создаем экземпляр бота с polling
const bot = new TelegramBot(token, { polling: true });

// Обрабатываем текстовые сообщения
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // Ответим простым текстом
  bot.sendMessage(chatId, `Привет, ${msg.from.first_name || "друг"}! Ты написал: "${msg.text}"`);
});
