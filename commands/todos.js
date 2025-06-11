import { getTodoList } from '../services/getTodoList.js';

const priorityList = {
  0: 'низкий',
  1: 'средний',
  2: 'высокий'
}

export default async function todosCommand(bot, msg, userTokens) {
  const chatId = msg.chat.id;
  const token = userTokens[chatId];

  if (!token) {
    bot.sendMessage(chatId, 'Сначала нужно войти через /login');
    return;
  }

  try {
    const todos = await getTodoList(token);

    const text = todos.map(t => {
      const title = `• ${t.title}\n`;
      const priority = `• Приоритет: ${priorityList[t.priority]}\n`;
      const description = `• Описание: ${t.description}\n`;
      return `${title}${priority}${description}`
    }).join('\n');
    bot.sendMessage(chatId, `Ваши задачи:\n${text}`);
  } catch (e) {
    bot.sendMessage(chatId, 'Ошибка при получении задач');
  }
}
