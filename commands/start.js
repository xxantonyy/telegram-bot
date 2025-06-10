export default function startCommand(bot, msg) {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Привет, ${msg.from.first_name || 'друг'}! Добро пожаловать.`);
}
