import { authenticateUser } from "../services/authenticateUser.js";

const loginStates = {};

export default function loginCommand(bot, msg, userTokens) {
  const chatId = msg.chat.id;
  loginStates[chatId] = { step: 'awaiting_login' };
  bot.sendMessage(chatId, 'Введите логин:');
}

// Отдельная функция для обработки сообщений (пароля и логина)
export function handleLoginMessages(bot, msg, userTokens) {
  const chatId = msg.chat.id;
  if (!loginStates[chatId]) return; // не в процессе логина

  const state = loginStates[chatId];

  if (state.step === 'awaiting_login') {
    state.login = msg.text;
    state.step = 'awaiting_password';
    bot.sendMessage(chatId, 'Введите пароль:');
  } else if (state.step === 'awaiting_password') {
    const username = state.login;
    const password = msg.text;

    authenticateUser(username, password)
      .then(token => {
        userTokens[chatId] = token;
        bot.sendMessage(chatId, 'Успешный вход!');
        delete loginStates[chatId];
      })
      .catch((error) => {
        bot.sendMessage(chatId, `Ошибка входа - ${error} Попробуйте /login снова.`);
        delete loginStates[chatId];
      });
  }
}
