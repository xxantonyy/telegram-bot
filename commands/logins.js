import { authenticateUser } from "../services/authenticateUser.js";

const loginStates = {};
const messageIds = {};

export default function loginCommand(bot, msg, userTokens) {
  const chatId = msg.chat.id;
  loginStates[chatId] = { step: 'awaiting_login' };
  messageIds[chatId] = []; // инициализация массива

  bot.sendMessage(chatId, 'Введите логин:')
    .then((message) => {
      messageIds[chatId].push(message.message_id);
    })
}

// Отдельная функция для обработки сообщений (пароля и логина)
export function handleLoginMessages(bot, msg, userTokens) {
  const chatId = msg.chat.id;
  if (!loginStates[chatId]) return; // не в процессе логина

  const state = loginStates[chatId];

  if (state.step === 'awaiting_login') {
    state.login = msg.text;

    bot.deleteMessage(chatId, msg.message_id).catch(() => { });
    bot.deleteMessage(chatId, messageIds[chatId][0]).catch(() => { });

    state.step = 'awaiting_password';

    bot.sendMessage(chatId, 'Введите пароль:')
      .then((message) => {
        messageIds[chatId].push(message.message_id);
      })
  } else if (state.step === 'awaiting_password') {
    const username = state.login;
    const password = msg.text;
    bot.deleteMessage(chatId, msg.message_id).catch(() => { });

    authenticateUser(username, password)
      .then(token => {
        userTokens[chatId] = token;

        if (messageIds[chatId]) {
          messageIds[chatId].forEach(id => {
            bot.deleteMessage(chatId, id).catch(() => { });
          });
          delete messageIds[chatId];
        }

        bot.sendMessage(chatId, 'Успешный вход!');
        delete loginStates[chatId];
      })
      .catch((error) => {
        bot.sendMessage(chatId, `Ошибка входа - ${error} Попробуйте /login снова.`);
        delete loginStates[chatId];
      });
  }
}
