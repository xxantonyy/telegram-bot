export default function startCommand(bot, msg) {
  const chatId = msg.chat.id;
  const userName = msg.from.first_name || 'друг';

  const keyboard = {
    reply_markup: {
      keyboard: [
        [{ text: '/start' }, { text: '/help' }],
        [{ text: '/todo' }],
      ],
      resize_keyboard: true,
      one_time_keyboard: false,
    }
  };

  bot.sendMessage(chatId, `Привет, ${userName}! Вот команды, которые доступны:`, keyboard);
}
