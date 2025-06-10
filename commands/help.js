export default function helpCommand(bot, msg) {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Привет, тут будут команды ${msg})`);
}
