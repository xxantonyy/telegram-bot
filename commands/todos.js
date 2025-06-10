import { getTodoList } from "../services/getTodoList.js";

bot.onText(/\/todos/, async (bot, msg, userTokens) => {
  const chatId = msg.chat.id;
  const token = userTokens[chatId];

  if (!token) {
    bot.sendMessage(chatId, 'Сначала нужно войти через /login');
    return;
  }

  try {
    const todos = await getTodoList(token);
    const text = todos.map(t => `• ${t.title}`).join('\n');
    bot.sendMessage(chatId, `Ваши задачи:\n${text}`);
  } catch (e) {
    bot.sendMessage(chatId, 'Ошибка при получении задач');
  }
});
